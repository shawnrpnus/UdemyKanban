package com.udemykanban.ppmtool.services;

import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.exceptions.ProjectIdException;
import com.udemykanban.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    public Project saveOrUpdateProject(Project project) {

        //save as uppercase for easier comparison
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project); //persist if does not exist
        } catch (Exception e) {
            Optional<Project> proj = projectRepository.findByProjectIdentifierIgnoreCase(project.getProjectIdentifier());
            proj.ifPresent(project1 -> {
                throw new ProjectIdException("Project ID " + project1.getProjectIdentifier().toUpperCase() +
                        " already exists!");
            }); //make sure the exception is that a project with the same identifier already exists
            return null;
        }

    }

    public Project findByProjectIdentifier(String projectIdentifier) {
        Optional<Project> opProj = projectRepository.findByProjectIdentifierIgnoreCase(projectIdentifier);
        return opProj.orElseThrow(() -> new ProjectIdException("Project ID: " + projectIdentifier.toUpperCase()
                + " does not exist"));
    }
}
