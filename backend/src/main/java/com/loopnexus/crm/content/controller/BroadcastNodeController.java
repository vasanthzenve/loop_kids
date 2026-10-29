package com.loopnexus.crm.content.controller;

import com.loopnexus.crm.content.model.BroadcastNode;
import com.loopnexus.crm.content.repository.BroadcastNodeRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/content/broadcasting")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@SuppressWarnings("null")
public class BroadcastNodeController {

    private final BroadcastNodeRepository repository;

    public BroadcastNodeController(BroadcastNodeRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialNodes() {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                BroadcastNode.builder()
                    .edge("BLR-Edge-01")
                    .subtext("South")
                    .region("4.6 Mbps")
                    .bitrate("—")
                    .status("HEALTHY")
                    .health("—")
                    .latency("14 ms")
                    .packetLoss("0.01%")
                    .viewers("248,500")
                    .cdnProvider("Loop Cloudflare Tier 1")
                    .protocol("CMAF / HLS Low Latency")
                    .failoverEdge("BLR-Edge-02 (Standby)")
                    .build(),

                BroadcastNode.builder()
                    .edge("DEL-Edge-02")
                    .subtext("North")
                    .region("4.1 Mbps")
                    .bitrate("—")
                    .status("HEALTHY")
                    .health("—")
                    .latency("18 ms")
                    .packetLoss("0.02%")
                    .viewers("312,000")
                    .cdnProvider("Loop Akamai Edge-Tier")
                    .protocol("CMAF / HLS Low Latency")
                    .failoverEdge("DEL-Edge-03 (Standby)")
                    .build(),

                BroadcastNode.builder()
                    .edge("MUM-Edge-04")
                    .subtext("West")
                    .region("3.8 Mbps")
                    .bitrate("—")
                    .status("DEGRADED")
                    .health("—")
                    .latency("42 ms")
                    .packetLoss("0.84%")
                    .viewers("194,200")
                    .cdnProvider("Loop Fastly PoP")
                    .protocol("HLS Fallback v2")
                    .failoverEdge("PUN-Edge-01 (Rerouting 30%)")
                    .build(),

                BroadcastNode.builder()
                    .edge("HYD-Edge-03")
                    .subtext("South-Central")
                    .region("4.4 Mbps")
                    .bitrate("—")
                    .status("HEALTHY")
                    .health("—")
                    .latency("16 ms")
                    .packetLoss("0.01%")
                    .viewers("165,800")
                    .cdnProvider("Loop Cloudflare Tier 1")
                    .protocol("CMAF / HLS Low Latency")
                    .failoverEdge("BLR-Edge-01 (Mesh)")
                    .build(),

                BroadcastNode.builder()
                    .edge("CCU-Edge-05")
                    .subtext("East")
                    .region("4.2 Mbps")
                    .bitrate("—")
                    .status("HEALTHY")
                    .health("—")
                    .latency("22 ms")
                    .packetLoss("0.03%")
                    .viewers("128,400")
                    .cdnProvider("Loop Akamai Edge-Tier")
                    .protocol("CMAF / HLS Low Latency")
                    .failoverEdge("BHU-Edge-01 (Standby)")
                    .build(),

                BroadcastNode.builder()
                    .edge("DXB-Edge-01")
                    .subtext("Middle East")
                    .region("4.8 Mbps")
                    .bitrate("—")
                    .status("HEALTHY")
                    .health("—")
                    .latency("26 ms")
                    .packetLoss("0.01%")
                    .viewers("185,000")
                    .cdnProvider("Loop AWS CloudFront Global")
                    .protocol("CMAF / HLS Low Latency")
                    .failoverEdge("DOH-Edge-01 (Standby)")
                    .build()
            ));
        }
    }

    @GetMapping("/nodes")
    public ResponseEntity<List<BroadcastNode>> getAllNodes() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/nodes")
    public ResponseEntity<BroadcastNode> createNode(@RequestBody BroadcastNode node) {
        BroadcastNode saved = repository.save(node);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(Map.of(
            "edgeNodes", 42,
            "liveStreams", 18,
            "avgBitrate", "4.2 Mbps",
            "uptime", "99.98%"
        ));
    }
}

