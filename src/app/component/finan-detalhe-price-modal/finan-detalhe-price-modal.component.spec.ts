import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanDetalhePriceModalComponent } from './finan-detalhe-price-modal.component';

describe('FinanDetalhePriceModalComponent', () => {
  let component: FinanDetalhePriceModalComponent;
  let fixture: ComponentFixture<FinanDetalhePriceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanDetalhePriceModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanDetalhePriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
