package com.readyboard.backend.repositories;

import com.readyboard.backend.models.AssignmentGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentGroupRepository extends JpaRepository<AssignmentGroup, Integer> {
}