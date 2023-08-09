package com.jpa.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobsController {

	@GetMapping("/jobs")
    public String jobs() {
    	return ("I wanna get all jobs");
    }
}
