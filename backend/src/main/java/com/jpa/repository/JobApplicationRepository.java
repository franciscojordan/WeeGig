package com.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jpa.entities.JobApplication;
import com.jpa.entities.JobApplicationId;

public interface JobApplicationRepository extends JpaRepository<JobApplication, JobApplicationId> {
	@Query("SELECT ja FROM JobApplication ja WHERE ja.userId = ?1")
    List<JobApplication> findByUserId(int userId);
	List<JobApplication> findByjobId(int jobId);
}
