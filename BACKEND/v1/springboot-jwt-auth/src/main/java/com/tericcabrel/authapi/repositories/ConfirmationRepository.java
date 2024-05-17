package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Confirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationRepository extends JpaRepository<Confirmation,Long> {
Confirmation findByToken(String token);

}
