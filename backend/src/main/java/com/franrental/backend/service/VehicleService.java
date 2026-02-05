package com.franrental.backend.service;

import com.franrental.backend.dto.CreateVehicleDTO;
import com.franrental.backend.dto.FeatureResponseDTO;
import com.franrental.backend.dto.VehicleResponseDTO;
import com.franrental.backend.model.Category;
import com.franrental.backend.model.Feature;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.CategoryRepository;
import com.franrental.backend.repository.FeatureRepository;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CategoryRepository categoryRepository;
    private final FeatureRepository featureRepository;

    public VehicleService(VehicleRepository vehicleRepository, CategoryRepository categoryRepository, FeatureRepository featureRepository) {
        this.vehicleRepository = vehicleRepository;
        this.categoryRepository = categoryRepository;
        this.featureRepository = featureRepository;
    }

    public VehicleResponseDTO create(CreateVehicleDTO dto) {
        if (vehicleRepository.existsByName(dto.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un vehiculo con este nombre");
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setName(dto.getName());
        vehicle.setDescription(dto.getDescription());
        vehicle.setImage(dto.getImage());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria no encontrada"));
            vehicle.setCategory(category);
        }

        if (dto.getFeatureIds() != null && !dto.getFeatureIds().isEmpty()) {
            List<Feature> features = featureRepository.findAllById(dto.getFeatureIds());
            vehicle.setFeatures(features);
        }

        Vehicle saved = vehicleRepository.save(vehicle);
        return toResponseDTO(saved);
    }

    public Page<VehicleResponseDTO> findAll(Pageable pageable) {
        return vehicleRepository.findAll(pageable).map(this::toResponseDTO);
    }

    public VehicleResponseDTO findById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehiculo no encontrado"));
        return toResponseDTO(vehicle);
    }

    public VehicleResponseDTO update(Long id, CreateVehicleDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehiculo no encontrado"));

        if (!vehicle.getName().equals(dto.getName()) && vehicleRepository.existsByName(dto.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un vehiculo con este nombre");
        }

        vehicle.setName(dto.getName());
        vehicle.setDescription(dto.getDescription());
        vehicle.setImage(dto.getImage());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria no encontrada"));
            vehicle.setCategory(category);
        } else {
            vehicle.setCategory(null);
        }

        if (dto.getFeatureIds() != null && !dto.getFeatureIds().isEmpty()) {
            List<Feature> features = featureRepository.findAllById(dto.getFeatureIds());
            vehicle.setFeatures(features);
        } else {
            vehicle.setFeatures(Collections.emptyList());
        }

        Vehicle updated = vehicleRepository.save(vehicle);
        return toResponseDTO(updated);
    }

    public void delete(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehiculo no encontrado");
        }
        vehicleRepository.deleteById(id);
    }

    public List<VehicleResponseDTO> getRandom(int count) {
        List<Vehicle> allVehicles = vehicleRepository.findAll();
        Collections.shuffle(allVehicles);
        return allVehicles.stream()
                .limit(count)
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public VehicleResponseDTO toResponseDTO(Vehicle vehicle) {
        VehicleResponseDTO dto = new VehicleResponseDTO();
        dto.setId(vehicle.getId());
        dto.setName(vehicle.getName());
        dto.setDescription(vehicle.getDescription());
        dto.setImage(vehicle.getImage());

        if (vehicle.getCategory() != null) {
            dto.setCategoryId(vehicle.getCategory().getId());
            dto.setCategoryTitle(vehicle.getCategory().getTitle());
        }

        if (vehicle.getFeatures() != null) {
            List<FeatureResponseDTO> featureDTOs = vehicle.getFeatures().stream()
                    .map(feature -> {
                        FeatureResponseDTO featureDTO = new FeatureResponseDTO();
                        featureDTO.setId(feature.getId());
                        featureDTO.setName(feature.getName());
                        featureDTO.setIconUrl(feature.getIconUrl());
                        return featureDTO;
                    })
                    .collect(Collectors.toList());
            dto.setFeatures(featureDTOs);
        }

        return dto;
    }
}