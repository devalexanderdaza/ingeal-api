import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Public')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api-status')
  getApiStatus(): object {
    return this.appService.apiStatus();
  }

  @Get('rick-and-morty-characters')
  async getRickAndMortyCharacters(): Promise<object> {
    const { data } = await this.appService.getRickAndMortyCharacters();
    return data;
  }
}
