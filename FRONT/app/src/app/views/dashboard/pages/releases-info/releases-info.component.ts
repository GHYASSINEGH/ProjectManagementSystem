import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-releases-info',
  templateUrl: './releases-info.component.html',
  styleUrls: ['./releases-info.component.css']
})
export class ReleasesInfoComponent implements OnInit {
release:any=null;
id:any;

idProject:any;

success:string='';

error:string='';
sprints:any[] = [];

  constructor(private route:ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idRelease'];
    this.idProject = this.route.snapshot.params['idProject'];

   
    
    this.getReleaseInfo();
  }
  getReleaseInfo(){
    this.api.getReleaseDetails(this.id).toPromise().then((release:any)=>{
     this.release = release;
      console.log(release);
    })
  }

}
