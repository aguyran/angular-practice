import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmployeeListComponent } from './pages/employee/list/employee-list.component';
import { EmployeeAddComponent } from './pages/employee/add/employee-add.component';
// import { DatePicker2Component } from './components/date-picker2/date-picker2.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
      // { path: 'test', component: DatePicker2Component },
      {
        path: 'employee',

        data: { title: 'Employee List' },
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: EmployeeListComponent,
            data: { title: 'Employee List' },
          },
          {
            path: 'add',
            component: EmployeeAddComponent,
            data: { title: 'Add Employee Details' },
          },
          {
            path: 'edit/:id',
            component: EmployeeAddComponent,
            data: { title: 'Edit Employee Details' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
