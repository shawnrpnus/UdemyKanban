package com.udemykanban.ppmtool.web;


import com.udemykanban.ppmtool.domain.Project;
import com.udemykanban.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    //    When Spring sees @Valid, it tries to find the validator for the object being validated.
    //    Spring automatically picks up validation annotations if you have “annotation-driven” enabled.
    //    Spring then invokes the validator and puts any errors in the BindingResult and
    //    adds the BindingResult to the view model.
    @PostMapping("") //use valid for better error message
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid Project Object", HttpStatus.BAD_REQUEST);
        }
        Project createdProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

}
