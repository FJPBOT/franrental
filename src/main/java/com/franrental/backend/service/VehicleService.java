package com.franrental.backend.service;

import com.franrental.backend.dto.CreateVehicleDTO;
import com.franrental.backend.dto.UpdateVehicleDTO;
import com.franrental.backend.dto.VehicleResponseDTO;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {


    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public VehicleResponseDTO create(CreateVehicleDTO dto) {
        if (vehicleRepository.findByName(dto.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Vehicle name already exists");
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setName(dto.getName());
        vehicle.setDescription(dto.getDescription());
        vehicle.setCategory(dto.getCategory());
        vehicle.setImage(dto.getImage());

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
        if (dto.getCategory() != null) {
            vehicle.setCategory(dto.getCategory());
        }
        if (dto.getImage() != null) {
            vehicle.setImage(dto.getImage());
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
        dto.setCategory(vehicle.getCategory());
        dto.setImage(vehicle.getImage());
        return dto;
    }
}
