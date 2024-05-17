package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.configs.HttpResponse;
import com.tericcabrel.authapi.dtos.EmployeeCreateAccountModel;
import com.tericcabrel.authapi.entities.Employee;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repositories.CompanyRepository;
import com.tericcabrel.authapi.repositories.EmployeeRepository;
import com.tericcabrel.authapi.repositories.UserRepository;
import com.tericcabrel.authapi.services.UserConfirmationService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/confirmedusers")
@RequiredArgsConstructor
@CrossOrigin( value="http://localhost:4200" )
public class UserConfirmationController {
    private final UserConfirmationService userService;
    private final EmployeeRepository repo;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("/list")
    public ResponseEntity<?> getListOfEmployees(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(this.repo.findByClient(currentUser));

    }

    @GetMapping("/allemployees")
    public ResponseEntity<?> getListAllEmployees(){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            // Fetch all employees
            List<Employee> allEmployees = this.repo.findAll();

            // Filter out the current user
            List<Employee> filteredEmployees = allEmployees.stream()
                    .filter(employee -> !employee.getUser().getId().equals(currentUser.getId()))
                    .collect(Collectors.toList());

            // Return the filtered list
            return ResponseEntity.ok(filteredEmployees);
        } catch (Exception e) {
            // Log the error and return an appropriate response
            // e.g., logger.error("Error fetching employees", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching employees");
        }
    }


    @GetMapping("/allemployees/{companyId}")
    public ResponseEntity<?> getListAllEmployees(@PathVariable Long companyId){


        return ResponseEntity.ok(this.repo.findEmployeesByCompanyId(companyId));

    }




    @PostMapping
    public ResponseEntity<HttpResponse> CreateEmployees(@RequestBody EmployeeCreateAccountModel model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User client = (User) authentication.getPrincipal();

        // Create a new Employee
        Employee e = new Employee();
        e.setClient(client);
        e.setAddress(model.getAddress());
        e.setPhone(model.getPhone());

        // Save the Employee first
        repo.save(e);

        // Save the non-encrypted password
        String nonEncryptedPassword = model.getPassword();

        // Create a new User
        User user = new User();
        user.setFullName(model.getFullName());
        user.setEmail(model.getEmail());
        user.setPassword(passwordEncoder.encode(model.getPassword()));
        user.setRole("ROLE_EMPLOYEE");

        // Set the Employee in the User
        user.setEmployee(e);

        // Save the User
        User newUser = userService.saveUser(user,nonEncryptedPassword);

        // Set the User in the Employee
        e.setUser(user);

        // Update the Employee to reflect the saved User
        repo.save(e);

        return ResponseEntity.created(URI.create("")).body(
                        HttpResponse.builder()
                        .timeStamp(LocalDateTime.now().toString())
                        .data(Map.of("user", newUser))
                        .message("User created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<HttpResponse> confirmUserAccount(@RequestParam("token") String token) {
        Boolean isSuccess = userService.verifyToken(token);
        return ResponseEntity.ok().body(
                         HttpResponse.builder()
                        .timeStamp(LocalDateTime.now().toString())
                        .data(Map.of("Success", isSuccess))
                        .message("Account Verified")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }
}
