package com.udemykanban.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) //whenever throw this exception, give user bad request exception

public class ProjectTaskNotFoundException extends RuntimeException {

    public ProjectTaskNotFoundException(String message) {
        super(message);
    }
}
