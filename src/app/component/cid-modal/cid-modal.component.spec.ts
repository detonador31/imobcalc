import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CidModalComponent } from './cid-modal.component';

describe('CidModalComponent', () => {
  let component: CidModalComponent;
  let fixture: ComponentFixture<CidModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
