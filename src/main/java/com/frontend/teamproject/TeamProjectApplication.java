package com.frontend.teamproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class TeamProjectApplication {

  public static void main(final String[] args) {
    SpringApplication.run(TeamProjectApplication.class, args);
  }

}
