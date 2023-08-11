package com.jpa.services;

//import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jpa.entities.User;
import com.jpa.repository.UserRepository;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
//    public User getUserByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }

//	public User getUserById(Integer id) {
//		return userRepository.findById(id);
//	}
    public User getUserById(Integer id) {
        Optional <User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            // Handle the case where the user is not found.
            // You might return null or throw an exception depending on your use case.
            return null; 
        }
    }
}
