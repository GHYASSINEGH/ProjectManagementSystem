import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  projectId: any;
  
  public IdCompany :any;
  private baseUrl = "/api/v1/projects";

  constructor(private http:HttpClient) { }


  //Companie Management


  getCompaniesList(){

    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/companies/list',{
      headers: headers
    });
  }



  

  createCompany(body:any){

    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.post(environment.API+'/api/v1/companies/add',body,{
      headers: headers
    });
  }





  deleteCompany(id:number){
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.delete(environment.API+'/api/v1/companies/delete/'+id,{
      headers: headers
    });

  }


  getCompanyByID(id:number){ 
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/companies/details/'+id,{
      headers: headers
    });
  }


 


//Employee Management

getEmployeesChatList(){
  const token = localStorage.getItem('token');
     
      
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  
  return this.http.get(environment.API+'/api/confirmedusers/allemployees',{
    headers: headers
  });
}






  getEmployeesList(){
   
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/confirmedusers/list',{
      headers: headers
    });
  }



  createEmployeeAccount(body:any){
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.post(environment.API+'/api/confirmedusers',body,{
      headers: headers
    });

  }
  
  deleteEmployee(id: any) {
    const token = localStorage.getItem('token');


    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });


    return this.http.delete(environment.API+'/api/v1/employees/delete/'+id,{
      headers: headers
    });

   

  }


  //Project Management


  
  createProject(body:any){

    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.post(environment.API+'/api/v1/projects/add',body,{
      headers: headers
    });
  }


  getProjectsList(){
   
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/projects/list',{
      headers: headers
    });
  }

  getCompanyProjects(id: any) {
    
    const token = localStorage.getItem('token');
    
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/projects/list/'+id,{
      headers: headers
    }); 
  }
  
 
  deleteProject(id:number){
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.delete(environment.API+'/api/v1/projects/delete/'+id,{
      headers: headers
    });

  }


  getProjectDetails(id:number){ 
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/projects/details/'+id,{
      headers: headers
    });
  }

/*
  AffectEmployeeToProject(projectId: number, selectedEmployeeIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${projectId}/employees`, { selectedEmployeeIds });
  }*/

  affectEmployeeToProject(projectId: any, employeeId: any): Observable<any> {
     
    const token = localStorage.getItem('token');
     
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.post(environment.API+`/api/v1/projects/affect-employee/${projectId}/${employeeId}`,{
      headers: headers
    });
  }

  desaffectEmployeeFromProject(projectId:any,employeeId:any):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
    'Authorization':'Bearer '+token
  });
  return this.http.delete(environment.API+`/api/v1/projects/deselect-employee/${projectId}/${employeeId}`,{
    headers: headers
  });
  }


  getProjectEmployeesByProjectID(id:number){ 
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/projects/details/employees/'+id,{
      headers: headers
    });
  }


/////////Project Progress 
  getProjectProgression(idProject:number){
    const token = localStorage.getItem('token');


    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
    return this.http.get(environment.API+`/api/v1/projects/details/projectProgression/${idProject}`,{
      headers: headers
    });
  }

  
  



  // set Project Id to use on task Component 
  setProjectId(id: any) {
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    this.projectId = id;
  }



  //Release Management


  
  createRelease(body:any){

    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.post(environment.API+'/api/v1/realeases/add',body,{
      headers: headers
    });
  }


  getProjectReleases(id: any) {
    
    const token = localStorage.getItem('token');
    
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/realeases/list/'+id,{
      headers: headers
    }); 
  }
  
 
  deleteRelease(id:number){
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    });
     

    return this.http.delete(environment.API+'/api/v1/realeases/delete/'+id,{
      headers: headers
    });

  }


  getReleaseDetails(id:number){ 
    const token = localStorage.getItem('token');
     
      
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+token
    }); 
    return this.http.get(environment.API+'/api/v1/realeases/details/'+id,{
      headers: headers
    });
  }

 //Sprint Management


  
 createSprint(body:any){

  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
   

  return this.http.post(environment.API+'/api/v1/sprints/add',body,{
    headers: headers
  });
}


getSprintsByRelease(id: any) {
  
  const token = localStorage.getItem('token');
  
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.get(environment.API+'/api/v1/sprints/list/'+id,{
    headers: headers
  }); 
}


deleteSprint(id:number){
  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
   

  return this.http.delete(environment.API+'/api/v1/sprints/delete/'+id,{
    headers: headers
  });

}


getSprintDetails(id:number){ 
  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.get(environment.API+'/api/v1/sprints/details/'+id,{
    headers: headers
  });
}

//Task Management


  
createTask(body:any){

  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
   

  return this.http.post(environment.API+'/api/v1/tasks/add',body,{
    headers: headers
  });
}


getTasksBySprint(id: any) {
  
  const token = localStorage.getItem('token');
  
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.get(environment.API+'/api/v1/tasks/list/'+id,{
    headers: headers
  }); 
}


deleteTask(id:number){
  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
   

  return this.http.delete(environment.API+'/api/v1/tasks/delete/'+id,{
    headers: headers
  });

}


getTaskDetails(id:number){ 
  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.get(environment.API+'/api/v1/tasks/details/'+id,{
    headers: headers
  });
}

affectEmployeeToTask(taskId: any, employeeId: any): Observable<any> {
     
  const token = localStorage.getItem('token');
   
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.post(environment.API+`/api/v1/tasks/affect-employee-task/${taskId}/${employeeId}`,{
    headers: headers
  });
}


getEmployeeByTask(taskId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  }); 
  return this.http.get(environment.API + `/api/v1/tasks/details/employees/${taskId}`, {
    headers: headers
  });
}

updateTask(body:any,taskId: number): Observable<any> {

  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
   

  return this.http.put(environment.API+`/api/v1/tasks/update/${taskId}`,body,{
    headers: headers
  });
}




changeTaskStatus(id:any, status: string){
  const token = localStorage.getItem('token');

  const body = { status: status };
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token ,
    'Content-Type': 'application/json'
  });
 
  return this.http.patch(environment.API+'/api/v1/tasks/changeStatus/'+id,body,{
    headers: headers
  });
}


////////Employee Dashboar


getMyInfo(){ 
  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.get(environment.API+'/users/me',{
    headers: headers
  });
}


getEmployeeByUserId(idUser:any){ 
  const token = localStorage.getItem('token');
   
    
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  }); 
  return this.http.get(environment.API+`/api/v1/employeeTasks/EmployeeByItsUserId/${idUser}`,{
    headers: headers
  });
}


getEmployeeTasks(idEmployee:any){
  const token = localStorage.getItem('token');


  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
  return this.http.get(environment.API+`/api/v1/employeeTasks/list/tasks/${idEmployee}`,{
    headers: headers
  });
}


getEmployeeNotifications(idUser:any){
  const token = localStorage.getItem('token');


  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token
  });
  return this.http.get(environment.API+`/api/v1/employeeTasks/EmployeeNotifications/${idUser}`,{
    headers: headers
  });
}


changeNotificationVue(id:any, vue:boolean){
  const token = localStorage.getItem('token');

  const body = { vue:vue };
  const headers= new HttpHeaders({
    'Authorization':'Bearer '+token ,
    'Content-Type': 'application/json'
  });
 
  return this.http.patch(environment.API+`/api/v1/employeeTasks/changeVueStatus/${id}`,body,{
    headers: headers
  });
}





}



