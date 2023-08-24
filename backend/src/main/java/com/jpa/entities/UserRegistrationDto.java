package com.jpa.entities;

import lombok.Data;
import java.util.Date;

@Data
public class UserRegistrationDto {

    private String username;
    private String email;
    private String password;
    private String name;
    private String surname;
    private Integer docType;
    private String document;
    private String phoneNumber;
    private Date birthdate;
    private User.UserType userType;
    private String companyName;
    private String companyNif;
    private String address;
    private String companyPhoneNumber;
    private String website;
}
