package com.readyboard.backend.controllers;

import com.readyboard.backend.models.Change;
import com.readyboard.backend.repositories.ChangeRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/changes")
public class ChangeController {

    private final ChangeRepository changeRepository;

    public ChangeController(ChangeRepository changeRepository) {
        this.changeRepository = changeRepository;
    }

    @GetMapping
    public List<Change> getAllChanges() {
        return changeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Change getChangeById(@PathVariable String id) {
        return changeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Change createChange(@RequestBody Change change) {
        return changeRepository.save(change);
    }
}