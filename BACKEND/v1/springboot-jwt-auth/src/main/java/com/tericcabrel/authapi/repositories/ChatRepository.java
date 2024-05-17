package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Chat;
import com.tericcabrel.authapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("SELECT c.users FROM Chat c WHERE c.id = :chatId")
    List<User> findUsersByChatId(Integer chatId);

    @Query("select c from Chat c join c.users u where u.id =:userId")
    public List<Chat> findChatByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user2 MEMBER OF c.users AND :reqUser MEMBER OF c.users")
    public Chat findSingleChatByUserIds(@Param("user2") User user2, @Param("reqUser") User reqUser);
}