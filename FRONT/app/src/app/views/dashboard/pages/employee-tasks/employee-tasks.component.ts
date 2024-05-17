import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.css']
})
export class EmployeeTasksComponent implements OnInit {
  tasks:any[]=[];
  idUser:any;
idEmployee:any;
employee:any;
  constructor(private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
  
    this.idUser = this.route.snapshot.params['idUser'];
    this.api.getEmployeeByUserId(this.idUser).subscribe((employee: any) => {
        console.log(employee);
        this.employee = employee;
        this.idEmployee = this.employee.id;
       
        this.getTasks();
    });
  }

  getTasks(){
    this.api.getEmployeeTasks(this.idEmployee).subscribe((res:any)=>{
      
      this.tasks=res;
    })
  }

  changeTaskStatus(id:any, status:any){
    this.api.changeTaskStatus(id, status).toPromise().then((res:any)=>{
      
      if(status==='OnHold'){
      status='InProgress';
      }else if(status==='InProgress'){
        status="Done";
      }
      
      this.getTasks();
    })
  }

  // In your component class
getStatusClass(status: string): string {
  switch (status) {
      case 'OnHold':
          return 'text-primary';
      case 'InProgress':
          return 'text-warning';
      case 'Done':
          return 'text-success';
      default:
          return '';
  }
}

tasksByStatus(status: string): any[] {
  return this.tasks.filter(task => task.status === status);
}

}
