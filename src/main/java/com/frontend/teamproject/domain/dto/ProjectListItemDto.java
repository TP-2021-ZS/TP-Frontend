package com.frontend.teamproject.domain.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class ProjectListItemDto {

  private UUID id;
  private String title;
  private boolean active;
}
