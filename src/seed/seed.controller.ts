import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@Controller('seed')
@ApiTags("seed")
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  async executeSeed() {
    return await this.seedService.executeSeed();
  }

}
