package com.loopnexus.crm.productionhouse.controller;

import com.loopnexus.crm.productionhouse.model.ProductionHouseContact;
import com.loopnexus.crm.productionhouse.repository.ProductionHouseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crm/production-houses")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class ProductionHouseController {

    private final ProductionHouseRepository repository;

    public ProductionHouseController(ProductionHouseRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialContacts() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                ProductionHouseContact.builder()
                    .company("Hombale Films")
                    .contactPerson("Vijay Kiragandur")
                    .language("Kannada")
                    .region("South")
                    .phone("+91 98450 11223")
                    .email("deals@hombalefilms.in")
                    .status("NEGOTIATING")
                    .nextAction("Review Final Term Sheet v3")
                    .contentOffered("Kantara Prequel + 3 Film Slate")
                    .notes("Pan-India theatrical & post-theatrical SVOD exclusive window.")
                    .dealValue("₹35 Cr")
                    .build(),

                ProductionHouseContact.builder()
                    .company("Lyca Productions")
                    .contactPerson("Subaskaran A.")
                    .language("Tamil")
                    .region("South")
                    .phone("+91 98400 44556")
                    .email("acquisitions@lycaproductions.com")
                    .status("SIGNED")
                    .nextAction("Execute Master Deed & Digital Delivery")
                    .contentOffered("Vettaiyan + Indian 2 Digital Rights")
                    .notes("Signed multi-territory SVOD rights with Dolby Atmos audio stems.")
                    .dealValue("₹62 Cr")
                    .build(),

                ProductionHouseContact.builder()
                    .company("Mythri Movie Makers")
                    .contactPerson("Naveen Yerneni")
                    .language("Telugu")
                    .region("South")
                    .phone("+91 98480 33445")
                    .email("content@mythriofficial.com")
                    .status("MEETING SCHEDULED")
                    .nextAction("Zoom Call with Head of OTT, Thursday 4 PM")
                    .contentOffered("Pushpa 2 The Rule (South Dubs)")
                    .notes("Discussing 4-week post-theatrical OTT holdback.")
                    .dealValue("₹48 Cr")
                    .build(),

                ProductionHouseContact.builder()
                    .company("Geetha Arts")
                    .contactPerson("Allu Aravind")
                    .language("Telugu")
                    .region("South")
                    .phone("+91 98490 55667")
                    .email("syndication@geethaarts.in")
                    .status("INTERESTED")
                    .nextAction("Send Catalogue & Revenue Share Deck")
                    .contentOffered("Family Drama & Rom-com Franchise Slate")
                    .notes("Very keen on regional subscription revenue share model.")
                    .dealValue("₹18 Cr")
                    .build(),

                ProductionHouseContact.builder()
                    .company("SVF Entertainment")
                    .contactPerson("Shrikant Mohta")
                    .language("Bengali")
                    .region("East")
                    .phone("+91 98300 22334")
                    .email("rights@svf.in")
                    .status("CONTACTED")
                    .nextAction("Follow up on Introductory NDA")
                    .contentOffered("Bengali Neo-Noir & Festival Winner Package (12 Films)")
                    .notes("Initial reach-out completed by regional acquisitions lead.")
                    .dealValue("₹8.5 Cr")
                    .build(),

                ProductionHouseContact.builder()
                    .company("Sithara Entertainments")
                    .contactPerson("Suryadevara Naga Vamsi")
                    .language("Telugu")
                    .region("South")
                    .phone("+91 99480 66778")
                    .email("vamsi@sitharaent.com")
                    .status("FOLLOW UP")
                    .nextAction("Send Revised Royalty Tier Proposals")
                    .contentOffered("Youth Urban Comedy + Crime Thriller Slate")
                    .notes("Requested adjustment on satellite linear holdback clause.")
                    .dealValue("₹14 Cr")
                    .build(),

                ProductionHouseContact.builder()
                    .company("Drishyam Films")
                    .contactPerson("Manish Mundra")
                    .language("Hindi")
                    .region("National")
                    .phone("+91 98200 99881")
                    .email("sales@drishyamfilms.com")
                    .status("SIGNED")
                    .nextAction("Ingest Master ProRes Files to DAM")
                    .contentOffered("5 Indie Award-Winning Feature Dramas")
                    .notes("Complete 4K HDR deliverables ready on AWS S3 bucket.")
                    .dealValue("₹6.2 Cr")
                    .build()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<ProductionHouseContact>> getAllContacts() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/records")
    public ResponseEntity<ProductionHouseContact> createContact(@RequestBody ProductionHouseContact contact) {
        ProductionHouseContact saved = repository.save(contact);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/bulk-import")
    public ResponseEntity<List<ProductionHouseContact>> bulkImport(@RequestBody List<ProductionHouseContact> contacts) {
        List<ProductionHouseContact> saved = repository.saveAll(contacts);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<ProductionHouseContact> updateContact(@PathVariable Long id, @RequestBody ProductionHouseContact updated) {
        return repository.findById(id).map(existing -> {
            existing.setCompany(updated.getCompany());
            existing.setContactPerson(updated.getContactPerson());
            existing.setLanguage(updated.getLanguage());
            existing.setRegion(updated.getRegion());
            existing.setPhone(updated.getPhone());
            existing.setEmail(updated.getEmail());
            existing.setStatus(updated.getStatus());
            existing.setNextAction(updated.getNextAction());
            existing.setContentOffered(updated.getContentOffered());
            existing.setNotes(updated.getNotes());
            existing.setDealValue(updated.getDealValue());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long contacted = repository.findByStatus("CONTACTED").size();
        long interested = repository.findByStatus("INTERESTED").size();
        long meetingScheduled = repository.findByStatus("MEETING SCHEDULED").size();
        long negotiating = repository.findByStatus("NEGOTIATING").size();
        long signed = repository.findByStatus("SIGNED").size();
        long declined = repository.findByStatus("DECLINED").size();
        long followUp = repository.findByStatus("FOLLOW UP").size();
        long total = repository.count();

        return ResponseEntity.ok(Map.of(
            "contacted", contacted,
            "interested", interested,
            "meetingScheduled", meetingScheduled,
            "negotiating", negotiating,
            "signed", signed,
            "declined", declined,
            "followUp", followUp,
            "total", total
        ));
    }
}

