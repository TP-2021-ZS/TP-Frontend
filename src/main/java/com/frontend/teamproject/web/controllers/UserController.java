package com.frontend.teamproject.web.controllers;

import com.frontend.teamproject.auth.UserDetailServiceImpl;
import com.frontend.teamproject.domain.classes.User;
import com.frontend.teamproject.domain.dto.UserDto;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.security.Principal;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.ValidationException;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {

  private final UserDetailServiceImpl userService;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final Logger logger;


  public UserController(UserDetailServiceImpl userService,
      BCryptPasswordEncoder bCryptPasswordEncoder,
      Logger logger) {
    this.userService = userService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.logger = logger;
  }

  @PostMapping(value = "/api/registration")
  public void addUser(@Valid UserDto userDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      logger.debug("Validation errors found");
      throw new ValidationException("Email nieje v správnom formáte");
    }
    String hashedPassword = bCryptPasswordEncoder.encode(userDto.getPassword());
    userService.registerUser(userDto.getUsername(), hashedPassword, userDto.getEmail());
  }

  @PutMapping("/api/user")
  public ResponseEntity<UserDto> edit(@RequestParam(value = "username", required = false) String username,
      @RequestParam(value = "email", required = false) String email,
      @RequestParam(value = "password", required = false) String password,
      Principal principal) throws UserPrincipalNotFoundException {

    if(principal == null) {
      throw new UserPrincipalNotFoundException("Authentication was not succesfull");
    }
    if (password != null) {
      password = bCryptPasswordEncoder.encode(password);
    }
    User user = userService.edit(principal.getName(), username, email, password);
    return ResponseEntity.of(Optional.of(new UserDto(user)));
  }
}
