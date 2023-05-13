import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { BOOKS_API_END_POINT } from 'src/app/core/constants';
import { navigate } from 'src/app/core/utils';
import { ERROR_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/error/error-500';
import { Book } from '../books.types';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsService {
  private _book: BehaviorSubject<Book | any> = new BehaviorSubject(null);

  /**
   * Constructor
   * @param {AngularFirestore}_angularFirestore
   * @param {Router}_router
   */
  constructor(
    private _angularFirestore: AngularFirestore,
    private _router: Router
  ) {}

  /**
   * Getter for book
   */
  get book$(): Observable<Book> {
    return this._book.asObservable();
  }

  /**
   * Get Book By Id
   * @param {string}id
   * @returns {Promise<Book>}
   */
  getBookById(id: string): Promise<Book> {
    return new Promise<any>((resolve) => {
      this._angularFirestore
        .collection(BOOKS_API_END_POINT)
        .doc(id)
        .valueChanges({ idField: 'id' })
        .pipe(shareReplay({ bufferSize: 1, refCount: true }))
        .subscribe((book) => {
          resolve(book);
          this._book.next(book);
        });
    }).catch((error) => {
      navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }
}
