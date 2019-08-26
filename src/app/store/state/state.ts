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

export const heroAdapter = createEntityAdapter<Hero>();
