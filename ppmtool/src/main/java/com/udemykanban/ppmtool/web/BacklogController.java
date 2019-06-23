package com.udemykanban.ppmtool.web;

import com.udemykanban.ppmtool.domain.ProjectTask;
import com.udemykanban.ppmtool.services.ProjectTaskService;
import com.udemykanban.ppmtool.services.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id){
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlog_id, pt_id);
        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }

    @PostMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String backlog_id, @PathVariable String pt_id){
        ResponseEntity<?> errorMap = validationService.generateErrorMapResponse(result);
        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlog_id, pt_id);

        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id){
        ProjectTask deletedProjectTask = projectTaskService.deleteProjectTask(backlog_id, pt_id);
        Map<String, String> delRsp = new HashMap<>();
        delRsp.put("projectTaskId", deletedProjectTask.getProjectSequence());
        return new ResponseEntity<>(delRsp, HttpStatus.OK);
    }
}
