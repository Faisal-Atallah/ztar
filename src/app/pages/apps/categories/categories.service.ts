import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { CATEGORIES_API_END_POINT } from 'src/app/core/constants';
import { navigate } from 'src/app/core/utils';
import { ERROR_ROUTE_PATH_WITH_SLASH } from '../../error/error-500';
import { Category } from './categories.types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _categories: BehaviorSubject<Category[] | any> = new BehaviorSubject(
    null
  );
  private _category: BehaviorSubject<Category | any> = new BehaviorSubject(
    null
  );
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
   * Getter for categories
   */
  get categories$(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  /**
   * Getter for category
   */
  get category$(): Observable<Category> {
    return this._category.asObservable();
  }

  /**
   * Get Categories
   * @returns {Promise<Category[]>}
   */
  getCategories(): Promise<Category[]> {
    return new Promise<any>((resolve) => {
      this._angularFirestore
        .collection(CATEGORIES_API_END_POINT)
        .valueChanges({ idField: 'id' })
        .pipe(shareReplay({ bufferSize: 1, refCount: true }))
        .subscribe((categories) => {
          resolve(categories);
          this._categories.next(categories);
        });
    }).catch((error) => {
      navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }

  /**
   * Get Category By Id
   * @param {string}id
   * @returns {Promise<Category>}
   */
  getCategoryById(id: string): Promise<Category> {
    return new Promise<any>((resolve) => {
      this._angularFirestore
        .collection(CATEGORIES_API_END_POINT)
        .doc(id)
        .valueChanges({ idField: 'id' })
        .subscribe((category) => {
          resolve(category);
          this._category.next(category);
        });
    }).catch((error) => {
      navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }

  /**
   * Delete Category
   * @param {string}id
   * @returns {void}
   */
  deleteCategory(id: string): void {
    this._angularFirestore
      .doc(`${CATEGORIES_API_END_POINT}/${id}`)
      .delete()
      .catch((error) => {
        navigate(ERROR_ROUTE_PATH_WITH_SLASH, this._router);
      })
      .then(() => {
        this.getCategories();
      });
  }
}
