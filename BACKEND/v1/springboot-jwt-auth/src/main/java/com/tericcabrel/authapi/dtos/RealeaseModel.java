package com.tericcabrel.authapi.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tericcabrel.authapi.entities.Project;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

public class RealeaseModel {

    private String title;
    private String description;
    private LocalDateTime startDate = LocalDateTime.now();
    private   LocalDateTime endDate;


    private   long project;

    public RealeaseModel() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public long getProject() {
        return project;
    }

    public void setProject(long project) {
        this.project = project;
    }
}
