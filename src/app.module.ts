import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    // Custom config 
    ConfigModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGO_DB),

    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor(
    // private readonly configService: ConfigService
  ) {

  }
}
