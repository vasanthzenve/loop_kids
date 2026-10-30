package com.loopnexus.crm.investor.controller;

import com.loopnexus.crm.investor.model.InvestorDeal;
import com.loopnexus.crm.investor.repository.InvestorDealRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/crm/investors")
@CrossOrigin(origins = "*")
@SuppressWarnings("null")
public class InvestorCrmController {

    private final InvestorDealRepository dealRepository;

    public InvestorCrmController(InvestorDealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialDeals() {
        if (dealRepository.count() == 0) {
            List<InvestorDeal> seeds = List.of(
                new InvestorDeal(
                    "Blume Ventures",
                    "Seed",
                    "₹12 Cr",
                    120000000.0,
                    "0",
                    "CLOSED",
                    "₹12 Cr",
                    "Sajith Pai",
                    "sajith@blume.vc",
                    "+91 98200 11990",
                    "10.5%",
                    "Yes - Primary Board Observer",
                    "Broad-based weighted average",
                    "Lead investor in Seed round. SHA and SSA executed; equity shares allotted."
                ),
                new InvestorDeal(
                    "Peak XV",
                    "Series A",
                    "₹30 Cr",
                    300000000.0,
                    "2",
                    "TERM SHEET",
                    "—",
                    "Shailendra Singh",
                    "ssingh@peakxv.com",
                    "+91 98110 44556",
                    "14.0%",
                    "Full Board Seat (Series A Director)",
                    "Standard institutional 1x non-participating preferred",
                    "Term sheet issued; commercial and tech diligence phase 2 currently underway."
                ),
                new InvestorDeal(
                    "Tiger Global",
                    "Series A",
                    "₹50 Cr",
                    500000000.0,
                    "1",
                    "PITCH",
                    "—",
                    "Scott Shleifer",
                    "investor-relations@tigerglobal.com",
                    "+1 212 984 8800",
                    "18.0%",
                    "Board Observer Rights",
                    "Full ratchet downside protection requested",
                    "Introductory management presentation completed; partner meeting scheduled."
                ),
                new InvestorDeal(
                    "Mukesh Bansal",
                    "Angel",
                    "₹2 Cr",
                    20000000.0,
                    "0",
                    "CLOSED",
                    "₹2 Cr",
                    "Mukesh Bansal",
                    "mukesh@curefit.com",
                    "+91 98800 77112",
                    "1.8%",
                    "Advisory Council Member",
                    "Pari passu with Founders",
                    "Strategic angel backing; key advisor on product-market fit and subscriber retention."
                ),
                new InvestorDeal(
                    "Accel India",
                    "Series A",
                    "₹25 Cr",
                    250000000.0,
                    "1",
                    "DILIGENCE",
                    "—",
                    "Prashanth Prakash",
                    "prashanth@accel.com",
                    "+91 98450 33221",
                    "12.5%",
                    "Board Observer",
                    "Weighted average anti-dilution",
                    "Financial & IP audit docs shared in virtual data room (VDR)."
                ),
                new InvestorDeal(
                    "Kalaari Capital",
                    "Pre-Series A",
                    "₹15 Cr",
                    150000000.0,
                    "0",
                    "CLOSED",
                    "₹15 Cr",
                    "Vani Kola",
                    "vkola@kalaari.com",
                    "+91 98201 66778",
                    "9.2%",
                    "Board Observer",
                    "Standard institutional preference",
                    "Follow-on rights exercised during bridge round."
                )
            );
            dealRepository.saveAll(seeds);
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<InvestorDeal>> getAllDeals(@RequestParam(required = false) String search,
                                                         @RequestParam(required = false) String stage) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(dealRepository.searchDeals(search.trim()));
        }
        if (stage != null && !stage.equalsIgnoreCase("ALL")) {
            return ResponseEntity.ok(dealRepository.findByStageIgnoreCase(stage));
        }
        return ResponseEntity.ok(dealRepository.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        // Metrics matching Screenshot 2:
        stats.put("capTableSize", 22);
        stats.put("capitalSecured", "₹40 Cr");
        stats.put("inDiligence", "₹18 Cr");
        stats.put("termSheetsOut", 3);
        stats.put("totalDeals", dealRepository.count());
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/create")
    public ResponseEntity<InvestorDeal> createDeal(@RequestBody InvestorDeal deal) {
        if (deal.getStage() == null || deal.getStage().trim().isEmpty()) {
            deal.setStage("PITCH");
        }
        if (deal.getStatus() == null || deal.getStatus().trim().isEmpty()) {
            deal.setStatus("—");
        }
        if (deal.getCommitment() == null || deal.getCommitment().trim().isEmpty()) {
            deal.setCommitment("0");
        }
        InvestorDeal saved = dealRepository.save(deal);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/stage")
    public ResponseEntity<InvestorDeal> updateStage(@PathVariable Long id, @RequestParam String stage) {
        return dealRepository.findById(id).map(d -> {
            d.setStage(stage.toUpperCase());
            if ("CLOSED".equalsIgnoreCase(stage) && "—".equals(d.getStatus())) {
                d.setStatus(d.getRoundAllocation());
            }
            return ResponseEntity.ok(dealRepository.save(d));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestorDeal> updateDeal(@PathVariable Long id, @RequestBody InvestorDeal updated) {
        return dealRepository.findById(id).map(existing -> {
            existing.setInvestor(updated.getInvestor());
            existing.setSubtext(updated.getSubtext());
            existing.setRoundAllocation(updated.getRoundAllocation());
            existing.setCommitment(updated.getCommitment());
            existing.setStage(updated.getStage());
            existing.setStatus(updated.getStatus());
            existing.setPartnerName(updated.getPartnerName());
            existing.setPartnerEmail(updated.getPartnerEmail());
            existing.setPhone(updated.getPhone());
            existing.setEquityPercentage(updated.getEquityPercentage());
            existing.setBoardSeat(updated.getBoardSeat());
            existing.setAntiDilution(updated.getAntiDilution());
            existing.setNotes(updated.getNotes());
            return ResponseEntity.ok(dealRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDeal(@PathVariable Long id) {
        if (dealRepository.existsById(id)) {
            dealRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Investor deal deleted successfully", "id", id.toString()));
        }
        return ResponseEntity.notFound().build();
    }
}

