package com.frontend.teamproject.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class AuthenticationService {

  static final long EXPIRATIONTIME = 864_000_00; // 1 day in milliseconds
  static final String SIGNINGKEY = "SecretKey";
  static final String PREFIX = "Bearer";
  static final String AUTHORIZATION = "Authorization";

  private AuthenticationService() {
  }

  public static void addToken(HttpServletResponse res, Authentication auth) {
    String authorities = auth.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(","));

    String jwtToken = Jwts.builder().setSubject(auth.getName())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
        .claim("role", authorities)
        .signWith(SignatureAlgorithm.HS512, SIGNINGKEY)
        .compact();
    res.addHeader(AUTHORIZATION, PREFIX + " " + jwtToken);
    res.addHeader("Access-Control-Expose-Headers", AUTHORIZATION);
  }

}
