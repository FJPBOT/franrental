package com.franrental.backend.controller;

import com.franrental.backend.dto.FavoriteResponseDTO;
import com.franrental.backend.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<FavoriteResponseDTO> addFavorite(@RequestParam Long userId, @RequestParam Long vehicleId) {
        FavoriteResponseDTO response = favoriteService.addFavorite(userId, vehicleId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteResponseDTO>> getFavoritesByUser(@PathVariable Long userId) {
        List<FavoriteResponseDTO> favorites = favoriteService.getFavoritesByUser(userId);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam Long vehicleId) {
        favoriteService.removeFavorite(userId, vehicleId);
        return ResponseEntity.noContent().build();
    }
}