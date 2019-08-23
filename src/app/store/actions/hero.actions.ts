import { Action } from '@ngrx/store';
import { Hero } from '../../hero';

export enum HeroActionTypes {
  GetHero = 'GET_HERO',
  GetHeroSuccess = 'GET_HERO_SUCCESS',
  GetHeroError = 'GET_HERO_ERROR',
  GetHeroes = 'GET_HEROES',
  GetHeroesSuccess = 'GET_HEROES_SUCCESS',
  GetHeroesError = 'GET_HEROES_ERROR',
  FilterHeroes = 'FILTER_HEROES',
  FilterHeroesClear = 'FILTER_HEROES_CLEAR',
  FilterHeroesSuccess = 'FILTER_HEROES_SUCCESS',
  FilterHeroesError = 'FILTER_HEROES_ERROR',
  SaveHero = 'SAVE_HERO',
  SaveHeroSuccess = 'SAVE_HERO_SUCCESS',
  SaveHeroError = 'SAVE_HERO_ERROR',
  DeleteHero = 'DELETE_HERO',
  DeleteHeroSuccess = 'DELETE_HERO_SUCCESS',
  DeleteHeroError = 'DELETE_HERO_ERROR',
}

export class GetHeroAction implements Action {
  public readonly type = HeroActionTypes.GetHero;
  constructor(public readonly id: number) {
  }
}

export class GetHeroSuccessAction implements Action {
  public readonly type = HeroActionTypes.GetHeroSuccess;

  constructor(public readonly hero: Hero) {
  }
}

export class GetHeroErrorAction implements Action {
  public readonly type = HeroActionTypes.GetHeroError;

  constructor(public readonly error: any, public readonly id: number) {
  }
}

export class GetHeroesAction implements Action {
  public readonly type = HeroActionTypes.GetHeroes;
}

export class GetHeroesSuccessAction implements Action {
  public readonly type = HeroActionTypes.GetHeroesSuccess;

  constructor(public readonly heroes: Hero[]) {
  }
}

export class GetHeroesErrorAction implements Action {
  public readonly type = HeroActionTypes.GetHeroesError;

  constructor(public readonly error: any) {
  }
}

export class FilterHeroesAction implements Action {
  public readonly type = HeroActionTypes.FilterHeroes;
  constructor(public readonly filter: string) {

  }
}

export class FilterHeroesClearAction implements Action {
  public readonly type = HeroActionTypes.FilterHeroesClear;
}

export class FilterHeroesSuccessAction implements Action {
  public readonly type = HeroActionTypes.FilterHeroesSuccess;

  constructor(public readonly filteredHeroes: Hero[]) {
  }
}

export class FilterHeroesErrorAction implements Action {
  public readonly type = HeroActionTypes.FilterHeroesError;

  constructor(public readonly error: any) {
  }
}

export class SaveHeroAction implements Action {
  public readonly type = HeroActionTypes.SaveHero;

  constructor(public readonly hero: Hero) {
  }
}

export class SaveHeroSuccessAction implements Action {
  public readonly type = HeroActionTypes.SaveHeroSuccess;

  constructor(public readonly hero: Hero) {
  }
}

export class SaveHeroErrorAction implements Action {
  public readonly type = HeroActionTypes.SaveHeroError;

  constructor(public readonly error: any, public readonly hero: Hero) {
  }
}

export class DeleteHeroAction implements Action {
  public readonly type = HeroActionTypes.DeleteHero;

  constructor(public readonly hero: Hero) {
  }
}

export class DeleteHeroSuccessAction implements Action {
  public readonly type = HeroActionTypes.DeleteHeroSuccess;

  constructor(public readonly hero: Hero) {
  }
}

export class DeleteHeroErrorAction implements Action {
  public readonly type = HeroActionTypes.DeleteHeroError;

  constructor(public readonly error: any, public readonly hero: Hero) {
  }
}

export type HeroActions =
  | GetHeroAction
  | GetHeroSuccessAction
  | GetHeroErrorAction
  | GetHeroesAction
  | GetHeroesSuccessAction
  | GetHeroesErrorAction
  | FilterHeroesAction
  | FilterHeroesClearAction
  | FilterHeroesSuccessAction
  | FilterHeroesErrorAction
  | SaveHeroAction
  | SaveHeroSuccessAction
  | SaveHeroErrorAction
  | DeleteHeroAction
  | DeleteHeroSuccessAction
  | DeleteHeroErrorAction;
