package com.tericcabrel.authapi.dtos;

import com.tericcabrel.authapi.entities.Status;

import java.time.LocalDateTime;

public class TaskModel {
    private String title;
    private String description;
    private LocalDateTime creationDate = LocalDateTime.now();
    private   LocalDateTime endDate;

    private Status status=Status.OnHold;
    private   long sprint;

    public TaskModel() {
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public long getSprint() {
        return sprint;
    }

    public void setSprint(long sprint) {
        this.sprint = sprint;
    }
}
