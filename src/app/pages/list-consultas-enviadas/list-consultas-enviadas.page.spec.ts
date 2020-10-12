import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListConsultasEnviadasPage } from './list-consultas-enviadas.page';

describe('ListConsultasEnviadasPage', () => {
  let component: ListConsultasEnviadasPage;
  let fixture: ComponentFixture<ListConsultasEnviadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsultasEnviadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListConsultasEnviadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
