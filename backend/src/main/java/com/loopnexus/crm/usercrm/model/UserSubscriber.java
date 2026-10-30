package com.loopnexus.crm.usercrm.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crm_user_subscribers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSubscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String subtext;
    private String plan;
    private String wallet;
    private String status;
    private String joined;

    private String email;
    private String phone;
    private String city;
    private String tier;
    private String kycStatus;
    private Integer rewardPoints;
    private Integer activeDevices;
    private Double watchTimeHrs;
    private String riskScore;
}

