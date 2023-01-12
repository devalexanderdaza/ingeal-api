import { ISuccessResponse, SuccessResponse } from '@app/common';
import { Injectable } from '@nestjs/common';
import { getCharacter, getCharacters } from 'rickmortyapi';
import { Info, Character } from 'rickmortyapi/dist/interfaces';

@Injectable()
export class AppService {
  apiStatus(): object {
    return {
      message: 'API Running!',
    };
  }

  async getRickAndMortyCharacters(): Promise<Info<Character[]>> {
    const { data } = await getCharacters();
    return data;
  }

  async getRickAndMortyCharacterById(id: number): Promise<Character> {
    const { data } = await getCharacter(id);
    return data;
  }
}
