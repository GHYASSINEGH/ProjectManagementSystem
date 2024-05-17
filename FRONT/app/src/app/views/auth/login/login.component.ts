import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    this.loading = true;
    this.errorMessage = '';

    const user = {
      email: this.email,
      password: this.password,
    };

    this.auth.auth(user).toPromise().then((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);

      // redirect to dashboard !!!
      // Assuming api.getMyInfo() and its routing work as expected
      // Replace this with your actual redirection logic
      this.router.navigateByUrl('/dashboard');
    }).catch((err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.errorMessage = "Wrong email or password, please check your information and try again.";
      } else {
        this.errorMessage = 'Something went wrong, please try again later.';
      }
    }).finally(() => {
      this.loading = false;
    });
  }

  onSubmit() {
    this.submitted = true;
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
    this.signin();
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToCreateAccount() {
    this.router.navigateByUrl('/auth/create-account');
  }
}