package com.tericcabrel.authapi.exceptions;

public class MessageException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public MessageException(String message) {
        super(message);
    }
}