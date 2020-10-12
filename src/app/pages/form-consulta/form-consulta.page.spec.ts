import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormConsultaPage } from './form-consulta.page';

describe('FormConsultaPage', () => {
  let component: FormConsultaPage;
  let fixture: ComponentFixture<FormConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
