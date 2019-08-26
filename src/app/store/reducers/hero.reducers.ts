import { Hero } from '../../hero';
import { HeroActions, HeroActionTypes } from '../actions/hero.actions';
import { HeroState } from '../state/state';

export function heroReducer(state: HeroState, action: HeroActions): HeroState {
  if (!state) {
    return {
      heroes: [],
    };
  }
  let nextState: HeroState = { ...state };
  switch (action.type) {
    case HeroActionTypes.GetHero:
      nextState.singleHeroId = action.id;
      delete nextState.heroesError;
      break;

    case HeroActionTypes.GetHeroSuccess:
      nextState.heroes = updateHeroes(nextState.heroes, action.hero);
      delete nextState.singleHeroId;
      delete nextState.singleHeroError;
      break;

    case HeroActionTypes.GetHeroError:
      delete nextState.singleHeroId;
      nextState.heroesError = action.error;
      break;

    case HeroActionTypes.GetHeroes:
      nextState.heroesLoading = true;
      delete nextState.heroesError;
      break;

    case HeroActionTypes.GetHeroesSuccess:
      nextState.heroes = action.heroes.sort(heroSort);
      nextState.heroesLoading = false;
      delete nextState.heroesError;
      break;

    case HeroActionTypes.GetHeroesError:
      nextState.heroesError = action.error;
      break;


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
      nextState.filteredHeroes = action.filteredHeroes.sort(heroSearchSort);
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesError:
      nextState.filterError = action.error;
      delete nextState.filteredHeroes;
      break;

    case HeroActionTypes.SaveHero:
      nextState.heroSaving = action.hero;
      nextState.heroSavingComplete = false;
      break;

    case HeroActionTypes.SaveHeroSuccess:
      nextState.heroes = updateHeroes(nextState.heroes, action.hero);
      delete nextState.heroSaving;
      delete nextState.heroSavingError;
      nextState.heroSavingComplete = true;
      break;

    case HeroActionTypes.SaveHeroError:
      delete nextState.heroSaving;
      nextState.heroSavingError;
      nextState.heroSavingComplete = false;
      break;

    case HeroActionTypes.DeleteHero:
      nextState.heroDeleting = action.hero;
      nextState.heroDeletingComplete = false;
      break;

    case HeroActionTypes.DeleteHeroSuccess:
      nextState.heroes = nextState.heroes.filter(hero => hero.id !== action.hero.id);
      delete nextState.heroDeleting;
      delete nextState.heroDeletingError;
      nextState.heroDeletingComplete = true;
      break;

    case HeroActionTypes.DeleteHeroError:
      delete nextState.heroDeleting;
      nextState.heroDeletingError;
      nextState.heroDeletingComplete = false;
      break;
  }
  return nextState;
}

function updateHeroes(heroes: Hero[], hero): Hero[] {
  const updateIndex = heroes.findIndex(hero => hero.id === hero.id);
  if (updateIndex === -1) {
    return [...heroes, hero];
  }
  return heroes.map(hero => {
    if (hero.id === hero.id) {
      return hero;
    }
    return hero;
  });
}

function heroSort(a: Hero, b: Hero): number {
  return b.created_date.localeCompare(a.created_date);
}

function heroSearchSort(a: Hero, b: Hero): number {
  return a.name.localeCompare(b.name);
}
