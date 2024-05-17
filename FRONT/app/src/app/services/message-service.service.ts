import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { SendMessageReq } from '../models/SendMessageReq';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private baseUrl = '/api/messages';

  constructor(private http: HttpClient) { }

  sendMessage(req: SendMessageReq): Observable<Message> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.post<Message>(environment.API+`${this.baseUrl}/create`, req, { headers });
  }

  getChatMessages(chatId: any): Observable<Message[]> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.get<Message[]>(environment.API+`${this.baseUrl}/chat/${chatId}`, { headers });
  }
  getMessagesOtherUser(chatId: any): Observable<Message[]> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.get<Message[]>(environment.API+`${this.baseUrl}/other-user-messages/${chatId}`, { headers });
  }

  getChatMessagesCurrentUser(userId: any): Observable<Message[]> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.get<Message[]>(environment.API+`${this.baseUrl}/messagesCurrentUser/${userId}`, { headers });
  }


  deleteMessage(messageId: number): Observable<ApiResponse> {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.delete<ApiResponse>(environment.API+`${this.baseUrl}/${messageId}`, { headers });
  }
}