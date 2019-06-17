package com.udemykanban.ppmtool.web;


import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.services.ProjectService;
import com.udemykanban.ppmtool.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectService projectService;
    private final ValidationService validationService;

    @Autowired
    public ProjectController(ProjectService projectService, ValidationService validationService) {
        this.projectService = projectService;
        this.validationService = validationService;
    }

    //    When Spring sees @Valid, it tries to find the validator for the object being validated.
    //    Spring automatically picks up validation annotations if you have “annotation-driven” enabled.
    //    Spring then invokes the validator and puts any errors in the BindingResult and
    //    adds the BindingResult to the view model.
    //    Also use @Valid to check validity based on validation constraints

    @PostMapping("") //can be used to update, just that the project req body must have the id attribute that exists
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) return errorMapRsp;// has errors from invalid object

        Project createdProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}") //project Id is path param
    public ResponseEntity<?> getProjectById(@PathVariable String projectIdentifier){
        Project project = projectService.findByProjectIdentifier(projectIdentifier);
        return new ResponseEntity<>(project, HttpStatus.OK);

    }

    @GetMapping("/all")
    public List<Project> getAllProjects(){ //can use Iterable<Project> also - default
        return projectService.findAllProjects();
    }

    @DeleteMapping("/delete") //this is using query params, can use path params also
    public ResponseEntity<?> deleteProject(@RequestParam("projectId") String projectId){
        projectService.deleteProjectByIdentifier(projectId);
        Map<String, String> delRsp = new HashMap<>();
        delRsp.put("Delete", "Project with ID: " + projectId + " successfully deleted!");
        return new ResponseEntity<>(delRsp, HttpStatus.OK);
    }

}
