import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  form: FormGroup;
  success: string = '';
  error: string = '';
  sprintID: any = '';
  employees: any[] = [];
  projectId: any;
  releaseId: any;
  taskId: any;
  task: any;
  employe: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      employee: ['', Validators.required]
  });
}

  ngOnInit(): void {
    this.sprintID = this.route.snapshot.params['idSprint'];
    this.releaseId = this.route.snapshot.params['idRelease'];
    this.projectId = this.route.snapshot.params['idProject'];
    this.taskId = this.route.snapshot.params['idTask']; 
    this.getAffectedEmployees();
    this.getTaskInfo();
    this.employe=this.api.getEmployeeByTask(this.taskId);
  }

  getTaskInfo() {
    this.api.getTaskDetails(this.taskId).toPromise().then((task: any) => {
      this.task = task;
      
      // Populate form with task details
      this.form.patchValue({
        title: task.title,
        description: task.description,
       employee:this.employe
      });
    }).catch(error => {
      console.error("Error fetching task details:", error);
    });
  }


  onEmployeeClick(employeeId: string) {
    this.updateTask(employeeId);
  }

  updateTask(employeeId: any) {
    const body = this.form.value;
    const updatedTask = {
      title: body.title,
      description: body.description,
      sprint: this.sprintID
  
    };

    this.api.updateTask(updatedTask,this.taskId).toPromise().then((res: any) => {
      if (res.success) {
        
        this.api.affectEmployeeToTask(this.taskId, employeeId).toPromise().then(
          (res: any) => {
            console.log(res);
            this.success = "Task created and employee affected to task successfully";
            this.router.navigate(['/dashboard/sprints/details/' + this.sprintID + '/release/' + this.releaseId + '/project/' + this.projectId]);
          },
          (error: any) => {
            this.error = "Error affecting employee to task";
          }
        );
      } else {
        this.error = res.message;
      }
    }).catch(error => {
      this.error = error;
    });
  }

  getAffectedEmployees() {
    this.api.getProjectEmployeesByProjectID(this.projectId).toPromise().then((res: any) => {
      console.log(res);
      this.employees = res;
    }).catch(error => {
      console.error("Error fetching affected employees:", error);
    });
  }
  }


