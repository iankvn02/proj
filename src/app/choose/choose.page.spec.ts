import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoosePage } from './choose.page';

describe('HomePage', () => {
  let component: ChoosePage;
  let fixture: ComponentFixture<ChoosePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoosePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
