package com.loopnexus.crm.celebrity.repository;

import com.loopnexus.crm.celebrity.model.CelebrityArtist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CelebrityArtistRepository extends JpaRepository<CelebrityArtist, Long> {
    List<CelebrityArtist> findByAvailabilityContainingIgnoreCase(String availability);
}

