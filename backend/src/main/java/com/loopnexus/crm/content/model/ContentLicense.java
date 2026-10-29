package com.loopnexus.crm.content.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "content_licenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String geography;
    private String territory;

    @Column(name = "rights_window")
    private String window;

    private String status;      // ACTIVE, RENEW, DISPUTE
    private String expiry;
    private String licensor;
    private String fee;
    private String rightsType;
    private String linearBroadcast;
    private String geoFence;
}

