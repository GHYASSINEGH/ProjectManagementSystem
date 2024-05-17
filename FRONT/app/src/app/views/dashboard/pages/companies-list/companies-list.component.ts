import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  companies:any[] = [];


  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.api.getCompaniesList().toPromise().then((comapnies:any)=>{
      console.log(comapnies);

      this.companies = comapnies;
      
    })
  }


  deleteCompany(id:number){
    console.log(id);

    this.api.deleteCompany(id).toPromise().then((res:any)=>{
      if (res.success == true) {
        this.getData();
      }
    })


    
  }

}
