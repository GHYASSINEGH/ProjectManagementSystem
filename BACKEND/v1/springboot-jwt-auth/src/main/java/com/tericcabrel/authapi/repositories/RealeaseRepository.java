package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Project;
import com.tericcabrel.authapi.entities.Release;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RealeaseRepository extends JpaRepository<Release,Long> {
    List<Release> findByProject(Project project);
}
