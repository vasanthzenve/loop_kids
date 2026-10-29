package com.loopnexus.crm.content.repository;

import com.loopnexus.crm.content.model.AppRelease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppReleaseRepository extends JpaRepository<AppRelease, Long> {
    List<AppRelease> findByStatus(String status);
    List<AppRelease> findByPlatform(String platform);
}

