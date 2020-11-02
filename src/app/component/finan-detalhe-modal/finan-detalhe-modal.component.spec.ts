import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanDetalheModalComponent } from './finan-detalhe-modal.component';

describe('FinanDetalheModalComponent', () => {
  let component: FinanDetalheModalComponent;
  let fixture: ComponentFixture<FinanDetalheModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanDetalheModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanDetalheModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
