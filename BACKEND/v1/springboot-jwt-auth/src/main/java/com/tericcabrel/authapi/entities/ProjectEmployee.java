package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;


@Entity
@Table( name="project_employee" )
public class ProjectEmployee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Project project;


    public ProjectEmployee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
