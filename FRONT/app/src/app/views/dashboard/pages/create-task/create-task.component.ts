import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;
  success: string = '';
  error: string = '';
  sprintID: any = '';
  employees: any[] = [];
  projectId: any;
  releaseId: any;

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
    this.getAffectedEmployees();
  }

  onEmployeeClick(employeeId: string) {
    this.saveTask(employeeId);
  }

  saveTask(employeeId: any) {
    const body = this.form.value;
    const task = {
      title: body.title,
      description: body.description,
      sprint: this.sprintID
    };

    this.api.createTask(task).toPromise().then((res: any) => {
      if (res.success) {
        const taskId = res.taskId;
        this.api.affectEmployeeToTask(taskId, employeeId).toPromise().then(
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