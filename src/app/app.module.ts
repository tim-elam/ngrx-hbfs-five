import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroEffects } from './store/effects/hero.effects';
import { heroReducer } from './store/reducers/hero.reducers';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      apiBase: 'api',
      dataEncapsulation: false,
      delay: 300,
      passThruUnknownUrl: true,
    }),
    StoreModule.forRoot({ heroState: heroReducer }),
    EffectsModule.forRoot([HeroEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent,
  ],
  providers: [
    HeroService,
    HeroEffects,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(heroService: HeroService) {
  }
}
