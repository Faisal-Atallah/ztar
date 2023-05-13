import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CategoriesService } from './categories.service';
import { Category } from './categories.types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Category[]> {
  /**
   * Constructor
   * @param {CategoriesService}_categoriesService
   */
  constructor(private _categoriesService: CategoriesService) {}

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
  ): Promise<Category[]> {
    return this._categoriesService.getCategories();
  }
}
