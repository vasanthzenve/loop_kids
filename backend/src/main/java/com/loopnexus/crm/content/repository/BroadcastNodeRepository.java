package com.loopnexus.crm.content.repository;

import com.loopnexus.crm.content.model.BroadcastNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BroadcastNodeRepository extends JpaRepository<BroadcastNode, Long> {
    List<BroadcastNode> findByStatus(String status);
    List<BroadcastNode> findBySubtext(String subtext);
}

