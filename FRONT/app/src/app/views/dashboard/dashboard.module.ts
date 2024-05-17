import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { SideMenuComponent } from './elements/side-menu/side-menu.component';
import { CompaniesListComponent } from './pages/companies-list/companies-list.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyInfoComponent } from './pages/company-info/company-info.component';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeesAddComponent } from './pages/employees-add/employees-add.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { ProjectByCompanyComponent } from './pages/project-by-company/project-by-company.component';
import { ReleasesListComponent } from './pages/releases-list/releases-list.component';
import { CreateReleaseComponent } from './pages/create-release/create-release.component';
import { ReleasesInfoComponent } from './pages/releases-info/releases-info.component';
import { CreateSprintComponent } from './pages/create-sprint/create-sprint.component';
import { SprintInfoComponent } from './pages/sprint-info/sprint-info.component';
import { SprintListComponent } from './pages/sprint-list/sprint-list.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskInfoComponent } from './pages/task-info/task-info.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { FilterByStatusPipe } from './pages/task-list/filter-by-status.pipe';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { EmployeeTasksComponent } from './pages/employee-tasks/employee-tasks.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatComponent } from './chat/chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { ContactsComponent } from './chat/contacts/contacts.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    NavbarComponent,
    SideMenuComponent,
    CompaniesListComponent,
    CreateCompanyComponent,
    CompanyInfoComponent,
    EmployeesListComponent,
    EmployeesAddComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ProjectInfoComponent,
    ProjectByCompanyComponent,
    ReleasesListComponent,
    CreateReleaseComponent,
    ReleasesInfoComponent,
    CreateSprintComponent,
    SprintInfoComponent,
    SprintListComponent,
    TaskListComponent,
    TaskInfoComponent,
    CreateTaskComponent,
    FilterByStatusPipe,
    EditTaskComponent,
    EmployeeTasksComponent,
    EmployeeDashboardComponent,
    ChatComponent,
    MessageComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardModule { }
