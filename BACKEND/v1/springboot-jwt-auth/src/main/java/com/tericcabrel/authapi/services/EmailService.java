package com.tericcabrel.authapi.services;

public interface EmailService {
    void sendSimpleMailMessage(String name,String password, String to, String token);
     void sendSimpleMailTaskNotification(String name,String title,String description, String to, Integer userId);
    void sendMimeMessageWithAttachments(String name,String password, String to, String token);
    void sendMimeMessageWithEmbeddedFiles(String name,String password, String to, String token);
    void sendHtmlEmail(String name, String to, String token);
    void sendHtmlEmailWithEmbeddedFiles(String name, String to, String token);
}
