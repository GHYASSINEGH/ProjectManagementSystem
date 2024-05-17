import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sprint-info',
  templateUrl: './sprint-info.component.html',
  styleUrls: ['./sprint-info.component.css']
})
export class SprintInfoComponent implements OnInit {

  sprint:any=null;
  id:any;
  idRelease:any;
  idProject:any;
  success:string='';
  
  error:string='';
  tasks:any[] = [];
  
    constructor(private route:ActivatedRoute, private api:ApiService) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.idRelease=this.route.snapshot.params['idRelease'];
    this.idProject=this.route.snapshot.params['idProject'];
    this.getSprintInfo();
  }
  getSprintInfo(){
    this.api.getSprintDetails(this.id).toPromise().then((sprint:any)=>{
     this.sprint = sprint;
      console.log(sprint);
    })
    
  }

}
