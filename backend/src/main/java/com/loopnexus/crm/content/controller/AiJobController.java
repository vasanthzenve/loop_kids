package com.loopnexus.crm.content.controller;

import com.loopnexus.crm.content.model.AiJob;
import com.loopnexus.crm.content.repository.AiJobRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/content/ai-jobs")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class AiJobController {

    private final AiJobRepository repository;

    public AiJobController(AiJobRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialAiJobs() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                AiJob.builder()
                    .asset("Loop S1 E03")
                    .subtext("Subtitle EN/HI/TA")
                    .operation("Whisper-X")
                    .engine("—")
                    .status("DONE")
                    .runTime("12 min")
                    .confidence("99.4%")
                    .tokensUsed("14,200")
                    .model("Whisper-X v3 Large")
                    .targetLang("English, Hindi, Tamil")
                    .outputFormat("SRT / VTT / WebVTT")
                    .build(),

                AiJob.builder()
                    .asset("Karthi promo")
                    .subtext("Trailer cut")
                    .operation("LoopAI v2")
                    .engine("—")
                    .status("DONE")
                    .runTime("8 min")
                    .confidence("98.8%")
                    .tokensUsed("8,400")
                    .model("LoopAI Vision-Cut 4K")
                    .targetLang("Tamil (Original)")
                    .outputFormat("MP4 ProRes / H.265")
                    .build(),

                AiJob.builder()
                    .asset("Loop Sports")
                    .subtext("Auto thumbnail")
                    .operation("LoopAI v2")
                    .engine("—")
                    .status("QUEUED")
                    .runTime("—")
                    .confidence("Pending")
                    .tokensUsed("—")
                    .model("LoopAI Diffusion Frame-Gen")
                    .targetLang("Global")
                    .outputFormat("JPG / WebP 16:9 & 9:16")
                    .build(),

                AiJob.builder()
                    .asset("Jailer Special Feature")
                    .subtext("AI Auto Tags")
                    .operation("LoopAI v2")
                    .engine("—")
                    .status("DONE")
                    .runTime("4 min")
                    .confidence("99.1%")
                    .tokensUsed("5,100")
                    .model("Loop-BERT Semantic Tagger")
                    .targetLang("Tamil, Telugu, English")
                    .outputFormat("JSON Meta Tags")
                    .build(),

                AiJob.builder()
                    .asset("Ponniyin Selvan Docu")
                    .subtext("Multi-language Dub")
                    .operation("Whisper-X")
                    .engine("—")
                    .status("DONE")
                    .runTime("24 min")
                    .confidence("97.6%")
                    .tokensUsed("32,800")
                    .model("Neural Voice Sync v4")
                    .targetLang("Kannada, Malayalam, Hindi")
                    .outputFormat("Dolby 5.1 Stems")
                    .build(),

                AiJob.builder()
                    .asset("OTT Weekly Reel")
                    .subtext("AI Highlight Cut")
                    .operation("LoopAI v2")
                    .engine("—")
                    .status("QUEUED")
                    .runTime("—")
                    .confidence("Pending")
                    .tokensUsed("—")
                    .model("LoopAI Scene-Ranker")
                    .targetLang("Multi-lingual")
                    .outputFormat("MP4 1080p Shorts")
                    .build()
            ));
        }
    }

    @GetMapping
    public ResponseEntity<List<AiJob>> getAllAiJobs() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<AiJob> createAiJob(@RequestBody AiJob job) {
        AiJob saved = repository.save(job);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(Map.of(
            "autoTagged", "38 K",
            "subtitles", "12.4 K hrs",
            "trailersCut", 412,
            "saved", "₹1.8 Cr"
        ));
    }
}

