package com.franrental.backend.service;

import com.franrental.backend.dto.CreateVehicleDTO;
import com.franrental.backend.dto.FeatureResponseDTO;
import com.franrental.backend.dto.UpdateVehicleDTO;
import com.franrental.backend.dto.VehicleResponseDTO;
import com.franrental.backend.model.Category;
import com.franrental.backend.model.Feature;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.CategoryRepository;
import com.franrental.backend.repository.FeatureRepository;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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
        if (vehicleRepository.findByName(dto.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Vehicle name already exists");
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setName(dto.getName());
        vehicle.setDescription(dto.getDescription());
        vehicle.setImage(dto.getImage());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
            vehicle.setCategory(category);
        }

        if (dto.getFeatureIds() != null && !dto.getFeatureIds().isEmpty()) {
            List<Feature> features = featureRepository.findAllById(dto.getFeatureIds());
            vehicle.setFeatures(features);
        }

        Vehicle saved = vehicleRepository.save(vehicle);
        return toResponseDTO(saved);
    }

    public List<VehicleResponseDTO> findAll() {
        return vehicleRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public VehicleResponseDTO findById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));
        return toResponseDTO(vehicle);
    }

    public List<VehicleResponseDTO> findRandom(int limit) {
        return vehicleRepository.findRandomVehicles(limit).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Page<VehicleResponseDTO> findAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return vehicleRepository.findAll(pageable).map(this::toResponseDTO);
    }

    public List<VehicleResponseDTO> findByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        return category.getVehicles().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public VehicleResponseDTO update(Long id, UpdateVehicleDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));

        if (dto.getName() != null && !dto.getName().equals(vehicle.getName())) {
            if (vehicleRepository.findByName(dto.getName()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Vehicle name already exists");
            }
            vehicle.setName(dto.getName());
        }

        if (dto.getDescription() != null) {
            vehicle.setDescription(dto.getDescription());
        }

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
            vehicle.setCategory(category);
        }

        if (dto.getImage() != null) {
            vehicle.setImage(dto.getImage());
        }

        if (dto.getFeatureIds() != null) {
            List<Feature> features = featureRepository.findAllById(dto.getFeatureIds());
            vehicle.setFeatures(features);
        }

        Vehicle updated = vehicleRepository.save(vehicle);
        return toResponseDTO(updated);
    }

    public void delete(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found");
        }
        vehicleRepository.deleteById(id);
    }

    private VehicleResponseDTO toResponseDTO(Vehicle vehicle) {
        VehicleResponseDTO dto = new VehicleResponseDTO();
        dto.setId(vehicle.getId());
        dto.setName(vehicle.getName());
        dto.setDescription(vehicle.getDescription());
        dto.setImage(vehicle.getImage());

        if (vehicle.getCategory() != null) {
            dto.setCategoryId(vehicle.getCategory().getId());
            dto.setCategoryTitle(vehicle.getCategory().getTitle());
        }

        List<FeatureResponseDTO> featureDTOs = vehicle.getFeatures().stream()
                .map(f -> new FeatureResponseDTO(f.getId(), f.getName(), f.getIconUrl()))
                .collect(Collectors.toList());
        dto.setFeatures(featureDTOs);

        return dto;
    }
}