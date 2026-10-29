package com.loopnexus.crm.content.controller;

import com.loopnexus.crm.content.model.OttContent;
import com.loopnexus.crm.content.repository.OttContentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/content/ott-cms")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class OttContentController {

    private final OttContentRepository repository;

    public OttContentController(OttContentRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialRecords() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                OttContent.builder()
                    .title("Pulli Raja")
                    .category("Film")
                    .type("Tamil")
                    .language("—")
                    .status("LIVE")
                    .release("Live")
                    .duration("2h 14m")
                    .resolution("4K HDR")
                    .rating("U/A 16+")
                    .synopsis("A gripping political action drama tracing the rise of a grassroots activist navigating the complex corridors of power in Tamil Nadu.")
                    .director("K. Balachandran")
                    .episodes(1)
                    .build(),

                OttContent.builder()
                    .title("Velluvachi Godaramma")
                    .category("Film")
                    .type("Telugu")
                    .language("—")
                    .status("SCHEDULED")
                    .release("Feb 12")
                    .duration("2h 28m")
                    .resolution("4K Dolby Vision")
                    .rating("U")
                    .synopsis("An epic emotional journey set along the Godavari river celebrating rural heritage, musical folklore, and generational bonds.")
                    .director("S. V. Krishna")
                    .episodes(1)
                    .build(),

                OttContent.builder()
                    .title("Antaheen")
                    .category("Film")
                    .type("Bengali")
                    .language("—")
                    .status("ENCODING")
                    .release("Mar 04")
                    .duration("2h 05m")
                    .resolution("1080p HD")
                    .rating("U/A 13+")
                    .synopsis("An atmospheric neo-noir relationship mystery weaving through Kolkata rainstorms, anonymous phone calls, and unspoken affection.")
                    .director("Aniruddha Roy")
                    .episodes(1)
                    .build(),

                OttContent.builder()
                    .title("Vada Chennai Chronicles")
                    .category("Series")
                    .type("Tamil")
                    .language("Tamil, Telugu")
                    .status("LIVE")
                    .release("Live")
                    .duration("8 Episodes")
                    .resolution("4K HDR")
                    .rating("A 18+")
                    .synopsis("A sprawling underworld saga detailing the harbor factions of North Chennai across three decades.")
                    .director("V. Maaran")
                    .episodes(8)
                    .build(),

                OttContent.builder()
                    .title("Kantara: Legend of the Woods")
                    .category("Film")
                    .type("Kannada")
                    .language("Kannada, Hindi")
                    .status("LIVE")
                    .release("Live")
                    .duration("2h 30m")
                    .resolution("4K Dolby Atmos")
                    .rating("U/A 16+")
                    .synopsis("A divine conflict between tribal tradition and bureaucratic dominion deep within sacred coastal forests.")
                    .director("Rishab Shetty")
                    .episodes(1)
                    .build(),

                OttContent.builder()
                    .title("The Malabar Code")
                    .category("Series")
                    .type("Malayalam")
                    .language("Malayalam")
                    .status("SCHEDULED")
                    .release("Feb 28")
                    .duration("6 Episodes")
                    .resolution("4K HDR")
                    .rating("U/A 16+")
                    .synopsis("Coast Guard intelligence investigates a mysterious offshore beacon transmitting encrypted shortwave signals.")
                    .director("Amal Neeraj")
                    .episodes(6)
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<OttContent>> getAllRecords() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<OttContent> createRecord(@RequestBody OttContent content) {
        OttContent saved = repository.save(content);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long live = repository.findByStatus("LIVE").size();
        long scheduled = repository.findByStatus("SCHEDULED").size();
        long inReview = repository.findByStatus("ENCODING").size() + repository.findByStatus("IN REVIEW").size();

        return ResponseEntity.ok(Map.of(
            "filmsAcquired", "1,840",
            "liveNow", live > 0 ? live : 312,
            "scheduled", scheduled > 0 ? scheduled : 96,
            "inReview", inReview > 0 ? inReview : 48
        ));
    }
}

