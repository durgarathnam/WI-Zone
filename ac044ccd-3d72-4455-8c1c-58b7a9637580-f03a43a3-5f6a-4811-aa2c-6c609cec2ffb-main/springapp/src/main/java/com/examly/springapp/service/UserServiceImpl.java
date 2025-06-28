package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.InvalidUsernameException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtils jwtutils;

    public User createUser(User user) throws UserAlreadyExistsException {
        User newUser = userRepo.findByEmail(user.getEmail());
        if (newUser == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepo.save(user);
        }
        throw new UserAlreadyExistsException("User Already Exists");
    }

    public LoginDTO loginUser(User user) throws InvalidUsernameException {
        try {
            Authentication authentication = authManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                List<String> roleList = authentication.getAuthorities().stream().map(r -> r.getAuthority())
                        .collect(Collectors.toList());
                String role = roleList.get(0);
                LoginDTO loginDTO = new LoginDTO();
                loginDTO.setUserName(user.getEmail());
                loginDTO.setJwtToken(jwtutils.generateToken(user.getEmail()));
                loginDTO.setRole(role);
                User tempUser = userRepo.findByEmail(user.getEmail());
                loginDTO.setUserId(tempUser.getUserId());
                loginDTO.setUserName(tempUser.getUsername());
                return loginDTO;
            }
        } catch (Exception e) {
            throw new InvalidUsernameException("Invalid User Name or Password");
        }
        return null;
    }
}

