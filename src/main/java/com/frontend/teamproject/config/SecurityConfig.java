package com.frontend.teamproject.config;

import com.frontend.teamproject.auth.UserDetailServiceImpl;
import com.frontend.teamproject.web.filter.AuthenticationFilter;
import com.frontend.teamproject.web.filter.LoginFilter;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


  private final UserDetailServiceImpl userDetailsService;

  public SecurityConfig(UserDetailServiceImpl userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {

    // Set permissions on endpoints
    http.authorizeRequests()
        // Our public endpoints
        .antMatchers("/api/registration").permitAll()
        .anyRequest().authenticated();

    http.csrf().disable().cors()
        .and()
        //nech sa token vytvara iba na adrese api/login
        .addFilterBefore(new LoginFilter("/api/login", authenticationManager()),
            UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://147.175.121.149"));
    config.setAllowedMethods(List.of("*"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    config.applyPermitDefaultValues();

    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
  }

}
