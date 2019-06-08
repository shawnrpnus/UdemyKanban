package com.udemykanban.ppmtool.repositories;

import com.udemykanban.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    Optional<Project> findByProjectIdentifierIgnoreCase(String projectIdentifier);

    @Override
    List<Project> findAll();

}
