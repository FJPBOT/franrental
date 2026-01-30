package com.franrental.backend.repository;

import com.franrental.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByVehicleId(Long vehicleId);

    @Query("SELECT r FROM Reservation r WHERE r.vehicle.id = :vehicleId " +
            "AND r.status != 'CANCELLED' " +
            "AND ((r.startDate <= :endDate AND r.endDate >= :startDate))")
    List<Reservation> findConflictingReservations(
            @Param("vehicleId") Long vehicleId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT r FROM Reservation r WHERE r.vehicle.id = :vehicleId AND r.status != 'CANCELLED'")
    List<Reservation> findActiveReservationsByVehicle(@Param("vehicleId") Long vehicleId);
}