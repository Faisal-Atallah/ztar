import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { trackByFn, unsubscribe } from 'src/app/core/utils';
import { CategoriesService, Category } from '../../categories';
import { BooksService } from '../books.service';
import { Book } from '../books.types';

@Component({
  selector: 'app-books-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent implements OnInit, OnDestroy {
  categories: Category[];
  filteredBooks: Book[];
  requestCompleted: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   * @param {CategoriesService}_categoriesService
   * @param {ChangeDetectorRef}_changeDetectorRef
   * @param {BooksService}_booksService
   */
  constructor(
    private _categoriesService: CategoriesService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _booksService: BooksService
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getCategories();
    this._getAllBooks();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Get All Books
   * @returns {void}
   */
  private _getAllBooks(): void {
    this._booksService.books$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((books: Book[]) => {
        this.filteredBooks = books;
        console.log(books);
        this._changeDetectorRef.markForCheck();
      })
      .add(() => {
        this.requestCompleted = true;
      });
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

  /**
   * Filter by category
   * @param {MatSelectChange}change
   * @returns {void}
   */
  filterByCategory(change: MatSelectChange): void {
    if (change.value === 'all') {
      this._booksService.getBooks();
    } else {
      this._booksService.getBooksByCategory(change.value);
    }
  }

  /**
   * Track ByFn
   * @param {number}index
   * @param {string}id
   * @returns {string}
   */
  trackByFn(index: number, id: string): string {
    return trackByFn(index, id);
  }
}
