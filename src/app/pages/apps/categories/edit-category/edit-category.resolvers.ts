import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Category } from '../categories.types';

import { EditCategoryService } from './edit-category.service';

@Injectable({
  providedIn: 'root',
})
export class EditCategoryResolver implements Resolve<Category> {
  /**
   * Constructor
   */
  constructor(private _categoriesService: CategoriesService) {}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot}route
   * @param {RouterStateSnapshot}state
   * @returns {Promise<Category>}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Category> {
    const id: string = route.paramMap.get('id') as string;

    return this._categoriesService.getCategoryById(id);
  }
}
