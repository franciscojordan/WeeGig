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

    @Column(name = "status")
    private String status;
    
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

}
