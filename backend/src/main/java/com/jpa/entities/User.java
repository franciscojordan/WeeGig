package com.jpa.entities;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "USERS", schema = "WeeGigDB")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_USER")
    private Integer idUser;

    @Column(name = "username", length = 16)
    private String username;

    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "surname", length = 45)
    private String surname;

    @Column(name = "doc_type")
    private Integer docType;

    @Column(name = "document", length = 9)
    private String document;

    @Column(name = "phone_number", length = 12)
    private String phoneNumber;

    @Column(name = "birthdate")
    private Date birthdate;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", length = 9)
    private UserType userType;

    @Column(name = "company_name", length = 45)
    private String companyName;

    @Column(name = "company_NIF", length = 9)
    private String companyNif;

    @Column(name = "address", length = 45)
    private String address;

    @Column(name = "company_phone_number", length = 12)
    private String companyPhoneNumber;

    @Column(name = "website", length = 45)
    private String website;

    public enum UserType {
        Employee,
        Employer
    }
}
