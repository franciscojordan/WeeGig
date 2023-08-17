package com.jpa.entities;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Data
@Entity
@Table(name = "JOB_APPLICATION")
@IdClass(JobApplicationId.class)
public class JobApplication {
    
    @Id
    @Column(name = "id_USER")
    private int userId;

    @Id
    @Column(name = "id_JOB_OFFERS")
    private int jobId;

    @Column(name = "application_date")
    private String applicationDate;

    @Column(name = "application_status")
    private String applicationStatus;

    // Relaciones con otras entidades si es necesario
}
