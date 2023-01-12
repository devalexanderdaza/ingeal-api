import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Info, Character } from 'rickmortyapi/dist/interfaces';

@ApiTags('Public')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api-status')
  getApiStatus(): object {
    return this.appService.apiStatus();
  }

  @Get('rick-and-morty-characters')
  async getRickAndMortyCharacters(): Promise<Info<Character[]>> {
    return await this.appService.getRickAndMortyCharacters();
  }

  @Get('rick-and-morty-character/:id')
  async getRickAndMortyCharacterById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    return await this.appService.getRickAndMortyCharacterById(id);
  }
}
