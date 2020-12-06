import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonVariablesAssignmentComponent } from './lesson-variables-assignment.component';

describe('LessonVariablesAssignmentComponent', () => {
  let component: LessonVariablesAssignmentComponent;
  let fixture: ComponentFixture<LessonVariablesAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonVariablesAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonVariablesAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
