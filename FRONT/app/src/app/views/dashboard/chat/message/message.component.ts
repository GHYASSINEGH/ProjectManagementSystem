import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Message } from 'src/app/models/Message';
import { SendMessageReq } from 'src/app/models/SendMessageReq';
import { MessageServiceService } from 'src/app/services/message-service.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  chatId: number = 1; 
  jwt: any; 
  newMessageContent: string = ''; 
  messages: Message[] = []; 
  message!:Message;

  constructor(private messageService: MessageServiceService) { }

  ngOnInit(): void {
   // this.fetchMessages();
    this.jwt=localStorage.getItem('token');

  }
/*
  fetchMessages(): void {
    this.messageService.getChatMessages(this.chatId)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }
*/
  sendMessage(): void {
    const req: SendMessageReq = {
      content: this.newMessageContent,
      userId: 1, 
      chatId: this.chatId
    };

    this.messageService.sendMessage(req)
      .subscribe((message: Message) => {

        this.messages.push(message);
      
        this.newMessageContent = '';
      });
  }

  deleteMessage(messageId: number): void {
    this.messageService.deleteMessage(messageId)
      .subscribe((response: ApiResponse) => {
       
        if (response.success) {
          this.messages = this.messages.filter(message => message.id !== messageId);
        } else {
         
        }
      });
  }

  onMessageChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value;
  }
  

}