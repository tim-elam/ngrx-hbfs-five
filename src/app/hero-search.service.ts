import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(private http: HttpClient) {
  }

  public search(term: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        catchError(this.handleError),
      );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
