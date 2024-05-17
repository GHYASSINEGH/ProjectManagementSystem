import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Chat } from 'src/app/models/Chat';
import { SingleChatReq } from 'src/app/models/SingleChatReq';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  
  employees:any[] = [];
  chats: Chat[] = [];
  id:any;
 

  constructor(private api:ApiService,private chatService:ChatServiceService,private route:ActivatedRoute,private router :Router) { }

  ngOnInit(): void {
    this.getContactList();
    this.id = this.route.snapshot.params['idUser'];
  }
getContactList(){
this.api.getEmployeesChatList().toPromise().then((employees:any)=>{
  this.employees=employees;
}

)
}




createChat(userId: number): void {
  const req: SingleChatReq = { userId };
  console.log('createChat called with userId:', userId);
  this.chatService.createSingleChat(req).subscribe(
    (chat: Chat) => {
      console.log('Chat created successfully:', chat);
      this.chats.push(chat);
      this.router.navigate(['/dashboard/chats/'+this.id]);
    },
    (error) => {
      console.error('Error creating chat:', error);
    }
  );
}

}
