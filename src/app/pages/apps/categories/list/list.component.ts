import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../categories.types';

@Component({
  selector: 'app-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent implements AfterViewInit, OnChanges {
  @Input() categories: Category[];
  @Output() readonly deleteCategoryEvent: EventEmitter<string> =
    new EventEmitter<string>();

  @Output() readonly editCategoryEvent: EventEmitter<string> =
    new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * After View Init
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * On Changes
   * @param {SimpleChanges}changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes['categories'].currentValue;
  }

  /**
   * Delete Category
   * @param {string}id
   */
  deleteCategory(id: string): void {
    this.deleteCategoryEvent.emit(id);
  }

  /**
   * Edit Category
   * @param {string}id
   */
  editCategory(id: string): void {
    this.editCategoryEvent.emit(id);
  }
}
