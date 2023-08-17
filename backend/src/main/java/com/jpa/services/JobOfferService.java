package com.jpa.services;

import com.jpa.entities.JobOffer;
import com.jpa.repository.JobOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;

    @Autowired
    public JobOfferService(JobOfferRepository jobOfferRepository) {
        this.jobOfferRepository = jobOfferRepository;
    }

    public List<JobOffer> getAllJobOffers() {
        System.out.println(jobOfferRepository.findAll());
    	return jobOfferRepository.findAll();
    }
    
    public JobOffer getJobOfferById(int id) {
        return jobOfferRepository.findById(id).orElse(null);
    }
    
    public JobOffer save(JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }
    
    public List<JobOffer> getJobOffersByEmployerId(int idEmployer) {
    	return jobOfferRepository.findByIdEmployer(idEmployer);
    }
}
