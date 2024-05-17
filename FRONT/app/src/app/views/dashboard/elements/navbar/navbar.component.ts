import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  fullName:string = "Laoding..." ;
  constructor(private auth:AuthService,private api:ApiService,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.getUserName();
    
  }
  getUserName(){
    this.api.getMyInfo().toPromise().then((res:any)=>{
      this.fullName = res.fullName;
  })
}
logout(){
  this.auth.logout();
  this.router.navigate(['/auth']);
         
}

}
