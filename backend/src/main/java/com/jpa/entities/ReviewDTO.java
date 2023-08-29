//package com.jpa.entities;
//
//import lombok.Getter;
//import lombok.Setter;
//import lombok.NoArgsConstructor;
//import lombok.AllArgsConstructor;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Column;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class Review {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String reviewTitle;
//
//    @Column(nullable = false)
//    private String reviewContent;
//
//    @Column(nullable = false)
//    private int rating;
//
//    @Column(name = "id_reviewer", nullable = false)
//    private Long idReviewer;
//
//    @Column(name = "id_reviewed", nullable = false)
//    private Long idReviewed;
//
//    // Puedes agregar otros campos y métodos según tus necesidades
//}
