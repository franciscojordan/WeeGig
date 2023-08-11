//package com.jpa.entities;
//
//public class User {
//	private int id;
//    private String name;
//    private String surname;
//    private String email;
//    private int typeofdocument;
//    private String document;
//    private String birthDate;
//    private int	phoneNumber;
//    private int typeOfUser;
//
//	public User(int id, String name, String surname, String email, String document, String birthDate, int phoneNumber,
//			int typeofdocument, int typeOfUser) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.surname = surname;
//		this.email = email;
//		this.typeofdocument = typeofdocument;
//		this.document = document;
//		this.birthDate = birthDate;
//		this.phoneNumber = phoneNumber;
//		this.typeOfUser = typeOfUser;
//	}
//
//    public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getSurname() {
//		return surname;
//	}
//
//	public void setSurname(String surname) {
//		this.surname = surname;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getDocument() {
//		return document;
//	}
//
//	public void setDocument(String document) {
//		this.document = document;
//	}
//
//	public int getTypeofdocument() {
//		return typeofdocument;
//	}
//
//	public void setTypeofdocument(int typeofdocument) {
//		this.typeofdocument = typeofdocument;
//	}
//
//	public int getTypeOfUser() {
//		return typeOfUser;
//	}
//
//	public void setTypeOfUser(int typeOfUser) {
//		this.typeOfUser = typeOfUser;
//	}
//
//	public String getBirthDate() {
//		return birthDate;
//	}
//
//	public void setBirthDate(String birthDate) {
//		this.birthDate = birthDate;
//	}
//
//	public int getPhoneNumber() {
//		return phoneNumber;
//	}
//
//	public void setPhoneNumber(int phoneNumber) {
//		this.phoneNumber = phoneNumber;
//	}
//}


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
