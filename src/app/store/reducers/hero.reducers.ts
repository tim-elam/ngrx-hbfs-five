import { HeroActions, HeroActionTypes } from '../actions/hero.actions';
import { heroAdapter, HeroState } from '../state/state';

export function heroReducer(state: HeroState, action: HeroActions): HeroState {
  if (!state) {
    return {
      filteredHeroes: heroAdapter.getInitialState(),
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
      nextState.filteredHeroes = heroAdapter.addAll(action.filteredHeroes, nextState.filteredHeroes);
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesError:
      nextState.filterError = action.error;
      delete nextState.filteredHeroes;
      break;
  }
  return nextState;
}
