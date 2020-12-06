import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonVariablesComponent } from './lesson-variables.component';

describe('LessonVariablesComponent', () => {
  let component: LessonVariablesComponent;
  let fixture: ComponentFixture<LessonVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
