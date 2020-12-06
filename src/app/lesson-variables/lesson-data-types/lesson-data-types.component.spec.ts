import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDataTypesComponent } from './lesson-data-types.component';

describe('LessonDataTypesComponent', () => {
  let component: LessonDataTypesComponent;
  let fixture: ComponentFixture<LessonDataTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDataTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDataTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
