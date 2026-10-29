package com.loopnexus.crm.content.controller;

import com.loopnexus.crm.content.model.ContentLicense;
import com.loopnexus.crm.content.repository.ContentLicenseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/content/licensing")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class ContentLicenseController {

    private final ContentLicenseRepository repository;

    public ContentLicenseController(ContentLicenseRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialLicenses() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                ContentLicense.builder()
                    .title("Pulli Raja")
                    .geography("India")
                    .territory("2y exclusive")
                    .window("—")
                    .status("ACTIVE")
                    .expiry("Dec 2027")
                    .licensor("Sun Pictures Ltd")
                    .fee("₹12.5 Cr")
                    .rightsType("SVOD Exclusive + Catchup")
                    .linearBroadcast("Excluded")
                    .geoFence("IN, LK, NP")
                    .build(),

                ContentLicense.builder()
                    .title("Velluvachi")
                    .geography("Worldwide ex US")
                    .territory("3y")
                    .window("—")
                    .status("ACTIVE")
                    .expiry("Aug 2028")
                    .licensor("Mythri Movie Makers")
                    .fee("₹18.0 Cr")
                    .rightsType("Global SVOD / AVOD")
                    .linearBroadcast("Permitted non-exclusive")
                    .geoFence("Worldwide except US & CA")
                    .build(),

                ContentLicense.builder()
                    .title("Kumbalangi 2")
                    .geography("India")
                    .territory("18m")
                    .window("—")
                    .status("RENEW")
                    .expiry("Feb 2027")
                    .licensor("Bhavana Studios")
                    .fee("₹6.2 Cr")
                    .rightsType("First Window OTT")
                    .linearBroadcast("Holdback until Day 90")
                    .geoFence("IN, AE, SG, MY")
                    .build(),

                ContentLicense.builder()
                    .title("KGF Chapter 3 Prep")
                    .geography("South Asia")
                    .territory("5y exclusive")
                    .window("—")
                    .status("ACTIVE")
                    .expiry("Nov 2029")
                    .licensor("Hombale Films")
                    .fee("₹45.0 Cr")
                    .rightsType("Multi-lingual SVOD Master")
                    .linearBroadcast("Excluded")
                    .geoFence("IN, PK, BD, LK")
                    .build(),

                ContentLicense.builder()
                    .title("Asuran Prequel Rights")
                    .geography("Global OTT")
                    .territory("1y linear")
                    .window("—")
                    .status("RENEW")
                    .expiry("Jan 2027")
                    .licensor("V Creations")
                    .fee("₹9.4 Cr")
                    .rightsType("Digital Streaming & TVOD")
                    .linearBroadcast("Satellite Co-Terminus")
                    .geoFence("Global")
                    .build(),

                ContentLicense.builder()
                    .title("Leo: Bloodlines")
                    .geography("MENA Region")
                    .territory("2y exclusive")
                    .window("—")
                    .status("ACTIVE")
                    .expiry("Jun 2028")
                    .licensor("Seven Screen Studio")
                    .fee("₹14.8 Cr")
                    .rightsType("Theatrical & SVOD Post-Theatrical")
                    .linearBroadcast("Pay-TV Allowed")
                    .geoFence("AE, SA, QA, OM, KW, BH")
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<ContentLicense>> getAllLicenses() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<ContentLicense> createLicense(@RequestBody ContentLicense license) {
        ContentLicense saved = repository.save(license);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(Map.of(
            "liveLicenses", 540,
            "renewing30D", 22,
            "geoBlocks", "India + ME",
            "disputes", 1
        ));
    }
}

