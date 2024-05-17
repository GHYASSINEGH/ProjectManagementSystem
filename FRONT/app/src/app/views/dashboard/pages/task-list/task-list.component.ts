import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks:any[]=[];
  idSprint:any;
  task:any=null;
  employee:any;
  idRelease:any;
  idProject:any;

  constructor(private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idSprint = this.route.snapshot.params['id'];
    this.idRelease = this.route.snapshot.params['idRelease'];
    this.idProject=this.route.snapshot.params['idProject'];
    this.getTasks();
   
  }

  deleteTask(id:any){
    this.api.deleteTask(id).toPromise().then((res:any)=>{
      console.log(res);
      if(res.success==true){
      this.getTasks();
      }
    })
  }

  getTasks(): void {
    this.api.getTasksBySprint(this.idSprint).toPromise().then((res: any) => {
      console.log(res);
      this.tasks = res;
      // Fetch employee data for each task
      this.tasks.forEach(task => {
        this.getEmployeeByTask(task.id);
      });
    });
  }
  
  getEmployeeByTask(idTask: any): void {
    this.api.getEmployeeByTask(idTask).toPromise().then((res: any) => {
      console.log(res);
      // Find the task in the tasks array
      const task = this.tasks.find(t => t.id === idTask);
      if (task) {
        task.employee = res;
      }
    }).catch(error => {
      console.error("Error fetching employee:", error);
    });
  }




  changeTaskStatus(id:any, status:any){
    this.api.changeTaskStatus(id, status).toPromise().then((res:any)=>{
      console.log(res);
      if(status==='OnHold'){
      status='InProgress';
      }else if(status==='InProgress'){
        status="Done";
      }
      this.getTasks();
    })
  }










  /**
   * 
   * action id task  id employee => Entity TaskEmployee 
   * + SEND MAIL TO EMPLOYEE SPRINGMAILER
   * 
   */











}
