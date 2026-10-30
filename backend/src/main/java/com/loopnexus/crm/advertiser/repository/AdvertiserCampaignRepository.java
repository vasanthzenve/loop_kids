package com.loopnexus.crm.advertiser.repository;

import com.loopnexus.crm.advertiser.model.AdvertiserCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertiserCampaignRepository extends JpaRepository<AdvertiserCampaign, Long> {

    List<AdvertiserCampaign> findByStatusIgnoreCase(String status);

    long countByStatusIgnoreCase(String status);

    @Query("SELECT c FROM AdvertiserCampaign c WHERE " +
           "LOWER(c.campaign) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.brand) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.targetAudience) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.status) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<AdvertiserCampaign> searchCampaigns(@Param("query") String query);
}

