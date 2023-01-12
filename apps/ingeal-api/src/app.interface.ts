export interface ICharacterFilters {
  name?: string;
  status?: ECharacterStatus;
  species?: string;
  type?: string;
  gender?: ECharacterGender;
}

export enum ECharacterStatus {
  Alive = 'alive',
  Dead = 'dead',
  Unknown = 'unknown',
}

export enum ECharacterGender {
  Male = 'male',
  Female = 'female',
  Genderless = 'genderless',
  Unknown = 'unknown',
}
