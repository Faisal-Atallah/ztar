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

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('addCategoryNgForm') addCategoryNgForm: NgForm;

  addCategoryForm: FormGroup<AddCategoryForm>;

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
   * Add Category
   * @returns {void}
   */
  addCategory(): void {
    if (this.addCategoryForm.invalid) {
      return;
    }

    this.addCategoryForm.disable();

    const name: string = this.addCategoryForm.get('name')?.value as string;

    this._addCategoryService.addCategory(name).then(() => {
      navigate(CATEGORIES_ROUTE_PATH_WITH_SLASH, this._router);
    });
  }

  /**
   * Create Add Category Form
   * @private
   * @returns {void}
   */
  private _createAddCategoryForm(): void {
    this.addCategoryForm = this._formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
    });
  }
}
