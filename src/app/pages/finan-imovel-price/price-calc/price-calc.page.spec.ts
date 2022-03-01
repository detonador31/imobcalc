import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceCalcPage } from './price-calc.page';

describe('PriceCalcPage', () => {
  let component: PriceCalcPage;
  let fixture: ComponentFixture<PriceCalcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCalcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceCalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
