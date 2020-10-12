import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBlocoItemPage } from './list-bloco-item.page';

describe('ListBlocoItemPage', () => {
  let component: ListBlocoItemPage;
  let fixture: ComponentFixture<ListBlocoItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBlocoItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBlocoItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
