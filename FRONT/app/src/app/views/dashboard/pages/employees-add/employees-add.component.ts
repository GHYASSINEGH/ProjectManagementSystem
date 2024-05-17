import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {


  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, this.isValidFullName.bind(this)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, this.isValidPhoneNumber.bind(this)])
  });

  success: string = '';
  employees: any[] = [];
  error: string = '';
  loading: boolean = false;
  selectedCountryCode: string = '+1';

   countries: { name: string, code: string, flag: string }[] = [];


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  SaveEmployee() {
    this.error = '';
    this.loading = true;

    const employee = this.form.value;

    const emailExists = this.employees.some(e => e.user.email === employee.email);

    if (emailExists) {
      this.error = 'Email already exists';
      this.loading = false;
    } else {
      this.api.createEmployeeAccount(employee).toPromise().then((res: any) => {
        console.log(res);
        this.success = res.message;
        this.loading = false;
        this.router.navigateByUrl('/dashboard/employees');
      }).catch((err: HttpErrorResponse) => {
        if (err.status === 500) {
          this.error = 'Internal Server Error';
        }
        this.loading = false;
      });
    }
  }

  getEmployeeList() {
    this.api.getEmployeesList().toPromise().then((res: any) => {
      console.log(res);
      this.employees = res;
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

  isValidFullName(control: FormControl): { [s: string]: boolean } | null {
    const fullNameRegex = /^[a-zA-Z\s]*$/;
    if (!fullNameRegex.test(control.value)) {
      return { 'invalidFullName': true };
    }
    return null;
  }

  isValidPhoneNumber(control: FormControl): { [s: string]: boolean } | null {
    const phoneRegex = /^\d{10}$/; // Assuming phone numbers are 10 digits long
    if (!phoneRegex.test(control.value)) {
      return { 'invalidPhoneNumber': true };
    }
    return null;
  }


  
}