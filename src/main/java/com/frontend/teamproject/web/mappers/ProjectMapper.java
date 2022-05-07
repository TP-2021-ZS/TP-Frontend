package com.frontend.teamproject.web.mappers;

import com.frontend.teamproject.domain.classes.Project;
import com.frontend.teamproject.domain.dto.ProjectDto;
import com.frontend.teamproject.domain.dto.ProjectListItemDto;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
  public List<ProjectListItemDto> map(List<Project> projectList) {
    List<ProjectListItemDto> listDto = new ArrayList<>();
    for (Project item : projectList) {
      listDto.add(mapListItem(item));
    }
    return listDto;
  }

  public ProjectDto map(Project project) {
    ProjectDto dto = new ProjectDto();
    dto.setActive(project.isActive());
    dto.setTitle(project.getTitle());
    return dto;
  }

  private ProjectListItemDto mapListItem(Project project) {
    ProjectListItemDto dto = new ProjectListItemDto();
        dto.setId(project.getUuid());
        dto.setTitle(project.getTitle());
        dto.setActive(project.isActive());
        return dto;
  }
}
