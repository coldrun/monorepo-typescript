import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from '../modules/hello';
import { appConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig],
    }),
    HelloModule,
  ],
})
export class AppModule {}
