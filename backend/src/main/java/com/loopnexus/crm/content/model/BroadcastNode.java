package com.loopnexus.crm.content.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "broadcast_nodes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BroadcastNode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String edge;

    private String subtext;
    private String region;
    private String bitrate;
    private String status;      // HEALTHY, DEGRADED, OFFLINE
    private String health;
    private String latency;
    private String packetLoss;
    private String viewers;
    private String cdnProvider;
    private String protocol;
    private String failoverEdge;
}

