import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService, EntityServiceFactory } from 'ngrx-data';

import { Hero } from './hero';
import { ApiEntities } from './store/data/config';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  private readonly heroService: EntityService<Hero>;

  constructor(
    private router: Router,
    factory: EntityServiceFactory,
  ) {
    this.heroService = factory.create<Hero>(ApiEntities.Hero);
  }

  ngOnInit(): void {
    this.heroService.getAll();
    this.heroService.entities$
      .subscribe(heroes => {
        this.heroes = heroes.slice(1, 5);
      });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
