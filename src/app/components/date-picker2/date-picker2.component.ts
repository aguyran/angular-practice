import { Component, EventEmitter, Output } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-custom-range-calendar',
  templateUrl: './date-picker2.component.html',
  styleUrls: ['./date-picker2.component.scss'],
})
export class DatePicker2Component {
  @Output() rangeSelected = new EventEmitter<{
    start: Date | null;
    end: Date | null;
  }>();

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  rangeStart: Date | null = null;
  rangeEnd: Date | null = null;

  dayClicked(day: any): void {
    if (!this.rangeStart) {
      this.rangeStart = day.date;
    } else if (!this.rangeEnd) {
      this.rangeEnd = day.date;
      if (this.rangeEnd == null) return;
      if (this.rangeStart > this.rangeEnd) {
        const temp = this.rangeStart;
        this.rangeStart = this.rangeEnd;
        this.rangeEnd = temp;
      }
      this.rangeSelected.emit({
        start: this.rangeStart,
        end: this.rangeEnd,
      });
    } else {
      this.rangeStart = day.date;
      this.rangeEnd = null;
    }
  }

  isRangeStart(date: Date): boolean {
    return (this.rangeStart && isSameDay(date, this.rangeStart)) || false;
  }

  isRangeEnd(date: Date): boolean {
    return (this.rangeEnd && isSameDay(date, this.rangeEnd)) || false;
  }

  isInRange(date: Date): boolean {
    return (
      (this.rangeStart &&
        this.rangeEnd &&
        date >= this.rangeStart &&
        date <= this.rangeEnd) ||
      false
    );
  }
}
