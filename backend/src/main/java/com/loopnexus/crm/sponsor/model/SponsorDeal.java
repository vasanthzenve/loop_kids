package com.loopnexus.crm.sponsor.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crm_sponsor_deals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SponsorDeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sponsor;

    private String subtext;

    @Column(name = "package_tier")
    private String packageTier; // Contract, Negotiating, Proposal, Onboarded

    private String stage;       // ₹6.5 Cr, ₹3 Cr, ₹1.4 Cr, ₹2.2 Cr
    private String status;      // CLOSED, HOT, WARM
    private String renewal;     // 2027, —, 2026

    private String category;    // Automotive, Fintech, FMCG
    private String contactPerson;
    private String phone;
    private String email;
    private String impressionsGuaranteed;
    private String roiMetric;

    @Column(length = 1000)
    private String deliverables;

    @Column(length = 2000)
    private String notes;
}
