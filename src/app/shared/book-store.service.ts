
import { Injectable } from '@angular/core';
import {Book} from './Book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  //books: Book[];
  private api = 'https://api3.angular-buch.com'
  constructor(private http: HttpClient) {
    // this.books = [
    //   {
    //     isbn: '9783864906466',
    //     title: 'Angular',
    //     authors: ['Ferdinand Malcher', 'Johanne Hoppe', 'Danny Koppenhagen'],
    //     published: new Date(2019, 4, 30),
    //     subtitle: 'Grundlagen, fortgeschrittene Themen und best Practices - mit NativeScript und NgRx',
    //     rating: 5,
    //     thumbnails: [{title: 'Buchcover', url: 'https://ng-buch.de/buch1.jpg'}],
    //     description: 'Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular.'
    //   },
    //   {
    //     isbn: '9783864903274',
    //     title: 'React',
    //     authors: ['Oliver Zeigermann', 'Nils Hartmann'],
    //     published: new Date(2016, 6, 17),
    //     subtitle: 'Die praktische Einführung in React, React Router und Redux',
    //     rating: 3,
    //     thumbnails: [{title: 'Buchcover', url: 'https://ng-buch.de/buch2.jpg'}],
    //     description: 'React ist  bekanntes JavaScript-Framework zur Entwicklung von Benutzeroberflächen sowohl im Browser als auch auf Mobilgeräten. Entwickelt und eingesetzt von Facebook ist es mittlerweile als Open-Source-Projekt verfügbar und hat sich bereits im Einsatz bei diversen namhaften Websites, wie z. B. Airbnb und Netflix, bewährt.'
    //   }
    // ];
   }

   getAll(): Observable<Book[]> {
    return this.http.get<any[]>(`${this.api}/books`);
   }

   getSingle(isbn: string) {
    return this.http.get<any>(`${this.api}/book/${isbn}`);
   }

   remove(isbn: string): Observable<any> {
     return this.http.delete(`${this.api}/book/${isbn}`);
   }
}
