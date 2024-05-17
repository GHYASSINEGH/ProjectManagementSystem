package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.entities.Chat;
import com.tericcabrel.authapi.entities.Message;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.ChatException;
import com.tericcabrel.authapi.exceptions.MessageException;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.repositories.MessageRepository;
import com.tericcabrel.authapi.repositories.UserRepository;
import com.tericcabrel.authapi.request.SendMessageReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserConfirmationService userService;
    @Autowired
    private ChatService chatService;
  @Autowired
    private UserRepository userRepository;

    @Override
    public Message sentMessage(SendMessageReq req) throws UserException, ChatException {

        User user = userService.finyById(req.getUserId());
        Chat chat = chatService.findChatById(req.getChatId());

        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(req.getContent());
        message.setCreatedAt(LocalDateTime.now());
        Message message2 = messageRepository.save(message);
        return message2;
    }

    @Override
    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException {
        Chat chat = chatService.findChatById(chatId);

        if(chat.getUsers().contains(reqUser)) {
            throw new UserException("U Cant get this message, U are not related to this chat. :: "+chat.getId());
        }

        List<Message> messages = messageRepository.findByChatId(chat.getId());

        return messages;
    }
    @Override
    public List<Message> getUserMessages(Integer userId) throws  UserException {

        User user =userRepository.findById(userId).get();



        List<Message> messages = messageRepository.findByUserId(user.getId());

        return messages;
    }

    @Override
    public Message findMessageById(Integer messageId) throws MessageException {
        Optional<Message> opt = messageRepository.findById(messageId);

        if(opt.isPresent()) {
            return opt.get();
        }
        throw new MessageException(" Message not found with Id :: "+messageId);
    }

    @Override
    public void deleteMessage(Integer messageId, User reqUser) throws MessageException , UserException{
        Message message = findMessageById(messageId);

        if(message.getUser().getId().equals(reqUser.getId())) {
            messageRepository.deleteById(messageId);
        }
        throw new UserException("you cant delete another users message  :: "+reqUser.getFullName());
    }

}

