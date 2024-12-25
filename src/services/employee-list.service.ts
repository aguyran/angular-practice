import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  deleted?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = new BehaviorSubject<Employee[]>([]);

  getEmployees(): Observable<Employee[]> {
    return this.employees.asObservable();
  }

  addEmployee(employee: Employee): void {
    const currentEmployees = this.employees.getValue();
    const newEmployee = {
      ...employee,
      id: currentEmployees.length + 1,
    };
    this.employees.next([...currentEmployees, newEmployee]);
  }

  updateEmployee(employee: Employee): void {
    const currentEmployees = this.employees.getValue();
    const index = currentEmployees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      currentEmployees[index] = employee;
      this.employees.next([...currentEmployees]);
    }
  }

  deleteEmployee(id: number): void {
    const currentEmployees = this.employees.getValue();
    const updatedEmployees = currentEmployees.map((employee) =>
      employee.id === id ? { ...employee, deleted: true } : employee
    );
    this.employees.next(updatedEmployees);
  }
}
