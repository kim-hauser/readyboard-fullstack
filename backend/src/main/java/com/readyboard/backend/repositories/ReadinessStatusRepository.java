package com.readyboard.backend.repositories;

import com.readyboard.backend.models.ReadinessStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReadinessStatusRepository
        extends JpaRepository<ReadinessStatus, Integer> {

    // Checks whether status already exists so seeder only creates missing rows.
    boolean existsByName(String name);
    // Repository returns statuses in displayOrder order.
    List<ReadinessStatus> findAllByOrderByDisplayOrderAsc();
}