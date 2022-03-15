package com.frontend.teamproject.domain.repositories;

import com.frontend.teamproject.domain.classes.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
  Optional<User> findByUsername(String username);

  @Query("SELECT u FROM User u")
  List<User> findAllLimited(Pageable pageable);
  @Query("SELECT u FROM User u WHERE (u.email LIKE %:search% OR u.username LIKE %:search%)")
  List<User> findUsers(String search, Pageable pageable);
  @Query("SELECT u FROM User u where u.email=:email")
  Optional<User> findByEmail(String email);
}