import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  private heroUrl = 'api/hero'; // URL to web api

  constructor(private http: HttpClient) {
  }

  public search(term: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        catchError(this.handleError),
      );
  }

  public getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError),
      );
  }

  public getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.heroUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public delete(hero: Hero): Observable<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroUrl}/${hero.id}`;

    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  // Add new Hero
  public post(hero: Hero): Observable<void> {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    return this.http.post<void>(this.heroesUrl, hero)
      .pipe(catchError(this.handleError));
  }

  // Update existing Hero
  public put(hero: Hero): Observable<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroUrl}/${hero.id}`;
    return this.http.put<void>(url, hero)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
