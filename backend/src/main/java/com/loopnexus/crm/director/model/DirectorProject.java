package com.loopnexus.crm.director.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crm_director_projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DirectorProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String director;

    private String subtext;
    private String film;     // Pre-production, Post, Pitch, Greenlit
    private String stage;    // Budget e.g. ₹40 Cr, ₹65 Cr
    private String status;   // LOCKED, REVIEWING

    @Column(name = "release_window")
    private String window;   // Q3 2026, Q4 2026, TBD, Q1 2027

    private String genre;
    private String productionHouse;

    @Column(length = 2000)
    private String synopsis;

    private String distributionScope;
    private String approvalStatus;
    private String phone;
    private String email;
}
