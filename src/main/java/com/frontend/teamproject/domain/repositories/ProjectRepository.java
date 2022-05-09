package com.frontend.teamproject.domain.repositories;

import com.frontend.teamproject.domain.classes.Project;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

  Optional<Project> findByUuidAndUserUsername(UUID uuid, String username);

  Optional<List<Project>> findAllByUserUsername(String username);

  @Modifying
  @Transactional
  @Query("delete from Project p where p.uuid = :uuid and p.user "
      + "in (select u from User u where u.username = :username)")
  void deleteByUuidAndUserUsername(UUID uuid, String username);

}
