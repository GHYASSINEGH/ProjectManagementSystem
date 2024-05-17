package com.tericcabrel.authapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tericcabrel.authapi.entities.Company;
import com.tericcabrel.authapi.entities.User;

public interface CompanyRepository extends JpaRepository<Company,Long> {
	List<Company> findByClient( User client );
	
}
