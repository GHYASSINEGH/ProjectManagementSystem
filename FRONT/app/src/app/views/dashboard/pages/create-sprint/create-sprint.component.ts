import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    creationDate: new FormControl(new Date(), Validators.required), 
    endDate: new FormControl('', Validators.required)
  })

  success:string='';
  error:string='';

  releaseID:any='';
  idProject:any;


  constructor(private api:ApiService,private router :Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.releaseID = this.route.snapshot.params['idRelease'];
    this.idProject = this.route.snapshot.params['idProject'];

  }

saveSprint(){
 
  const body = this.form.value;
  const sprint = {
    title: body.title,
    description: body.description,
    creationDate: body.creationDate,
    endDate: body.endDate,
    release: this.releaseID
  }
  this.api.createSprint(sprint).toPromise().then((res:any)=>{
    if(res.success){
      this.success = res.message;
      this.router.navigate(['/dashboard/releases/details/'+this.releaseID+'/project/'+this.idProject]);
    }else{
      this.error = res.message;
    }
  })
}
}
   