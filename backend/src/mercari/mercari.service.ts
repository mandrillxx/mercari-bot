import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Browser, Page } from 'puppeteer';
import { HTMLElement, parse } from 'node-html-parser';
import { Server } from 'socket.io';
import { KEYWORD } from 'src/app.environment';
import { InjectContext } from 'nest-puppeteer';

@Injectable()
export class MercariService {
  public socket: Server;
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
        //return await this.populateListingInfo(listing);
        return listing;
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

    return {
      ...listing,
      delivery: deliveryFee || 0,
    };
  }

  isNewListing(listing: Listing): boolean {
    if (this.seenListings.includes(listing.offers.url)) {
      return false;
    } else {
      this.seenListings.push(listing.offers.url);
      return true;
    }
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

  async getNewListings(): Promise<Listing[] | null> {
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
  }

  @Interval(2000)
  async retrieveNewListings() {
    const newListings: Listing[] = await this.getNewListings();
    if (newListings) {
      this.socket.emit('newListings', newListings);
    }
  }
}
