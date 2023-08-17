package com.jpa.controllers;

import com.jpa.entities.JobApplication;
import com.jpa.entities.JobOffer;
import com.jpa.repository.JobOfferRepository;
import com.jpa.services.JobOfferService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobOfferController {

    private final JobOfferService jobOfferService;

    @Autowired
    public JobOfferController(JobOfferService jobOfferService) {
        this.jobOfferService = jobOfferService;
    }
    
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<JobOffer> getAllJobOffers() {
        return jobOfferService.getAllJobOffers();
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public JobOffer getJobOfferById(@PathVariable int id) {
        return jobOfferService.getJobOfferById(id);
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<JobOffer> createJobOffer(@RequestBody JobOffer jobOffer) {
        JobOffer savedJobOffer = jobOfferService.save(jobOffer);
        return new ResponseEntity<>(savedJobOffer, HttpStatus.CREATED);
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/employer/{idEmployer}")
    public List<JobOffer> getJobOffersByEmployerId(@PathVariable Integer idEmployer) {
        return jobOfferService.getJobOffersByEmployerId(idEmployer);
    }
   
}
