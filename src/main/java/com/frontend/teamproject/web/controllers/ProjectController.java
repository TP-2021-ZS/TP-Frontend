package com.frontend.teamproject.web.controllers;

import com.frontend.teamproject.business.ProjectService;
import com.frontend.teamproject.domain.classes.Project;
import com.frontend.teamproject.domain.dto.ProjectDto;
import com.frontend.teamproject.domain.dto.ProjectListItemDto;
import com.frontend.teamproject.web.mappers.ProjectMapper;
import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import javax.validation.ValidationException;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {

  private final ProjectService service;
  private final ProjectMapper mapper;
  private final Logger logger;

  public ProjectController(ProjectService service, ProjectMapper mapper,
      Logger logger) {
    this.service = service;
    this.mapper = mapper;
    this.logger = logger;
  }

  @PostMapping(value = "/api/project")
  public ResponseEntity<UUID> createProject(@Valid ProjectDto projectDto,
      BindingResult bindingResult) throws InterruptedException {
    if (bindingResult.hasErrors()) {
      logger.debug("Validation errors found");
      throw new ValidationException("Zadané parametre nie sú validné.");
    }
    logger.info("Creating new project with project params: {}.", projectDto);
    UUID uuid = service.createProject(projectDto);
    return ResponseEntity.of(Optional.of(uuid));
  }

  @PutMapping(value = "/api/project/{id}")
  @ResponseStatus(value = HttpStatus.OK)
  public void editProject(
      @PathVariable("id") String id,
      @Valid ProjectDto projectDto,
      BindingResult bindingResult
  ) throws InterruptedException {
    if (bindingResult.hasErrors()) {
      logger.debug("Validation errors found");
      throw new ValidationException("Zadané parametre nie sú validné.");
    }
    logger.info("Editting existing project with project params: {}.", projectDto);
    service.editProject(projectDto, id);
  }


  @GetMapping(value = "/api/projects", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<ProjectListItemDto>> getAllProjects() {
    logger.info("Getting all projects");
    Optional<List<Project>> projectList = service.getAllProjects();
    if(projectList.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    List<ProjectListItemDto> projectDtoList = mapper.map(projectList.get());
    return ResponseEntity.of(Optional.of(projectDtoList));
  }

  @GetMapping(value = "/api/projects/{id}")
  public ResponseEntity<ProjectDto> getProjectDetail(@PathVariable("id") String id) {
    logger.info("Getting detail of project with id: {}.", id);
    Optional<Project> projectOptional = service.getDetail(id);
    if(projectOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    ProjectDto projectDto = mapper.map(projectOptional.get());
    projectDto = service.getDetailFromFiles(projectDto, id);
    return ResponseEntity.of(Optional.of(projectDto));
  }

  @DeleteMapping(value = "/api/projects/{id}")
  public ResponseEntity<?> deleteProject(@PathVariable("id") String id)
      throws IOException {
    logger.info("Deleting project with id: {}.", id);
    service.deleteProject(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Optional.empty());
  }
}
