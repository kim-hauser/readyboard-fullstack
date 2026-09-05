package com.readyboard.backend.controllers;

import com.readyboard.backend.models.AssignmentGroup;
import com.readyboard.backend.repositories.AssignmentGroupRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/assignment-groups")
public class AssignmentGroupController {

    private final AssignmentGroupRepository assignmentGroupRepository;

    public AssignmentGroupController(AssignmentGroupRepository assignmentGroupRepository) {
        this.assignmentGroupRepository = assignmentGroupRepository;
    }

    @GetMapping
    public List<AssignmentGroup> getAllAssignmentGroups() {
        return assignmentGroupRepository.findAll();
    }

    @GetMapping("/{id}")
    public AssignmentGroup getAssignmentGroupById(@PathVariable Integer id) {
        return assignmentGroupRepository.findById(id).orElse(null);
    }
}