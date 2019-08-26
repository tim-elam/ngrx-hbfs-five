import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EntityActions } from 'ngrx-data';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroSearchService } from '../../hero-search.service';
import {
  FilterHeroesAction,
  FilterHeroesErrorAction,
  FilterHeroesSuccessAction,
  HeroActionTypes,
} from '../actions/hero.actions';
import { ApiEntities } from '../data/config';

@Injectable({
  providedIn: 'root',
})
export class HeroEffects {
  constructor(
    private heroService: HeroSearchService,
    private actions: Actions,
    private entityActions: EntityActions,
  ) {
  }

  @Effect()
  public search = this.actions.pipe(
    ofType<FilterHeroesAction>(HeroActionTypes.FilterHeroes),
    concatMap<FilterHeroesAction, Hero[]>(action => this.heroService.search(action.filter)
      .pipe(
        map(filteredHeroes => new FilterHeroesSuccessAction(filteredHeroes)),
        catchError((error) => of(new FilterHeroesErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public heroErrors = this.entityActions
    .ofEntityType(ApiEntities.Hero)
    .where(action => action.type.endsWith('/error'))
    .pipe(
      tap(error => console.error(error)),
    );
}
