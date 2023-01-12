import { ISuccessResponse, SuccessResponse } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiStatus(): object {
    return {
      message: 'API Running!',
    };
  }
}
