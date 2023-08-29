package com.jpa.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

//import javax.persistence.*;


@Entity
@Table(name = "LOGIN")
@Getter
@Setter
public class Login {
  @Id
  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;


}
