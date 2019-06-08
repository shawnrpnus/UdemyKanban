package com.udemykanban.ppmtool.web;


import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.services.ProjectService;
import com.udemykanban.ppmtool.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
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
    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null){ // has errors
            return errorMapRsp;
        }
        Project createdProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

}
