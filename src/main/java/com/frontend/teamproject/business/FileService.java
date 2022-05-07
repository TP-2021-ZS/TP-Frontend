package com.frontend.teamproject.business;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.frontend.teamproject.domain.classes.ConfigFile;
import com.frontend.teamproject.domain.classes.DateAfterEnum;
import com.frontend.teamproject.domain.dto.DictionaryItemDto;
import com.frontend.teamproject.domain.dto.ProjectDto;
import com.mysql.cj.log.Log;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriter;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class FileService {

  @Value("${PROJECTS_HOME_DIR}")
  private String homeDir;
  @Value("${PROJECTS_WEBPAGES}")
  private String webpagesFile;
  @Value("${PROJECTS_FORBIDDEN_WEBPAGES}")
  private String forbiddenWebpagesFile;
  @Value("${PROJECTS_DICT}")
  private String dictFile;
  @Value("${PROJECTS_KEYWORDS_FILE}")
  private String keywordsFile;
  @Value("${PROJECTS_CONFIG_FILE}")
  private String configFilePath;

  private final Logger logger;

  FileService(Logger logger) {
    this.logger = logger;
  }

  public void mkDir(UUID id) {
    File theDir = new File(homeDir + id);
    if (!theDir.exists()) {
      logger.info("Creating dir on path {}", theDir);
      theDir.mkdirs();
    }
  }

  public List<String> readForbiddenWebpages(String uuid) {
    String path = homeDir + uuid + "/" + forbiddenWebpagesFile;
    return readArrayFromFile(path);
  }

  public List<String> readWebpages(String uuid) {
    String path = homeDir + uuid + "/" + webpagesFile;
    return readArrayFromFile(path);
  }

  public List<String> readKeywords(String uuid) {
    String path = homeDir + uuid + "/" + keywordsFile;
    return readArrayFromFile(path);
  }

  public List<DictionaryItemDto> readDict(String uuid) {
    String path = homeDir + uuid + "/" + dictFile;
    List<DictionaryItemDto> dict = new ArrayList<>();
    try (FileReader fr = new FileReader(path)) {
      CSVReader csvReader = new CSVReaderBuilder(fr).withSkipLines(1).build();
      List<String[]> allData = csvReader.readAll();
      for (String[] row : allData) {
        DictionaryItemDto item = new DictionaryItemDto();
        item.setWord(row[0]);
        item.setRating(Integer.parseInt(row[1]));
        dict.add(item);
      }
      return dict;
    } catch (IOException ex) {
      logger.error("Problem with reading file: " + path);
      return dict;
    }
  }

  public ProjectDto setUsersEmailAndDateAfter(ProjectDto project, String uuid) {
    String path = homeDir + uuid + "/" + configFilePath;
    ConfigFile configFile = readConfigFile(path);
    if(configFile != null) {
      project.setUsersEmail(configFile.getListOfRecipients());
      project.setDateAfter(configFile.getDateAfter());
      return project;
    } return null;
  }

  public void setUpConfigFile(List<String> emails, DateAfterEnum dateAfter, UUID uuid) {
    String path = homeDir + uuid + "/" + configFilePath;

    try {
      ConfigFile config = new ConfigFile();
      config.setBlacklistUrls(uuid + "/" + forbiddenWebpagesFile);
      config.setKnownUrls(uuid + "/" + webpagesFile);
      config.setKeywordsScoring(uuid + "/" + dictFile);
      config.setKeywordsSearchTitle(uuid + "/" + dictFile);
      config.setListOfRecipients(emails);
      config.setKeywordsSearchContent(uuid + "/" + dictFile);
      config.setProjectPath(uuid.toString());
      config.setDateAfter(dateAfter);
      writeConfigFile(path, config);
    } catch (IOException ex) {
      logger.error("Problem with writing to file: " + path);
    }
  }

  public void writeToFileSystem(ProjectDto dto, UUID uuid) {
    if(dto.getWebpages() != null) {
      writeWebpagesToFile(dto.getWebpages(), uuid);
    }
    if(dto.getForbiddenWebpages() != null) {
      writeForbiddenWebpagesToFile(dto.getForbiddenWebpages(), uuid);
    }
    if(dto.getKeywords() != null) {
      writeKeywordsToFile(dto.getKeywords(), uuid);
    }
    if(dto.getDict() != null) {
      writeDictToFile(dto.getDict(), uuid);
    }
    if(dto.getUsersEmail() != null) {
      setUpConfigFile(dto.getUsersEmail(), dto.getDateAfter(), uuid);
    }
  }

  public void deleteFiles(String uuid) throws IOException {
    String path = homeDir + uuid;
    Files.walk(Path.of(path))
        .sorted(Comparator.reverseOrder())
        .map(Path::toFile)
        .forEach(File::delete);
  }

  private void writeWebpagesToFile(List<String> array, UUID uuid) {
    String path = homeDir + uuid + "/" + webpagesFile;
    writeArrayToFile(array, path);
  }

  private void writeKeywordsToFile(List<String> array, UUID uuid) {
    String path = homeDir + uuid + "/" + keywordsFile;
    writeArrayToFile(array, path);
  }

  private void writeForbiddenWebpagesToFile(List<String> array, UUID uuid) {
    String path = homeDir + uuid + "/" + forbiddenWebpagesFile;
    writeArrayToFile(array, path);
  }

  private void writeDictToFile(List<DictionaryItemDto> dict, UUID uuid) {
    String path = homeDir + uuid + "/" + dictFile;
    try (FileWriter fw = new FileWriter(path, false)) {
      CSVWriter writer = new CSVWriter(fw);
      String[] header = {"word", "weight"};
      writer.writeNext(header);
      for (DictionaryItemDto item : dict) {
        String[] data = {item.getWord(), String.valueOf(item.getRating())};
        writer.writeNext(data);
      }
      writer.close();

    } catch (IOException ex) {
      logger.error("Problem with writing to file: " + path);
    }
  }

  private List<String> readArrayFromFile(String path) {
    List<String> array = new ArrayList<>();
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
      String line = br.readLine();

      while (line != null) {
        array.add(line);
        line = br.readLine();
      }
      return array;
    } catch (IOException ex) {
      logger.error("Problem with reading file: " + path);
      return array;
    }
  }

  private void writeArrayToFile(List<String> array, String path) {
    try (BufferedWriter bw = new BufferedWriter(new FileWriter(path, false))) {
      for (String value : array) {
        bw.write(value);
        bw.newLine();
        bw.flush();
      }
    } catch (IOException ex) {
      logger.error("Problem with writing to file: " + path);
    }
  }

  private void writeConfigFile(String path, ConfigFile configFile) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
    objectMapper.writeValue(new File(path), configFile);
  }

  private ConfigFile readConfigFile(String path) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      return objectMapper.readValue(new File(path), ConfigFile.class);
    } catch (IOException e) {
      logger.error("Problem with parsing configFile: " + path);
      return null;
    }
  }
}
