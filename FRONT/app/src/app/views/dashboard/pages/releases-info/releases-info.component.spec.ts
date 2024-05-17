import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesInfoComponent } from './releases-info.component';

describe('ReleasesInfoComponent', () => {
  let component: ReleasesInfoComponent;
  let fixture: ComponentFixture<ReleasesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleasesInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
