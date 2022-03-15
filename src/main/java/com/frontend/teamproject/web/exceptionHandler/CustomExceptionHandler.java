package com.frontend.teamproject.web.exceptionHandler;

import com.frontend.teamproject.domain.Exceptions.CustomRuntimeException;
import javax.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class CustomExceptionHandler {

  @ExceptionHandler({ CustomRuntimeException.class })
  public final ResponseEntity<String> handleException(CustomRuntimeException ex) {
    return ResponseEntity.status(ex.getCode()).body(ex.getMessage());
  }
  @ExceptionHandler({ DataIntegrityViolationException.class })
  public final ResponseEntity<String> handleException(DataIntegrityViolationException ex) {
    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Zadaný údaj musí byť unikátny");
  }
  @ExceptionHandler({ EntityNotFoundException.class })
  public final ResponseEntity<String> handleException(EntityNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }


}
