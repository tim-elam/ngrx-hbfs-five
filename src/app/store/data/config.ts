import { NgrxDataModuleConfig } from 'ngrx-data';

export const enum ApiEntities {
  Hero = 'Hero',
}

export const dataConfig: NgrxDataModuleConfig = {
  entityMetadata: {
    Hero: {},
  },
  pluralNames: {
    Hero: 'Heroes',
  },
};
