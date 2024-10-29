import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { googleApiKey } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  private isApiLoaded = new BehaviorSubject(false);
  isApiLoaded$ = this.isApiLoaded.asObservable();

  constructor(private http: HttpClient) {
    this.getGoogleApi();
  }

  private getGoogleApi(): void {
    this.isApiLoaded$ = this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
