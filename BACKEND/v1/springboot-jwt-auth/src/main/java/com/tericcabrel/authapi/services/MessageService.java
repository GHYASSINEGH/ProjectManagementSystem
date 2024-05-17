package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.entities.Message;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.ChatException;
import com.tericcabrel.authapi.exceptions.MessageException;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.request.SendMessageReq;

import java.util.List;

public interface MessageService {
    public Message sentMessage(SendMessageReq req) throws UserException, ChatException;

    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException;

    List<Message> getUserMessages(Integer userId) throws  UserException;

    public Message findMessageById(Integer messageId) throws MessageException;

    public void deleteMessage(Integer messageId, User reqUser)throws MessageException, UserException;

}

