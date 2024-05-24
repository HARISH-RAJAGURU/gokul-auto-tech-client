import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectEmployeeDetails } from '../store/selector/details.selector';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestHandlerService } from '../services/request-handler.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-submission-forms',
  templateUrl: './submission-forms.component.html',
  styleUrls: ['./submission-forms.component.css'],
})
export class SubmissionFormsComponent implements OnInit {
  id: any;
  division: any;
  role: any;
  name: any;

  form: FormGroup | undefined;
  dynamicFields: any[] = [];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private requestHandler: RequestHandlerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.store.select(selectEmployeeDetails).subscribe((userDetails) => {
      this.id = userDetails.id;
      this.division = userDetails.division;
      this.name = userDetails.employeeName;
      this.role = userDetails.role;
      this.dynamicFields = this.getDynamicFields(
        this.division,
        this.role,
      );
      this.createForm();
    });
  }

  createForm(): void {
    const group: any = {};
    this.dynamicFields.forEach((field) => {
      group[field.name] = field.required
        ? new FormControl(field.value || '', Validators.required)
        : new FormControl(field.value || '');
    });
    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form && this.division) {
      const formData = this.form.value;
      console.log(formData);

      const requestData = {
        payload: formData,
        division: this.division,
        role: this.role,
        empId: this.id,
      };
      console.log(requestData);

      this.requestHandler.postData(requestData).subscribe(
        (response) => {
          if (response) {
            this.toastService.success('Entry Added Successfully');
          } else {
            this.toastService.error('Entry Not Added');
          }
        },
        (error) => {
          this.toastService.error(error);
        }
      );
    }
  }

  getDynamicFields(division: string, role: string): any[] {
    let fields: any[] = [];

    if (division === 'Alloy-Store' && role === 'employee') {
      fields = [
        { name: 'input', value: '', required: true },
        { name: 'field1', value: '', required: true },
        { name: 'field2', value: '', required: true },
        { name: 'field3', value: '', required: true },
        { name: 'field4', value: '', required: true },
        { name: 'output', value: '', required: true },
      ];
    }else if (division === 'Melting' && role === 'employee') {
      fields = [
        { name: 'input', value: '', required: true },
        { name: 'field1', value: '', required: true },
        { name: 'field2', value: '', required: true },
        { name: 'field3', value: '', required: true },
        { name: 'field4', value: '', required: true },
        { name: 'output', value: '', required: true },
      ];
    }
    else if (division === 'HPDC' && role === 'employee') {
      fields = [
        { name: 'input', value: '', required: true },
        { name: 'field1', value: '', required: true },
        { name: 'field2', value: '', required: true },
        { name: 'field3', value: '', required: true },
        { name: 'field4', value: '', required: true },
        { name: 'output', value: '', required: true },
      ];
    }  
    else if (division === 'GDC' && role === 'employee') {
      fields = [
        { name: 'input', value: '', required: true },
        { name: 'field1', value: '', required: true },
        { name: 'field2', value: '', required: true },
        { name: 'field3', value: '', required: true },
        { name: 'field4', value: '', required: true },
        { name: 'output', value: '', required: true },
      ];
    }  
    else {
      fields = [{ name: 'defaultField', value: '', required: true }];
    }

    return fields;
  }
}
