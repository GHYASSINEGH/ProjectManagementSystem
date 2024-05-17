import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-project-by-company',
  templateUrl: './project-by-company.component.html',
  styleUrls: ['./project-by-company.component.css']
})
export class ProjectByCompanyComponent implements OnInit {

  id:any;
  project:any = null;
  projects:any[] = [];

  constructor(private route:ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProjectsByCompany();
  }


  getProjectsByCompany(){
    this.api.getCompanyProjects(this.id).toPromise().then((project:any)=>{
     
      console.log(project);
      this.projects = project;
    })
  }


  deleteProject(id:number){
    console.log(id);

    this.api.deleteProject(id).toPromise().then((res:any)=>{
      if (res.success == true) {
        this.getProjectsByCompany();
      }
    }) 
  }


 

}
