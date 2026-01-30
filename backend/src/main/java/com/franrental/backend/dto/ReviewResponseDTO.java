package com.franrental.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDTO {

    private Long id;
    private Long userId;
    private String userName;
    private Long vehicleId;
    private Integer rating;
    private String comment;
    private String createdAt;
}
