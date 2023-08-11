//package com.jpa.entities;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
////import javax.persistence.*;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//
//import java.util.Date;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "JOB_OFFERS")
//public class JobOffer {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id_job_offers")
//    private Integer id;
//
//    @Column(name = "title")
//    private String title;
//
//    @Column(name = "description")
//    private String description;
//
//    @Column(name = "type_of_payment")
//    private String typeOfPayment;
//
//    @Column(name = "payment")
//    private String payment;
//
//    @Column(name = "ubicacion")
//    private String ubicacion;
//
//    @Column(name = "schedule")
//    private Date schedule;
//
//    @Column(name = "category")
//    private String category;
//
//    @Column(name = "id_employer")
//    private Integer idEmployer;
//
//    @Column(name = "id_employees")
//    private Integer idEmployees;
//}

package com.jpa.entities;

//import lombok.AllArgsConstructor;
//import lombok.Data;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

//import javax.persistence.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "JOB_OFFERS", schema = "WeeGigDB")
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_JOB_OFFERS")
    private Integer idJobOffers;

    @Column(name = "title", length = 45)
    private String title;

    @Column(name = "description", length = 45)
    private String description;

    @Column(name = "payment_type", length = 45)
    private String paymentType;

    @Column(name = "payment", length = 45)
    private String payment;

    @Column(name = "location", length = 45)
    private String location;

    @Column(name = "schedule")
    private Date schedule;

    @Column(name = "category", length = 45)
    private String category;

    @Column(name = "id_Employer")
    private Integer idEmployer;

    @Column(name = "id_Employees")
    private Integer idEmployees;

    // Assuming that there is an entity named User with the primary key idUser
//    @ManyToOne
//    @JoinColumn(name = "id_Employer", referencedColumnName = "id_USER", insertable = false, updatable = false)
//    private User employer;
}
