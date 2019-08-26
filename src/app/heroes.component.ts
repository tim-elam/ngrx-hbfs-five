import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityOp, EntityService, EntityServiceFactory } from 'ngrx-data';
import { Observable } from 'rxjs';
import { Hero } from './hero';
import { ApiEntities } from './store/data/config';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;

  private readonly heroService: EntityService<Hero>;

  constructor(
    private router: Router,
    factory: EntityServiceFactory,
  ) {
    this.heroService = factory.create<Hero>(ApiEntities.Hero);
  }

  getHeroes(): void {
    this.heroService.getAll();
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero.id);
    this.heroService.errors$
      .ofOp(EntityOp.SAVE_DELETE_ONE_ERROR)
      .subscribe(error => {
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.getHeroes();
    this.heroes = this.heroService.entities$;
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
