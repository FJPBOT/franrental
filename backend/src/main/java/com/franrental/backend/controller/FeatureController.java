package com.franrental.backend.controller;

import com.franrental.backend.dto.CreateFeatureDTO;
import com.franrental.backend.dto.UpdateFeatureDTO;
import com.franrental.backend.dto.FeatureResponseDTO;
import com.franrental.backend.service.FeatureService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "http://localhost:3000")
public class FeatureController {

    private final FeatureService featureService;

    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @PostMapping
    public ResponseEntity<FeatureResponseDTO> create(@Valid @RequestBody CreateFeatureDTO dto) {
        FeatureResponseDTO response = featureService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<FeatureResponseDTO>> findAll() {
        List<FeatureResponseDTO> features = featureService.findAll();
        return ResponseEntity.ok(features);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureResponseDTO> findById(@PathVariable Long id) {
        FeatureResponseDTO feature = featureService.findById(id);
        return ResponseEntity.ok(feature);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeatureResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UpdateFeatureDTO dto) {
        FeatureResponseDTO updated = featureService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        featureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}