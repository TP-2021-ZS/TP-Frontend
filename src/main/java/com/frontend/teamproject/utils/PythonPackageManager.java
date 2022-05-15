package com.frontend.teamproject.utils;

import com.frontend.teamproject.domain.classes.DateAfterEnum;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class PythonPackageManager {
    public void createNewProject(String projectName, boolean enabled, DateAfterEnum dateAfterEnum) throws InterruptedException {
        try {
            this.createFolder(projectName);
            if (enabled) {
                this.createCronJob(projectName, dateAfterEnum);
            }
        } catch (IOException | InterruptedException e) {
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

    public void toggleProject(String projectName, boolean active, DateAfterEnum dateAfter) throws InterruptedException {
        try {
            if (active) {
                this.createCronJob(projectName, dateAfter);
            } else {
                this.deleteCronJob(projectName);
            }
        } catch (IOException | InterruptedException e) {
            throw new InterruptedException("Failed to delete project's instance: " + e.getMessage());
        }
    }

    private void createFolder(String projectName) throws IOException, InterruptedException {
        this.executeBashCommand(
                "cp -R /opt/py-default /opt/py-instances/%s",
                projectName
        );
    }

    private void createCronJob(String projectName, DateAfterEnum date) throws IOException, InterruptedException {
        this.executeBashCommand(
                "(crontab -l ; echo \"%s cd /opt/py-instances/%s && python3 main.py\") | crontab -",
                this.translateDateToCronFrequency(date),
                projectName
        );
    }

    private void deleteFolder(String projectName) throws IOException, InterruptedException{
        this.executeBashCommand(
                "rm -r /opt/py-instances/%s",
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

    private String translateDateToCronFrequency(DateAfterEnum date) {
        String frequency;
        switch (date) {
            case ALL:
                frequency = "0 * * * *";
                break;
            case WEEK:
                frequency = "0 0 * * 1";
                break;
            case MONTH:
                frequency = "0 0 1 * *";
                break;
            case YEAR:
                frequency = "0 0 0 1 *";
                break;
            default:
                frequency = "0 0 * * *";
                break;
        }
        return frequency;
    }
}
