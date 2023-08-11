package com.jpa.repository;

import com.jpa.entities.Login;
//import com.jpa.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

public interface LoginRepository extends JpaRepository<Login, String> {
    
    Login findByEmailAndPassword(String email, String password);
}
