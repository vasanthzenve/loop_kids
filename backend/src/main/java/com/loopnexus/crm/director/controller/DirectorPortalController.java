package com.loopnexus.crm.director.controller;

import com.loopnexus.crm.director.model.DirectorProject;
import com.loopnexus.crm.director.repository.DirectorProjectRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crm/directors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class DirectorPortalController {

    private final DirectorProjectRepository repository;

    public DirectorPortalController(DirectorProjectRepository repository) {
        this.repository = repository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialDirectorProjects() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                DirectorProject.builder()
                    .director("Mani Ratnam")
                    .subtext("Untitled L1")
                    .film("Pre-production")
                    .stage("₹40 Cr")
                    .status("LOCKED")
                    .window("Q3 2026")
                    .genre("Period Romance / Historical Drama")
                    .productionHouse("Madras Talkies")
                    .synopsis("An evocative multi-generational narrative examining maritime silk route heritage through coastal Tamil Nadu.")
                    .distributionScope("Pan-India Theatrical + Direct SVOD Worldwide Exclusive")
                    .approvalStatus("Final Budget Approved by Greenlight Committee")
                    .phone("+91 98400 12345")
                    .email("office@madrastalkies.com")
                    .build(),

                DirectorProject.builder()
                    .director("Lokesh Kanagaraj")
                    .subtext("Loop Action S2")
                    .film("Post")
                    .stage("₹65 Cr")
                    .status("LOCKED")
                    .window("Q4 2026")
                    .genre("High-Octane Action Thriller")
                    .productionHouse("G Squad / Seven Screen")
                    .synopsis("A relentless underworld vigilante operation uncovering contraband networks spanning coastal corridors.")
                    .distributionScope("Exclusive OTT Premiere + 4K Dolby Atmos Master")
                    .approvalStatus("Rough Cut Review Completed with 98% Score")
                    .phone("+91 98410 99881")
                    .email("loki@gsquadfilms.in")
                    .build(),

                DirectorProject.builder()
                    .director("Karan Johar")
                    .subtext("Pan-India romance")
                    .film("Pitch")
                    .stage("₹80 Cr")
                    .status("REVIEWING")
                    .window("TBD")
                    .genre("Contemporary Family Romance")
                    .productionHouse("Dharma Productions")
                    .synopsis("A lavish cross-cultural wedding drama set across Rajasthan, London, and Mumbai exploring generational values.")
                    .distributionScope("Co-Financing SVOD Post-Theatrical 8-Week Window")
                    .approvalStatus("Pitch Deck under Financial Due Diligence")
                    .phone("+91 98200 44556")
                    .email("syndication@dharma-det.com")
                    .build(),

                DirectorProject.builder()
                    .director("Anurag Kashyap")
                    .subtext("Thriller anthology")
                    .film("Greenlit")
                    .stage("₹22 Cr")
                    .status("LOCKED")
                    .window("Q1 2027")
                    .genre("Neo-Noir Crime Anthology")
                    .productionHouse("Good Bad Films")
                    .synopsis("A gritty four-chapter anthology dissecting unrecorded urban folklore, vigilante detectives, and cybercrime.")
                    .distributionScope("Worldwide Direct-to-Digital SVOD Originals")
                    .approvalStatus("Greenlit with Creative Autonomy Deed Sealed")
                    .phone("+91 98211 33445")
                    .email("anurag@goodbadfilms.in")
                    .build(),

                DirectorProject.builder()
                    .director("S. S. Rajamouli")
                    .subtext("Globe-Trotting Action Adventure")
                    .film("Pre-production")
                    .stage("₹120 Cr")
                    .status("LOCKED")
                    .window("Q2 2027")
                    .genre("Mythological Action Adventure")
                    .productionHouse("Sri Durga Arts")
                    .synopsis("An African jungle treasure expedition intertwining ancient Vedic lore with grand cinematic set-pieces.")
                    .distributionScope("Global Multi-Language SVOD 8-Week Window")
                    .approvalStatus("VFX Pre-visualization Approved")
                    .phone("+91 98480 88990")
                    .email("ssrajamouli@durgaarts.in")
                    .build(),

                DirectorProject.builder()
                    .director("Prashanth Neel")
                    .subtext("High-Octane Crime Saga")
                    .film("Post")
                    .stage("₹90 Cr")
                    .status("LOCKED")
                    .window("Q1 2027")
                    .genre("Industrial Crime Epic")
                    .productionHouse("Hombale Films")
                    .synopsis("The dramatic power struggle for mineral cartels across borders with dark monolithic cinematography.")
                    .distributionScope("SVOD Exclusive Post-Theatrical")
                    .approvalStatus("DI Color Grading & Sound Mix in Progress")
                    .phone("+91 98450 77665")
                    .email("neel@hombalefilms.in")
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<DirectorProject>> getAllProjects() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<DirectorProject> createProject(@RequestBody DirectorProject project) {
        DirectorProject saved = repository.save(project);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<DirectorProject> updateProject(@PathVariable Long id, @RequestBody DirectorProject updated) {
        return repository.findById(id).map(existing -> {
            existing.setDirector(updated.getDirector());
            existing.setSubtext(updated.getSubtext());
            existing.setFilm(updated.getFilm());
            existing.setStage(updated.getStage());
            existing.setStatus(updated.getStatus());
            existing.setWindow(updated.getWindow());
            existing.setGenre(updated.getGenre());
            existing.setProductionHouse(updated.getProductionHouse());
            existing.setSynopsis(updated.getSynopsis());
            existing.setDistributionScope(updated.getDistributionScope());
            existing.setApprovalStatus(updated.getApprovalStatus());
            existing.setPhone(updated.getPhone());
            existing.setEmail(updated.getEmail());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
            "activeFilmmakers", 58,
            "greenlitFilms", 12,
            "inPost", 7,
            "pitching", 24,
            "total", repository.count()
        ));
    }
}
