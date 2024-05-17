import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.css']
})
export class CreateReleaseComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl(new Date(), Validators.required), 
    endDate: new FormControl('', Validators.required)
  })

  success:string='';
  error:string='';

  projectID:any='';

  constructor(private api:ApiService,private router :Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.projectID = this.route.snapshot.params['id'];
  }

  saveRelease(){
    this.error='';
    
    const body = this.form.value;
    const release = {
      title: body.title,
      description: body.description,
      creationDate: body.startDate,
      endDate: body.endDate,
      project: this.projectID
    }

    this.api.createRelease(release).toPromise().then((res:any)=>{
      if(res.success){
        this.success = res.message;
        this.router.navigate(['/dashboard/projects/details/'+this.projectID]);
      }else{
        this.error = res.message;
      }
    })
  }


}
