package com.franrental.backend.repository;

import com.franrental.backend.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByName(String name);

    boolean existsByName(String name);

    @Query(value = "SELECT * FROM vehicles ORDER BY RAND() LIMIT ?1", nativeQuery = true)
    List<Vehicle> findRandomVehicles(int limit);

    List<Vehicle> findByCategory(String category);
}