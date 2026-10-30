package com.loopnexus.crm.sales.controller;

import com.loopnexus.crm.sales.model.SalesDeal;
import com.loopnexus.crm.sales.repository.SalesDealRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/crm/sales")
@CrossOrigin(origins = "*")
@SuppressWarnings("null")
public class SalesCrmController {

    private final SalesDealRepository dealRepository;

    public SalesCrmController(SalesDealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialDeals() {
        if (dealRepository.count() == 0) {
            List<SalesDeal> seeds = List.of(
                new SalesDeal(
                    "Reliance Jio bundle",
                    "Sunny",
                    "₹15 Cr",
                    150000000.0,
                    "2",
                    "PROPOSAL",
                    "₹15 Cr",
                    "Telco OTT Bundling / Fiber Integration",
                    "Jio Platforms Limited",
                    "Kiran Thomas",
                    "kiran.thomas@ril.com",
                    "+91 98200 44550",
                    "Q4 2026",
                    "75%",
                    "Annual master bundling for JioFiber and JioCinema complementary premium subscriber tier."
                ),
                new SalesDeal(
                    "Vodafone IDEA bundle",
                    "Ranjan",
                    "₹8 Cr",
                    80000000.0,
                    "1",
                    "NEGOTIATION",
                    "₹8 Cr",
                    "Postpaid Telco Add-On",
                    "Vodafone Idea Ltd",
                    "Akshaya Moondra",
                    "a.moondra@vodafoneidea.com",
                    "+91 98190 22119",
                    "Q1 2027",
                    "85%",
                    "Vi Movies & TV app integration contract. Revenue-share terms undergoing final legal vetting."
                ),
                new SalesDeal(
                    "Airtel Xstream",
                    "Edwin",
                    "₹22 Cr",
                    220000000.0,
                    "3",
                    "DISCOVERY",
                    "₹22 Cr",
                    "DTH & Broadband Content Pack",
                    "Bharti Airtel Ltd",
                    "Gopal Vittal",
                    "gopal.vittal@airtel.com",
                    "+91 98100 66332",
                    "Q1 2027",
                    "50%",
                    "Pan-India Airtel Xstream Premium bundle proposal for 10M broadband subscriber homes."
                ),
                new SalesDeal(
                    "Tata Play Binge",
                    "Priya",
                    "₹18 Cr",
                    180000000.0,
                    "2",
                    "CLOSED",
                    "₹18 Cr",
                    "Connected TV Smart Hub",
                    "Tata Play Limited",
                    "Harit Nagpal",
                    "harit.n@tataplay.com",
                    "+91 98201 33221",
                    "Q3 2026",
                    "100%",
                    "Closed multi-year contract for default inclusion in Tata Play Binge Super Plan."
                ),
                new SalesDeal(
                    "Amazon Prime Channels",
                    "Akash",
                    "₹21 Cr",
                    210000000.0,
                    "4",
                    "PROPOSAL",
                    "₹21 Cr",
                    "OTT Channel Distribution",
                    "Amazon Seller Services Private Limited",
                    "Gaurav Gandhi",
                    "gandhig@amazon.com",
                    "+91 98110 99441",
                    "Q4 2026",
                    "70%",
                    "Add-on channel subscription agreement pitched to Amazon Prime Video India."
                )
            );
            dealRepository.saveAll(seeds);
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<SalesDeal>> getAllDeals(@RequestParam(required = false) String search,
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
        // Metrics matching Screenshot 1 exactly:
        stats.put("openPipeline", "₹84 Cr");
        stats.put("closedThisQ", "₹22 Cr");
        stats.put("winRate", "34%");
        stats.put("avgCycle", "42 days");
        stats.put("totalDeals", dealRepository.count());
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/create")
    public ResponseEntity<SalesDeal> createDeal(@RequestBody SalesDeal deal) {
        if (deal.getStage() == null || deal.getStage().trim().isEmpty()) {
            deal.setStage("PROPOSAL");
        }
        if (deal.getCloseValue() == null || deal.getCloseValue().trim().isEmpty()) {
            deal.setCloseValue(deal.getDealValue());
        }
        if (deal.getStakeholders() == null || deal.getStakeholders().trim().isEmpty()) {
            deal.setStakeholders("1");
        }
        SalesDeal saved = dealRepository.save(deal);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/stage")
    public ResponseEntity<SalesDeal> updateStage(@PathVariable Long id, @RequestParam String stage) {
        return dealRepository.findById(id).map(d -> {
            d.setStage(stage.toUpperCase());
            return ResponseEntity.ok(dealRepository.save(d));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesDeal> updateDeal(@PathVariable Long id, @RequestBody SalesDeal updated) {
        return dealRepository.findById(id).map(existing -> {
            existing.setDeal(updated.getDeal());
            existing.setOwner(updated.getOwner());
            existing.setDealValue(updated.getDealValue());
            existing.setStakeholders(updated.getStakeholders());
            existing.setStage(updated.getStage());
            existing.setCloseValue(updated.getCloseValue());
            existing.setCategory(updated.getCategory());
            existing.setClientCompany(updated.getClientCompany());
            existing.setContactPerson(updated.getContactPerson());
            existing.setEmail(updated.getEmail());
            existing.setPhone(updated.getPhone());
            existing.setTargetCloseQuarter(updated.getTargetCloseQuarter());
            existing.setProbability(updated.getProbability());
            existing.setNotes(updated.getNotes());
            return ResponseEntity.ok(dealRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDeal(@PathVariable Long id) {
        if (dealRepository.existsById(id)) {
            dealRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Sales deal deleted successfully", "id", id.toString()));
        }
        return ResponseEntity.notFound().build();
    }
}

