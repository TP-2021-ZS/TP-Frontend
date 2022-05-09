package com.frontend.teamproject.domain.classes;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import java.util.UUID;
import javax.persistence.*;

@Entity
public class Project {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Type(type = "uuid-char")
  @Column(name = "uuid", updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
  private UUID uuid;
  private String title;
  private boolean active;
  @ManyToOne
  private User user;

  public Project() {
    this.active = false;
  }

  public UUID getUuid() {
    return uuid;
  }

  public void setUuid(UUID uuid) {
    this.uuid = uuid;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public boolean isActive() {
    return active;
  }

  public void setActive(boolean active) {
    this.active = active;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
