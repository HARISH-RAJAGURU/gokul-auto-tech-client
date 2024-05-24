import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  setEmployeeDetails,
  setEmployeeDetailsSuccess,
  setEmployeeDetailsFailure,
} from '../action/details.actions';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Injectable()
export class LoginEffects {
  loadEmployeeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setEmployeeDetails),
      mergeMap((action) =>
        this.authService.authentication(action.payload).pipe(
          map((employeeDetails) => {
            console.log(employeeDetails)
            if (
              employeeDetails.employeeName &&
              employeeDetails.role &&
              employeeDetails.id &&
              employeeDetails.division
            ) {
              sessionStorage.setItem('isAuthenticated', 'true');
              this.router.navigate(['/home']);
              this.toastService.success('Authenticated Successfully');

              return setEmployeeDetailsSuccess(employeeDetails);
            } else {
              sessionStorage.setItem('isAuthenticated', 'false');
              this.toastService.error('Authentication Failed');
              return setEmployeeDetailsFailure({
                error: 'API response is empty',
              });
            }
          }),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticatorService,
    private toastService: ToastService,
    private router: Router
  ) {}
}
