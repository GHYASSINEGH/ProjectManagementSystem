package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;

@Entity
@Table( name="employee_task" )
public class EmployeeTask {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @ManyToOne
    private Task task;

    @ManyToOne
    private Employee employee;

    public EmployeeTask() {
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
