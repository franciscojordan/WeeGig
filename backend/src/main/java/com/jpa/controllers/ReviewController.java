package com.jpa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jpa.entities.Review;
import com.jpa.repository.ReviewRepository;
import com.jpa.services.UserService;
import com.jpa.entities.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserService userService;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
    }
    

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Map<String, Object>> getReviewsByReviewedId(@RequestParam(name = "to", required = false) Integer id) {
        List<Review> reviews = id != null ? reviewRepository.findByIdReviewed(id) : reviewRepository.findAll();

        // Lista para almacenar las reseñas con los nombres de los revisores
        List<Map<String, Object>> response = new ArrayList<>();

        for (Review review : reviews) {
            User reviewer = userService.getUserById(review.getIdReviewer());
            String reviewerName = reviewer != null ? reviewer.getName() : "Desconocido";

            Map<String, Object> reviewMap = new HashMap<>();
            reviewMap.put("id_REVIEWS", review.getIdReviews());
            reviewMap.put("review_content", review.getReviewContent());
            reviewMap.put("rating", review.getRating());
            reviewMap.put("id_Reviewer", review.getIdReviewer());
            reviewMap.put("reviewerName", reviewerName); // Aquí está el nombre del revisor
            reviewMap.put("id_Reviewed", review.getIdReviewed());
            reviewMap.put("id_Job", review.getIdJob());
            reviewMap.put("review_date", review.getReviewDate());

            response.add(reviewMap);
        }

        return response;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/save")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            Review savedReview = reviewRepository.save(review);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al guardar la reseña: " + e.getMessage());
        }
    }

}
