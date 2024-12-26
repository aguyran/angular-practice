import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { fadeAnimation } from 'src/app/animations';
import { EmployeeService } from 'src/services/employee-list.service';
export type HeaderMeta = {
  type: string;
  name: string;
  icon: string;
};
export type HeaderAction = HeaderMeta & {
  callback: (data: any, employeeService: EmployeeService) => void;
};
export type HeaderCall = HeaderMeta & {
  callback: () => void;
};

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [fadeAnimation],
})
export class MainLayoutComponent {
  pageTitle = '';
  id: number = 0;
  headerActions: HeaderCall[] = [];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          this.id = Number(child?.snapshot.paramMap.get('id'));
          return child?.snapshot.data;
        })
      )
      .subscribe((data) => {
        if (data) {
          const { title, headerActions } = data;
          this.headerActions = headerActions || [];
          if (headerActions) {
            this.headerActions = headerActions.map((action: HeaderAction) => ({
              ...action,
              callback: () => action.callback(this.id, this.employeeService)
            }));
          }
          this.pageTitle = title;
        }
      });
  }

  onDeleteSuccess() {
    this.router.navigate(['/employee/list']);
  }
}