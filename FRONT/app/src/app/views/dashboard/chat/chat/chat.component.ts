import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Chat } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';
import { SendMessageReq } from 'src/app/models/SendMessageReq';
import { SingleChatReq } from 'src/app/models/SingleChatReq';
import { User } from 'src/app/models/User';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { MessageServiceService } from 'src/app/services/message-service.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  jwtToken:any;
  id:any;
  employee:any;
 
  contact!:User;

  contactsMap: Map<number, any> = new Map();

  newMessageContent: string = ''; 
  messages: Message[] = []; 
  othermessages: Message[] = []; 
  message!:Message;
  chatId: number = 204; 
  userId:any
  contacts: { [key: number]: any } = {};

  constructor(private route:ActivatedRoute,private chatService: ChatServiceService
    ,private api:ApiService ,private messageService: MessageServiceService) { }

  ngOnInit(): void {
    
    
    this.jwtToken=localStorage.getItem('token');
    this.id = this.route.snapshot.params['idUser'];
   
   this.getEmployee();
  //this.fetchCurrentUserMessages();
  this.fetchOtherUserMessages();
  this.fetchAllMessages();
  this.fetchAllContacts();
  this.getAllChats();

  
    
  }

  getAllChats(): void {
   
    this.chatService.findAllChatsByUserId().subscribe(
      (chats: Chat[]) => {
        this.chats = chats;
            console.log(chats);                                                                                                         
      },
      (error) => {
        console.error('Error fetching chats:', error);
      }
    );
  }

  createChat(): void {
    const req: SingleChatReq = { userId:2 }; 
    
    this.chatService.createSingleChat(req).subscribe(
      (chat: Chat) => {
        this.chats.push(chat);
      },
      (error) => {
        console.error('Error creating chat:', error);
      }
    );
  }
  

  deleteChat(chatId: number): void {
   
    this.chatService.deleteChat(chatId).subscribe(
      (response) => {
        if (response.success) {
          this.chats = this.chats.filter(chat => chat.id !== chatId);
        } else {
          console.error('Error deleting chat:', response.message);
        }
      },
      (error) => {
        console.error('Error deleting chat:', error);
      }
    );
  }


  // on l utilise pour avoir current username {{employee.user.fullName}}

getEmployee(){
  this.api.getEmployeeByUserId(this.id).subscribe((employee: any) => {
    console.log(employee);
    this.employee=employee;

});
}

fetchAllContacts(): void {
  const chatIds = this.chats.map(chat => chat.id);
  chatIds.forEach(idChat => {
    this.chatService.getContact(idChat).subscribe(contact => {
      this.contacts[idChat] = contact;
      console.log(`Fetched contact for chat ID ${idChat}:`, contact);  // Debugging line
    }, error => {
      console.error(`Error fetching contact for chat ID ${idChat}:`, error);
    });
  });
}

getContact(chatId: number): any | undefined {
  return this.contacts[chatId];
}

/*
getContact(idChat: any): void {
  this.contactsMap.set(idChat, { loading: true }); 
  this.chatService.getContact(idChat).subscribe(
    (employee: any) => {
      console.log('Fetched contact for chat', idChat, ':', employee);
      this.contactsMap.set(idChat, employee);
    },
    error => {
      console.error('Error fetching contact for chat', idChat, ':', error);
      this.contactsMap.set(idChat, { error: true }); 
    }
  );
}

getContactByChatId(chatId: any): any {
  return this.contactsMap.get(chatId);
}
*/
sendMessage(): void {
  
  const req: SendMessageReq = {
    content: this.newMessageContent,
    userId: this.id, 
    chatId: this.chatId

  };

  this.messageService.sendMessage(req)
    .subscribe((message: Message) => {

      this.messages.push(message);
    
      this.newMessageContent = '';
    });
}

fetchAllMessages(): void {
  this.messageService.getChatMessages(this.chatId)
    .subscribe((messages: Message[]) => {
      this.messages = messages;
    });
}

fetchOtherUserMessages(): void {
  this.messageService.getMessagesOtherUser(this.chatId)
    .subscribe((messages: Message[]) => {
      this.othermessages = messages;
      
    });
}
/*
fetchCurrentUserMessages(): void {
  this.messageService.getChatMessagesCurrentUser(this.id)
    .subscribe((messages: Message[]) => {
      this.messages = messages;
    });
}*/

isOtherUserMessage(message: Message): boolean {
  return this.othermessages.some(otherMessage => otherMessage.id === message.id);
}

}