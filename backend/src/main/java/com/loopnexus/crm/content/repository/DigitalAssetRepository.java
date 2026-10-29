package com.loopnexus.crm.content.repository;

import com.loopnexus.crm.content.model.DigitalAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DigitalAssetRepository extends JpaRepository<DigitalAsset, Long> {
    List<DigitalAsset> findByStatus(String status);
    List<DigitalAsset> findBySubtext(String subtext);
}

