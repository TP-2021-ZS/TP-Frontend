package com.frontend.teamproject;

import com.frontend.teamproject.utils.PythonPackageManager;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class TeamProjectApplication extends SpringBootServletInitializer implements CommandLineRunner {

  public static void main(final String[] args) {
    SpringApplication.run(TeamProjectApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    PythonPackageManager manager = new PythonPackageManager();

//    manager.createNewProject("testasss");
  }
}
