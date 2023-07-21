import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminlogPage } from './adminlog.page';

describe('loginPage', () => {
  let component: AdminlogPage;
  let fixture: ComponentFixture<AdminlogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminlogPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});