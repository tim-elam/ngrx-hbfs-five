import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Hero } from '../../hero';

export interface AppState {
  heroState: HeroState
}

export interface HeroState {
  nameFilter?: string
  filteredHeroes: EntityState<Hero>;
  filterError?: any;
}

export const heroSearchAdapter = createEntityAdapter<Hero>({ sortComparer: heroSearchSort });

function heroSearchSort(a: Hero, b: Hero): number {
  return a.name.localeCompare(b.name);
}
