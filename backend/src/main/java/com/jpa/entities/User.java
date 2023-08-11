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

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USERS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @Column(name = "doc_type")
    private int typeofdocument;

    @Column(name = "document")
    private String document;

    @Column(name = "phone_number")
    private String phoneNumber; // Modificado a String para corresponder con la definición de la base de datos

    @Column(name = "birth_date")
    private String birthDate; // Considere usar LocalDate en lugar de String para fechas

    @Column(name = "user_type")
    @Enumerated(EnumType.STRING) // Si quieres almacenar el valor enum como String
    private UserType typeOfUser;

    // Campos adicionales según la tabla
    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_nif")
    private String companyNIF;

    @Column(name = "address")
    private String address;

    @Column(name = "company_phone_pumber")
    private String companyPhoneNumber;

    @Column(name = "website")
    private String website;

    public enum UserType {
        Employee, Employer
    }

    // Los constructores, getters y setters son generados automáticamente por Lombok
}


