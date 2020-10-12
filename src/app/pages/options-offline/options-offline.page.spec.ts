import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionsOfflinePage } from './options-offline.page';

describe('OptionsOfflinePage', () => {
  let component: OptionsOfflinePage;
  let fixture: ComponentFixture<OptionsOfflinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsOfflinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsOfflinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
