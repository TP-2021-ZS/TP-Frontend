package com.frontend.teamproject.web.exceptionHandler;

import com.frontend.teamproject.domain.Exceptions.CustomRuntimeException;
import com.frontend.teamproject.domain.classes.ExceptionResponse;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import javax.persistence.EntityNotFoundException;
import javax.validation.ValidationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

  @ExceptionHandler({ CustomRuntimeException.class })
  public final ResponseEntity<ExceptionResponse> handleException(CustomRuntimeException ex) {
    return ResponseEntity.status(ex.getCode()).body(new ExceptionResponse(ex.getCode(), ex.getMessage()));
  }
  @ExceptionHandler({ DataIntegrityViolationException.class })
  public final ResponseEntity<ExceptionResponse> handleException(DataIntegrityViolationException ex) {
    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new ExceptionResponse(HttpStatus.NOT_ACCEPTABLE,"Zadaný údaj musí byť unikátny"));
  }
  @ExceptionHandler({ EntityNotFoundException.class })
  public final ResponseEntity<ExceptionResponse> handleException(EntityNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ExceptionResponse(HttpStatus.NOT_FOUND,ex.getMessage()));
  }
  @ExceptionHandler({UsernameNotFoundException.class})
  public final ResponseEntity<ExceptionResponse> handleException(UsernameNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ExceptionResponse(HttpStatus.FORBIDDEN, ex.getMessage()));
  }

  @ExceptionHandler({UserPrincipalNotFoundException.class})
  public final ResponseEntity<ExceptionResponse> handleException(UserPrincipalNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ExceptionResponse(HttpStatus.FORBIDDEN, ex.getMessage()));
  }

  @ExceptionHandler({ValidationException.class})
  public final ResponseEntity<ExceptionResponse> handleException(ValidationException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(HttpStatus.BAD_REQUEST, ex.getMessage()));
  }

  @ExceptionHandler({InterruptedException.class})
  public final ResponseEntity<ExceptionResponse> handleException(InterruptedException ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage()));
  }
}
