package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Table(name = "notifications")
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @Column
    private String title;

    private LocalDateTime creationDate = LocalDateTime.now();
    @Column
    private Boolean vue;

    @Column( length=3000 )
    private String description;

    @ManyToOne
    Employee employee;


    public Notification() {

    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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

    public Boolean getVue() {
        return vue;
    }

    public void setVue(Boolean vue) {
        this.vue = vue;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
