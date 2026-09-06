package com.readyboard.backend.repositories;

import com.readyboard.backend.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Integer> {
}