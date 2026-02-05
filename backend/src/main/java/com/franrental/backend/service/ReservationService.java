package com.franrental.backend.service;

import com.franrental.backend.dto.ReservationResponseDTO;
import com.franrental.backend.dto.CreateReservationDTO;
import com.franrental.backend.model.Reservation;
import com.franrental.backend.model.User;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.ReservationRepository;
import com.franrental.backend.repository.UserRepository;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final EmailService emailService;
    private static final double DAILY_RATE = 50.0;

    public ReservationService(ReservationRepository reservationRepository,
                              UserRepository userRepository,
                              VehicleRepository vehicleRepository,
                              EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
        this.emailService = emailService;
    }

    public ReservationResponseDTO create(CreateReservationDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehiculo no encontrado"));

        if (dto.getStartDate().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de inicio no puede ser en el pasado");
        }

        if (dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de fin debe ser posterior a la fecha de inicio");
        }

        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
                dto.getVehicleId(), dto.getStartDate(), dto.getEndDate()
        );

        if (!conflicts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El vehiculo no esta disponible para las fechas seleccionadas");
        }

        long days = ChronoUnit.DAYS.between(dto.getStartDate(), dto.getEndDate()) + 1;
        double totalPrice = days * DAILY_RATE;

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setVehicle(vehicle);
        reservation.setStartDate(dto.getStartDate());
        reservation.setEndDate(dto.getEndDate());
        reservation.setStatus("CONFIRMED");
        reservation.setTotalPrice(totalPrice);
        reservation.setComments(dto.getComments());

        Reservation saved = reservationRepository.save(reservation);
        emailService.sendReservationConfirmation(saved);
        return toResponseDTO(saved);
    }

    public List<ReservationResponseDTO> getByUser(Long userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ReservationResponseDTO> getByVehicle(Long vehicleId) {
        return reservationRepository.findByVehicleId(vehicleId).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ReservationResponseDTO> getAll() {
        return reservationRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ReservationResponseDTO updateStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));

        reservation.setStatus(status);
        Reservation updated = reservationRepository.save(reservation);
        return toResponseDTO(updated);
    }

    public List<LocalDate> getUnavailableDates(Long vehicleId) {
        List<Reservation> activeReservations = reservationRepository.findActiveReservationsByVehicle(vehicleId);
        return activeReservations.stream()
                .flatMap(r -> r.getStartDate().datesUntil(r.getEndDate().plusDays(1)))
                .distinct()
                .collect(Collectors.toList());
    }

    private ReservationResponseDTO toResponseDTO(Reservation reservation) {
        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setId(reservation.getId());
        dto.setUserId(reservation.getUser().getId());
        dto.setUserName(reservation.getUser().getName() + " " + reservation.getUser().getLastName());
        dto.setVehicleId(reservation.getVehicle().getId());
        dto.setVehicleName(reservation.getVehicle().getName());
        dto.setVehicleImage(reservation.getVehicle().getImage());
        dto.setStartDate(reservation.getStartDate());
        dto.setEndDate(reservation.getEndDate());
        dto.setStatus(reservation.getStatus());
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setComments(reservation.getComments());

        long days = ChronoUnit.DAYS.between(reservation.getStartDate(), reservation.getEndDate()) + 1;
        dto.setTotalDays((int) days);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        dto.setCreatedAt(reservation.getCreatedAt().format(formatter));

        return dto;
    }
}
