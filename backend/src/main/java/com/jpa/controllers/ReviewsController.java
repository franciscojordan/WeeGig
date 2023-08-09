package com.jpa.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewsController {

	@GetMapping("/getreviews")
    public String getReviews() {
    	return ("Hi, you wanna know all about reviews");
    }

//	http://localhost:8080/reviews?user=victor
	@GetMapping("/reviews")
    public String reviewsFrom(
        @RequestParam(name = "user") String user
    ) {
    	return ("I wanna get reviews from " + user);
	}
}

