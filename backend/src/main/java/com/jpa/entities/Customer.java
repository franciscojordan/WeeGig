package com.jpa.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "CUSTOMERS")
@Data
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	Long id;

	@Column(name = "NAME")
	String name;

	@Column(name = "SURNAME")
	String surname;

	@Column(name = "BIRTHDATE")
	String birtdate;

	@Column(name = "PHONE")
	String phone;

	@Column(name = "COUNTRY")
	String country;

	@Column(name = "CITY")
	String city;

	@Column(name = "DIRECTION")
	String direction;

	@Column(name = "POSTCODE")
	String postcode;
}