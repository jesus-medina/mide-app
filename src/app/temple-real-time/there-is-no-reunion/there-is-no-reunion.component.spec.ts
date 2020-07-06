import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThereIsNoReunionComponent } from './there-is-no-reunion.component';

describe('ThereIsNoReunionComponent', () => {
  let component: ThereIsNoReunionComponent;
  let fixture: ComponentFixture<ThereIsNoReunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThereIsNoReunionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThereIsNoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
