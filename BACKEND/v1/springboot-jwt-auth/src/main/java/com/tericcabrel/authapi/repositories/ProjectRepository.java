package com.tericcabrel.authapi.repositories;


import com.tericcabrel.authapi.entities.Company;
import com.tericcabrel.authapi.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {

    List<Project> findByCompany(Company company);



}
