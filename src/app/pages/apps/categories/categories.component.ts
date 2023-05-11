import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { CategoriesService } from './categories.service';
import { Category } from './categories.types';
import {
  EDIT_CATEGORY_ROUTE_PATH,
  EDIT_CATEGORY_ROUTE_PATH_WITH_SLASH,
} from './edit-category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  requestCompleted: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   * @param {CategoriesService}_categoriesService
   * @param {ChangeDetectorRef}_changeDetectorRef
   * @param {Router}_router
   */
  constructor(
    private _categoriesService: CategoriesService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getCategories();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Delete Category
   * @param {string}id
   * @returns {void}
   */
  deleteCategory(id: string): void {
    this._categoriesService.deleteCategory(id);
  }

  /**
   * Edit Category
   * @param {string}id
   * @returns {void}
   */
  editCategory(id: string): void {
    this._router.navigate([`${EDIT_CATEGORY_ROUTE_PATH_WITH_SLASH}`, id]);
  }

  /**
   * Get Categories
   * @private
   * @returns {void}
   */
  private _getCategories(): void {
    this._categoriesService.categories$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this._changeDetectorRef.markForCheck();
      })
      .add(() => {
        this.requestCompleted = true;
      });
  }
}
