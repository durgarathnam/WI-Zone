package com.examly.springapp.exceptions;

public class InvalidUsernameException extends Exception{

    public InvalidUsernameException(){
        super();
    }

    public InvalidUsernameException(String message){
        super(message);
    }

}
