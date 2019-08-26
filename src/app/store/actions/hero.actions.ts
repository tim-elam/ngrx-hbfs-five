import { Action } from '@ngrx/store';
import { Hero } from '../../hero';

export enum HeroActionTypes {
  FilterHeroes = 'FILTER_HEROES',
  FilterHeroesClear = 'FILTER_HEROES_CLEAR',
  FilterHeroesSuccess = 'FILTER_HEROES_SUCCESS',
  FilterHeroesError = 'FILTER_HEROES_ERROR',
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


export type HeroActions =
  | FilterHeroesAction
  | FilterHeroesClearAction
  | FilterHeroesSuccessAction
  | FilterHeroesErrorAction;
