import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, concatMap, distinctUntilChanged, filter, map, pairwise, tap } from 'rxjs/operators';

import { Hero } from './hero';
import {
  DeleteHeroErrorAction,
  DeleteHeroSuccessAction,
  FilterHeroesErrorAction,
  FilterHeroesSuccessAction,
  GetHeroErrorAction,
  GetHeroesErrorAction,
  GetHeroesSuccessAction,
  GetHeroSuccessAction,
  SaveHeroErrorAction,
  SaveHeroSuccessAction,
} from './store/actions/hero.actions';
import { selectHeroState } from './store/selectors/hero.selectors';
import { AppState } from './store/state/state';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  private heroUrl = 'api/hero'; // URL to web api

  constructor(private http: HttpClient, private store: Store<AppState>) {
    const heroStateChanges =
      store
        .pipe(
          selectHeroState,
          distinctUntilChanged(),
          pairwise(),
        );

    heroStateChanges
      .pipe(
        filter(([previousState, nextState]) => !previousState.heroesLoading && nextState.heroesLoading),
        concatMap(() => this.getHeroes()),
      )
      .subscribe();

    heroStateChanges
      .pipe(
        map(([previousState, nextState]) => !previousState.heroSaving && nextState.heroSaving),
        filter<Hero>(Boolean),
        concatMap(heroToSave => {
          if (heroToSave.id) {
            return this.put(heroToSave);
          } else {
            return this.post(heroToSave);
          }
        }),
      )
      .subscribe();

    heroStateChanges
      .pipe(
        map(([previousState, nextState]) => !previousState.singleHeroId && nextState.singleHeroId),
        filter<number>(Boolean),
        concatMap(id => this.getHero(id)),
      )
      .subscribe();

    heroStateChanges
      .pipe(
        map(([previousState, nextState]) => !previousState.heroDeleting && nextState.heroDeleting),
        filter<Hero>(Boolean),
        concatMap(hero => this.delete(hero)),
      )
      .subscribe();

    heroStateChanges
      .pipe(
        map(([previousState, nextState]) => nextState.nameFilter !== previousState.nameFilter && nextState.nameFilter),
        filter(Boolean),
        concatMap(term => this.search(term)),
      )
      .subscribe();
  }

  private search(term: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap(filteredHeroes => {
          this.store.dispatch(new FilterHeroesSuccessAction(filteredHeroes));
        }),
        catchError((error) => {
          this.store.dispatch(new FilterHeroesErrorAction(error));
          return this.handleError(error);
        }),
      );
  }

  private getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.store.dispatch(new GetHeroesSuccessAction(heroes))),
        catchError((error) => {
          this.store.dispatch(new GetHeroesErrorAction(error));
          return this.handleError(error);
        }));
  }

  private getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.heroUrl}/${id}`)
      .pipe(
        tap(hero => this.store.dispatch(new GetHeroSuccessAction(hero))),
        catchError((error) => {
          this.store.dispatch(new GetHeroErrorAction(error, id));
          return this.handleError(error);
        }),
      );
  }

  private delete(hero: Hero): Observable<Hero> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroUrl}/${hero.id}`;

    return this.http.delete<Hero>(url).pipe(
      tap(() => this.store.dispatch(new DeleteHeroSuccessAction(hero))),
      catchError((error) => {
        this.store.dispatch(new DeleteHeroErrorAction(error, hero));
        return this.handleError(error);
      }),
    );
  }

  // Add new Hero
  private post(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(
        tap(hero => this.store.dispatch(new SaveHeroSuccessAction(hero))),
        catchError(error => {
          this.store.dispatch(new SaveHeroErrorAction(error, hero));
          return this.handleError(error);
        }),
      );
  }

  // Update existing Hero
  private put(hero: Hero) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero)
      .pipe(
        tap(() => {
          return this.store.dispatch(new SaveHeroSuccessAction(hero));
        }),
        catchError(error => {
          this.store.dispatch(new SaveHeroErrorAction(error, hero));
          return this.handleError(error);
        }),
      );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
