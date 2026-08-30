package com.readyboard.backend.repositories;

import com.readyboard.backend.models.Change;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChangeRepository extends JpaRepository<Change, String> {
}