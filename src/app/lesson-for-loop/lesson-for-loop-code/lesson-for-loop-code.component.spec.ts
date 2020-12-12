import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonForLoopCodeComponent } from './lesson-for-loop-code.component';

describe('LessonForLoopCodeComponent', () => {
  let component: LessonForLoopCodeComponent;
  let fixture: ComponentFixture<LessonForLoopCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonForLoopCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonForLoopCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
