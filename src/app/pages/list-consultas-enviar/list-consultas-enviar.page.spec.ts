import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListConsultasEnviarPage } from './list-consultas-enviar.page';

describe('ListConsultasEnviarPage', () => {
  let component: ListConsultasEnviarPage;
  let fixture: ComponentFixture<ListConsultasEnviarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsultasEnviarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListConsultasEnviarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
