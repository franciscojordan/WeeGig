package com.jpa.services;

import com.jpa.entities.Login;
import com.jpa.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;
    public Login createLogin(String email, String password) {
        Login login = new Login();
        login.setEmail(email);
        login.setPassword(password); // Considera usar algún tipo de encriptación para la contraseña.
        return loginRepository.save(login);
    }
}
