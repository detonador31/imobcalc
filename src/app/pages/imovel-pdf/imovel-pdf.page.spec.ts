import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImovelPdfPage } from './imovel-pdf.page';

describe('ImovelPdfPage', () => {
  let component: ImovelPdfPage;
  let fixture: ComponentFixture<ImovelPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImovelPdfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImovelPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
