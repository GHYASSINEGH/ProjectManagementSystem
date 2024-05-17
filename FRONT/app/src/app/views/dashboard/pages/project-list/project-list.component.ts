import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
projects:any[]=[];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
   this.getProjects(); 
  }

  getProjects(){
    this.api.getProjectsList().toPromise().then((res:any)=>{
      console.log(res);

      this.projects = res;
      
    })
  }

}
