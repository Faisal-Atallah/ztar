import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { EditCategoryService } from './edit-category.service';

describe('EditCategoryService', () => {
  let service: EditCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [AngularFireAuth, AngularFirestore],
    });
    service = TestBed.inject(EditCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
