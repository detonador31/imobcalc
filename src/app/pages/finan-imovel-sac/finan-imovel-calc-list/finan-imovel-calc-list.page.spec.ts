import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanImovelCalcListPage } from './finan-imovel-calc-list.page';

describe('FinanImovelCalcListPage', () => {
  let component: FinanImovelCalcListPage;
  let fixture: ComponentFixture<FinanImovelCalcListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanImovelCalcListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanImovelCalcListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
