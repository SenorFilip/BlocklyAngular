import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonConditionsComponent } from './lesson-conditions.component';

describe('LessonConditionsComponent', () => {
  let component: LessonConditionsComponent;
  let fixture: ComponentFixture<LessonConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
