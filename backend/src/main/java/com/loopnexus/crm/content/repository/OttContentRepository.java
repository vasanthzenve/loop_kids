package com.loopnexus.crm.content.repository;

import com.loopnexus.crm.content.model.OttContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OttContentRepository extends JpaRepository<OttContent, Long> {
    List<OttContent> findByStatus(String status);
    List<OttContent> findByType(String type);
}

