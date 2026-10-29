package com.loopnexus.crm.content.repository;

import com.loopnexus.crm.content.model.ContentLicense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentLicenseRepository extends JpaRepository<ContentLicense, Long> {
    List<ContentLicense> findByStatus(String status);
    List<ContentLicense> findByGeography(String geography);
}

