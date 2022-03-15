package com.frontend.teamproject.domain.Exceptions;

import org.springframework.http.HttpStatus;

public class CustomRuntimeException extends RuntimeException {
  private static final long serialVersionUID = 7718828512143293558L;
  private final HttpStatus code;
  public CustomRuntimeException(String message, HttpStatus code) {
    super(message);
    this.code = code;
  }
  public HttpStatus getCode() {
    return this.code;
  }
}
