package com.tericcabrel.authapi.utils;

import java.util.Date;

public class EmailUtils {
    public static String getEmailMessage(String name,String password, String host, String token) {
        return "Hello " + name + ",\n\nYou can sign in using your mail and this password :  \n\n" +password +
                ",\n\nYour new account has been created. Please click the link below to verify your account. \n\n" +
                getVerificationUrl(host, token) + "\n\nThe support Team";
    }

  public static String getEmailTask(String name,String title, String description, Integer userId) {
        return "Hello " + name + ",\n\nYou have been assigned to a new task :  " +title +
      ",\n\n Here is more details about it  :  " +description +
                ",\n\n Please click the link below to access to your task. \n\n" +
                getVerificationTask(userId) + "\n\nThe support Team";
    }

    public static String getVerificationUrl(String host, String token) {
        return host + "/api/confirmedusers?token=" + token;
    }
    public static String getVerificationTask( Integer userId) {
        return "http://localhost:4200/dashboard/app/my-tasks/" + userId;
    }
}

