package com.jpa.services;

//import org.apache.el.stream.Optional;
import com.jpa.entities.Login;
import com.jpa.entities.UserRegistrationDto;
import com.jpa.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jpa.entities.User;
import com.jpa.repository.UserRepository;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginService loginService;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    

    public User getUserById(Integer id) {
        Optional <User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            return null; 
        }
    }

    public User register(UserRegistrationDto registrationDto) {
        // Primero, verifica si ya existe un registro con el mismo email en la tabla 'login'.
        Optional<Login> existingLogin = loginRepository.findById(registrationDto.getEmail());
        if (existingLogin.isPresent()) {
            throw new RuntimeException("El email ya existe.");
        }

        // Inserta en la tabla 'login' primero.
        Login login = new Login();
        login.setEmail(registrationDto.getEmail());
        login.setPassword(registrationDto.getPassword()); // considera cifrar la contraseña
        loginRepository.save(login);

        // Luego, inserta en la tabla 'users'.
//        User user = new User();
//        // Rellena los atributos de 'user' usando 'registrationDto'...
//        userRepository.save(user);
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        // No establezcas la contraseña aquí, eso ya lo manejaste en el Login
        user.setName(registrationDto.getName());
        user.setSurname(registrationDto.getSurname());
        user.setDocType(registrationDto.getDocType());
        user.setDocument(registrationDto.getDocument());
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setBirthdate(registrationDto.getBirthdate());
        user.setUserType(registrationDto.getUserType());
        user.setCompanyName(registrationDto.getCompanyName());
        user.setCompanyNif(registrationDto.getCompanyNif());
        user.setAddress(registrationDto.getAddress());
        user.setCompanyPhoneNumber(registrationDto.getCompanyPhoneNumber());
        user.setWebsite(registrationDto.getWebsite());

        return userRepository.save(user);
    }

}
