package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Employee;
import com.tericcabrel.authapi.entities.Project;
import com.tericcabrel.authapi.entities.ProjectEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee,Long> {
   // ProjectEmployee saveByEmployeeIdAndProjectId(Long employeeId, Long projectId);

    List<ProjectEmployee> findByProject(Project project);
    ProjectEmployee findByProjectAndEmployee(Project project , Employee employee);


}
