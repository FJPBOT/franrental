package com.franrental.backend.controller;

import com.franrental.backend.dto.CreateReviewDTO;
import com.franrental.backend.dto.ReviewResponseDTO;
import com.franrental.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> create(@Valid @RequestBody CreateReviewDTO dto) {
        ReviewResponseDTO response = reviewService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsByVehicle(@PathVariable Long vehicleId) {
        List<ReviewResponseDTO> reviews = reviewService.getReviewsByVehicle(vehicleId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/vehicle/{vehicleId}/stats")
    public ResponseEntity<Map<String, Object>> getVehicleStats(@PathVariable Long vehicleId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", reviewService.getAverageRating(vehicleId));
        stats.put("reviewCount", reviewService.getReviewCount(vehicleId));
        return ResponseEntity.ok(stats);
    }
}