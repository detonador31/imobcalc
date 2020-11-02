import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BancoTaxasFormComponent } from './banco-taxas-form.component';

describe('BancoTaxasFormComponent', () => {
  let component: BancoTaxasFormComponent;
  let fixture: ComponentFixture<BancoTaxasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoTaxasFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BancoTaxasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
