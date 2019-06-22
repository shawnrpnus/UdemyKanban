package com.udemykanban.ppmtool.services;

import com.udemykanban.ppmtool.domain.Backlog;
import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.exceptions.ProjectIdException;
import com.udemykanban.ppmtool.repositories.BacklogRepository;
import com.udemykanban.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final BacklogRepository backlogRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository) {

        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }


    public Project saveOrUpdateProject(Project project) {

        //save as uppercase for easier comparison
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if (project.getId() == null) { //project is new
                Backlog backlog = new Backlog();
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
                project.setBacklog(backlog);
                backlog.setProject(project);
            } else { //project already exists, must set again because its not passed in from client
                Backlog backlogToSet = backlogRepository.findByProjectIdentifierIgnoreCase(project.getProjectIdentifier())
                        .orElseThrow(() -> new RuntimeException("Backlog not found"));
                project.setBacklog(backlogToSet);
            }
            return projectRepository.save(project); //persist if does not exist
            //the save method in CrudRepository checks if the id field (primary key) exists in the project object.
            //if it exists, check if a project with that id exists in db. if in db, just UPDATE/MERGE the project.
            //if not in db OR the id field does not exist, then PERSIST
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

    public List<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectIdentifier) {
        Optional<Project> opProj = projectRepository.findByProjectIdentifierIgnoreCase(projectIdentifier);
        Project projectToDelete = opProj.orElseThrow(() -> new ProjectIdException("Project ID: " + projectIdentifier.toUpperCase()
                + " does not exist! Cannot delete)"));
        projectRepository.delete(projectToDelete);
    }
}
