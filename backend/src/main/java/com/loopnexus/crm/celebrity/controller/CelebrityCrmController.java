package com.loopnexus.crm.celebrity.controller;

import com.loopnexus.crm.celebrity.model.CelebrityArtist;
import com.loopnexus.crm.celebrity.repository.CelebrityArtistRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crm/celebrities")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class CelebrityCrmController {

    private final CelebrityArtistRepository repository;

    public CelebrityCrmController(CelebrityArtistRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialCelebrities() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                CelebrityArtist.builder()
                    .artist("Karthi")
                    .subtext("Loop Originals · Lead")
                    .lastProject("Suresh Rao")
                    .manager("0")
                    .availability("AVAILABLE FEB")
                    .nextEvent("₹25 L")
                    .phone("+91 98401 55667")
                    .email("mgmt@karthiofficial.in")
                    .agency("Madras Talent Management")
                    .ndaStatus("Executed")
                    .activeEndorsements(4)
                    .remuneration("₹25 L / Appearance")
                    .upcomingAppearance("Loop Annual OTT Gala, Chennai")
                    .notes("Lead actor in flagship Loop Original spy thriller series. Highly responsive management.")
                    .build(),

                CelebrityArtist.builder()
                    .artist("Trisha")
                    .subtext("Brand campaign")
                    .lastProject("Ravi K")
                    .manager("1")
                    .availability("BOOKED")
                    .nextEvent("—")
                    .phone("+91 98410 77889")
                    .email("teamtrisha@southtalent.com")
                    .agency("South Star Representation")
                    .ndaStatus("Executed")
                    .activeEndorsements(8)
                    .remuneration("₹35 L / Day")
                    .upcomingAppearance("Brand Commercial Shoot, Hyderabad")
                    .notes("Brand ambassador for Loop Festivities Q4 campaign. Schedule fully locked until March.")
                    .build(),

                CelebrityArtist.builder()
                    .artist("Vijay Sethupathi")
                    .subtext("Loop Anthology S1")
                    .lastProject("Hari")
                    .manager("2")
                    .availability("NEGOTIATING")
                    .nextEvent("₹40 L")
                    .phone("+91 98400 99881")
                    .email("hari@vspfilms.com")
                    .agency("Direct Management")
                    .ndaStatus("Under Review")
                    .activeEndorsements(5)
                    .remuneration("₹40 L / Day")
                    .upcomingAppearance("Anthology Round Table Keynote")
                    .notes("Negotiating exclusive 3-episode multi-character role in anthology series.")
                    .build(),

                CelebrityArtist.builder()
                    .artist("Samantha")
                    .subtext("Awards host")
                    .lastProject("Lalitha")
                    .manager("0")
                    .availability("CONFIRMED")
                    .nextEvent("₹18 L")
                    .phone("+91 98490 22334")
                    .email("lalitha@prtalents.in")
                    .agency("Pearl Talent Agency")
                    .ndaStatus("Executed")
                    .activeEndorsements(6)
                    .remuneration("₹18 L / Hosting Event")
                    .upcomingAppearance("Loop Streamer Choice Awards 2026")
                    .notes("Confirmed host for Mainstage ceremonies. Script draft sent to management.")
                    .build(),

                CelebrityArtist.builder()
                    .artist("Fahadh Faasil")
                    .subtext("Loop Neo-Noir Thriller")
                    .lastProject("Pradeep M")
                    .manager("1")
                    .availability("AVAILABLE MAR")
                    .nextEvent("₹35 L")
                    .phone("+91 98470 11223")
                    .email("pradeep@malayalamarts.com")
                    .agency("Cochin Artist Hub")
                    .ndaStatus("Executed")
                    .activeEndorsements(2)
                    .remuneration("₹35 L / Day")
                    .upcomingAppearance("Location Recce & Character Briefing")
                    .notes("Agreed in-principle for 20-day episodic shoot across Idukki & Kochi.")
                    .build(),

                CelebrityArtist.builder()
                    .artist("Dulquer Salmaan")
                    .subtext("Pan-India Web Series")
                    .lastProject("Geo Thomas")
                    .manager("3")
                    .availability("BOOKED")
                    .nextEvent("₹50 L")
                    .phone("+91 98471 66778")
                    .email("geo@dqmgmt.in")
                    .agency("Wayfarer Talent Collective")
                    .ndaStatus("Executed")
                    .activeEndorsements(7)
                    .remuneration("₹50 L / Day")
                    .upcomingAppearance("Theatrical Trailer Launch")
                    .notes("Co-producer and lead talent. Digital rights contract successfully sealed.")
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<CelebrityArtist>> getAllArtists() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<CelebrityArtist> createArtist(@RequestBody CelebrityArtist artist) {
        CelebrityArtist saved = repository.save(artist);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<CelebrityArtist> updateArtist(@PathVariable Long id, @RequestBody CelebrityArtist updated) {
        return repository.findById(id).map(existing -> {
            existing.setArtist(updated.getArtist());
            existing.setSubtext(updated.getSubtext());
            existing.setLastProject(updated.getLastProject());
            existing.setManager(updated.getManager());
            existing.setAvailability(updated.getAvailability());
            existing.setNextEvent(updated.getNextEvent());
            existing.setPhone(updated.getPhone());
            existing.setEmail(updated.getEmail());
            existing.setAgency(updated.getAgency());
            existing.setNdaStatus(updated.getNdaStatus());
            existing.setActiveEndorsements(updated.getActiveEndorsements());
            existing.setRemuneration(updated.getRemuneration());
            existing.setUpcomingAppearance(updated.getUpcomingAppearance());
            existing.setNotes(updated.getNotes());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
            "signedArtists", 42,
            "pendingNdas", 6,
            "liveEndorsements", 11,
            "avgFee", "₹4.2 L",
            "total", repository.count()
        ));
    }
}

