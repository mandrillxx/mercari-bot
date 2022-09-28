import { Module } from '@nestjs/common';
import { MercariGateway } from './mercari.gateway';
import { MercariService } from './mercari.service';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PuppeteerModule.forRoot({ pipe: true }, 'MercariCrawler'),
  ],
  controllers: [],
  providers: [MercariService, MercariGateway],
})
export class MercariModule {}
