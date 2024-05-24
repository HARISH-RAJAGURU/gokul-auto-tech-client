import { createReducer, on } from '@ngrx/store';
import {
  resetEmployeeDetails,
  setEmployeeDetails,
  setEmployeeDetailsFailure,
  setEmployeeDetailsSuccess,
} from '../action/details.actions';
import { userDetails } from '../states/details.state';

const _EmployeeDetailsReducer = createReducer(
  userDetails,

  on(setEmployeeDetails, (state, details) => {
    return {
      ...state,
      ...details,
    };
  }),
  on(setEmployeeDetailsSuccess, (state, employeeDetails) => {
    return {
      ...state,
      ...employeeDetails,
    };
  }),
  on(setEmployeeDetailsFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(resetEmployeeDetails, () => userDetails)
);

export function employeeDetailsReducer(state: any, action: any) {
  return _EmployeeDetailsReducer(state, action);
}
