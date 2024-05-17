import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  email: string = '';
  password: string = '';
  fullName: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    
  }

  signup() {
    this.submitted = true;
    if (this.fullName === '') {
      this.errorMessage = 'Please enter your fullName.';
      return;
    }
    if (!this.isValidFullName(this.fullName)) {
      this.errorMessage = 'Please enter a valid full name.';
      return;
    }
    if (this.email === '') {
      this.errorMessage = 'Please enter your email.';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email.';
      return;
    }
    if (this.password === '') {
      this.errorMessage = 'Please enter your password.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    const user = {
      email: this.email,
      password: this.password,
      fullName: this.fullName
    };

    this.auth.createAccount(user).toPromise().then((res: any)=> {
      console.log(res);  
      this.router.navigateByUrl('/auth');
    }).catch((err: HttpErrorResponse)  => {
      if (err.status === 401) {
        this.errorMessage = 'User with this email already exists. Please use a different email.';
      } else {
        this.errorMessage = 'Something went wrong, please try again.';
      }
    }).finally(() => {
      this.loading = false;
    });
  }

  isValidFullName(fullName: string): boolean {
    const fullNameRegex = /^[a-zA-Z\s]*$/;
    return fullNameRegex.test(fullName);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLogIn() {
    this.router.navigateByUrl('/auth');
  }
}