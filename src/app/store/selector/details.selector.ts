import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';


export const selectEmployeeDetails = createSelector(
  (state:AppState)=> state.userDetails,
  userDetails => userDetails
);

