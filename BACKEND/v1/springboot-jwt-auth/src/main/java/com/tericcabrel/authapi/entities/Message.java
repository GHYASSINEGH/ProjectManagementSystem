package com.tericcabrel.authapi.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "messages")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;


    @Column( unique=true, length = 3000)
    private String content;


    @Column( unique=true )
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private User user;



    @ManyToOne
    private Chat chat;



    // SELECT * FROM MESSAGE WHARE SENDER = moi and receiver = target
    // UNION
    // SELECT * FROM MESSAGE WHARE SENDER = target and receiver = moi

}
