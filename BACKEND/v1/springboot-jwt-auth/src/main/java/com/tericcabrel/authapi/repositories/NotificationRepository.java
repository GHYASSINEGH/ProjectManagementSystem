package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Employee;
import com.tericcabrel.authapi.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByEmployee(Employee employee);
}
