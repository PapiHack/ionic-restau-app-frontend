import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatComponent } from './plat.component';

describe('PlatComponent', () => {
  let component: PlatComponent;
  let fixture: ComponentFixture<PlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
