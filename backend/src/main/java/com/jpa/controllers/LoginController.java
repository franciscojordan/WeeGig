package com.jpa.controllers;

import com.jpa.entities.Login;
import com.jpa.entities.User;
import com.jpa.repository.LoginRepository; // Asegúrate de importar el repositorio correcto
import com.jpa.repository.UserRepository;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class LoginController {

    @Autowired
    private LoginRepository loginRepository; // Inyecta el repositorio

    @Autowired
    private UserRepository userRepository;
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/authentication")
    public AuthenticationResponse authenticate(@RequestBody Credentials credentials) {
        String email = credentials.getEmail();
        String password = credentials.getPassword();

        Login login = loginRepository.findByEmailAndPassword(email, password);
        
        System.out.println(login);
        if (login != null) {
            User user = userRepository.findByEmail(email); // Busca el usuario por correo electrónico
            return new AuthenticationResponse("success", user);
        } else {
            return new AuthenticationResponse("failure", null);
        }
    }
    
    @Getter @Setter
    public static class Credentials {
        private String email;
        private String password;
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class AuthenticationResponse {
        private String status;
        private User user;
        //private Login user;
    }
}
