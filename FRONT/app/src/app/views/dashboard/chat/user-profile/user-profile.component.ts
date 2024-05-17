import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserChatServiceService } from 'src/app/services/user-chat-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user!: User;
  updateData!: User;

  constructor(private authService: UserChatServiceService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
     
      return;
    }
    this.authService.getCurrentUser(token).subscribe(
      res => {
        this.user = res;
      },
      error => {
        console.error('Fetch current user error:', error);
      
      }
    );
  }

  updateUser(data: any): void {
    const token = localStorage.getItem('token');
    if (!token) {
     
      return;
    }
    this.authService.updateUser(data, token).subscribe(
      res => {
       
      },
      error => {
        console.error('Update user error:', error);
        
      }
    );
  }
}