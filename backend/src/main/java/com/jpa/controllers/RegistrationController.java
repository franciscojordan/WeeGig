package com.jpa.controllers;

import com.jpa.entities.Login;
import com.jpa.entities.User;
import com.jpa.entities.UserRegistrationDto;
import com.jpa.repository.LoginRepository;
import com.jpa.repository.UserRepository;
import com.jpa.services.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/register")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ApiResponse {
        private boolean success;
        private String message;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<ApiResponse> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        try {
            userService.register(registrationDto);
            return new ResponseEntity<>(new ApiResponse(true, "Usuario registrado con éxito"), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }


}