import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBlocoEmpresasComponent } from './list-bloco-empresas.component';

describe('ListBlocoEmpresasComponent', () => {
  let component: ListBlocoEmpresasComponent;
  let fixture: ComponentFixture<ListBlocoEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBlocoEmpresasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBlocoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
