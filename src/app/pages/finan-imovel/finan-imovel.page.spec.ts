import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanImovelPage } from './finan-imovel.page';

describe('FinanImovelPage', () => {
  let component: FinanImovelPage;
  let fixture: ComponentFixture<FinanImovelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanImovelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanImovelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
