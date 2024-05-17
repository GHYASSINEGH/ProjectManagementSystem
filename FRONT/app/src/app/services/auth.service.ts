import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  auth(body:any){
    return this.http.post(environment.API+'/auth/login', { email:body.email, password:body.password } )
  }
  logout(){
    localStorage.removeItem('token')

  }


  createAccount(user:any){
    return this.http.post(environment.API+'/auth/signup', user )
  }



}
