package com.loopnexus.crm.director.repository;

import com.loopnexus.crm.director.model.DirectorProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectorProjectRepository extends JpaRepository<DirectorProject, Long> {
    List<DirectorProject> findByStatus(String status);
    List<DirectorProject> findByFilmIgnoreCase(String film);
}

