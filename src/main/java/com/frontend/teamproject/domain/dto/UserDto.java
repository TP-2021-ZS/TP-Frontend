package com.frontend.teamproject.domain.dto;

import com.frontend.teamproject.domain.classes.User;
import com.frontend.teamproject.domain.enums.Role;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
  private Long id;
  @NotNull
  @NotEmpty
  @Size(min = 3)
  private String username;
  private Role role;
  @NotNull
  @Email(message = "Email should be valid")
  private String email;
  private String password;
  public UserDto(){

  }
  public UserDto(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.role = user.getRole();
    this.email = user.getEmail();
  }
}
