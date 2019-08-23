import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Hero } from '../../hero';
import { AppState, HeroState } from '../state/state';

export function selectHeroes(state: Observable<AppState>): Observable<Hero[]> {
  return state.pipe(
    selectHeroState,
    pluck('heroes'),
  );
}

export function selectHeroState(state: Observable<AppState>): Observable<HeroState> {
  return state.pipe(
    pluck<AppState, HeroState>('heroState'),
  );
}
