import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { Book } from '../books.types';
import { BookDetailsService } from './details.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: Book;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   * @param {BookDetailsService}_bookDetailsService
   * @param {ChangeDetectorRef}_changeDetectorRef
   */
  constructor(
    private _bookDetailsService: BookDetailsService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getBookDetails();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Get Book Details
   * @private
   * @returns {void}
   */
  private _getBookDetails(): void {
    this._bookDetailsService.book$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((book) => {
        this.book = book;
        this._changeDetectorRef.markForCheck();
      });
  }
}
