package com.franrental.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservationResponseDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long vehicleId;
    private String vehicleName;
    private String vehicleImage;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Double totalPrice;
    private Integer totalDays;
    private String createdAt;
}