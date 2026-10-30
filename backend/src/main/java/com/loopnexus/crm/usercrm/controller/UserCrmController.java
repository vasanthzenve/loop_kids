package com.loopnexus.crm.usercrm.controller;

import com.loopnexus.crm.usercrm.model.UserSubscriber;
import com.loopnexus.crm.usercrm.repository.UserSubscriberRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crm/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class UserCrmController {

    private final UserSubscriberRepository repository;

    public UserCrmController(UserSubscriberRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialSubscribers() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                UserSubscriber.builder()
                    .name("Rahul Verma")
                    .subtext("Chennai · Premium")
                    .plan("8 movies this week")
                    .wallet("₹245")
                    .status("ACTIVE")
                    .joined("12 Jan")
                    .email("rahul.verma@loopcrm.in")
                    .phone("+91 98401 23456")
                    .city("Chennai")
                    .tier("Premium")
                    .kycStatus("Verified")
                    .rewardPoints(1480)
                    .activeDevices(3)
                    .watchTimeHrs(64.2)
                    .riskScore("Low (1.4%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Anita Sharma")
                    .subtext("Mumbai · Premium")
                    .plan("Wallet topped up")
                    .wallet("₹312")
                    .status("ACTIVE")
                    .joined("08 Jan")
                    .email("anita.sharma@loopcrm.in")
                    .phone("+91 98200 87654")
                    .city("Mumbai")
                    .tier("Premium")
                    .kycStatus("Verified")
                    .rewardPoints(2150)
                    .activeDevices(4)
                    .watchTimeHrs(92.0)
                    .riskScore("Low (0.9%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Kiran Reddy")
                    .subtext("Hyderabad · Trial")
                    .plan("Day 4 of trial")
                    .wallet("₹0")
                    .status("TRIAL")
                    .joined("20 Jan")
                    .email("kiran.reddy@loopcrm.in")
                    .phone("+91 94401 99887")
                    .city("Hyderabad")
                    .tier("Trial")
                    .kycStatus("Pending")
                    .rewardPoints(150)
                    .activeDevices(2)
                    .watchTimeHrs(14.5)
                    .riskScore("Moderate (28%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Meena Iyer")
                    .subtext("Bengaluru · Premium")
                    .plan("Refund requested")
                    .wallet("₹365")
                    .status("REFUND")
                    .joined("02 Jan")
                    .email("meena.iyer@loopcrm.in")
                    .phone("+91 98450 11223")
                    .city("Bengaluru")
                    .tier("Premium")
                    .kycStatus("Verified")
                    .rewardPoints(840)
                    .activeDevices(1)
                    .watchTimeHrs(31.8)
                    .riskScore("High (74%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Suresh K")
                    .subtext("Coimbatore · Basic")
                    .plan("KYC pending")
                    .wallet("—")
                    .status("KYC")
                    .joined("21 Jan")
                    .email("suresh.k@loopcrm.in")
                    .phone("+91 99442 33445")
                    .city("Coimbatore")
                    .tier("Basic")
                    .kycStatus("Document Uploaded")
                    .rewardPoints(100)
                    .activeDevices(1)
                    .watchTimeHrs(5.2)
                    .riskScore("Moderate (32%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Pooja Hegde")
                    .subtext("Delhi · VIP Family")
                    .plan("4K Dolby Atmos active")
                    .wallet("₹1,240")
                    .status("ACTIVE")
                    .joined("15 Dec")
                    .email("pooja.h@loopcrm.in")
                    .phone("+91 98110 55667")
                    .city("Delhi")
                    .tier("VIP Family")
                    .kycStatus("Verified")
                    .rewardPoints(3820)
                    .activeDevices(5)
                    .watchTimeHrs(142.6)
                    .riskScore("Low (0.4%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Vikramaditya Bose")
                    .subtext("Kolkata · Standard")
                    .plan("Payment renewal due")
                    .wallet("₹45")
                    .status("ACTIVE")
                    .joined("18 Nov")
                    .email("vikram.bose@loopcrm.in")
                    .phone("+91 98300 77889")
                    .city("Kolkata")
                    .tier("Standard")
                    .kycStatus("Verified")
                    .rewardPoints(1120)
                    .activeDevices(2)
                    .watchTimeHrs(55.0)
                    .riskScore("Moderate (18%)")
                    .build(),

                UserSubscriber.builder()
                    .name("Deepak Menon")
                    .subtext("Kochi · Trial")
                    .plan("Day 6 of trial")
                    .wallet("₹0")
                    .status("TRIAL")
                    .joined("22 Jan")
                    .email("deepak.m@loopcrm.in")
                    .phone("+91 94471 22334")
                    .city("Kochi")
                    .tier("Trial")
                    .kycStatus("Pending")
                    .rewardPoints(220)
                    .activeDevices(1)
                    .watchTimeHrs(18.4)
                    .riskScore("Moderate (22%)")
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<UserSubscriber>> getAllSubscribers() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<UserSubscriber> createSubscriber(@RequestBody UserSubscriber subscriber) {
        UserSubscriber saved = repository.save(subscriber);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<UserSubscriber> updateSubscriber(@PathVariable Long id, @RequestBody UserSubscriber updated) {
        return repository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setSubtext(updated.getSubtext());
            existing.setPlan(updated.getPlan());
            existing.setWallet(updated.getWallet());
            existing.setStatus(updated.getStatus());
            existing.setEmail(updated.getEmail());
            existing.setPhone(updated.getPhone());
            existing.setCity(updated.getCity());
            existing.setTier(updated.getTier());
            existing.setKycStatus(updated.getKycStatus());
            existing.setRewardPoints(updated.getRewardPoints());
            existing.setActiveDevices(updated.getActiveDevices());
            existing.setWatchTimeHrs(updated.getWatchTimeHrs());
            existing.setRiskScore(updated.getRiskScore());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long activeCount = repository.findByStatus("ACTIVE").size();
        long trialCount = repository.findByStatus("TRIAL").size();
        long kycCount = repository.findByStatus("KYC").size();
        long refundCount = repository.findByStatus("REFUND").size();

        return ResponseEntity.ok(Map.of(
            "activeSubscribers", "1.2 L",
            "activeSubscribersChange", "+18% w/w",
            "trialToPaid", "62%",
            "trialToPaidChange", "+4 pts",
            "avgWalletBalance", "₹128",
            "churnRisk", "6.1%",
            "activeCount", activeCount,
            "trialCount", trialCount,
            "kycCount", kycCount,
            "refundCount", refundCount
        ));
    }
}

