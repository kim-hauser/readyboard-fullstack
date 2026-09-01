package com.readyboard.backend.controllers;

import com.readyboard.backend.models.Change;
import com.readyboard.backend.repositories.ChangeRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @DeleteMapping("/{id}")
    public void deleteChange(@PathVariable String id) {
        changeRepository.deleteById(id);
    }

    @GetMapping
    public List<Change> getAllChanges() {
        return changeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Change getChangeById(@PathVariable String id) {
        return changeRepository.findById(id).orElse(null);
    }

    //TODO: Add PATCH on Tuesday for "Partial Change" + 'null handling'

    @PostMapping
    public Change createChange(@RequestBody Change change) {
        return changeRepository.save(change);
    }

    // Change full-replacement

    @PutMapping("/{id}")
    public Change updateChange(@PathVariable String id, @RequestBody Change change) {
        change.setId(id);
        return changeRepository.save(change);
    }
}