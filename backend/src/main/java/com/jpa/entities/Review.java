package com.jpa.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

//@Data
//@Entity
//@Table(name = "REVIEWS")
//public class Review {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id_REVIEWS")
//    private Integer id;
//
//    @Column(name = "review_title")
//    private String reviewTitle;
//
//    @Column(name = "review_content")
//    private String reviewContent;
//
//    @Column(name = "rating")
//    private Integer rating;
//
//    @Column(name = "id_Reviewer")
//    private Integer idReviewer;
//
//    @Column(name = "id_Reviewed")
//    private Integer idReviewed;
//}

@Data
@Entity
@Table(name = "REVIEWS")
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_REVIEWS")
    private Integer idReviews; // Cambiado a camelCase

    @Column(name = "review_content")
    private String reviewContent;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "id_Reviewer")
    private Integer idReviewer;

    @Column(name = "id_Reviewed")
    private Integer idReviewed;

    @Column(name = "id_Job")
    private Integer idJob;

    @Column(name = "review_date")
    private Date reviewDate;

    // Gracias a Lombok, no necesitas escribir explícitamente los getters y setters.
}