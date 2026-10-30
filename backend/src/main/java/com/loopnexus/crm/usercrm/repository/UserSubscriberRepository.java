package com.loopnexus.crm.usercrm.repository;

import com.loopnexus.crm.usercrm.model.UserSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSubscriberRepository extends JpaRepository<UserSubscriber, Long> {
    List<UserSubscriber> findByStatus(String status);
    List<UserSubscriber> findByCityIgnoreCase(String city);
}

