package com.examly.springapp.service;

import com.examly.springapp.exceptions.InvalidUsernameException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

public interface UserService {

    User createUser(User user) throws UserAlreadyExistsException;
    LoginDTO loginUser(User user) throws InvalidUsernameException;

}
