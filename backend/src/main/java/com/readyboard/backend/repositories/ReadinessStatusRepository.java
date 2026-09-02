package com.readyboard.backend.repositories;

import com.readyboard.backend.models.ReadinessStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadinessStatusRepository
        extends JpaRepository<ReadinessStatus, Integer> {
}