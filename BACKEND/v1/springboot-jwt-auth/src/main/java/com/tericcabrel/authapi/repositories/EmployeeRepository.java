package com.tericcabrel.authapi.repositories;

import java.util.List;

import com.tericcabrel.authapi.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tericcabrel.authapi.entities.Employee;
import com.tericcabrel.authapi.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

	List<Employee> findByClient(User client);

	@Query("SELECT e FROM Employee e JOIN e.Projectemployees u JOIN u.project p JOIN p.company c WHERE c.id = :companyId ")
	List<Employee> findEmployeesByCompanyId(@Param("companyId") Long companyId);


}
