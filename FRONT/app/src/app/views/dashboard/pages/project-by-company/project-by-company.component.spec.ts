import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectByCompanyComponent } from './project-by-company.component';

describe('ProjectByCompanyComponent', () => {
  let component: ProjectByCompanyComponent;
  let fixture: ComponentFixture<ProjectByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectByCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
