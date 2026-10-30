package com.loopnexus.crm.investor.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crm_investor_deals")
public class InvestorDeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String investor;

    private String subtext; // e.g. "Seed", "Series A", "Angel"

    @Column(name = "round_allocation")
    private String roundAllocation; // e.g. "₹12 Cr", "₹30 Cr"

    @Column(name = "round_amount")
    private Double roundAmount;

    private String commitment; // e.g. "0", "2", "1"

    @Column(nullable = false)
    private String stage; // CLOSED, TERM SHEET, PITCH, DILIGENCE

    private String status; // e.g. "₹12 Cr", "—", "₹2 Cr"

    @Column(name = "partner_name")
    private String partnerName;

    @Column(name = "partner_email")
    private String partnerEmail;

    private String phone;

    @Column(name = "equity_percentage")
    private String equityPercentage; // e.g. "8.5%", "15.0%"

    @Column(name = "board_seat")
    private String boardSeat;

    @Column(name = "anti_dilution")
    private String antiDilution;

    @Column(length = 1000)
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public InvestorDeal() {}

    public InvestorDeal(String investor, String subtext, String roundAllocation, Double roundAmount,
                        String commitment, String stage, String status, String partnerName,
                        String partnerEmail, String phone, String equityPercentage,
                        String boardSeat, String antiDilution, String notes) {
        this.investor = investor;
        this.subtext = subtext;
        this.roundAllocation = roundAllocation;
        this.roundAmount = roundAmount;
        this.commitment = commitment;
        this.stage = stage;
        this.status = status;
        this.partnerName = partnerName;
        this.partnerEmail = partnerEmail;
        this.phone = phone;
        this.equityPercentage = equityPercentage;
        this.boardSeat = boardSeat;
        this.antiDilution = antiDilution;
        this.notes = notes;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvestor() {
        return investor;
    }

    public void setInvestor(String investor) {
        this.investor = investor;
    }

    public String getSubtext() {
        return subtext;
    }

    public void setSubtext(String subtext) {
        this.subtext = subtext;
    }

    public String getRoundAllocation() {
        return roundAllocation;
    }

    public void setRoundAllocation(String roundAllocation) {
        this.roundAllocation = roundAllocation;
    }

    public Double getRoundAmount() {
        return roundAmount;
    }

    public void setRoundAmount(Double roundAmount) {
        this.roundAmount = roundAmount;
    }

    public String getCommitment() {
        return commitment;
    }

    public void setCommitment(String commitment) {
        this.commitment = commitment;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPartnerName() {
        return partnerName;
    }

    public void setPartnerName(String partnerName) {
        this.partnerName = partnerName;
    }

    public String getPartnerEmail() {
        return partnerEmail;
    }

    public void setPartnerEmail(String partnerEmail) {
        this.partnerEmail = partnerEmail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEquityPercentage() {
        return equityPercentage;
    }

    public void setEquityPercentage(String equityPercentage) {
        this.equityPercentage = equityPercentage;
    }

    public String getBoardSeat() {
        return boardSeat;
    }

    public void setBoardSeat(String boardSeat) {
        this.boardSeat = boardSeat;
    }

    public String getAntiDilution() {
        return antiDilution;
    }

    public void setAntiDilution(String antiDilution) {
        this.antiDilution = antiDilution;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

