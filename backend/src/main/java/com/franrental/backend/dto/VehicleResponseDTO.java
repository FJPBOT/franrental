package com.franrental.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleResponseDTO {

    private Long id;
    private String name;
    private String description;
    private Long categoryId;
    private String categoryTitle;
    private String image;
    private List<FeatureResponseDTO> features;
}