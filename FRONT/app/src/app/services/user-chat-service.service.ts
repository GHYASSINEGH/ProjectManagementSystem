import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';
import { UpdateUserReq } from '../models/UpdateUserReq';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserChatServiceService {
  
  private baseUrl = '/api/users';

  constructor(private http: HttpClient) { }
  /*
  getUserProfile(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<User>(`${this.baseUrl}/profile`, { headers });
  }

  searchUser(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${query}`);
  }

  updateUser(updateUserReq: UpdateUserReq, token: string): Observable<ApiResponse> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put<ApiResponse>(`${this.baseUrl}/update`, updateUserReq, { headers });
  }

  searchByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/search?name=${name}`);
  }*/

  register(data: any): Observable<any> {
    return this.http.post(environment.API+`${this.baseUrl}/auth/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.API+`${this.baseUrl}/auth/signin`, data);
  }

  getCurrentUser(token: string): Observable<any> {
    return this.http.get(environment.API+`${this.baseUrl}/api/users/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  updateUser(data: any, token: string): Observable<any> {
    return this.http.put(environment.API+`${this.baseUrl}/api/users/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  searchUser(keyword: string, token: string): Observable<any> {
    return this.http.get(environment.API+`${this.baseUrl}/api/users/search?name=${keyword}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  logoutUser(): void {
    
    localStorage.removeItem('token');
    
  }

}
