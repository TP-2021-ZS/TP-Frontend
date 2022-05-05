package com.frontend.teamproject.auth;

import com.frontend.teamproject.domain.Exceptions.CustomRuntimeException;
import com.frontend.teamproject.domain.classes.User;
import com.frontend.teamproject.domain.dto.UserDto;
import com.frontend.teamproject.domain.repositories.UserRepository;
import java.util.Collections;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service()
public class UserDetailServiceImpl implements UserDetailsService {

  private final UserRepository repository;

  public UserDetailServiceImpl(UserRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) {
    User currentUser = repository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User s menom " + username + " neexistuje."));
    return new org.springframework.security.core.userdetails.User(
        currentUser.getUsername(), currentUser.getPassword(),
        Collections.singletonList(new SimpleGrantedAuthority(currentUser.getRole().name())));
  }

  public void save(User user) {
    repository.save(user);
  }

  public ResponseEntity<UserDto> getUser(String username) {
    User existingUser = repository.findByUsername(username)
        .orElseThrow(() -> new EntityNotFoundException("Používateľ s menom " + username + "neexistuje"));
    return ResponseEntity.ok(new UserDto(existingUser));
  }

  public ResponseEntity<UserDto> edit(String oldUsername, String username, String email, String passwordEncode) {
    User existingUser = repository.findByUsername(oldUsername)
        .orElseThrow(() -> new EntityNotFoundException("Používateľ s menom " + username + "neexistuje"));

    if (username != null) {
      existingUser.setUsername(username);
    } else if (email != null) {
      existingUser.setEmail(email);
    } else if (passwordEncode != null) {
      existingUser.setPassword(passwordEncode);
    }

    final User updatedUser = repository.save(existingUser);
    return ResponseEntity.ok(new UserDto(updatedUser));
  }


  public void registerUser(String username, String hashedPassword, String email) {
    User user = new User(username, hashedPassword, email);
    try {
      repository.save(user);
    } catch (Exception e) {
      throw new CustomRuntimeException("Email a prihlasovacie meno musia byť unikátne",
          HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

}
