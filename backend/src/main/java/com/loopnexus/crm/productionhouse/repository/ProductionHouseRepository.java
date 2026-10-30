package com.loopnexus.crm.productionhouse.repository;

import com.loopnexus.crm.productionhouse.model.ProductionHouseContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductionHouseRepository extends JpaRepository<ProductionHouseContact, Long> {
    List<ProductionHouseContact> findByStatus(String status);
    List<ProductionHouseContact> findByLanguageIgnoreCase(String language);
}

