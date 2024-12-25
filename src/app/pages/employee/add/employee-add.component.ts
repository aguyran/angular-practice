import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee-list.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent {
  employeeName: string = '';
  employeeRole: string = '';
  dateRange = {
    startValue: new Date(),
    endValue: null
  };
  roles = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Manager', value: 'manager' },
  ];
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  saveEmployee(): void {
    if (this.employeeName && this.employeeRole && this.dateRange.startValue) {
      this.employeeService.addEmployee({
        id: 0,
        name: this.employeeName,
        role: this.employeeRole,
        startDate: this.dateRange.startValue,
        endDate: this.dateRange.endValue
      });
      this.router.navigate(['/employee/list']);
    }
  }
  closePage(): void {
    this.router.navigate(['/employee/list']);
  }
}