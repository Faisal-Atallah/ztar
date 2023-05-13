import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksService } from '../../apps/books';
import { CategoriesService, Category } from '../../apps/categories';

@Component({
  selector: 'app-landing-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  books$: Observable<Book[]>;
  categories$: Observable<Category[]>;

  /**
   * Constructor
   * @param {BooksService}_booksService
   * @param {CategoriesService}_categoriesService
   */
  constructor(
    private _booksService: BooksService,
    private _categoriesService: CategoriesService
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getBooks();
    this._getCategories();
  }

  /**
   * Get Books
   * @returns {void}
   */
  private _getBooks(): void {
    this.books$ = this._booksService.books$;
  }

  /**
   * Get Categories
   */
  private _getCategories(): void {
    this.categories$ = this._categoriesService.categories$;
  }
}
