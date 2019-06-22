package com.udemykanban.ppmtool.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer PTSequence = 0; //project task sequence
    private String projectIdentifier;

    //One to One with Project
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    @JsonIgnore //relationship from backlog to project will be ignored when fetching via APIs
    private Project project;
    //One to Many with Project Tasks
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="backlog")
    private List<ProjectTask> projectTasks = new ArrayList<>();
}
