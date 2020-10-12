import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListFuncionariosPage } from './list-funcionarios.page';

describe('ListFuncionariosPage', () => {
  let component: ListFuncionariosPage;
  let fixture: ComponentFixture<ListFuncionariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFuncionariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListFuncionariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
