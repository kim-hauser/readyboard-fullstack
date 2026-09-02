package com.readyboard.backend.data;

import com.readyboard.backend.models.ReadinessStatus;
import com.readyboard.backend.repositories.ReadinessStatusRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// @Component allows Spring to discover and manage this class.
// CommandLineRunner runs code after application startup.
// Spring injects repository into DataSeeder -> Spring calls run()
@Component
public class DataSeeder implements CommandLineRunner {

    private final ReadinessStatusRepository readinessStatusRepository;

    public DataSeeder(ReadinessStatusRepository readinessStatusRepository) {
        this.readinessStatusRepository = readinessStatusRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (!readinessStatusRepository.existsByName("Ready")) {
            readinessStatusRepository.save(
                    new ReadinessStatus("Ready", 1)
            );
        }

        if (!readinessStatusRepository.existsByName("Pending")) {
            readinessStatusRepository.save(
                    new ReadinessStatus("Pending", 2)
            );
        }

        if (!readinessStatusRepository.existsByName("Open")) {
            readinessStatusRepository.save(
                    new ReadinessStatus("Open", 3)
            );
        }
    }
}