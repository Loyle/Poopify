import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
baseUrl = 'http://localhost/api';
accounts: Account[];

constructor(private http: HttpClient) { }

getAll(): Observable<Account[]> {
  return this.http.get(`${this.baseUrl}/test`).pipe(
    map((res) => {
      this.accounts = res['data'];
      return this.accounts;
  }),
  catchError(this.handleError));
}

private handleError(error: HttpErrorResponse) {
  console.log(error);
  // return an observable with a user friendly message
  return throwError('Error! something went wrong.');
}
