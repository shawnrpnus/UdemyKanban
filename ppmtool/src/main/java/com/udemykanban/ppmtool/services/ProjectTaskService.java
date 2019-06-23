package com.udemykanban.ppmtool.services;

import com.udemykanban.ppmtool.domain.Backlog;
import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.domain.ProjectTask;
import com.udemykanban.ppmtool.exceptions.ProjectNotFoundException;
import com.udemykanban.ppmtool.repositories.BacklogRepository;
import com.udemykanban.ppmtool.repositories.ProjectRepository;
import com.udemykanban.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    private final BacklogRepository backlogRepository;

    private final ProjectTaskRepository projectTaskRepository;

    private final ProjectRepository projectRepository;

    public ProjectTaskService(BacklogRepository backlogRepository,
                              ProjectTaskRepository projectTaskRepository,
                              ProjectRepository projectRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectRepository = projectRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        //Exceptions: project not found

        //project task to be added to an existing project
        //backlog should have been created when the project was created
        Backlog backlog = backlogRepository.findByProjectIdentifierIgnoreCase(projectIdentifier)
                .orElseThrow(() -> new ProjectNotFoundException("Project/Backlog not found"));
        //set backlog to project task
        projectTask.setBacklog(backlog);
        //project id sequence to be like: IDPRO-1, IDPRO-2
        Integer backlogSequence = backlog.getPTSequence();
        //update the backlog sequence
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);

        //add sequence to project task
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //INITIAL priority when priority is null
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        //INITIAL status when status is null
        if (projectTask.getStatus() == null || projectTask.getStatus().equals("")) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> findProjectTasksByProjectIdentifier(String projectIdentifier){

        projectRepository.findByProjectIdentifierIgnoreCase(projectIdentifier)
                .orElseThrow(()-> new ProjectNotFoundException("Project with ID " +
                        projectIdentifier.toUpperCase() + " Not Found"));
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findProjectTaskByProjectSequence(String backlog_id, String projectSequence){
        //make sure searching for existing backlog
        Backlog backlog = backlogRepository.findByProjectIdentifierIgnoreCase(backlog_id).orElseThrow(() ->
                new ProjectNotFoundException("Project/backlog not found for id: " + backlog_id));
        //make sure that task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequenceIgnoreCase(projectSequence)
                .orElseThrow(() -> new ProjectNotFoundException("Project Task not found"));
        if (!projectTask.getProjectIdentifier().equalsIgnoreCase(backlog_id)){ //project task is not from the correct backlog
            throw new ProjectNotFoundException(String.format("Project task '%s' does not exist in project '%s'", projectSequence, backlog_id));
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id){
        ProjectTask ptToUpdate = findProjectTaskByProjectSequence(backlog_id, pt_id);
        ptToUpdate.setPriority(updatedTask.getPriority());
        ptToUpdate.setStatus(updatedTask.getStatus());
        ptToUpdate.setAcceptanceCriteria(updatedTask.getAcceptanceCriteria());
        ptToUpdate.setSummary(updatedTask.getSummary());
        ptToUpdate.setDueDate(updatedTask.getDueDate());
        return projectTaskRepository.save(ptToUpdate);
    }

    public ProjectTask deleteProjectTask(String backlog_id, String pt_id){
        ProjectTask ptToDelete = findProjectTaskByProjectSequence(backlog_id, pt_id);
        ptToDelete.getBacklog().getProjectTasks().remove(ptToDelete);
        ptToDelete.setBacklog(null);
        projectTaskRepository.delete(ptToDelete);
        return ptToDelete;
    }
}
