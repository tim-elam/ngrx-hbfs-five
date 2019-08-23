import { Hero } from '../../hero';

export interface AppState {
  heroState: HeroState;
}

export interface HeroState {
  // GET
  heroes: Hero[];
  heroesError?: any;
  singleHeroId?: number;
  singleHeroError?: any;
  heroesLoading?: boolean;
  nameFilter?: string
  filteredHeroes?: Hero[];
  filterError?: any;
  // POST & PUT
  heroSaving?: Hero;
  heroSavingError?: any;
  heroSavingComplete?: boolean;
  // DELETE
  heroDeleting?: Hero;
  heroDeletingError?: any;
  heroDeletingComplete?: boolean;
}
