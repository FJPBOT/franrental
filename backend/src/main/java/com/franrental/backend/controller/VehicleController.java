package com.franrental.backend.controller;

import com.franrental.backend.dto.CreateVehicleDTO;
import com.franrental.backend.dto.UpdateVehicleDTO;
import com.franrental.backend.dto.VehicleResponseDTO;
import com.franrental.backend.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public ResponseEntity<VehicleResponseDTO> create(@Valid @RequestBody CreateVehicleDTO dto) {
        VehicleResponseDTO response = vehicleService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponseDTO>> findAll() {
        List<VehicleResponseDTO> vehicles = vehicleService.findAll();
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> findById(@PathVariable Long id) {
        VehicleResponseDTO vehicle = vehicleService.findById(id);
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping("/random")
    public ResponseEntity<List<VehicleResponseDTO>> findRandom(@RequestParam(defaultValue = "10") int limit) {
        List<VehicleResponseDTO> vehicles = vehicleService.findRandom(limit);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<VehicleResponseDTO>> findAllPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<VehicleResponseDTO> vehicles = vehicleService.findAllPaginated(page, size);
        return ResponseEntity.ok(vehicles);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UpdateVehicleDTO dto) {
        VehicleResponseDTO updated = vehicleService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vehicleService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<VehicleResponseDTO>> findByCategory(@PathVariable Long categoryId) {
        List<VehicleResponseDTO> vehicles = vehicleService.findByCategory(categoryId);
        return ResponseEntity.ok(vehicles);
    }
}