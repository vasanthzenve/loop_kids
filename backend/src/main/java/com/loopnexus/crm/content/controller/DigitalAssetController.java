package com.loopnexus.crm.content.controller;

import com.loopnexus.crm.content.model.DigitalAsset;
import com.loopnexus.crm.content.repository.DigitalAssetRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/content/dam")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class DigitalAssetController {

    private final DigitalAssetRepository repository;

    public DigitalAssetController(DigitalAssetRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialAssets() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                DigitalAsset.builder()
                    .asset("Karthi-pitch.pdf")
                    .subtext("Document")
                    .type("Edwin")
                    .owner("4.2 MB")
                    .status("APPROVED")
                    .size("—")
                    .dimensions("14 Pages · PDF/A-1b")
                    .checksum("sha256:8f4c...92e1")
                    .watermark("Dynamic User Watermarked (Edwin)")
                    .uploadedAt("Today, 11:24 AM")
                    .storageBucket("s3://loop-dam-cold/docs/")
                    .build(),

                DigitalAsset.builder()
                    .asset("Loop-launch-key.mov")
                    .subtext("Video")
                    .type("Akash")
                    .owner("1.2 GB")
                    .status("ENCODING")
                    .size("—")
                    .dimensions("3840x2160 · ProRes 422 HQ")
                    .checksum("sha256:a1e4...77bc")
                    .watermark("Forensic Video Invisible Stamped")
                    .uploadedAt("Today, 09:15 AM")
                    .storageBucket("s3://loop-dam-hot/masters/")
                    .build(),

                DigitalAsset.builder()
                    .asset("Banner-A.png")
                    .subtext("Image")
                    .type("Priya")
                    .owner("6 MB")
                    .status("APPROVED")
                    .size("—")
                    .dimensions("2560x1440 · PNG Lossless")
                    .checksum("sha256:3d7b...45a9")
                    .watermark("Metadata DRM Tagged")
                    .uploadedAt("Yesterday, 04:45 PM")
                    .storageBucket("s3://loop-dam-hot/marketing/")
                    .build(),

                DigitalAsset.builder()
                    .asset("Master-Teaser-4K.mov")
                    .subtext("Video")
                    .type("Mani")
                    .owner("4.8 GB")
                    .status("APPROVED")
                    .size("—")
                    .dimensions("4096x2160 · DCI 4K Scope")
                    .checksum("sha256:f901...33d8")
                    .watermark("Forensic Audio & Video Watermark")
                    .uploadedAt("Oct 26, 02:10 PM")
                    .storageBucket("s3://loop-dam-hot/masters/")
                    .build(),

                DigitalAsset.builder()
                    .asset("Soundtrack-Master.wav")
                    .subtext("Audio")
                    .type("Anirudh")
                    .owner("85 MB")
                    .status("APPROVED")
                    .size("—")
                    .dimensions("96kHz / 24-bit PCM Stereo")
                    .checksum("sha256:4c22...11ee")
                    .watermark("Acoustic Fingerprint Indexed")
                    .uploadedAt("Oct 25, 06:30 PM")
                    .storageBucket("s3://loop-dam-warm/audio/")
                    .build(),

                DigitalAsset.builder()
                    .asset("Global-Sponsorship-NDA.docx")
                    .subtext("Document")
                    .type("Edwin")
                    .owner("1.8 MB")
                    .status("PENDING")
                    .size("—")
                    .dimensions("6 Pages · OOXML Signed")
                    .checksum("sha256:99ab...5410")
                    .watermark("Confidential Internal Watermark")
                    .uploadedAt("Oct 24, 10:15 AM")
                    .storageBucket("s3://loop-dam-cold/legal/")
                    .build()
            ));
        }
    }

    @GetMapping("/assets")
    public ResponseEntity<List<DigitalAsset>> getAllAssets() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/assets")
    public ResponseEntity<DigitalAsset> createAsset(@RequestBody DigitalAsset asset) {
        DigitalAsset saved = repository.save(asset);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(Map.of(
            "assets", "412 K",
            "storage", "38 TB",
            "pendingReview", 86,
            "watermarked", "100%"
        ));
    }
}

