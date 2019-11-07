
import { Injectable } from '@angular/core';
import {Book} from './Book';
import {BookRaw} from './book-raw';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import { BookFactory } from './book-factory';
import {retry, map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api3.angular-buch.com'

  constructor(private http: HttpClient) {
  }

   getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`)
       .pipe(
         map(
           booksRaw => booksRaw.map(r => BookFactory.fromRaw(r))
         )
        );
   }

   getAllSearch(searchTerm: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books/Search/${searchTerm}`)
       .pipe(
         map(
           booksRaw => booksRaw.map(r => BookFactory.fromRaw(r))
         ), catchError(this.errorHandler)
        );
   }

   create(book: Book): Observable<any> {
     return this.http.post(`${this.api}/book`, book, {responseType: 'text'}).pipe(catchError(this.errorHandler));
   }

   update(book: Book) {
    return this.http.put(`${this.api}/book/${book.isbn}`, book, {responseType: 'text'}).pipe(catchError(this.errorHandler));
   }

   check(isbn: string): Observable<boolean> {
     return this.http.get(`${this.api}/book/${isbn}/check`).pipe(catchError(this.errorHandler));
   }

   getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookRaw>(`${this.api}/book/${isbn}`)
    .pipe(retry(3), map(r => BookFactory.fromRaw(r), catchError(this.errorHandler)));
   }

   remove(isbn: string): Observable<any> {
     return this.http.delete(`${this.api}/book/${isbn}`);
   }

   private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
   }
}
