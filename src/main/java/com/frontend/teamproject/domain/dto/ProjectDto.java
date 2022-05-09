package com.frontend.teamproject.domain.dto;

import com.frontend.teamproject.domain.classes.DateAfterEnum;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
@Data
public class ProjectDto {
    @NotNull
    @NotEmpty
    @Size(min = 3, message = "Title should contain at least 3 char.")
    @NotNull
    @NotEmpty
    private String title;
    @NotNull
    @NotEmpty
    private boolean active;
    @NotNull
    @NotEmpty
    private List<String> webpages;
    @NotNull
    @NotEmpty
    private List<String> forbiddenWebpages;
    @NotNull
    @NotEmpty
    private List<String> usersEmail;
    @NotNull
    @NotEmpty
    private DateAfterEnum dateAfter;
    @NotNull
    @NotEmpty
    private List<DictionaryItemDto> dict;
    @NotNull
    @NotEmpty
    private List<String> keywords;
}
