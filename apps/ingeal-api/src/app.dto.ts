import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ICharacterFilters,
  ECharacterStatus,
  ECharacterGender,
} from './app.interface';
import { IsOptional, IsString } from 'class-validator';

export class CharacterFiltersDto implements ICharacterFilters {
  @ApiPropertyOptional({
    name: 'name',
    type: 'string',
    description: 'Name of the character',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    name: 'status',
    enum: ECharacterStatus,
    description: 'Status of the character',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: ECharacterStatus;

  @ApiPropertyOptional({
    name: 'species',
    type: 'string',
    description: 'Species of the character',
    required: false,
  })
  @IsString()
  @IsOptional()
  species?: string;

  @ApiPropertyOptional({
    name: 'type',
    type: 'string',
    description: 'Type of the character',
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    name: 'gender',
    enum: ECharacterGender,
    description: 'Gender of the character',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender?: ECharacterGender;
}
