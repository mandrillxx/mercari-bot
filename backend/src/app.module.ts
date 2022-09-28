import { Module } from '@nestjs/common';
import { MercariModule } from './mercari/mercari.module';

@Module({
  imports: [MercariModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
