package com.udemykanban.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice //global exception handler for controllers (methods with a @RequestMapping etc annotation)
@RestController
public class CustomEntityResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest req){
        //System.out.println("HEYYYY " + req.toString());
        ProjectIdExceptionResponse expRsp = new ProjectIdExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest req){
        //System.out.println("HEYYYY " + req.toString());
        ProjectNotFoundExceptionResponse expRsp = new ProjectNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }


}
