package com.loopnexus.crm.content.repository;

import com.loopnexus.crm.content.model.AiJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiJobRepository extends JpaRepository<AiJob, Long> {
    List<AiJob> findByStatus(String status);
    List<AiJob> findByOperation(String operation);
}

