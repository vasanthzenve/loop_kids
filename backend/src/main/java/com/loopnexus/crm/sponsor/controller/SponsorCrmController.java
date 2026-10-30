package com.loopnexus.crm.sponsor.controller;

import com.loopnexus.crm.sponsor.model.SponsorDeal;
import com.loopnexus.crm.sponsor.repository.SponsorDealRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crm/sponsors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class SponsorCrmController {

    private final SponsorDealRepository repository;

    public SponsorCrmController(SponsorDealRepository repository) {
        this.repository = repository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialSponsors() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                SponsorDeal.builder()
                    .sponsor("Tata Motors")
                    .subtext("Title Sponsor · Loop Nite")
                    .packageTier("Contract")
                    .stage("₹6.5 Cr")
                    .status("CLOSED")
                    .renewal("2027")
                    .category("Automotive (EV & SUV)")
                    .contactPerson("Vivek Srivatsa")
                    .phone("+91 98201 11223")
                    .email("corporate.sponsorships@tatamotors.com")
                    .impressionsGuaranteed("42M OTT Impressions")
                    .roiMetric("3.8x Brand Recall")
                    .deliverables("Co-branded Opening Stinger, Masthead Carousel, VIP Gala Red Carpet Integration")
                    .notes("Title sponsorship agreement executed with multi-season options.")
                    .build(),

                SponsorDeal.builder()
                    .sponsor("Amazon Pay")
                    .subtext("Wallet integration")
                    .packageTier("Negotiating")
                    .stage("₹3 Cr")
                    .status("HOT")
                    .renewal("—")
                    .category("Fintech / Digital Payments")
                    .contactPerson("Meghna Agarwal")
                    .phone("+91 98110 33445")
                    .email("m-agarwal@amazon.com")
                    .impressionsGuaranteed("25M Checkout Views")
                    .roiMetric("4.2x Conversion Lift")
                    .deliverables("Default 1-Click Checkout Cashbacks, Dedicated Promo Rails, Push Notifications")
                    .notes("Term sheet finalized for seamless wallet top-up cashbacks on Loop subscriptions.")
                    .build(),

                SponsorDeal.builder()
                    .sponsor("Cadbury")
                    .subtext("Pre-roll bundle")
                    .packageTier("Proposal")
                    .stage("₹1.4 Cr")
                    .status("WARM")
                    .renewal("—")
                    .category("FMCG / Confectionery")
                    .contactPerson("Anand Kulkarni")
                    .phone("+91 98200 88990")
                    .email("anand.k@mondelezinternational.com")
                    .impressionsGuaranteed("18M Non-Skippable Views")
                    .roiMetric("2.9x Brand Favorability")
                    .deliverables("Festive Season 15s Non-Skippable Pre-rolls, Sweet Moments Pause Screens")
                    .notes("Proposal pitched to GroupM media buying agency; review due this Friday.")
                    .build(),

                SponsorDeal.builder()
                    .sponsor("Maruti Suzuki")
                    .subtext("Game sponsor")
                    .packageTier("Onboarded")
                    .stage("₹2.2 Cr")
                    .status("CLOSED")
                    .renewal("2027")
                    .category("Automotive (NEXA)")
                    .contactPerson("Shashank Srivastava")
                    .phone("+91 98100 55667")
                    .email("nexa.branding@maruti.co.in")
                    .impressionsGuaranteed("30M Engagement Pings")
                    .roiMetric("3.4x Test Drive Leads")
                    .deliverables("Interactive Predictor Gamification Hub, Live Sports Leaderboards")
                    .notes("Onboarded for annual live sports gaming hub interactive banner integration.")
                    .build(),

                SponsorDeal.builder()
                    .sponsor("Dream11")
                    .subtext("Live Sports Streaming Title")
                    .packageTier("Contract")
                    .stage("₹18 Cr")
                    .status("CLOSED")
                    .renewal("2027")
                    .category("Sports Tech / Gaming")
                    .contactPerson("Harsh Jain")
                    .phone("+91 98200 44112")
                    .email("partnerships@dream11.com")
                    .impressionsGuaranteed("120M Stream Impressions")
                    .roiMetric("5.1x App Installs")
                    .deliverables("Live Scorecard Bug, Over-by-Over L-Band Banners, Studio Analysis Segments")
                    .notes("Master linear & OTT live cricket broadcast multi-year partnership.")
                    .build(),

                SponsorDeal.builder()
                    .sponsor("PhonePe")
                    .subtext("Exclusive UPI Checkout Partner")
                    .packageTier("Negotiating")
                    .stage("₹5.5 Cr")
                    .status("HOT")
                    .renewal("2026")
                    .category("Fintech")
                    .contactPerson("Sameer Nigam")
                    .phone("+91 98450 77112")
                    .email("alliances@phonepe.com")
                    .impressionsGuaranteed("40M Checkout Screens")
                    .roiMetric("4.6x Autopay Mandates")
                    .deliverables("Instant UPI Autopay Co-branded Vouchers, ₹50 Flat Cashback on Annual Pass")
                    .notes("Final legal clauses around transaction chargeback liability being reconciled.")
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<SponsorDeal>> getAllDeals() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<SponsorDeal> createDeal(@RequestBody SponsorDeal deal) {
        SponsorDeal saved = repository.save(deal);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<SponsorDeal> updateDeal(@PathVariable Long id, @RequestBody SponsorDeal updated) {
        return repository.findById(id).map(existing -> {
            existing.setSponsor(updated.getSponsor());
            existing.setSubtext(updated.getSubtext());
            existing.setPackageTier(updated.getPackageTier());
            existing.setStage(updated.getStage());
            existing.setStatus(updated.getStatus());
            existing.setRenewal(updated.getRenewal());
            existing.setCategory(updated.getCategory());
            existing.setContactPerson(updated.getContactPerson());
            existing.setPhone(updated.getPhone());
            existing.setEmail(updated.getEmail());
            existing.setImpressionsGuaranteed(updated.getImpressionsGuaranteed());
            existing.setRoiMetric(updated.getRoiMetric());
            existing.setDeliverables(updated.getDeliverables());
            existing.setNotes(updated.getNotes());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
            "sponsorLeads", 38,
            "activeContracts", 14,
            "activeContractsChange", "+3",
            "arrSponsored", "₹62 Cr",
            "renewalRate", "82%",
            "total", repository.count()
        ));
    }
}
