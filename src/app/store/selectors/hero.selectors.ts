import { createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AppState, heroAdapter, HeroState } from '../state/state';

export function selectHeroState(state: Observable<AppState>): Observable<HeroState> {
  return state.pipe(
    pluck<AppState, HeroState>('heroState'),
  );
}

export const heroSelectors = heroAdapter.getSelectors<AppState>(
  state => state.heroState.heroes,
);

export const filteredHeroSelectors = heroAdapter.getSelectors<AppState>(
  state => state.heroState.filteredHeroes,
);
