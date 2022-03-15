package com.frontend.teamproject.domain.classes;

import static javax.persistence.EnumType.STRING;

import com.frontend.teamproject.domain.enums.Role;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;


  @Column(nullable = false,unique = true)
  private String email;

  @Enumerated(STRING)
  @Column(nullable = false)
  private Role role;

  private boolean isConfirmed;

  public User() {
  }

  public User(String username, String password, String email) {
    super();
    this.username = username;
    this.password = password;
    this.role = Role.ROLE_USER;
    this.email = email;
    this.isConfirmed = false;
  }

  public void setPassword(String password) {
    if (password == null || password.trim().isEmpty()) {
      throw new IllegalArgumentException("Password is required");
    }
    this.password = password;
  }
}

