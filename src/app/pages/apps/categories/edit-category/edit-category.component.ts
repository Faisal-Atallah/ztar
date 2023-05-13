import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { CategoriesService } from '../categories.service';
import { Category } from '../categories.types';
import { EditCategoryService } from './edit-category.service';
import { EditCategoryForm } from './edit-category.types';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('editCategoryNgForm') editCategoryNgForm: NgForm;

  category: Category;
  editCategoryForm: FormGroup<EditCategoryForm>;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   * @param {FormBuilder}_formBuilder
   * @param {EditCategoryService}_editCategoryService
   * @param {ChangeDetectorRef}_changeDetectorRef
   * @param {CategoriesService}_categoriesService
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _editCategoryService: EditCategoryService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _categoriesService: CategoriesService
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._initializeForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Initialize Form
   * @private
   * @returns {void}
   */
  private _initializeForm(): void {
    this._categoriesService.category$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((category) => {
        this.category = category;
        this._createEditCategoryForm(category);
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * Create Edit Category Form
   * @private
   * @returns {void}
   */
  private _createEditCategoryForm(category: Category): void {
    this.editCategoryForm = this._formBuilder.nonNullable.group({
      id: [category.id],
      name: [category.name, [Validators.required]],
      books: []
    });
  }

  /**
   * Edit Category
   * @returns {void}
   */
  editCategory(): void {
    const category: Category = {
      id: this.editCategoryForm.get('id')?.value as string,
      name: this.editCategoryForm.get('name')?.value as string,
      books: this.category.books,
    };
    this._editCategoryService.editCategory(category);
  }

  /**
   * Add Book
   * @param {MatChipInputEvent}event
   * @returns {void}
   */
  addBook(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.category.books.push(value);
    }
    event.chipInput!.clear();
  }

  /**
   * Edit Book
   * @param {string}book
   * @param {MatChipEditedEvent}event
   * @returns {void}
   */
  editBook(book: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if (!value) {
      this.removeBook(book);
      return;
    }
    const index = this.category.books.indexOf(book);
    if (index >= 0) {
      this.category.books[index] = value;
    }
  }

  /**
   * Remove Book
   * @param {string}book
   * @returns {void}
   */
  removeBook(book: string): void {
    const index = this.category.books.indexOf(book);

    if (index >= 0) {
      this.category.books.splice(index, 1);
    }
  }
}
