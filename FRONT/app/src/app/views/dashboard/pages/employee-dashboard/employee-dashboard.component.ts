import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  notifications:any[]=[];
  idUser:any;
  idEmployee:any;
employee:any;
  constructor(private api:ApiService,private route:ActivatedRoute,private router :Router) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['idUser'];
   
    this.api.getEmployeeByUserId(this.idUser).subscribe((employee: any) => {
        console.log(employee);
        this.employee = employee;
        this.idEmployee = this.employee.id;
       
        this.getNotifications();
    });
  }

  getNotifications(){
    this.api.getEmployeeNotifications(this.idEmployee).subscribe((res:any)=>{
      this.notifications = res;
    });
  }

  ChangeNotificationVue(id:any,vue:any){
    this.api.changeNotificationVue(id,!vue).toPromise().then((res:any)=>{
   
        this.router.navigateByUrl(`/dashboard/app/my-tasks/${this.idUser}`);
    })
  }



}
