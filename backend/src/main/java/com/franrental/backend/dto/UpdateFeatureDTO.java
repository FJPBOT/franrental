package com.franrental.backend.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateFeatureDTO {

    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    private String iconUrl;
}