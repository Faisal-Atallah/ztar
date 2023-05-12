import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CATEGORIES_API_END_POINT } from 'src/app/core/constants';
import { navigate } from 'src/app/core/utils';
import { ERROR_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/error/error-500';
import { CATEGORIES_ROUTE_PATH_WITH_SLASH } from '../categories.constants';
import { Category } from '../categories.types';

@Injectable({
  providedIn: 'root',
})
export class EditCategoryService {
  /**
   *
   * @param {AngularFirestore}_angularFirestore
   * @param {Router}_router
   */
  constructor(
    private _angularFirestore: AngularFirestore,
    private _router: Router
  ) {}

  /**
   * Edit Category
   * @param {Category}category
   * @returns {void}
   */
  editCategory(category: Category): void {
    this._angularFirestore
      .doc(`${CATEGORIES_API_END_POINT}/${category.id}`)
      .update({ name: category.name })
      .catch((error) => {
        this._router.navigate([ERROR_ROUTE_PATH_WITH_SLASH]);
        navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
      })
      .then(() => {
        navigate(CATEGORIES_ROUTE_PATH_WITH_SLASH, this._router);
      });
  }
}
