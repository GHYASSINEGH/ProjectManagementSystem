package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.JsonResponse;

import com.tericcabrel.authapi.dtos.TaskModel;

import com.tericcabrel.authapi.entities.*;

import com.tericcabrel.authapi.repositories.*;
import com.tericcabrel.authapi.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/v1/tasks")
@RestController
@CrossOrigin( value="http://localhost:4200" )
public class TaskController {
    @Autowired
    TaskRepository repo;
    @Autowired
    SprintRepository sprintRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    EmployeeTaskRepository employeeTaskRepository;
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    EmailService emailService;


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getTasksBySprint(@PathVariable Long id) {

        Sprint sprint = sprintRepository.findById(id).get();


        List<Task> tasks = this.repo.findBySprint(sprint);


        return ResponseEntity.ok(tasks);

    }

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody TaskModel model) {
        Task task = new Task();
        task.setTitle(model.getTitle());
        task.setDescription(model.getDescription());
        task.setCreationDate(model.getCreationDate());
        task.setEndDate(model.getEndDate());

        task.setSprint(this.sprintRepository.findById(model.getSprint()).orElse(null));

        Task savedTask = this.repo.save(task);

        Long taskId = savedTask.getId();



        // NOTIFICATIONS !!!
        /*
        * Enitity Notifications id title("New Task") content("...") created At Employee vue (vue:boolean true or false )
        * Notification ManyToOne with Employee
        *
        * */

        return ResponseEntity.ok(new JsonResponse(true, "Task Created successfully", taskId));
    }





/*
    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody TaskModel model) {
        Task task = new Task();
        task.setTitle(model.getTitle());
        task.setDescription(model.getDescription());
        task.setCreationDate(model.getCreationDate());
        task.setEndDate(model.getEndDate());

        task.setSprint(this.sprintRepository.findById(model.getSprint()).get());

        Task savedTask = this.repo.save(task);
        Long taskId = savedTask.getId();

        return ResponseEntity.ok(new JsonResponse(true, "Task Created successfullly"));

    }*/

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSprint(@PathVariable Long id) {


        Task task = repo.findById(id).get();
        EmployeeTask employeeTask= employeeTaskRepository.findByTask(task);
        employeeTaskRepository.delete(employeeTask);


        repo.delete(task);

        return ResponseEntity.ok(new JsonResponse(true, "Task deleted successfully"));
    }


    @GetMapping("/details/{id}")
    public ResponseEntity<?> getSprintById(@PathVariable Long id) {

        try {
            Task task = repo.findById(id).get();


            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Task not found"));
        }
    }


    @PostMapping("/affect-employee-task/{taskId}/{employeeId}")
    public ResponseEntity<?> affectEmployeeToProject(@PathVariable Long taskId,@PathVariable Long employeeId ) {


        EmployeeTask employeeTask = new EmployeeTask();
        Task task = repo.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        Notification notification = new Notification();
        notification.setTitle("New Task : "+ task.getTitle());
        notification.setDescription("You have been assigned to a new task, this is more detalis about it : "+task.getDescription());
        notification.setVue(false); // Par défaut, la notification n'a pas été vue par l'employé


        employeeTask.setTask(task);
        employeeTask.setEmployee(employee);


        // send email to ?
        User userTask=employee.getUser();
       // void sendSimpleMailTaskNotification(String name,String title,String description, String to, Integer userId);
          emailService.sendSimpleMailTaskNotification(userTask.getFullName(),task.getTitle(),task.getDescription(),userTask.getEmail(),userTask.getId());


        notificationRepository.save(notification);


        return ResponseEntity.ok(this.employeeTaskRepository.save(employeeTask));
    }

    @GetMapping("/details/employees/{id}")
    public ResponseEntity<?> getEmployees(@PathVariable Long id) {

        try {
            Task task=repo.findById(id).get();

            EmployeeTask employeeTask = this.employeeTaskRepository.findByTask(task);

            Employee employee = employeeTask.getEmployee();

            return ResponseEntity.ok(employee);
        }catch(Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "EmployeeTask not found"));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id ,@RequestBody TaskModel model) {
        Task task = repo.findById(id).get();
        task.setTitle(model.getTitle());
        task.setDescription(model.getDescription());
        task.setCreationDate(model.getCreationDate());
        task.setEndDate(model.getEndDate());

        task.setSprint(this.sprintRepository.findById(model.getSprint()).orElse(null)); // Handle null if sprint is not found
        EmployeeTask employeeTask=employeeTaskRepository.findByTask(task);
        this.employeeTaskRepository.delete(employeeTask);
         this.repo.save(task); // Save the task and get the saved task object



        return ResponseEntity.ok(new JsonResponse(true, "Task Created successfully")); // Return taskId in the response
    }




    @PatchMapping("/changeStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody TaskModel model) {

        try {
            Task task = repo.findById(id).get();

            task.setStatus(model.getStatus());
            this.repo.save(task);

            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Task not found"));
        }
    }



}