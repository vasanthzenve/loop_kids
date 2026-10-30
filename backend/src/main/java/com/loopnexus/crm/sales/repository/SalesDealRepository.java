package com.loopnexus.crm.sales.repository;

import com.loopnexus.crm.sales.model.SalesDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesDealRepository extends JpaRepository<SalesDeal, Long> {

    List<SalesDeal> findByStageIgnoreCase(String stage);

    long countByStageIgnoreCase(String stage);

    @Query("SELECT d FROM SalesDeal d WHERE " +
           "LOWER(d.deal) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.owner) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.stage) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.clientCompany) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<SalesDeal> searchDeals(@Param("query") String query);
}

