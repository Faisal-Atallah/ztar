import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/auth';
import { ContentModule } from 'src/app/partials/content';
import { HeaderModule } from 'src/app/partials/header';
import { NavModule } from 'src/app/partials/nav';
import { MaterialModule } from 'src/app/shared/modules';
import { environment } from 'src/environments/environment';
import { VerticalComponent } from './vertical.component';

describe('VerticalComponent', () => {
  let component: VerticalComponent;
  let fixture: ComponentFixture<VerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        NavModule,
        HeaderModule,
        ContentModule,
        MaterialModule,
      ],
      declarations: [VerticalComponent],
      providers: [AuthService, AngularFireAuth, AngularFirestore],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
