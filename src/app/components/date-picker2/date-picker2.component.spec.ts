import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePicker2Component } from './date-picker2.component';

describe('DatePicker2Component', () => {
  let component: DatePicker2Component;
  let fixture: ComponentFixture<DatePicker2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePicker2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePicker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
