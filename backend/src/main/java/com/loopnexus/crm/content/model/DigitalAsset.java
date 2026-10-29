package com.loopnexus.crm.content.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "digital_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DigitalAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String asset;

    private String subtext;     // Document, Video, Image, Audio, etc.
    private String type;        // Creator name: Edwin, Akash, Priya, etc.
    private String owner;       // File size: 4.2 MB, 1.2 GB, etc.
    private String status;      // APPROVED, ENCODING, PENDING
    private String size;
    private String dimensions;
    private String checksum;
    private String watermark;
    private String uploadedAt;
    private String storageBucket;
}

