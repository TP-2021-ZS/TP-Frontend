package com.frontend.teamproject.business;

import com.frontend.teamproject.auth.UserDetailServiceImpl;
import com.frontend.teamproject.domain.classes.Project;
import com.frontend.teamproject.domain.classes.User;
import com.frontend.teamproject.domain.dto.ProjectDto;
import com.frontend.teamproject.domain.repositories.ProjectRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;

import com.frontend.teamproject.utils.PythonPackageManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  @Autowired
  private PythonPackageManager pythonPackageManager;
  private final ProjectRepository repository;
  private final FileService fileService;
  private final UserDetailServiceImpl userService;

  ProjectService(
      ProjectRepository repository,
      FileService fileService,
      UserDetailServiceImpl userService) {
    this.repository = repository;
    this.fileService = fileService;
    this.userService = userService;
  }

  public UUID createProject(ProjectDto dto) throws InterruptedException{
    Authentication authorization = SecurityContextHolder.getContext().getAuthentication();
    User user  = userService.getUser(authorization.getName());
    Project project = new Project();
    project.setActive(dto.isActive());
    project.setTitle(dto.getTitle());
    project.setUser(user);
    UUID uuid = repository.save(project).getUuid();
    //fileService.mkDir(uuid);
    this.pythonPackageManager.createNewProject(uuid.toString(), dto.isActive());
    fileService.writeToFileSystem(dto, uuid);
    return uuid;
  }

  public void editProject(ProjectDto dto, String id) throws EntityNotFoundException {
    Authentication authorization = SecurityContextHolder.getContext().getAuthentication();
    Optional<Project> projectOptional = repository.findByUuidAndUserUsername(UUID.fromString(id), authorization.getName());
    if (projectOptional.isEmpty()) {
      throw new EntityNotFoundException("Projekt s id: " + id + "neexistuje");
    }
    Project project = projectOptional.get();
    project.setActive(dto.isActive());
    project.setTitle(dto.getTitle());

    UUID uuid = repository.save(project).getUuid();
    fileService.writeToFileSystem(dto, uuid);
  }

  public void deleteProject(String id) throws IOException {
    Authentication authorization = SecurityContextHolder.getContext().getAuthentication();
    repository.deleteByUuidAndUserUsername(UUID.fromString(id), authorization.getName());
    fileService.deleteFiles(id);
  }

  public Optional<List<Project>> getAllProjects() {
    Authentication authorization = SecurityContextHolder.getContext().getAuthentication();
    return repository.findAllByUserUsername(authorization.getName());
  }

  public Optional<Project> getDetail(String id) {
    Authentication authorization = SecurityContextHolder.getContext().getAuthentication();
    return repository.findByUuidAndUserUsername(UUID.fromString(id), authorization.getName());
  }

  public ProjectDto getDetailFromFiles(ProjectDto project, String id) {
    project.setWebpages(fileService.readWebpages(id));
    project.setForbiddenWebpages(fileService.readForbiddenWebpages(id));
    project.setDict(fileService.readDict(id));
    project.setKeywords(fileService.readKeywords(id));
    project = fileService.setUsersEmailAndDateAfter(project, id);
    return project;
  }
}
