import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
 


    form = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      social: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      activity_sector: new FormControl('', Validators.required),
      descreption: new FormControl('', Validators.required)
    })

    success:string='';

    error:string='';
    

  constructor( private api:ApiService,private router:Router ) { }

  ngOnInit(): void {
  }



  save(){
    this.error='';
    
    const company = this.form.value;

    this.api.createCompany(company).toPromise().then((res:any)=>{
      console.log(res);
      if (res.success == true) {
        this.success = res.message;
        this.router.navigateByUrl(`/dashboard/companies`);
      }else{
        this.error = res.message;
      }
      
    }).catch((err:HttpErrorResponse)=>{
      if (err.status == 500) { // ERROR SQL
        this.error="Company name already in use";
      }
    })

  }

}
