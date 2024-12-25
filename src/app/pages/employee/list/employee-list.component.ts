import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee-list.service';
import type { Employee } from 'src/services/employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  // Sample data (replace with your actual data)
  employeeData: Employee[] = [];
  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employeeData = employees.filter((employee) => !employee.deleted);

      this.currentEmployees = this.employeeData.filter(
        (employee) => !employee.endDate
      );
      this.previousEmployees = this.employeeData.filter(
        (employee) => employee.endDate
      );
    });
  }

  // Handle date change

  navigateToAdd() {
    this.router.navigate(['employee/add']);
  }
  handleDelete(id: number) {
    this.employeeService.deleteEmployee(id);
  }
}
