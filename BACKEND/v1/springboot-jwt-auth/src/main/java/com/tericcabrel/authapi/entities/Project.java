package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Table(name = "projects")
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @Column( unique=true )
    private String title;

    private LocalDateTime creationDate = LocalDateTime.now();
    private LocalDateTime endDate;

    @Column( length=3000 )
    private String description;

    @ManyToOne
    Company company;

  /*
  *   @OneToMany(cascade = CascadeType.ALL, mappedBy="project")
    private Set<Employee> employees=new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy="project")
    private Set<ProjectEmployee> Projectemployees=new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy="project")
    private Set<Release> releases=new HashSet<>();

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
  *
  * */



    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }


}
