import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StayAtHomePage } from './stay-at-home.page';

describe('StayAtHomePage', () => {
  let component: StayAtHomePage;
  let fixture: ComponentFixture<StayAtHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayAtHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StayAtHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
