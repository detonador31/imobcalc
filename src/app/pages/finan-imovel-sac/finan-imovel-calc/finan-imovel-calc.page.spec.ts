import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanImovelCalcPage } from './finan-imovel-calc.page';

describe('FinanImovelCalcPage', () => {
  let component: FinanImovelCalcPage;
  let fixture: ComponentFixture<FinanImovelCalcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanImovelCalcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanImovelCalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
