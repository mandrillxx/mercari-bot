import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Browser, Page } from 'puppeteer';
import { HTMLElement, parse } from 'node-html-parser';
import { Server } from 'socket.io';
import {
  KEYWORD,
  INTERVAL,
  WORKERS,
  RETRIEVE_METHOD,
  MORE_INFO,
} from 'src/app.environment';
import { InjectContext } from 'nest-puppeteer';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MercariService {
  public socket: Server;
  private pages: Page[] = [];
  private moreInfoQueue: string[] = [];

  private running: boolean = false;
  private seenListings: string[] = [];

  constructor(
    @InjectContext('MercariCrawler') private readonly browser: Browser,
  ) {}

  async htmlToListing(html: HTMLElement[]): Promise<Listing[]> {
    return await Promise.all(
      html.map(async (el: HTMLElement) => {
        const listing: Listing = JSON.parse(
          el.querySelector('script[type="application/ld+json"]')!.innerHTML,
        );
        return MORE_INFO ? await this.populateListingInfo(listing) : listing;
      }),
    );
  }

  htmlToListingInfo(html: HTMLElement, listing: Listing): Listing {
    const deliveryFee: number = html.querySelector(
      'span[data-testid="ShippingDeliveryFee"]',
    )
      ? +html
          .querySelector('span[data-testid="ShippingDeliveryFee"]')
          .firstChild.rawText.split(' ')[1]
          .replace('$', '')
      : 0;

    const username = html.querySelector('h2.H2--dxoqa5.kSkomM')
      ? html.querySelector('h2.H2--dxoqa5.kSkomM').innerText
      : 'N/A';

    const reviews: number = html.querySelector('h6.H6--10dwjli.gpaiKj')
      ? +html.querySelector('h6.H6--10dwjli.gpaiKj').innerText
      : 0;

    return {
      ...listing,
      delivery: deliveryFee,
      reviews: reviews,
      username: username,
    };
  }

  isNewListing(listing: Listing): boolean {
    if (this.seenListings.includes(listing.offers.url)) return false;
    this.seenListings.push(listing.offers.url);
    return true;
  }

  async populateListingInfo(listing: Listing): Promise<Listing> {
    const page: Page = await this.browser.newPage();
    await page.goto(`https://mercari.com${listing.offers.url}`, {
      waitUntil: 'networkidle2',
    });
    const root: HTMLElement = parse(await page.content());
    await page.close();
    return this.htmlToListingInfo(root, listing);
  }

  async getNewListings(index: number | null): Promise<Listing[] | null> {
    if (!index) {
      const page: Page = await this.browser.newPage();
      await page.goto(
        `https://www.mercari.com/search/?keyword=${KEYWORD}&sortBy=2`,
        {
          waitUntil: 'networkidle2',
        },
      );
      const root: HTMLElement = parse(await page.content());
      await page.close();
      const htmlListings: HTMLElement[] = root.querySelectorAll(
        "div[data-testid='ItemContainer']",
      );
      const listings: Listing[] = await this.htmlToListing(htmlListings);

      return listings.filter((listing) => this.isNewListing(listing));
    } else {
      if (!this.pages[index]) {
        this.pages[index] = await this.browser.newPage();
        await this.pages[index].goto(
          `https://www.mercari.com/search/?keyword=${KEYWORD}&sortBy=2`,
          {
            waitUntil: 'networkidle2',
          },
        );
      } else {
        await this.pages[index].reload({ waitUntil: 'networkidle2' });
      }

      const root: HTMLElement = parse(await this.pages[index].content());
      const htmlListings: HTMLElement[] = root.querySelectorAll(
        "div[data-testid='ItemContainer']",
      );
      const listings: Listing[] = await this.htmlToListing(htmlListings);

      return listings.filter((listing) => this.isNewListing(listing));
    }
  }

  @Interval(INTERVAL)
  async retrieveNewListings() {
    if (!this.running && RETRIEVE_METHOD === 'workers') {
      this.running = true;
      while (this.running) {
        const newItems: Listing[] = await Promise.all(
          Array.from(Array(+WORKERS).keys()).map(async (index) => {
            return await this.getNewListings(index);
          }),
        ).then((items) => items.flat());

        if (newItems) {
          this.socket.emit('newListings', newItems);
        }
      }
    } else if (RETRIEVE_METHOD === 'interval') {
      const newItems: Listing[] = await this.getNewListings(null);
      if (newItems) {
        this.socket.emit('newListings', newItems);
      }
    }
  }
}
