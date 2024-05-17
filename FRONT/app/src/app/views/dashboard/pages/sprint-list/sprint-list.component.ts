import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {
  sprints:any[]=[];
  id:any;
  sprint:any=null;
  idProject:any;
  idRelease:any;

  constructor(private api:ApiService,private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.idRelease = this.route.snapshot.params['idRelease'];
    this.idProject=this.route.snapshot.params['idProject'];
    this.getSprints();
  }

  getSprints(){
    this.api.getSprintsByRelease(this.idRelease).toPromise().then((res:any)=>{
      console.log(res);
      this.sprints = res;
    })
  }
  deleteSprint(id:any){
    this.api.deleteSprint(id).toPromise().then((res:any)=>{
      console.log(res);
      if(res.success==true){
      this.getSprints();
      }
    })
  }

}
