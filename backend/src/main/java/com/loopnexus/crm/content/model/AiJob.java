package com.loopnexus.crm.content.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ai_content_jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String asset;

    private String subtext;
    private String operation;
    private String engine;
    private String status;      // DONE, QUEUED, PROCESSING
    private String runTime;
    private String confidence;
    private String tokensUsed;
    private String model;
    private String targetLang;
    private String outputFormat;
}

