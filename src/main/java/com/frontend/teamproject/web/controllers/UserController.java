package com.frontend.teamproject.web.controllers;

import com.frontend.teamproject.auth.UserDetailServiceImpl;
import com.frontend.teamproject.domain.dto.UserDto;
import java.security.Principal;
import javax.validation.Valid;
import javax.validation.ValidationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

  private final UserDetailServiceImpl userService;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  public UserController(UserDetailServiceImpl userService,
      BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userService = userService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @PostMapping(value = "/api/registration")
  public void addUser(@Valid UserDto userDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new ValidationException("Email nieje v správnom formáte");
    }
    String hashedPassword = bCryptPasswordEncoder.encode(userDto.getPassword());
    userService.registerUser(userDto.getUsername(), hashedPassword, userDto.getEmail());
  }

  @GetMapping(value = "/api/test", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> getTest(){
    return ResponseEntity.status(HttpStatus.OK).body("ok");
  }

  @GetMapping("/api/user")
  public ResponseEntity<UserDto> getUser(Principal principal) {
    return userService.getUser(principal.getName());
  }

  @PutMapping("/api/user")
  public ResponseEntity<UserDto> edit(@RequestParam(value = "username", required = false) String username,
      @RequestParam(value = "email", required = false) String email,
      @RequestParam(value = "password", required = false) String password,
      Principal principal) {
    if (password != null) {
      password = bCryptPasswordEncoder.encode(password);
    }
    return userService.edit(principal.getName(), username, email, password);
  }

}
