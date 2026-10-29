package com.loopnexus.crm.content.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ott_content")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OttContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String category;   // Film, Series, etc.
    private String type;       // Tamil, Telugu, Bengali, etc.
    private String language;
    private String status;     // LIVE, SCHEDULED, ENCODING, IN REVIEW

    @Column(name = "release_slot")
    private String release;    // Live, Feb 12, Mar 04, etc.

    private String duration;
    private String resolution;
    private String rating;

    @Column(length = 2000)
    private String synopsis;

    private String director;
    private Integer episodes;
}

