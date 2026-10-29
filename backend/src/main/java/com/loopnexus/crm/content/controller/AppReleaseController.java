package com.loopnexus.crm.content.controller;

import com.loopnexus.crm.content.model.AppRelease;
import com.loopnexus.crm.content.repository.AppReleaseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/content/mobile-apps")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class AppReleaseController {

    private final AppReleaseRepository repository;

    public AppReleaseController(AppReleaseRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialReleases() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                AppRelease.builder()
                    .platform("Android")
                    .subtext("1.4.2")
                    .version("Production")
                    .channel("—")
                    .status("ROLLING 25%")
                    .rollout("—")
                    .buildNumber("10402")
                    .bundleId("com.loop.ott.android")
                    .minOs("Android 8.0 (Oreo) +")
                    .crashFreeRate("99.8%")
                    .activeDevices("2.1 L Devices")
                    .storeUrl("Google Play Store Console")
                    .releaseNotes("Fixed 4K HDR playback stutter on Exynos chipsets, added PIP mode background playback.")
                    .build(),

                AppRelease.builder()
                    .platform("iOS")
                    .subtext("1.4.1")
                    .version("Production")
                    .channel("—")
                    .status("REVIEW")
                    .rollout("—")
                    .buildNumber("10401")
                    .bundleId("com.loop.ott.ios")
                    .minOs("iOS 15.0 +")
                    .crashFreeRate("99.9%")
                    .activeDevices("85 K Devices")
                    .storeUrl("Apple App Store Connect")
                    .releaseNotes("Dolby Atmos spatial audio support and AirPlay 2 4K 60fps streaming optimizations.")
                    .build(),

                AppRelease.builder()
                    .platform("Android TV")
                    .subtext("1.2.0")
                    .version("Beta")
                    .channel("—")
                    .status("INTERNAL")
                    .rollout("—")
                    .buildNumber("10200")
                    .bundleId("com.loop.ott.tv.android")
                    .minOs("Android TV 9.0 +")
                    .crashFreeRate("99.4%")
                    .activeDevices("25 K Devices")
                    .storeUrl("Internal Google Play Beta")
                    .releaseNotes("Leanback UI overhaul, universal D-pad navigation speedup, multi-audio language track selector.")
                    .build(),

                AppRelease.builder()
                    .platform("Apple TV")
                    .subtext("1.1.4")
                    .version("Production")
                    .channel("—")
                    .status("LIVE 100%")
                    .rollout("—")
                    .buildNumber("10104")
                    .bundleId("com.loop.ott.tvos")
                    .minOs("tvOS 16.0 +")
                    .crashFreeRate("99.95%")
                    .activeDevices("12 K Devices")
                    .storeUrl("Apple tvOS App Store")
                    .releaseNotes("Siri Remote swipe gesture tuning and Top Shelf live preview integration.")
                    .build(),

                AppRelease.builder()
                    .platform("Fire TV")
                    .subtext("1.3.0")
                    .version("Beta")
                    .channel("—")
                    .status("ROLLING 50%")
                    .rollout("—")
                    .buildNumber("10300")
                    .bundleId("com.loop.ott.firetv")
                    .minOs("Fire OS 7.0 +")
                    .crashFreeRate("99.6%")
                    .activeDevices("40 K Devices")
                    .storeUrl("Amazon Developer Portal")
                    .releaseNotes("Alexa Voice remote search hooks and hardware accelerated HEVC decoder.")
                    .build(),

                AppRelease.builder()
                    .platform("Web PWA")
                    .subtext("2.0.1")
                    .version("Production")
                    .channel("—")
                    .status("LIVE 100%")
                    .rollout("—")
                    .buildNumber("20001")
                    .bundleId("app.loopott.com")
                    .minOs("Modern Chromium / Safari / Firefox")
                    .crashFreeRate("99.98%")
                    .activeDevices("500 K Web Users")
                    .storeUrl("Cloudflare Edge CDN")
                    .releaseNotes("Service worker offline caching, Widevine L1 & FairPlay CDM encryption pipeline.")
                    .build()
            ));
        }
    }

    @GetMapping("/releases")
    public ResponseEntity<List<AppRelease>> getAllReleases() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/releases")
    public ResponseEntity<AppRelease> createRelease(@RequestBody AppRelease release) {
        AppRelease saved = repository.save(release);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(Map.of(
            "installs", "3.2 L",
            "crashFree", "99.7%",
            "pendingReview", 2,
            "betaTesters", 840
        ));
    }
}

