import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Chat } from '../models/Chat';
import { SingleChatReq } from '../models/SingleChatReq';
import { GroupChatReq } from '../models/GroupChatReq';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private baseUrl = '/api/chats';

  constructor(private http: HttpClient) { }

  createSingleChat(req: SingleChatReq): Observable<Chat> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.post<Chat>(environment.API+`${this.baseUrl}/single`, req, { headers });
  }

  createGroupChat(req: GroupChatReq): Observable<Chat> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.post<Chat>(environment.API+`${this.baseUrl}/group`, req, { headers });
  }

  findChatById(chatId: number): Observable<Chat> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.get<Chat>(environment.API+`${this.baseUrl}/${chatId}`, { headers });
  }

  findAllChatsByUserId(): Observable<Chat[]> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.get<Chat[]>(environment.API+`${this.baseUrl}/user`, { headers });
  }

  addUserToGroup(chatId: number, userId: number): Observable<Chat> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.put<Chat>(environment.API+`${this.baseUrl}/${chatId}/add/${userId}`, null, { headers });
  }

  removeUserFromGroup(chatId: number, userId: number): Observable<Chat> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.put<Chat>(environment.API+`${this.baseUrl}/${chatId}/remove/${userId}`, null, { headers });
  }

  deleteChat(chatId: number): Observable<ApiResponse> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.delete<ApiResponse>(environment.API+`${this.baseUrl}/delete/${chatId}`, { headers });
  }

  getContact(idChat:any): Observable<any>{ 
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+`${this.baseUrl}/contact/${idChat}`,{
      headers: headers
    });
  }
  
}