package com.frontend.teamproject.web.controllers;

import com.frontend.teamproject.domain.classes.ValidResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
public class IndexController {

  @GetMapping()
  public ResponseEntity<?> home() {
    String name = "test";
    return ResponseEntity.status(HttpStatus.OK).body(new ValidResponse(name));
  }

}
