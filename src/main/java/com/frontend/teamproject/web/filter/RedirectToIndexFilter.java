package com.frontend.teamproject.web.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class RedirectToIndexFilter implements Filter {

  private static final Set<String> NON_FORWARD_PATHS = new HashSet<>(
      Arrays.asList("api", "js", "css", "image", "assets"));

  @Override
  public void doFilter(final ServletRequest request, final ServletResponse response,
      final FilterChain chain) throws IOException, ServletException {

    final String requestUri = getRequestUri((HttpServletRequest) request);

    if (isRequestToIndex(requestUri) || isNonForwardRequest(requestUri)) {
      chain.doFilter(request, response);
      return;
    }

    forwardRequest(request, response, getRequestDispatcher(request));
  }

  private void forwardRequest(final ServletRequest request, final ServletResponse response,
      final RequestDispatcher requestDispatcher) throws ServletException, IOException {
    requestDispatcher.forward(request, response);
  }

  private RequestDispatcher getRequestDispatcher(final ServletRequest request) {
    return request.getRequestDispatcher("/");
  }

  private String getRequestUri(final HttpServletRequest request) {
    return request.getRequestURI();
  }

  private boolean isRequestToIndex(final String requestUri) {
    return Objects.equals("/", requestUri) || "/index.html".equals(requestUri);
  }

  private boolean isNonForwardRequest(String requestUri) {
    return NON_FORWARD_PATHS.stream()
        .anyMatch(nonForwardPath -> requestHasPrefix(requestUri, nonForwardPath));
  }

  private boolean requestHasPrefix(String requestUri, String prefix) {
    return Objects.equals("/" + prefix, requestUri) || requestUri.startsWith("/" + prefix + "/");
  }
}
