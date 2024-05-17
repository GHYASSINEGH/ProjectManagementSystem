import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CompaniesListComponent } from './pages/companies-list/companies-list.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { CompanyInfoComponent } from './pages/company-info/company-info.component';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeesAddComponent } from './pages/employees-add/employees-add.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { ReleasesListComponent } from './pages/releases-list/releases-list.component';
import { CreateReleaseComponent } from './pages/create-release/create-release.component';
import { ReleasesInfoComponent } from './pages/releases-info/releases-info.component';
import { SprintInfoComponent } from './pages/sprint-info/sprint-info.component';
import { SprintListComponent } from './pages/sprint-list/sprint-list.component';
import { CreateSprintComponent } from './pages/create-sprint/create-sprint.component';
import { TaskInfoComponent } from './pages/task-info/task-info.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { EmployeeTasksComponent } from './pages/employee-tasks/employee-tasks.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ChatComponent } from './chat/chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { ContactsComponent } from './chat/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    {path:'', component:HomePageComponent },
    {path:'companies', component:CompaniesListComponent },
    {path:'companies/add', component:CreateCompanyComponent },
    {path:'companies/details/:id', component:CompanyInfoComponent }, 
    
    { path:'employees', component:EmployeesListComponent }, 
    { path:'employees/add', component:EmployeesAddComponent },
    { path:'projects/add/:id', component:CreateProjectComponent },
    { path:'projects', component:ProjectListComponent },
    { path:'projects/details/:id', component:ProjectInfoComponent },
    { path:'releases/add/:id', component:CreateReleaseComponent },
    { path:'releases', component:ReleasesListComponent },
    { path:'releases/details/:idRelease/project/:idProject', component:ReleasesInfoComponent },
    { path:'sprints/add/:idRelease/:idProject', component:CreateSprintComponent },
    { path:'sprints', component:SprintListComponent },
    { path:'sprints/details/:id/release/:idRelease/project/:idProject', component:SprintInfoComponent },
    { path:'tasks/add/sprint/:idSprint/release/:idRelease/project/:idProject', component:CreateTaskComponent},
    { path:'tasks', component:TaskListComponent },
    { path:'tasks/details/:id/project/:idProject/employee/:idEmployee', component:TaskInfoComponent },
    { path:'tasks/update/:idTask/sprint/:idSprint/release/:idRelease/project/:idProject', component:EditTaskComponent},
    




    // employee app
    { path:'app/my-tasks/:idUser', component:EmployeeTasksComponent},
    { path:'app/my-dashboard/:idUser', component:EmployeeDashboardComponent},
    
    { path:'chats/:idUser', component:ChatComponent},
    { path:'messages', component:MessageComponent},
    { path:'contacts/:idUser', component:ContactsComponent}

    
    
    

  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
