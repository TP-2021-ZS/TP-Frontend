package com.frontend.teamproject.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class PythonPackageManager {
     public void createNewProject(String projectName) throws InterruptedException{
          try {
               this.createFolder(projectName);
          } catch (IOException | InterruptedException e){
               throw new InterruptedException("Failed to create project's instance.");
          }
     }

     private void createFolder(String fileName) throws IOException, InterruptedException {
          ProcessBuilder processBuilder = new ProcessBuilder();
          processBuilder.command("sh", "-c", String.format("mkdir /opt/py-instances/%s", fileName));
          processBuilder.directory(new File(System.getProperty("user.home")));

          Process process = processBuilder.start();
          process.waitFor();

          processBuilder.command("sh", "-c", String.format("cp -R /opt/py-default /opt/py-instances/%s", fileName));

          process = processBuilder.start();
          process.waitFor();
     }

     private void createCronJob(){

     }
}
