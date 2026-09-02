package com.readyboard.backend.controllers;

import com.readyboard.backend.models.ReadinessStatus;
import com.readyboard.backend.repositories.ReadinessStatusRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/readiness-statuses")
public class ReadinessStatusController {

    private final ReadinessStatusRepository readinessStatusRepository;

    public ReadinessStatusController(ReadinessStatusRepository readinessStatusRepository) {
        this.readinessStatusRepository = readinessStatusRepository;
    }

    @GetMapping
    public List<ReadinessStatus> getAllReadinessStatuses() {
        return readinessStatusRepository.findAll();
    }
}
