import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { CATEGORIES_API_END_POINT } from 'src/app/core/constants';
import { navigate } from 'src/app/core/utils';
import { ERROR_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/error/error-500';

@Injectable({
  providedIn: 'root',
})
export class AddCategoryService {
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
   * Add Category
   * @param {string}name
   * @returns {Promise<any>}
   */
  addCategory(name: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this._angularFirestore
        .collection(CATEGORIES_API_END_POINT)
        .doc()
        .set({ name: name });
      resolve([]);
    }).catch((error) => {
      navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }
}
