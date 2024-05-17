package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Company;
import com.tericcabrel.authapi.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);




    User findByEmailIgnoreCase(String email);
    Boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.fullName LIKE %:query% OR u.email LIKE %:query%")
    public List<User> searchUser(@Param("query") String query);

    @Query("SELECT u FROM User u WHERE u.fullName LIKE %:name%")
    public List<User> searchByUserName(@Param("name") String name);

}
