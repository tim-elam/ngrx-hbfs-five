import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Hero } from '../../hero';

export interface AppState {
  heroState: HeroState
}

export interface HeroState {
  // GET
  heroes: EntityState<Hero>;
  heroesError?: any;
  singleHeroId?: number;
  singleHeroError?: any;
  nameFilter?: string
  filteredHeroes: EntityState<Hero>;
  filterError?: any;
  // POST & PUT
  heroSavingError?: any;
  heroSavingComplete?: boolean;
  // DELETE
  heroDeletingError?: any;
  heroDeletingComplete?: boolean;
}

export const heroAdapter = createEntityAdapter<Hero>({ sortComparer: heroSort });
export const heroSearchAdapter = createEntityAdapter<Hero>({ sortComparer: heroSearchSort });


function heroSort(a: Hero, b: Hero): number {
  return b.created_date.localeCompare(a.created_date);
}

function heroSearchSort(a: Hero, b: Hero): number {
  return a.name.localeCompare(b.name);
}
