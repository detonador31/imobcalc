import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionsTcmedPage } from './options-tcmed.page';

describe('OptionsTcmedPage', () => {
  let component: OptionsTcmedPage;
  let fixture: ComponentFixture<OptionsTcmedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsTcmedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsTcmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
