package com.franrental.backend.controller;

import com.franrental.backend.dto.ReservationResponseDTO;
import com.franrental.backend.dto.CreateReservationDTO;
import com.franrental.backend.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationResponseDTO> create(@Valid @RequestBody CreateReservationDTO dto) {
        ReservationResponseDTO response = reservationService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationResponseDTO>> getByUser(@PathVariable Long userId) {
        List<ReservationResponseDTO> reservations = reservationService.getByUser(userId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<ReservationResponseDTO>> getByVehicle(@PathVariable Long vehicleId) {
        List<ReservationResponseDTO> reservations = reservationService.getByVehicle(vehicleId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping
    public ResponseEntity<List<ReservationResponseDTO>> getAll() {
        List<ReservationResponseDTO> reservations = reservationService.getAll();
        return ResponseEntity.ok(reservations);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ReservationResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        ReservationResponseDTO response = reservationService.updateStatus(id, status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vehicle/{vehicleId}/unavailable-dates")
    public ResponseEntity<List<LocalDate>> getUnavailableDates(@PathVariable Long vehicleId) {
        List<LocalDate> dates = reservationService.getUnavailableDates(vehicleId);
        return ResponseEntity.ok(dates);
    }
}