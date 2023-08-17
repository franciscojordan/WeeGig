package com.jpa.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jpa.entities.JobApplication;
import com.jpa.repository.JobApplicationRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/job-applications")
public class JobApplicationController {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationController(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

//    @GetMapping("/user/1")
//    public List<JobApplication> getUser1Applications() {
//        return jobApplicationRepository.findByIdUserId(1);
//    }
    
    @GetMapping("/user/{userId}")
    public List<JobApplication> getUserApplications(@PathVariable int userId) {
        return jobApplicationRepository.findByUserId(userId);
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<JobApplication> applyForJob(@RequestBody JobApplication jobApplication) {
    	System.out.println(jobApplication);
        JobApplication savedApplication = jobApplicationRepository.save(jobApplication);
        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }
    
    @GetMapping("/job/{jobId}")
    public List<JobApplication> getJobApplicationsByJobId(@PathVariable int jobId) {
        return jobApplicationRepository.findByjobId(jobId);
    }
}

