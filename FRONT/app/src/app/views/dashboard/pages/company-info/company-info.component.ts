import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  id:any;

  company:any = null;
  projects:any[] = [];

 



  constructor(private route:ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCompanyInformations();
    this.getProjectsList();
  }


  getCompanyInformations(){
    this.api.getCompanyByID(this.id).toPromise().then((company:any)=>{
      this.company = company;

      console.log(company);
      
    })
  }


  getProjectsList(){
    this.api.getCompanyProjects(this.id).toPromise().then((project:any)=>{
     
      console.log(project);
      this.projects = project;
      
    })
  }


}
