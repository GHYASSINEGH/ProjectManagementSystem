package com.tericcabrel.authapi.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.web.bind.annotation.*;

import com.tericcabrel.authapi.dtos.CompanyModel;
import com.tericcabrel.authapi.dtos.JsonResponse;
import com.tericcabrel.authapi.entities.Company;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repositories.CompanyRepository;

 

@RequestMapping("/api/v1/companies")
@RestController
@CrossOrigin( value="*" ) 
public class CompanyController {

	
	@Autowired
	private CompanyRepository repo;
	
	
	@GetMapping("/list")
	public ResponseEntity<?> getClientCompanies(){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	     User currentUser = (User) authentication.getPrincipal();
	     
	     
	     List<Company> companies = this.repo.findByClient(currentUser);
	     
	     
	    return ResponseEntity.ok(companies);  

	}
	
	
	@PostMapping("/add") 
	public ResponseEntity<?> addNewCompany(  @RequestBody CompanyModel model  ){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	     User currentUser = (User) authentication.getPrincipal();
	     
	     
	     Company c = new Company();
	     
	     c.setName(model.getName());
	     c.setAddress(model.getAddress());
	     c.setClient(currentUser);
	     c.setDescreption(model.getDescreption());
	     c.setEmail(model.getEmail());
	     c.setActivity_sector(model.getActivity_sector());
	     c.setPhone(model.getPhone());
	     c.setFax(model.getFax());
	     c.setSocial(model.getSocial());
	     
	     List<Company> companies = this.repo.findByClient(currentUser);
	     
	    
	    
	     if( companies.size() < 3 ) {
	    	 this.repo.save(c);
	    	 return ResponseEntity.ok( new JsonResponse(true,"Company inserted successfullly") );  
	    	 
	    	 
	     }else {
	    	 return ResponseEntity.ok( new JsonResponse(false,"Maximum companies number reached.") );  
	     }
	      
	     
	   

	}
	
	
	
	
	// DELETE
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    User currentUser = (User) authentication.getPrincipal();

	    Company company = repo.findById(id).get();

 
	    //company.setClient(null);
	    //repo.save(company); 
	    repo.delete(company);

	    return ResponseEntity.ok(new JsonResponse(true, "Company deleted successfully"));
	}
	
	
	
	
	// GET COMPANY by ID 
	@GetMapping("/details/{id}")
	public ResponseEntity<?> company(@PathVariable Long id) {
	   /* Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    User currentUser = (User) authentication.getPrincipal();

	    Company company = repo.findById(id).get();*/

		try {
			Company company = repo.findById(id).get();


		    return ResponseEntity.ok(company);
		}catch(Exception e) {
		    return ResponseEntity.ok(new JsonResponse(false, "Company not found"));
		}
	}
	
	
	
}
