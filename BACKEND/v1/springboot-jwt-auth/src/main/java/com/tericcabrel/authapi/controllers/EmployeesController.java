package com.tericcabrel.authapi.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.tericcabrel.authapi.dtos.EmployeeCreateAccountModel;
import com.tericcabrel.authapi.dtos.JsonResponse;
import com.tericcabrel.authapi.entities.Employee;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repositories.EmployeeRepository;
import com.tericcabrel.authapi.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/v1/employees")
@RestController
@CrossOrigin( value="*" ) 
public class EmployeesController {

	@Autowired
    private  PasswordEncoder passwordEncoder; 
  @Autowired
  private UserRepository userRepository;


	@Autowired
	private EmployeeRepository repo;

	// GET LIST OF EMPLOYEES
	
	
	@GetMapping("/list")
	public ResponseEntity<?> getListOfEmployees(){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	     User currentUser = (User) authentication.getPrincipal();

		return ResponseEntity.ok(this.repo.findByClient(currentUser));

	}

	/*
	@PostMapping("/add")
	public ResponseEntity<?> getListOfEmployees( @RequestBody EmployeeCreateAccountModel model ){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	     User client = (User) authentication.getPrincipal();


	     // set employer as a User
	     Employee e = new Employee(); 
	     e.setClient(client);

	     // set the employee in the employee


	     var user = new User()
	             .setFullName(model.getFullName())
	             .setEmail(model.getEmail())
	             .setPassword(passwordEncoder.encode(model.getPassword()));
	     user.setRole("ROLE_EMPLOYEE");

		userRepository.save(user);
	     e.setUser(user);
	     
	     e.setAddress(model.getAddress());
	     e.setPhone(model.getPhone());
	     
	     
	     this.repo.save(e);


	     return ResponseEntity.ok( new JsonResponse(true,"Employee inserted successfullly") );  
    	 
	}
	*/

	@PostMapping("/add")
	public ResponseEntity<?> CreateEmployees(@RequestBody EmployeeCreateAccountModel model) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		User client = (User) authentication.getPrincipal();

		// Create a new Employee
		Employee e = new Employee();
		e.setClient(client);
		e.setAddress(model.getAddress());
		e.setPhone(model.getPhone());

		// Save the Employee first
		repo.save(e);

		// Create a new User
		User user = new User();
		user.setFullName(model.getFullName());
		user.setEmail(model.getEmail());
		user.setPassword(passwordEncoder.encode(model.getPassword()));
		user.setRole("ROLE_EMPLOYEE");

		// Set the Employee in the User
		user.setEmployee(e);

		// Save the User
		userRepository.save(user);

		// Set the User in the Employee
		e.setUser(user);

		// Update the Employee to reflect the saved User
		repo.save(e);

		return ResponseEntity.ok(new JsonResponse(true, "Employee inserted successfully"));
	}








	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {


		Employee employee = repo.findById(id).get();

		User user = employee.getUser();
		employee.setUser(null);
		userRepository.delete(user);

		repo.delete(employee);



		return ResponseEntity.ok(new JsonResponse(true, "employee deleted successfully"));
	}



}
