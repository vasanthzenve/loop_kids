package com.loopnexus.crm.investor.repository;

import com.loopnexus.crm.investor.model.InvestorDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestorDealRepository extends JpaRepository<InvestorDeal, Long> {

    List<InvestorDeal> findByStageIgnoreCase(String stage);

    long countByStageIgnoreCase(String stage);

    @Query("SELECT d FROM InvestorDeal d WHERE " +
           "LOWER(d.investor) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.subtext) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.stage) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.partnerName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<InvestorDeal> searchDeals(@Param("query") String query);
}

