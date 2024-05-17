import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';





interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})

export class SideMenuComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
 
  menu:any[] = [];


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    // menu must changes => user role
    this.getMenu();
    this.screenWidth = window.innerWidth;

  }


  getMenu(){
    this.api.getMyInfo().toPromise().then((res:any)=>{
      console.log(res);

      if (res.role == "ROLE_EMPLOYEE") {

        this.menu=[
          {
            path:`/dashboard/app/my-dashboard/${res.id}`,
            name:'Dashboad',
            icon:'bi bi-grid'
          } ,
          {
           
            path: `/dashboard/app/my-tasks/${res.id}`, 
            name:'My tasks',
            icon:'bi bi-grid'
          } ,
          {
           
            path: `/dashboard/chats/${res.id}`, 
            name:'Chat Room',
            icon:'bi bi-chat-text'
          }
          
        ];
        
      }else{
        this.menu = [
          {
            path:'',
            name:'Dashboad',
            icon:'bi bi-grid'
          } ,
          {
            path:'/dashboard/companies',
            name:'My companies',
            icon:'bi bi-menu-button-wide'
          },
          {
            path:'/dashboard/employees',
            name:'My employees',
            icon:'bi bi-person-gear'
          },
          
          
        ]
      }
      
    })
  }



  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

}
