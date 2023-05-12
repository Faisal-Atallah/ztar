import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { BOOKS_API_END_POINT } from 'src/app/core/constants';
import { navigate } from 'src/app/core/utils';
import { ERROR_ROUTE_PATH_WITH_SLASH } from '../../error/error-500';
import { Book } from './books.types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _books: BehaviorSubject<Book[] | any> = new BehaviorSubject(null);

  /**
   * Constructor
   * @param {AngularFirestore}_angularFirestorep
   * @param {Router}_router
   */
  constructor(
    private _angularFirestore: AngularFirestore,
    private _router: Router
  ) {}

  /**
   * Getter for books
   */
  get books$(): Observable<Book[]> {
    return this._books.asObservable();
  }

  /**
   * Get Books
   * @returns {Promise<Book[]>}
   */
  getBooks(): Promise<Book[]> {
    return new Promise<any>((resolve) => {
      this._angularFirestore
        .collection(BOOKS_API_END_POINT)
        .valueChanges({ idField: 'id' })
        .pipe(shareReplay({ bufferSize: 1, refCount: true }))
        .subscribe((categories) => {
          resolve(categories);
          this._books.next(categories);
        });
    }).catch((error) => {
      navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }

  /**
   * Get Books By Category
   * @param {string}id
   * @returns {Promise<Book>}
   */
  getBooksByCategory(category: string): Promise<Book> {
    return new Promise<any>((resolve) => {
      this._angularFirestore
        .collection(BOOKS_API_END_POINT, (ref) =>
          ref.where('category', '==', category)
        )
        .valueChanges()
        .pipe(shareReplay({ bufferSize: 1, refCount: true }))
        .subscribe((books) => {
          resolve(books);
          this._books.next(books);
        });
    }).catch((error) => {
      navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }
}
