import { ISuccessResponse, SuccessResponse } from '@app/common';
import { Injectable } from '@nestjs/common';
import { getCharacters } from 'rickmortyapi';

@Injectable()
export class AppService {
  apiStatus(): object {
    return {
      message: 'API Running!',
    };
  }

  async getRickAndMortyCharacters() {
    return await getCharacters();
  }
}
