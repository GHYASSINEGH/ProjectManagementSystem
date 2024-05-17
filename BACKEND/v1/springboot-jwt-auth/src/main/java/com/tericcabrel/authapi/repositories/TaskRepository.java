package com.tericcabrel.authapi.repositories;


import com.tericcabrel.authapi.entities.Sprint;
import com.tericcabrel.authapi.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findBySprint(Sprint sprint);



}
