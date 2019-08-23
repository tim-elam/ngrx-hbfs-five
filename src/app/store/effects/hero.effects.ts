import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, filter, map } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import {
  DeleteHeroAction,
  DeleteHeroErrorAction,
  DeleteHeroSuccessAction,
  FilterHeroesAction,
  FilterHeroesErrorAction,
  FilterHeroesSuccessAction,
  GetHeroAction,
  GetHeroErrorAction,
  GetHeroesAction,
  GetHeroesErrorAction,
  GetHeroesSuccessAction,
  GetHeroSuccessAction,
  HeroActionTypes,
  SaveHeroErrorAction, SaveHeroSuccessAction,
} from '../actions/hero.actions';

@Injectable({
  providedIn: 'root',
})
export class HeroEffects {
  constructor(private heroService: HeroService, private actions: Actions) {
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
  public getHeroes = this.actions.pipe(
    ofType<GetHeroesAction>(HeroActionTypes.GetHeroes),
    concatMap(() => this.heroService.getHeroes()
      .pipe(
        map(heroes => new GetHeroesSuccessAction(heroes)),
        catchError(error => of(new GetHeroesErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public getHero = this.actions.pipe(
    ofType<GetHeroAction>(HeroActionTypes.GetHero),
    concatMap(action =>
      this.heroService.getHero(action.id)
        .pipe(
          map(hero => new GetHeroSuccessAction(hero)),
          catchError(error => of(new GetHeroErrorAction(error, action.id)),
          ),
        ),
    ),
  );

  @Effect()
  public deleteHero = this.actions.pipe(
    ofType<DeleteHeroAction>(HeroActionTypes.DeleteHero),
    concatMap(action =>
      this.heroService.delete(action.hero)
        .pipe(
          map(hero => new DeleteHeroSuccessAction(action.hero)),
          catchError(error => of(new DeleteHeroErrorAction(error, action.hero)),
          ),
        ),
    ),
  );

  @Effect()
  public saveHero = this.actions.pipe(
    ofType<SaveHeroErrorAction>(HeroActionTypes.SaveHero),
    concatMap((action) => {
        let res: Observable<void>;
        if (action.hero.id) {
          res = this.heroService.put(action.hero);
        } else {
          res = this.heroService.post(action.hero);
        }
        return res.pipe(
          map(hero => new SaveHeroSuccessAction(action.hero)),
          catchError(error => of(new SaveHeroErrorAction(error, action.hero))),
        );
      },
    ),
  );
}
