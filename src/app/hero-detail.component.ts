import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EntityOp, EntityService, EntityServiceFactory } from 'ngrx-data';
import { take } from 'rxjs/operators';
import { Hero } from './hero';
import { ApiEntities } from './store/data/config';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  private readonly heroService: EntityService<Hero>;

  constructor(
    private route: ActivatedRoute,
    factory: EntityServiceFactory,
  ) {
    this.heroService = factory.create<Hero>(ApiEntities.Hero);
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.heroService.getByKey(id);
        this.heroService.entityMap$
          .subscribe(
            heroes => {
              this.hero = heroes[id];
            });
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {
    this.heroService.update(this.hero);
    this.heroService.store
      .pipe(take(1))
      .subscribe(() => {
        this.goBack(this.hero);
      });
    this.heroService.errors$
      .ofOp(
        EntityOp.SAVE_ADD_ONE_ERROR,
        EntityOp.SAVE_UPDATE_ONE_ERROR,
      )
      .pipe(take(1))
      .subscribe(error => {
        this.error = error;
      });
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
