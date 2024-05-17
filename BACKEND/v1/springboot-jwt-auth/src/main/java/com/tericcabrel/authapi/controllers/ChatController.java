package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.apiresponse.ApiResponse;
import com.tericcabrel.authapi.entities.Chat;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.ChatException;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.repositories.ChatRepository;
import com.tericcabrel.authapi.request.GroupChatReq;
import com.tericcabrel.authapi.request.SingleChatReq;
import com.tericcabrel.authapi.services.ChatService;
import com.tericcabrel.authapi.services.UserConfirmationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin( value="*" )
@RequestMapping("/api/chats")
@Slf4j
public class ChatController {
    @Autowired
    private UserConfirmationService userService;

    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatRepository chatRepository;

    @PostMapping("/single")
    public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatReq singleChatReq) throws UserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
       // Optional<User> reqUser = userService.findUserByProfile(jwt);
        Chat chat = chatService.createChat(currentUser, singleChatReq.getUserId());

        return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatReq groupChatReq) throws UserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User reqUser = (User) authentication.getPrincipal();
        log.info("Req Received for create grp");

        System.out.println("Req Received for create grp"+ groupChatReq);


        Chat chat = chatService.createGroup(groupChatReq, reqUser);

        return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> findChatByIdHandler(@PathVariable Integer chatId) throws UserException, ChatException {

        Chat chat = chatService.findChatById(chatId);

        return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Chat>> findAllChatsByUserIdHandler() throws UserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User reqUser = (User) authentication.getPrincipal();
        List<Chat> chat = chatService.findAllChatByUserId(reqUser.getId());

        return  new ResponseEntity<List<Chat>>(chat, HttpStatus.OK);
    }

    @GetMapping("/contact/{IdChat}")
    public ResponseEntity<?> findChatContact(@PathVariable Integer IdChat) throws UserException {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
         List<User> users=   this.chatRepository.findUsersByChatId(IdChat);
            // Fetch all employees


            // Filter out the current user
            List<User> filteredUsers = users.stream()
                    .filter(user -> !user.getId().equals(currentUser.getId()))
                    .collect(Collectors.toList());
            User finalContact=filteredUsers.get(0);

            // Return the filtered list
            return ResponseEntity.ok(finalContact);
        } catch (Exception e) {
            // Log the error and return an appropriate response
            // e.g., logger.error("Error fetching employees", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching employees");
        }
    }


    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer UserId) throws UserException, ChatException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User reqUser = (User) authentication.getPrincipal();
        Chat chat = chatService.addUserToGroup(UserId, chatId, reqUser);

        return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable Integer chatId, @PathVariable Integer UserId) throws UserException, ChatException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User reqUser = (User) authentication.getPrincipal();
        Chat chat = chatService.removeFromGroup(chatId, UserId, reqUser);

        return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId) throws UserException, ChatException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User reqUser = (User) authentication.getPrincipal();
        chatService.deleteChat(chatId, reqUser.getId());

        ApiResponse apiResponse = new ApiResponse("Chat Deleted Succesfully", true);

        return  new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }
}

