import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonVariablesCodeComponent } from './lesson-variables-code.component';

describe('LessonVariablesCodeComponent', () => {
  let component: LessonVariablesCodeComponent;
  let fixture: ComponentFixture<LessonVariablesCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonVariablesCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonVariablesCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
