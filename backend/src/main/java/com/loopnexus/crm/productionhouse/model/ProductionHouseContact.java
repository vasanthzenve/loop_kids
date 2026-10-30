package com.loopnexus.crm.productionhouse.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crm_production_houses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductionHouseContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String company;

    @Column(name = "contact_person")
    private String contactPerson;

    private String language;
    private String region;
    private String phone;
    private String email;

    @Column(nullable = false)
    private String status; // CONTACTED, INTERESTED, MEETING SCHEDULED, NEGOTIATING, SIGNED, DECLINED, FOLLOW UP

    @Column(name = "next_action")
    private String nextAction;

    @Column(name = "content_offered", length = 1000)
    private String contentOffered;

    @Column(length = 2000)
    private String notes;

    @Column(name = "deal_value")
    private String dealValue;
}

