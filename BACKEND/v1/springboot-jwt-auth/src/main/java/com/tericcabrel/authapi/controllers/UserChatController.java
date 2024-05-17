package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.apiresponse.ApiResponse;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.request.UpdateUserReq;
import com.tericcabrel.authapi.services.UserConfirmationService;
import com.tericcabrel.authapi.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin( value="*" )
@Slf4j
public class UserChatController {
    @Autowired
    private UserConfirmationService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler() throws UserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User userByProfile = (User) authentication.getPrincipal();

        System.out.println("User profile :: loged in "+userByProfile);
        return new ResponseEntity<User>(userByProfile, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String q) {
        List<User> searchUser = userService.searchUser(q);
        return new ResponseEntity<List<User>>(searchUser, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserReq updateUserReq, @RequestHeader("Authorization") String token) throws UserException {
        Optional<User> user = userService.findUserByProfile(token);
        //	log.info("updating user profile"+user.getFullName());
        userService.updateUser(user.get().getId(), updateUserReq);
        ApiResponse apiResponse = new ApiResponse("User Updated", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<HashSet<User>> searchByNameHandler(@RequestParam("name") String name) {
        List<User> searchUser = userService.searchByUserName(name);
        HashSet<User> setUsr = new HashSet<>(searchUser);

        return new ResponseEntity<HashSet<User>>(setUsr, HttpStatus.OK);
    }


}

