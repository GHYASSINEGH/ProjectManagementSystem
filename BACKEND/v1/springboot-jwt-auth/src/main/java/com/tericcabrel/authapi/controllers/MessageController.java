package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.apiresponse.ApiResponse;
import com.tericcabrel.authapi.entities.Message;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.ChatException;
import com.tericcabrel.authapi.exceptions.MessageException;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.request.SendMessageReq;
import com.tericcabrel.authapi.services.MessageService;
import com.tericcabrel.authapi.services.UserConfirmationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin( value="*" )
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserConfirmationService userService;


    @PostMapping("/create")
    public ResponseEntity<Message> sentMessageHandler(@RequestBody SendMessageReq req) throws UserException, ChatException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        req.setUserId(user.getId());
        Message sentMessage = messageService.sentMessage(req);
        System.out.println("Message sent successfully from"+user.getId());

        return new ResponseEntity<Message>(sentMessage, HttpStatus.OK);

    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> GetChatMessagesHandler(@PathVariable Integer chatId) throws UserException, ChatException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();


        List<Message> messages = messageService. getChatsMessages(chatId, user );

        return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);

    }

     @GetMapping("/messagesCurrentUser/{userId}")
     public ResponseEntity<List<Message>> GetUserMessagesHandler(@PathVariable Integer userId) throws UserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();


        List<Message> messages = messageService.getUserMessages( user.getId() );

        return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);

    }


    @GetMapping("/other-user-messages/{chatId}")
    public ResponseEntity<List<Message>> getOtherUserMessagesHandler(@PathVariable Integer chatId) throws UserException, ChatException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        // Fetch all messages of the chat
        List<Message> allMessages = messageService.getChatsMessages(chatId, currentUser);

        // Filter messages to exclude those sent by the current user
        List<Message> otherUserMessages = allMessages.stream()
                .filter(message -> !message.getUser().getId().equals(currentUser.getId()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(otherUserMessages, HttpStatus.OK);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessagesHandler(@PathVariable Integer messageId ) throws UserException, MessageException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();


        messageService.deleteMessage(messageId, user );

        ApiResponse apiResponse = new ApiResponse("Message deteted succesfuly -----", true);

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);

    }



}

