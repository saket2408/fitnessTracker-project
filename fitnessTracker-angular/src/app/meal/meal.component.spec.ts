import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealComponent } from './meal.component';
import { FormsModule } from '@angular/forms';

describe('MealComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
