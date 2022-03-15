package com.frontend.teamproject.web.filter;

import com.frontend.teamproject.auth.UserDetailServiceImpl;
import java.io.IOException;
import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

  @Resource(name = "UserService")
  private  UserDetailsService userDetailsService;
  @Autowired
  private  TokenProvider tokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    initBeans(request);

    String header = request.getHeader("Authorization");
    Authentication authentication = null;
    if ( header != null && !header.equals("null") ){
      String authToken = header.replace("Bearer", "");
      UserDetails userDetails = userDetailsService.loadUserByUsername(tokenProvider.getUsernameFromToken(authToken));
      authentication = tokenProvider.getAuthenticationToken(authToken, userDetails);
    }
    SecurityContextHolder.getContext().setAuthentication(authentication);
    filterChain.doFilter(request, response);
  }

  private void initBeans(HttpServletRequest request) {
    if (userDetailsService==null) {
      ServletContext servletContext = request.getServletContext();
      WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
      userDetailsService = webApplicationContext.getBean(UserDetailServiceImpl.class);
      tokenProvider = webApplicationContext.getBean(TokenProvider.class);
    }
  }

}
