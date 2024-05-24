import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectEmployeeDetails } from '../store/selector/details.selector';
import { RequestHandlerService } from '../services/request-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subscription: Subscription = new Subscription();

  id: any;
  division: any;
  employeeName: any;
  role: any;

  employeeList: any;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private requestHandle: RequestHandlerService
  ) {}

  employeeDetailsSubscribe!: Subscription;
  ngOnInit(): void {
    this.employeeDetailsSubscribe = this.store
      .select(selectEmployeeDetails)
      .subscribe((userDetails) => {
        this.id = userDetails.id;
        this.employeeName = userDetails.employeeName;
        this.role = userDetails.role;
        this.division = userDetails.division;
      });

    if (this.role === 'manager') {
      this.requestHandle.managerView(this.division).subscribe((res) => {
        this.employeeList = res;
        console.log(this.employeeList);
      });
    }
  }

  onClick() {
    if (this.role && this.id && this.division) {
      this.router.navigate(['/view', this.division, this.role, this.id]);
    } else {
      console.error('role or id is not defined');
    }
  }
}
