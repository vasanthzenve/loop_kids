package com.loopnexus.crm.sponsor.repository;

import com.loopnexus.crm.sponsor.model.SponsorDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SponsorDealRepository extends JpaRepository<SponsorDeal, Long> {
    List<SponsorDeal> findByStatus(String status);
    List<SponsorDeal> findByPackageTierIgnoreCase(String packageTier);
}
