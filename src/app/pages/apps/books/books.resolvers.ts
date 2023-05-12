import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { BooksService } from './books.service';
import { Book } from './books.types';

@Injectable({
  providedIn: 'root',
})
export class BooksResolver implements Resolve<Book[]> {
  /**
   * Constructor
   * @param {BooksService}_booksService
   */
  constructor(private _booksService: BooksService) {}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot}route
   * @param {RouterStateSnapshot}state
   * @returns {Promise<any>}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Book[]> {
    return this._booksService.getBooks();
  }
}
