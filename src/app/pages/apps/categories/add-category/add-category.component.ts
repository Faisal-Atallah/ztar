import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { navigate } from 'src/app/core/utils';
import { CATEGORIES_ROUTE_PATH_WITH_SLASH } from '../categories.constants';
import { AddCategoryService } from './add-category.service';
import { AddCategoryForm } from './add-category.types';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Category } from '../categories.types';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('addCategoryNgForm') addCategoryNgForm: NgForm;
  books: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addCategoryForm: FormGroup<AddCategoryForm>;

  /**
   * Constructor
   * @param {FormBuilder}_formBuilder
   * @param {AddCategoryService}_addCategoryService
   * @param {Router}_router
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _addCategoryService: AddCategoryService,
    private _router: Router
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._createAddCategoryForm();
  }

  /**
   * Create Add Category Form
   * @private
   * @returns {void}
   */
  private _createAddCategoryForm(): void {
    this.addCategoryForm = this._formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
      books: [],
    });
  }

  /**
   * Add Category
   * @returns {void}
   */
  addCategory(): void {
    if (this.addCategoryForm.invalid) {
      return;
    }

    const category: Category = {
      id: '',
      name: this.addCategoryForm.get('name')?.value as string,
      books: this.books,
    };

    this._addCategoryService.addCategory(category).then(() => {
      navigate(CATEGORIES_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }

  /**
   * Add Book
   * @param {MatChipInputEvent}event
   * @returns {void}
   */
  addBook(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.books.push(value);
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
    const index = this.books.indexOf(book);
    if (index >= 0) {
      this.books[index] = value;
    }
  }

  /**
   * Remove Book
   * @param {string}book
   * @returns {void}
   */
  removeBook(book: string): void {
    const index = this.books.indexOf(book);

    if (index >= 0) {
      this.books.splice(index, 1);
    }
  }
}
