package com.jpa.repository;

import com.jpa.entities.JobOffer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOfferRepository extends JpaRepository<JobOffer, Integer> {
}
