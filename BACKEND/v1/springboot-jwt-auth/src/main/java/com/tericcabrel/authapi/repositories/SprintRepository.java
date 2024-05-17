package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Project;
import com.tericcabrel.authapi.entities.Release;
import com.tericcabrel.authapi.entities.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SprintRepository extends JpaRepository<Sprint,Long> {
    List<Sprint> findByRelease(Release release);
}
