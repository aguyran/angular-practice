import {
  Component,
  ViewChild,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NzDatePickerComponent,
  NzDatePickerModule,
} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'custom-date-picker-start-end',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerComponent),
      multi: true
    }
  ]
})
export class CustomDatePickerComponent implements ControlValueAccessor {
  @Input() startValue: Date | null = null;
  @Input() endValue: Date | null = null;
  @Output() startValueChange = new EventEmitter<Date>();
  @Output() endValueChange = new EventEmitter<Date>();
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.startValue = value.startValue;
      this.endValue = value.endValue;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
   
  }

  handleEndOpenChange(open: boolean): void {
   
  }

  onStartValueChange(value: Date): void {
    this.startValue = value;
    this.startValueChange.emit(value);
    this.emitValue();
  }

  onEndValueChange(value: Date): void {
    this.endValue = value;
    this.endValueChange.emit(value);
    this.emitValue();
  }

  private emitValue(): void {
    this.onChange({ startValue: this.startValue, endValue: this.endValue });
  }
}