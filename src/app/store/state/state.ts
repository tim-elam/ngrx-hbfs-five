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
  nameFilter?: string
  filteredHeroes?: Hero[];
  filterError?: any;
  // POST & PUT
  heroSavingError?: any;
  heroSavingComplete?: boolean;
  // DELETE
  heroDeletingError?: any;
  heroDeletingComplete?: boolean;
}
