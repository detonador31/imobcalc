import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceFormPage } from './price-form.page';

describe('PriceFormPage', () => {
  let component: PriceFormPage;
  let fixture: ComponentFixture<PriceFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
