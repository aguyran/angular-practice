import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker2',
  templateUrl: './date-picker2.component.html',
  styleUrls: ['./date-picker2.component.scss'],
})
export class DatePicker2Component implements OnInit {
  @Input() selectedDate: Date = new Date();
  @Output() dateSelected = new EventEmitter<Date>();

  calendarDates: Date[] = [];
  selectedDateIndex: number = 0;
  selectedDateText: string = '';

  constructor() {
    this.generateCalendarDates();
  }

  ngOnInit() {
    if (this.selectedDate) {
      this.selectedDateIndex = this.calendarDates.findIndex((date) =>
        this.isSameDay(date, this.selectedDate)
      );
      this.selectedDateText = this.formatDate(this.selectedDate);
    }
  }

  private generateCalendarDates() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    this.calendarDates = [];

    // Get the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the number of days in the previous month
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = prevMonth === 11 ? currentYear - 1 : currentYear;
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();

    // Fill the calendar with dates from the previous month
    for (let i = prevMonthDays - firstDayOfWeek + 1; i <= prevMonthDays; i++) {
      this.calendarDates.push(new Date(prevYear, prevMonth, i));
    }

    // Fill the calendar with dates of the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDates.push(new Date(currentYear, currentMonth, i));
    }

    // Fill the remaining days with dates from the next month
    const remainingDays = 42 - this.calendarDates.length; // 42 days in a 6-week calendar
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDates.push(new Date(nextYear, nextMonth, i));
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  onDateClick(index: number) {
    this.selectedDateIndex = index;
    this.selectedDate = this.calendarDates[index];
    this.selectedDateText = this.formatDate(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  onTodayClick() {
    this.selectedDate = new Date();
    this.selectedDateIndex = this.calendarDates.findIndex((date) =>
      this.isSameDay(date, this.selectedDate)
    );
    this.selectedDateText = this.formatDate(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  onNextMondayClick() {
    const today = new Date();
    const daysUntilMonday = (7 - today.getDay()) % 7; // Calculate days until next Monday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    this.selectedDate = nextMonday;
    this.selectedDateIndex = this.calendarDates.findIndex((date) =>
      this.isSameDay(date, this.selectedDate)
    );
    this.selectedDateText = this.formatDate(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  onNextTuesdayClick() {
    const today = new Date();
    const daysUntilTuesday = (8 - today.getDay()) % 7; // Calculate days until next Tuesday
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilTuesday);
    this.selectedDate = nextTuesday;
    this.selectedDateIndex = this.calendarDates.findIndex((date) =>
      this.isSameDay(date, this.selectedDate)
    );
    this.selectedDateText = this.formatDate(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  onAfter1WeekClick() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    this.selectedDate = nextWeek;
    this.selectedDateIndex = this.calendarDates.findIndex((date) =>
      this.isSameDay(date, this.selectedDate)
    );
    this.selectedDateText = this.formatDate(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }
  getMonthYear(): string {
    const selectedMonth = this.calendarDates[0].toLocaleString('default', {
      month: 'long',
    });
    const selectedYear = this.calendarDates[0].getFullYear();
    return `${selectedMonth} ${selectedYear}`;
  }
}
