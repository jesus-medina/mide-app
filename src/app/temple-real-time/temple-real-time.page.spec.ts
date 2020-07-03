import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TempleRealTimePage } from './temple-real-time.page';

describe('TempleRealTimePage', () => {
  let component: TempleRealTimePage;
  let fixture: ComponentFixture<TempleRealTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleRealTimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TempleRealTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
