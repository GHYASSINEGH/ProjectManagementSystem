package com.tericcabrel.authapi.dtos;

import java.time.LocalDateTime;

public class SprintModel {
    private String title;
    private String description;
    private LocalDateTime creationDate = LocalDateTime.now();
    private   LocalDateTime endDate;


    private   long release;


    public SprintModel() {
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

    public long getRelease() {
        return release;
    }

    public void setRelease(long release) {
        this.release = release;
    }
}
