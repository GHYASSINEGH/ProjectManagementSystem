import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  project:any=null;
  employee:any=null;
  id:any;
  employees:any[] = [];
  selectedEmployees:any[] = [];
  idEmpl:any;
  hideTables :boolean = false;
 
  success:string='';

  error:string='';
  releases:any[] = [];



  progressPercentage: number = 10;

  constructor(private route:ActivatedRoute, private api:ApiService) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProjectInformations();
    this.getData();
    this.getAffectedAemployees();
    //this.api.setProjectId(this.id);
    this.getProjectProgress();
  }
  
  getProjectProgress(){
    this.api.getProjectProgression(this.id).toPromise().then((res:any)=>{
      // Assuming res is the percentage value returned from the backend
      this.progressPercentage = res;
    });
  }
  



  getProjectInformations(){
    this.api.getProjectDetails(this.id).toPromise().then((project:any)=>{
      this.project=project;

      console.log(project);
      
    })
  }

  getData(){
    this.api.getEmployeesList().toPromise().then((res:any)=>{
      console.log(res);

      this.employees = res;
      
    })
  }
  selectEmployee(employee: any) {
    this.selectedEmployees.push(employee);
    this.employees = this.employees.filter(e => e.id !== employee.id);

    this.affectEmployeeToProject(this.id,employee.id);
  }

  deselectEmployee(employee: any) {
    this.employees.push(employee);
    this.selectedEmployees = this.selectedEmployees.filter(e => e.id !== employee.id);
    this.deselectEmployeeFromProject(this.id,employee.id);

    // API id employee id project 
  }

/*
saveSelectedEmployees() {
  // Assuming you have a method to save the project details
  // Call the method to save the selected employees here
  this.api.affectEmployeeToProject(this.id, this.idEmpl).subscribe(
    () => {
      // Handle success if needed
      console.log('Selected employees saved successfully');
    },
    (error) => {
      // Handle error if needed
      console.error('Error saving selected employees:', error);
    }
  );
  this.hideTables=true;
  
}
*/

affectEmployeeToProject(projectId: any, employeeId: any) {

  this.api.affectEmployeeToProject(projectId, employeeId).toPromise().then(
    (res:any) => {
      console.log(res);
      this.success = "Employee affected to project successfully";
    },
    (err: HttpErrorResponse) => {
      if (err.status === 404) {
        this.error = "Project not found";
      } else if (err.status === 400) {
        this.error = "Employee not found";
      } else {
        this.error = "An unexpected error occurred";
      }
    }
  );
}

deselectEmployeeFromProject(projectId: any, employeeId: any) {

  this.api.desaffectEmployeeFromProject(projectId, employeeId).toPromise().then(
    (res:any) => {
      console.log(res);
      this.success = "Employee desaffected from project successfully";
    },
    (err: HttpErrorResponse) => {
      if (err.status === 404) {
        this.error = "Project not found";
      } else if (err.status === 400) {
        this.error = "Employee not found";
      } else {
        this.error = "An unexpected error occurred";
      }
    }
  );
}



getAffectedAemployees(){
  this.api.getProjectEmployeesByProjectID(this.id).toPromise().then((res:any)=>{
    console.log(res);

    this.selectedEmployees = res;

    this.employees.map((e, index)=>{
      const id = e.id;

      let remove = false;

      this.selectedEmployees.map((tmp)=>{
        if (tmp.id == id) {
          remove = true;
        }
      })

      if (remove) {
        this.employees.splice(index,1);
      }

    })
    
  })
}





}
