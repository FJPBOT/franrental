package com.franrental.backend.repository;

import com.franrental.backend.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(Long userId);

    Optional<Favorite> findByUserIdAndVehicleId(Long userId, Long vehicleId);

    void deleteByUserIdAndVehicleId(Long userId, Long vehicleId);
}