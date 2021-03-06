package com.udemykanban.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data @NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Project name is required")
    private String projectName;

    @NotBlank(message = "Project identifier is required")
    @Size(max = 5, min = 4, message = "Please use 4 - 5 characters")
    @Column(unique = true, updatable = false)
    private String projectIdentifier;

    @NotBlank(message = "Project description is required")
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    private Date start_date;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    private Date end_date;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    private Date updated_At;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "project")
    @JsonIgnore
    private Backlog backlog;

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

}
