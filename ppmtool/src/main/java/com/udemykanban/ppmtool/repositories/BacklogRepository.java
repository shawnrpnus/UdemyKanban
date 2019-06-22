package com.udemykanban.ppmtool.repositories;

import com.udemykanban.ppmtool.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {

    Optional<Backlog> findByProjectIdentifierIgnoreCase(String projectIdentifier);
}
