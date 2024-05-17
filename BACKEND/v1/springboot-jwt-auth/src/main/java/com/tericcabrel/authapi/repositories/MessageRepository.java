package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query("Select m from Message m join m.chat c where c.id=:chatId")
    public List<Message> findByChatId(@Param("chatId") Integer chatId);
    @Query("Select m from Message m join m.user u where u.id=:userId")
    public List<Message> findByUserId(@Param("userId") Integer userId);
}