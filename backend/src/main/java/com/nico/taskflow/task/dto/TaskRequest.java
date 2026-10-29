package com.nico.taskflow.task.dto;

import java.time.LocalDate;

public record TaskRequest(
        String title,
        String description,
        String status,
        LocalDate dueDate
) {
}