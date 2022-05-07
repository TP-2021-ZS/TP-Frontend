package com.frontend.teamproject.domain.classes;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
public class ExceptionResponse {
  private HttpStatus status;
  private String message;

  public ExceptionResponse(HttpStatus status, String message) {
    this.status = status;
    this.message = message;
  }
}