package com.franrental.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponseDTO {

    private Long id;
    private Long userId;
    private VehicleResponseDTO vehicle;
}