
package com.nico.taskflow.task.service;

import com.nico.taskflow.task.dto.TaskRequest;
import com.nico.taskflow.task.dto.TaskResponse;
import com.nico.taskflow.task.model.Task;
import com.nico.taskflow.task.repository.TaskRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "No existe una tarea con ID: " + id
                        ));

        return toResponse(task);
    }

    public TaskResponse createTask(TaskRequest request) {
        Task task = new Task(
                null,
                request.title(),
                request.description(),
                request.status() == null || request.status().isBlank()
                        ? "PENDING"
                        : request.status(),
                request.dueDate()
        );

        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "No existe una tarea con ID: " + id
                        ));

        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setStatus(request.status() == null
                || request.status().isBlank()
                ? "PENDING"
                : request.status());
        task.setDueDate(request.dueDate());

        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        boolean deleted = taskRepository.deleteById(id);

        if (!deleted) {
            throw new NoSuchElementException(
                    "No existe una tarea con ID: " + id
            );
        }
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getDueDate()
        );
    }
}
