import { createAction, props } from '@ngrx/store';

export const setEmployeeDetails = createAction(
  'setEmployeeDetails',
  props<{ payload: { email: string; password: string } }>()
);

export const setEmployeeDetailsSuccess = createAction(
  'setEmployeeDetailsSuccess',
  props<{ employeeName: string; role: string; division: string; id: number }>()
);

export const setEmployeeDetailsFailure = createAction(
  'setEmployeeDetailsFailure',
  props<{ error: string }>()
);

export const resetEmployeeDetails = createAction('resetEmployeeDetails');
