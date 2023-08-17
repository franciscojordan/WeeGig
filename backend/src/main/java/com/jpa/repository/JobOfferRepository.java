package com.jpa.repository;

import com.jpa.entities.JobApplication;
import com.jpa.entities.JobOffer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOfferRepository extends JpaRepository<JobOffer, Integer> {
	List<JobOffer> findByIdEmployer(Integer idEmployer);
}
