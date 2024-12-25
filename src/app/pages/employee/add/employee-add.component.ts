import { Component, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/services/employee-list.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent {
  employeeForm = signal({
    name: '',
    role: '',
    dateRange: {
      startValue: new Date(),
      endValue: null as Date | null,
    },
  });

  isFormValid = computed(() => {
    const form = this.employeeForm();
    return form.name && form.role && form.dateRange.startValue;
  });

  updateName(name: string) {
    this.employeeForm.update(form => ({ ...form, name }));
  }

  updateRole(role: string) {
    this.employeeForm.update(form => ({ ...form, role }));
  }

  updateDateRange(dateRange: { startValue: Date, endValue: Date | null }) {
    this.employeeForm.update(form => ({ ...form, dateRange }));
  }

  roles = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Manager', value: 'manager' },
  ];
  id: number;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.employeeService.getEmployees().subscribe((employees) => {
        const employee = employees.find((emp) => emp.id === this.id);

        if (employee) {
          this.employeeForm.update((form) => ({
            ...form,
            name: employee.name,
            role: employee.role,
            dateRange: {
              startValue: employee.startDate || new Date(),
              endValue: employee.endDate,
            },
          }));
        } else {
          this.router.navigate(['/employee/list']);
        }
      });
    }
  }

  saveEmployee(): void {
    const form = this.employeeForm();
    if (form.name && form.role && form.dateRange.startValue) {
      if (this.id) {
        this.employeeService.updateEmployee({
          id: this.id,
          name: form.name,
          role: form.role,
          startDate: form.dateRange.startValue,
          endDate: form.dateRange.endValue,
        });
      } else {
        this.employeeService.addEmployee({
          id: 0,
          name: form.name,
          role: form.role,
          startDate: form.dateRange.startValue,
          endDate: form.dateRange.endValue,
        });
      }
      this.router.navigate(['/employee/list']);
    }
  }
  closePage(): void {
    this.router.navigate(['/employee/list']);
  }
}
