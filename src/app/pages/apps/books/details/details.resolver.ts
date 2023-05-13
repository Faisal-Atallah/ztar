import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Book } from '../books.types';
import { BookDetailsService } from './details.service';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsResolver implements Resolve<Book> {
  /**
   * Constructor
   * @param {BookDetailsService}_bookDetailsService
   */
  constructor(private _bookDetailsService: BookDetailsService) {}

  /**
   * Resolver
   * @param {ActivatedRouteSnapshot}route
   * @param {RouterStateSnapshot}state
   * @returns {Promise<Book>}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Book> {
    const id: string = route.paramMap.get('id') as string;

    return this._bookDetailsService.getBookById(id);
  }
}
