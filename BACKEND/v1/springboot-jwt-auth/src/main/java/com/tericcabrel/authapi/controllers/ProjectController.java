package com.tericcabrel.authapi.controllers;


import com.tericcabrel.authapi.dtos.EmployeeCreateAccountModel;
import com.tericcabrel.authapi.dtos.JsonResponse;
import com.tericcabrel.authapi.dtos.ProjectDto;
import com.tericcabrel.authapi.dtos.SelectedEmployeeDTO;
import com.tericcabrel.authapi.entities.*;
import com.tericcabrel.authapi.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequestMapping("/api/v1/projects")
@RestController
@CrossOrigin( value="*" )
public class ProjectController {


    @Autowired
    private ProjectRepository repo;
    @Autowired
    private CompanyRepository companyRepository;
 @Autowired
    private EmployeeRepository employeeRepository;

@Autowired
    private ProjectEmployeeRepository projEmplRepository;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    SprintRepository sprintRepository;
    @Autowired
    RealeaseRepository realeaseRepository;


    @GetMapping("/list")
    public ResponseEntity<?> getListOfProjects(){


        return ResponseEntity.ok(this.repo.findAll());

    }



    @GetMapping("/list/{id}")
    public ResponseEntity<?> getProjectByCompany(@PathVariable Long id){

        Company company =companyRepository.findById(id).get();


        List<Project> projects = this.repo.findByCompany(company);


        return ResponseEntity.ok(projects);

    }


    @PostMapping("/add")
    public ResponseEntity<?> addProject(  @RequestBody ProjectDto model ){


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        Project project = new Project();
        project.setTitle(model.getTitle());
        project.setDescription(model.getDescription());
        project.setCreationDate(model.getCreationDate());
        project.setEndDate(model.getEndDate());

        project.setCompany( this.companyRepository.findById(model.getCompany()).get() );

        this.repo.save(project);

            return ResponseEntity.ok( new JsonResponse(true,"Project Created successfullly") );

    }
/*
    @PostMapping("/add/{companyId}")
    public ResponseEntity<?> addProject(@PathVariable Long companyId  ,@RequestBody ProjectDto model  ){

        Company company = companyRepository.findById(companyId).get();


        Project project = new Project();

        project.setCompany(company);
        project.setTitle(model.getTitle());
        project.setDescription(model.getDescription());
        project.setCreationDate(model.getCreationDate());
        project.setEndDate(model.getEndDate());
        this.repo.save(project);

        return ResponseEntity.ok( new JsonResponse(true,"Project Created successfullly") );

    }
*/



    // DELETE

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Project project = repo.findById(id).get();


        repo.delete(project);

        return ResponseEntity.ok(new JsonResponse(true, "Project deleted successfully"));
    }





    @GetMapping("/details/{id}")
    public ResponseEntity<?> projectById(@PathVariable Long id) {

        try {
            Project project = repo.findById(id).get();


            return ResponseEntity.ok(project);
        }catch(Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Project not found"));
        }
    }





    @GetMapping("/details/employees/{id}")
    public ResponseEntity<?> getEmployees(@PathVariable Long id) {

        try {
            Project project = repo.findById(id).get();

            List<Employee> employees = new ArrayList<>();

            for(ProjectEmployee tmp:  this.projEmplRepository.findByProject(project)  ){
                employees.add(tmp.getEmployee());
            }

            return ResponseEntity.ok(employees);
        }catch(Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Project not found"));
        }
    }

/*
    @PostMapping("/{projectId}/employees")
    public ResponseEntity<?> AffectEmployeeToProject(@PathVariable Long projectId, @RequestBody SelectedEmployeeDTO selectedEmployeeDTO) {
        Project project = repo.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        List<Employee> selectedEmployees = new ArrayList<>();
        for (Long employeeId : selectedEmployeeDTO.getSelectedEmployeeIds()) {
            Employee employee = employeeRepository.findById(employeeId)
                    .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
            selectedEmployees.add(employee);
        }

        project.setEmployees((Set<Employee>) selectedEmployees);
        repo.save(project);

        return ResponseEntity.ok().build();
    }
    */


    /*@PostMapping("/{projectId}/employees")
    public ResponseEntity<?> AffectEmployeeToProject(@PathVariable Long projectId, @RequestBody SelectedEmployeeDTO selectedEmployeeDTO) {
        Project project = repo.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));


       // List<Employee> selectedEmployees = new ArrayList<>();
        Set<Employee> selectedEmployees = new HashSet<>();
        for (Long employeeId : selectedEmployeeDTO.getSelectedEmployeeIds()) {
            Employee employee = employeeRepository.findById(employeeId)
                    .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
            employee.setProject(project);
            selectedEmployees.add(employee);
        }

        project.setEmployees(new HashSet<>(selectedEmployees));

        repo.save(project);

        return ResponseEntity.ok().build();
    }*/


    // POST /affect-employee
    // id employee, id project body
    // new ProjectEmployee

    @PostMapping("/affect-employee/{projectId}/{employeeId}")
    public ResponseEntity<?> affectEmployeeToProject(@PathVariable Long projectId,@PathVariable Long employeeId ) {

        ProjectEmployee projectEmployee = new ProjectEmployee();
        Project project = repo.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

  Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));


        projectEmployee.setProject(project);
        projectEmployee.setEmployee(employee);



        return ResponseEntity.ok(this.projEmplRepository.save(projectEmployee));
    }


    @DeleteMapping ("/deselect-employee/{projectId}/{employeeId}")
    public ResponseEntity<?> deselectEmployeeFromProject(@PathVariable Long projectId,@PathVariable Long employeeId ) {


        Project project = repo.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        ProjectEmployee projectEmployee = projEmplRepository.findByProjectAndEmployee(project,employee);

        projEmplRepository.delete(projectEmployee);

        return ResponseEntity.ok(new JsonResponse(true, "Employee deselected successfully"));
    }


    //////// Project progression

    @GetMapping("/details/projectProgression/{id}")
    public ResponseEntity<?> getProjectProgression(@PathVariable Long id) {
        try {
            Project project = repo.findById(id).orElse(null);
            if (project == null) {
                return ResponseEntity.ok(new JsonResponse(false, "Project not found"));
            }

            int totalTasks = 0;
            int completedTasks = 0;

            List<Release> releases = realeaseRepository.findByProject(project);
            for (Release release : releases) {
                List<Sprint> sprints = sprintRepository.findByRelease(release);
                for (Sprint sprint : sprints) {
                    List<Task> tasks = taskRepository.findBySprint(sprint);
                    for (Task task : tasks) {
                        totalTasks++;
                        if (task.getStatus() == Status.Done) {
                            completedTasks++;
                        }
                    }
                }
            }

            int score = 0;
            if (totalTasks > 0) {
                score = (completedTasks * 100) / totalTasks;
            }

            return ResponseEntity.ok(score);
        } catch (Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Progression Not Calculated"));
        }
    }



}
