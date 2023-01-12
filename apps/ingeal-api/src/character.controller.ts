import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

import { Info, Character } from 'rickmortyapi/dist/interfaces';
import { CharacterFiltersDto } from './app.dto';
import {
  ICharacterFilters,
  ECharacterStatus,
  ECharacterGender,
} from './app.interface';

@ApiTags('Characters')
@Controller()
export class CharacterController {
  constructor(private readonly appService: AppService) {}

  @Get('rick-and-morty-characters')
  async getRickAndMortyCharacters(): Promise<Info<Character[]>> {
    return await this.appService.getRickAndMortyCharacters();
  }

  @Get('rick-and-morty-character/:id')
  @ApiParam({ name: 'id', type: 'number' })
  async getRickAndMortyCharacterById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    return await this.appService.getRickAndMortyCharacterById(id);
  }

  // Get rick and morty characters by name, status, species, type or gender using query parameters
  @Get('rick-and-morty-characters-filtered')
  async getRickAndMortyCharactersByQuery(
    @Query() query: CharacterFiltersDto,
  ): Promise<Info<Character[]>> {
    const { name, status, species, type, gender } = query;
    console.log(query);
    const filters: ICharacterFilters = {};
    if (name !== undefined) filters.name = name;
    if (status !== undefined) {
      if (status === ECharacterStatus.Alive) {
        filters.status = ECharacterStatus.Alive;
      } else if (status === ECharacterStatus.Dead) {
        filters.status = ECharacterStatus.Dead;
      } else if (status === ECharacterStatus.Unknown) {
        filters.status = ECharacterStatus.Unknown;
      }
    }
    if (species !== undefined) filters.species = species;
    if (type !== undefined) filters.type = type;
    if (gender !== undefined) {
      if (gender === ECharacterGender.Male)
        filters.gender = ECharacterGender.Male;
      if (gender === ECharacterGender.Female)
        filters.gender = ECharacterGender.Female;
      if (gender === ECharacterGender.Genderless)
        filters.gender = ECharacterGender.Genderless;
      if (gender === ECharacterGender.Unknown)
        filters.gender = ECharacterGender.Unknown;
    }
    return await this.appService.getRickAndMortyCharactersByFilters(filters);
  }
}
