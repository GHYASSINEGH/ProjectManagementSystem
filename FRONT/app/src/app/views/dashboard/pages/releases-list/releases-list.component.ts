import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-releases-list',
  templateUrl: './releases-list.component.html',
  styleUrls: ['./releases-list.component.css']
})
export class ReleasesListComponent implements OnInit {
releases:any[]=[];
id:any;
release:any=null;
  constructor(private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getReleases();
  }
  getReleases(){
    this.api.getProjectReleases(this.id).toPromise().then((res:any)=>{
      console.log(res);
      this.releases = res;
    })
  }

  deleteRelease(id:any){
    this.api.deleteRelease(id).toPromise().then((res:any)=>{
      console.log(res);
      if(res.success==true){
      this.getReleases();
    }
    })
  }
}
