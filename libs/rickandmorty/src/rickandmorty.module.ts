import { Module } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';

@Module({
  providers: [RickandmortyService],
  exports: [RickandmortyService],
})
export class RickandmortyModule {}
