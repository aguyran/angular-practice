import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/services/employee-list.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-employee-card-list',
  templateUrl: './employee-card-list.component.html',
  styleUrls: ['./employee-card-list.component.scss'],
  animations: [
    trigger('swipeState', [
      state('default', style({ transform: 'translateX(0)' })),
      state('swiped', style({ transform: 'translateX(-80px)' })),
      transition('default => swiped', animate('200ms ease-out')),
      transition('swiped => default', animate('200ms ease-in')),
    ]),
  ],
})
export class EmployeeCardListComponent implements OnInit {
  @Input() employees: Employee[] = [];
  @Input() title: string | null = '';
  @Input() hideButton?: boolean = false;
  @Output() deleteEmployee = new EventEmitter<number>();

  swipeStates: { [key: number]: string } = {};
  startX: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.employees.forEach((emp) => (this.swipeStates[emp.id] = 'default'));
  }

  onTouchStart(event: TouchEvent, employeeId: number) {
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent, employeeId: number) {
    const currentX = event.touches[0].clientX;
    const diff = this.startX - currentX;

    if (diff > 40) {
      this.swipeStates[employeeId] = 'swiped';
    } else if (diff < -40) {
      this.swipeStates[employeeId] = 'default';
    }
  }

  onDelete(employeeId: number) {
    this.deleteEmployee.emit(employeeId);
    this.swipeStates[employeeId] = 'default';
  }
}
