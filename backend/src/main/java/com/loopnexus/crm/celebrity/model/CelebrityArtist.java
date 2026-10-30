package com.loopnexus.crm.celebrity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crm_celebrity_artists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CelebrityArtist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String artist;

    private String subtext;

    @Column(name = "last_project")
    private String lastProject;

    private String manager;
    private String availability;

    @Column(name = "next_event")
    private String nextEvent;

    private String phone;
    private String email;
    private String agency;
    private String ndaStatus;
    private Integer activeEndorsements;
    private String remuneration;
    private String upcomingAppearance;

    @Column(length = 2000)
    private String notes;
}

