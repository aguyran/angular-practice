import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

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
  private dbName = 'employeeDB';
  private storeName = 'employees';

  constructor() {
    this.initializeDb();
  }

  private async initializeDb(): Promise<void> {
    const db = await this.openDb();
    const transaction = db.transaction(this.storeName, 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        this.employees.next(request.result || []);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  private openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  private async saveToDb(employees: Employee[]): Promise<void> {
    const db = await this.openDb();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    store.clear();
    employees.forEach((employee) => store.add(employee));
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees.asObservable();
  }

  async addEmployee(employee: Employee): Promise<void> {
    const currentEmployees = this.employees.getValue();
    const newEmployee = {
      ...employee,
      id: currentEmployees.length + 1,
    };
    const updatedEmployees = [...currentEmployees, newEmployee];
    await this.saveToDb(updatedEmployees);
    this.employees.next(updatedEmployees);
  }

  async updateEmployee(employee: Employee): Promise<void> {
    const currentEmployees = this.employees.getValue();
    const index = currentEmployees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[index] = employee;
      await this.saveToDb(updatedEmployees);
      this.employees.next(updatedEmployees);
    }
  }

  async deleteEmployee(id: number): Promise<void> {
    const currentEmployees = this.employees.getValue();
    const updatedEmployees = currentEmployees.map((employee) =>
      employee.id === id ? { ...employee, deleted: true } : employee
    );
    await this.saveToDb(updatedEmployees);
    this.employees.next(updatedEmployees);
  }
  getEmployeeById(id: number): Employee | undefined {
    const employees = this.employees.getValue();
    console.log(this.employees);
    return employees.find((employee) => employee.id === id);
  }
}
