import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as ConfigNest } from '@nestjs/config';
import { EnvConfiguration } from './env.config';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [
    ConfigNest.forRoot({
      load: [EnvConfiguration],
    }),
  ]
})
export class ConfigModule { }
