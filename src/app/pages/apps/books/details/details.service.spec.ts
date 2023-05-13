import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { BookDetailsService } from './details.service';

describe('BooksDetailsService', () => {
  let service: BookDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [AngularFireAuth, AngularFirestore],
    });
    service = TestBed.inject(BookDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
