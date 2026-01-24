package com.franrental.backend.service;

import com.franrental.backend.dto.CreateCategoryDTO;
import com.franrental.backend.dto.UpdateCategoryDTO;
import com.franrental.backend.dto.CategoryResponseDTO;
import com.franrental.backend.model.Category;
import com.franrental.backend.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponseDTO create(CreateCategoryDTO dto) {
        if (categoryRepository.existsByTitle(dto.getTitle())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category title already exists");
        }

        Category category = new Category();
        category.setTitle(dto.getTitle());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());

        Category saved = categoryRepository.save(category);
        return toResponseDTO(saved);
    }

    public List<CategoryResponseDTO> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public CategoryResponseDTO findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        return toResponseDTO(category);
    }

    public CategoryResponseDTO update(Long id, UpdateCategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        if (dto.getTitle() != null && !dto.getTitle().equals(category.getTitle())) {
            if (categoryRepository.existsByTitle(dto.getTitle())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Category title already exists");
            }
            category.setTitle(dto.getTitle());
        }

        if (dto.getDescription() != null) {
            category.setDescription(dto.getDescription());
        }

        if (dto.getImageUrl() != null) {
            category.setImageUrl(dto.getImageUrl());
        }

        Category updated = categoryRepository.save(category);
        return toResponseDTO(updated);
    }

    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        if (!category.getVehicles().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete category with vehicles");
        }

        categoryRepository.deleteById(id);
    }

    private CategoryResponseDTO toResponseDTO(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setTitle(category.getTitle());
        dto.setDescription(category.getDescription());
        dto.setImageUrl(category.getImageUrl());
        dto.setVehicleCount(category.getVehicles().size());
        return dto;
    }
}