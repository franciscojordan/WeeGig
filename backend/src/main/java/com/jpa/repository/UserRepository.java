package com.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jpa.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}