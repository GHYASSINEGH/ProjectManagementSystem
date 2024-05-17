package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.JsonResponse;

import com.tericcabrel.authapi.entities.*;
import com.tericcabrel.authapi.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/v1/employeeTasks")
@RestController
@CrossOrigin( value="http://localhost:4200" )
public class EmployeeAppController {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    SprintRepository sprintRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    EmployeeTaskRepository employeeTaskRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    NotificationRepository notificationRepository;


    @GetMapping("/list/tasks/{id}")
    public ResponseEntity<?> getTasksofEmployee(@PathVariable Long id) {

        try {
           Employee employee =employeeRepository.findById(id).get();

            List<Task> tasks =new ArrayList<>();
            for(EmployeeTask empTask :this.employeeTaskRepository.findByEmployee(employee)){
                tasks.add(empTask.getTask());
            }

            return ResponseEntity.ok(tasks);
        }catch(Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "EmployeeTask not found"));
        }
    }



    ///////// find Employee By its user Id

    @GetMapping("/EmployeeByItsUserId/{id}")
    public ResponseEntity<?> EmployeeByUser(@PathVariable Integer id) {

        User user =userRepository.findById(id).get();
        Employee employee=user.getEmployee();

        return ResponseEntity.ok(employee);
    }



//////////Notification for the Employee

    @GetMapping("/EmployeeNotifications/{id}")
    public ResponseEntity<?> NotificationByUserId(@PathVariable Integer id) {
        List<Notification>  notifications= new ArrayList<>();
        User user =userRepository.findById(id).get();
        Employee employee=user.getEmployee();
        notifications=notificationRepository.findByEmployee(employee);

        return ResponseEntity.ok(notifications);
    }


    @PatchMapping("/changeVueStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Notification notification) {

        try {
            Notification notification1 = notificationRepository.findById(id).get();

            notification1.setVue(notification.getVue());
            this.notificationRepository.save(notification1);

            return ResponseEntity.ok(notification1);
        } catch (Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Notification not found"));
        }
    }



    // API GET => list of task asso connevcted employee
}
