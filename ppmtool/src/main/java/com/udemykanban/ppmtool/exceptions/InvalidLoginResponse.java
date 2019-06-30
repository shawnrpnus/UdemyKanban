package com.udemykanban.ppmtool.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class InvalidLoginResponse {
    private String username;
    private String password;

    public InvalidLoginResponse(){
        username = "Invalid Username";
        password = "Invalid Password";
    }

}
