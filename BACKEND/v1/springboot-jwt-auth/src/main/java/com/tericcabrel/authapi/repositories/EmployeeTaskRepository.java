package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Employee;
import com.tericcabrel.authapi.entities.EmployeeTask;
import com.tericcabrel.authapi.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@Transactional
@CrossOrigin( value="*" )
public interface EmployeeTaskRepository extends JpaRepository<EmployeeTask,Long> {
    EmployeeTask findByTask(Task task);

    List<EmployeeTask> findByEmployee(Employee employee);
}
