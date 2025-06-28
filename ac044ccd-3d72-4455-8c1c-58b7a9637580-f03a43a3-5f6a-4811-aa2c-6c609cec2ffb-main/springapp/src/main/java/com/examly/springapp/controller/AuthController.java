package com.examly.springapp.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.InvalidUsernameException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthController {
   private Logger logger=LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) throws UserAlreadyExistsException {
        User newUser = userService.createUser(user);
        return ResponseEntity.status(201).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> loginUser(@RequestBody User u) throws InvalidUsernameException {
        return ResponseEntity.status(201).body(userService.loginUser(u));
    }

}
