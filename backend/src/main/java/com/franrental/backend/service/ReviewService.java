package com.franrental.backend.service;

import com.franrental.backend.dto.CreateReviewDTO;
import com.franrental.backend.dto.ReviewResponseDTO;
import com.franrental.backend.model.Review;
import com.franrental.backend.model.User;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.ReviewRepository;
import com.franrental.backend.repository.UserRepository;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
                         VehicleRepository vehicleRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public ReviewResponseDTO create(CreateReviewDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehiculo no encontrado"));

        Review review = new Review();
        review.setUser(user);
        review.setVehicle(vehicle);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        Review saved = reviewRepository.save(review);
        return toResponseDTO(saved);
    }

    public List<ReviewResponseDTO> getReviewsByVehicle(Long vehicleId) {
        return reviewRepository.findByVehicleId(vehicleId).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Double getAverageRating(Long vehicleId) {
        Double avg = reviewRepository.getAverageRatingByVehicleId(vehicleId);
        return avg != null ? avg : 0.0;
    }

    public Long getReviewCount(Long vehicleId) {
        return reviewRepository.countByVehicleId(vehicleId);
    }

    private ReviewResponseDTO toResponseDTO(Review review) {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(review.getId());
        dto.setUserId(review.getUser().getId());
        dto.setUserName(review.getUser().getName() + " " + review.getUser().getLastName());
        dto.setVehicleId(review.getVehicle().getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        return dto;
    }
}