import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { AuthenticatorService } from '../services/authenticator.service';
import { Router } from '@angular/router';
import { AppState } from '../store/states/app.state';
import { Store } from '@ngrx/store';
import { setEmployeeDetails } from '../store/action/details.actions';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  values: any = [];


  id: any;
  division: any;
  name: any;
  role: any;

  authentication = new FormGroup({
    employeeEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  onSubmit() {
    this.authentication.markAllAsTouched();

    if (this.authentication.valid) {
      console.log(this.authentication.value)
      this.values.push(this.authentication.value);

      const requestData = {
        email: this.values[0].employeeEmail,
        password: this.values[0].password,
      };

      this.store.dispatch(setEmployeeDetails({ payload: requestData }));
    } else {
      this.toastService.error('Authentication Failed');
    }
  }
}



      // console.log(requestData);
      // this.authenticationService
      //   .authentication(requestData)
      //   .subscribe((res) => {
      //     if (res.id !== null) {
      //       this.id = res.id;
      //       this.name = res.employeeName;
      //       this.division = res.division;
      //       this.role = res.role;

      //       sessionStorage.setItem('isAuthenticated', 'true');
      //       this.router.navigate(['/home']);

      //       this.authenticationService.setUserData({ id: this.id, name: this.name, division: this.division, role: this.role });


      //       console.log(this.id, this.name, this.division, this.role);
      //       this.toastService.success('Authentication Successfull');
      //     } else {
      //       this.toastService.error('Authentication Failed');
      //     }
      //   });