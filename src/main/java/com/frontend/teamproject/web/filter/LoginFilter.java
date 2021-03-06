package com.frontend.teamproject.web.filter;

import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.frontend.teamproject.auth.AuthenticationService;
import com.frontend.teamproject.domain.Exceptions.CustomRuntimeException;
import com.frontend.teamproject.domain.classes.AccountCredentials;
import java.io.IOException;
import java.util.Collections;
import javax.servlet.FilterChain;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


public class LoginFilter extends AbstractAuthenticationProcessingFilter {

  public LoginFilter(String url, AuthenticationManager authManager) {
    super(new AntPathRequestMatcher(url));
    setAuthenticationManager(authManager);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
      throws AuthenticationException, IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(Feature.AUTO_CLOSE_SOURCE, true);
    ServletInputStream inputStream = req.getInputStream();
    try {
      AccountCredentials creds = objectMapper
          .readValue(inputStream, AccountCredentials.class);
      return getAuthenticationManager().authenticate(
          new UsernamePasswordAuthenticationToken(
              creds.getUsername(),
              creds.getPassword(),
              Collections.emptyList()
          )
      );
    } catch (Exception e) {
      throw new CustomRuntimeException(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

  }

  @Override
  protected void successfulAuthentication(
      HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) {
    AuthenticationService.addToken(res, auth);
  }
}
