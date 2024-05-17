import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    creationDate: new FormControl(new Date(), Validators.required), 
    endDate: new FormControl('', Validators.required)
  })

  success:string='';
  error:string='';

  companbyID:any='';

  
  constructor(private api:ApiService,private router :Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.companbyID = this.route.snapshot.params['id'];

  }

  saveProject(){
    this.error='';
    
    const body = this.form.value;
    const project = {
      title: body.title,
      description: body.description,
      creationDate: body.creationDate,
      endDate: body.endDate,
      company: this.companbyID
    };

    this.api.createProject(project).toPromise().then((res:any)=>{
      console.log(res);
      if (res.success == true) {
        this.success = res.message;
        this.router.navigateByUrl(`/dashboard/companies/details/${this.companbyID}`);
      }else{
        this.error = res.message;
      }
    }).catch((err:HttpErrorResponse)=>{
      if (err.status == 500) { // ERROR SQL
        this.error="Verify your Information";
      }
    })
  }
  
}