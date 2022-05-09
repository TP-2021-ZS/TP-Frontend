package com.frontend.teamproject.utils;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class PythonPackageManager {
    public void createNewProject(String projectName, boolean enabled) throws InterruptedException{
        try {
            this.createFolder(projectName);
            if (enabled) {
                this.createCronJob(projectName);
            }
        } catch (IOException | InterruptedException e){
            throw new InterruptedException("Failed to delete project's instance: " + e.getMessage());
        }
    }

    public void deleteProject(String projectName) throws InterruptedException {
        try {
            this.deleteCronJob(projectName);
            this.deleteFolder(projectName);
        } catch (IOException | InterruptedException e){
            throw new InterruptedException("Failed to delete project's instance: " + e.getMessage());
        }
    }

    private void createFolder(String projectName) throws IOException, InterruptedException {
        this.executeBashCommand(
                "cp -R /opt/py-default /opt/py-instances/%s",
                projectName
        );
    }

    private void createCronJob(String projectName) throws IOException, InterruptedException {
        this.executeBashCommand(
                "(crontab -l ; echo \"45 * * * * cd /opt/py-instances/%s && python3 main.py\") | crontab -",
                projectName
        );
    }

    private void deleteFolder(String projectName) throws IOException, InterruptedException{
        this.executeBashCommand(
                "rm -R /opt/py-instances/%s",
                projectName
        );
    }

    private void deleteCronJob(String projectName) throws IOException, InterruptedException{
        this.executeBashCommand(
                "crontab -l | grep -v 'cd /opt/py-instances/%s && python3 main.py' | crontab -",
                projectName
        );
    }

    private void executeBashCommand(String command, Object ...args) throws IOException, InterruptedException{
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command(
                "sh",
                "-c",
                String.format(
                        command,
                        args
                )
        );
        processBuilder.directory(new File(System.getProperty("user.home")));

        Process process = processBuilder.start();
        process.waitFor();
    }
}
