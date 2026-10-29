package com.loopnexus.crm.content.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "app_releases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppRelease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String platform;   // Android, iOS, Android TV, etc.

    private String subtext;    // Version: 1.4.2, 1.4.1, 1.2.0, etc.
    private String version;    // Track: Production, Beta, Internal
    private String channel;
    private String status;     // ROLLING 25%, REVIEW, INTERNAL, LIVE 100%
    private String rollout;
    private String buildNumber;
    private String bundleId;
    private String minOs;
    private String crashFreeRate;
    private String activeDevices;
    private String storeUrl;

    @Column(length = 2000)
    private String releaseNotes;
}

