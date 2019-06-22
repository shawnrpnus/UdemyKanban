package com.udemykanban.ppmtool.web;

import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.domain.ProjectTask;
import com.udemykanban.ppmtool.services.ProjectTaskService;
import com.udemykanban.ppmtool.services.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    private final ProjectTaskService projectTaskService;
    private final ValidationService validationService;

    public BacklogController(ProjectTaskService projectTaskService, ValidationService validationService) {
        this.projectTaskService = projectTaskService;
        this.validationService = validationService;
    }

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result, @PathVariable String backlog_id) {

        ResponseEntity<?> errorMap = validationService.generateErrorMapResponse(result);
        if (errorMap != null) {
            return errorMap;
        }
        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask);
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}") //list no need response entity also can (see ProjectController)
    public ResponseEntity<?> getProjectBacklog(@PathVariable String backlog_id){
        return new ResponseEntity<>(projectTaskService.findProjectTasksByProjectIdentifier(backlog_id), HttpStatus.OK);
    }
}
