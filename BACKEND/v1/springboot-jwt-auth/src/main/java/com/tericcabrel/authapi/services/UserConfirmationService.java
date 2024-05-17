package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.request.UpdateUserReq;

import java.util.List;
import java.util.Optional;

public interface UserConfirmationService {
    User saveUser(User user,String  nonEncryptedPassword);
    Boolean verifyToken(String token);

    public User finyById(Integer id) throws UserException;
    public Optional<User> findUserByProfile(String jwt) throws UserException;
    public User updateUser(Integer id, UpdateUserReq req) throws UserException;
    public List<User> searchUser(String query);
    public List<User> searchByUserName(String name);

}
