package com.jpa.entities;

public class User {
	private int id;
    private String name;
    private String surname;
    private String email;
    private int typeofdocument;
    private String document;
    private String birthDate;
    private int	phoneNumber;
    private int typeOfUser;

	public User(int id, String name, String surname, String email, String document, String birthDate, int phoneNumber,
			int typeofdocument, int typeOfUser) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.typeofdocument = typeofdocument;
		this.document = document;
		this.birthDate = birthDate;
		this.phoneNumber = phoneNumber;
		this.typeOfUser = typeOfUser;
	}

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public int getTypeofdocument() {
		return typeofdocument;
	}

	public void setTypeofdocument(int typeofdocument) {
		this.typeofdocument = typeofdocument;
	}

	public int getTypeOfUser() {
		return typeOfUser;
	}

	public void setTypeOfUser(int typeOfUser) {
		this.typeOfUser = typeOfUser;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public int getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(int phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}