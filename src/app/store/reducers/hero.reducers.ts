import { HeroActions, HeroActionTypes } from '../actions/hero.actions';
import { heroSearchAdapter, HeroState } from '../state/state';

export function heroReducer(state: HeroState, action: HeroActions): HeroState {
  if (!state) {
    return {
      filteredHeroes: heroSearchAdapter.getInitialState(),
    };
  }
  let nextState: HeroState = { ...state };
  switch (action.type) {
    case HeroActionTypes.FilterHeroes:
      nextState.nameFilter = action.filter;
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesClear:
      delete nextState.nameFilter;
      delete nextState.filteredHeroes;
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesSuccess:
      nextState.filteredHeroes = heroSearchAdapter.addAll(action.filteredHeroes, nextState.filteredHeroes);
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesError:
      nextState.filterError = action.error;
      delete nextState.filteredHeroes;
      break;
  }
  return nextState;
}
