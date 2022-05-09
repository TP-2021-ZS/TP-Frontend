package com.frontend.teamproject.domain.classes;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ConfigFile {

  @JsonProperty("tags")
  private List<String> tags = new ArrayList<>() {{
    add("p");
    add("h1");
  }};
  @JsonProperty("keywords_scoring")
  private String keywordsScoring;
  @JsonProperty("keywords_search_content")
  private String keywordsSearchContent;
  @JsonProperty("keywords_search_title")
  private String keywordsSearchTitle;
  @JsonProperty("known_urls")
  private String knownUrls;
  @JsonProperty("blacklist_urls")
  private String blacklistUrls;
  @JsonProperty("num_of_random_queries")
  private int numOfRandomQueries = 10;
  @JsonProperty("random_articles_per_query")
  private int randomArticlesPerQuery = 10;
  @JsonProperty("known_articles_per_query")
  private int knownArticlesPerQuery = 3;
  @JsonProperty("date_after")
  private DateAfterEnum dateAfter;
  @JsonProperty("list_of_recipients")
  private List<String> listOfRecipients = new ArrayList<>();
  @JsonProperty("project_path")
  private String projectPath;

}