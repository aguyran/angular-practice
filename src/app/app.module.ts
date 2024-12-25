import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Ant Design Modules
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

// Components
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmployeeListComponent } from './pages/employee/list/employee-list.component';

import { AppRoutingModule } from './app-routing.module';

import { EmployeeAddComponent } from './pages/employee/add/employee-add.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { EmployeeCardListComponent } from './components/employee-card-list/employee-card-list.component';
// Services
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { CustomDatePickerComponent } from './components/date-picker/date-picker.component';
// import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
// import { DatePicker2Component } from './components/date-picker2/date-picker2.component';

registerLocaleData(en);
const icons = [PlusOutline];
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EmployeeAddComponent,
    EmployeeListComponent,
    EmployeeCardListComponent,
    CustomDatePickerComponent,
    // DatePicker2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDividerModule,
    NzAvatarModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule.forRoot(icons),
    NzLayoutModule,
    NzMenuModule,

    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
