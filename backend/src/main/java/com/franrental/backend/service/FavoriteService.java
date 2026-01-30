package com.franrental.backend.service;

import com.franrental.backend.dto.FavoriteResponseDTO;
import com.franrental.backend.dto.VehicleResponseDTO;
import com.franrental.backend.model.Favorite;
import com.franrental.backend.model.User;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.FavoriteRepository;
import com.franrental.backend.repository.UserRepository;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final VehicleService vehicleService;

    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository,
                           VehicleRepository vehicleRepository, VehicleService vehicleService) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
        this.vehicleService = vehicleService;
    }

    public FavoriteResponseDTO addFavorite(Long userId, Long vehicleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));

        if (favoriteRepository.findByUserIdAndVehicleId(userId, vehicleId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Favorite already exists");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setVehicle(vehicle);

        Favorite saved = favoriteRepository.save(favorite);
        return toResponseDTO(saved);
    }

    public List<FavoriteResponseDTO> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeFavorite(Long userId, Long vehicleId) {
        if (!favoriteRepository.findByUserIdAndVehicleId(userId, vehicleId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Favorite not found");
        }
        favoriteRepository.deleteByUserIdAndVehicleId(userId, vehicleId);
    }

    private FavoriteResponseDTO toResponseDTO(Favorite favorite) {
        FavoriteResponseDTO dto = new FavoriteResponseDTO();
        dto.setId(favorite.getId());
        dto.setUserId(favorite.getUser().getId());
        dto.setVehicle(vehicleService.toResponseDTO(favorite.getVehicle()));
        return dto;
    }
}