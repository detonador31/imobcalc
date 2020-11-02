import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BancoTaxasPage } from './banco-taxas.page';

describe('BancoTaxasPage', () => {
  let component: BancoTaxasPage;
  let fixture: ComponentFixture<BancoTaxasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoTaxasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BancoTaxasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
