package com.franrental.backend.service;

import com.franrental.backend.dto.CreateFeatureDTO;
import com.franrental.backend.dto.UpdateFeatureDTO;
import com.franrental.backend.dto.FeatureResponseDTO;
import com.franrental.backend.model.Feature;
import com.franrental.backend.repository.FeatureRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeatureService {

    private final FeatureRepository featureRepository;

    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public FeatureResponseDTO create(CreateFeatureDTO dto) {
        if (featureRepository.existsByName(dto.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Feature name already exists");
        }

        Feature feature = new Feature();
        feature.setName(dto.getName());
        feature.setIconUrl(dto.getIconUrl());

        Feature saved = featureRepository.save(feature);
        return toResponseDTO(saved);
    }

    public List<FeatureResponseDTO> findAll() {
        return featureRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public FeatureResponseDTO findById(Long id) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Feature not found"));
        return toResponseDTO(feature);
    }

    public FeatureResponseDTO update(Long id, UpdateFeatureDTO dto) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Feature not found"));

        if (dto.getName() != null && !dto.getName().equals(feature.getName())) {
            if (featureRepository.existsByName(dto.getName())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Feature name already exists");
            }
            feature.setName(dto.getName());
        }

        if (dto.getIconUrl() != null) {
            feature.setIconUrl(dto.getIconUrl());
        }

        Feature updated = featureRepository.save(feature);
        return toResponseDTO(updated);
    }

    public void delete(Long id) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Feature not found"));

        if (!feature.getVehicles().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete feature with vehicles");
        }

        featureRepository.deleteById(id);
    }

    private FeatureResponseDTO toResponseDTO(Feature feature) {
        FeatureResponseDTO dto = new FeatureResponseDTO();
        dto.setId(feature.getId());
        dto.setName(feature.getName());
        dto.setIconUrl(feature.getIconUrl());
        return dto;
    }
}