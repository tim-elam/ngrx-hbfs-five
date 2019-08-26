import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState, heroSearchAdapter, HeroState } from '../state/state';

export function selectHeroState(state: Observable<AppState>): Observable<HeroState> {
  return state.pipe(
    map(state => state.heroState),
  );
}

export const filteredHeroSelectors = heroSearchAdapter.getSelectors<AppState>(
  state => state.heroState.filteredHeroes,
);
