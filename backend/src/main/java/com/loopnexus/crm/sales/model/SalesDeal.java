package com.loopnexus.crm.sales.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crm_sales_deals")
public class SalesDeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String deal;

    @Column(nullable = false)
    private String owner; // Account executive e.g. "Sunny", "Ranjan", "Edwin"

    @Column(name = "deal_value")
    private String dealValue; // e.g. "₹15 Cr", "₹8 Cr"

    @Column(name = "deal_amount")
    private Double dealAmount;

    private String stakeholders; // e.g. "2", "1", "3"

    @Column(nullable = false)
    private String stage; // PROPOSAL, NEGOTIATION, DISCOVERY, CLOSED

    @Column(name = "close_value")
    private String closeValue; // e.g. "₹15 Cr", "₹8 Cr", "₹22 Cr"

    private String category; // Telco OTT Bundling, Enterprise Subscriptions, etc.

    @Column(name = "client_company")
    private String clientCompany;

    @Column(name = "contact_person")
    private String contactPerson;

    private String email;
    private String phone;

    @Column(name = "target_close_quarter")
    private String targetCloseQuarter;

    private String probability; // e.g. "75%", "90%"

    @Column(length = 1000)
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public SalesDeal() {}

    public SalesDeal(String deal, String owner, String dealValue, Double dealAmount,
                     String stakeholders, String stage, String closeValue, String category,
                     String clientCompany, String contactPerson, String email, String phone,
                     String targetCloseQuarter, String probability, String notes) {
        this.deal = deal;
        this.owner = owner;
        this.dealValue = dealValue;
        this.dealAmount = dealAmount;
        this.stakeholders = stakeholders;
        this.stage = stage;
        this.closeValue = closeValue;
        this.category = category;
        this.clientCompany = clientCompany;
        this.contactPerson = contactPerson;
        this.email = email;
        this.phone = phone;
        this.targetCloseQuarter = targetCloseQuarter;
        this.probability = probability;
        this.notes = notes;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeal() {
        return deal;
    }

    public void setDeal(String deal) {
        this.deal = deal;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getDealValue() {
        return dealValue;
    }

    public void setDealValue(String dealValue) {
        this.dealValue = dealValue;
    }

    public Double getDealAmount() {
        return dealAmount;
    }

    public void setDealAmount(Double dealAmount) {
        this.dealAmount = dealAmount;
    }

    public String getStakeholders() {
        return stakeholders;
    }

    public void setStakeholders(String stakeholders) {
        this.stakeholders = stakeholders;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getCloseValue() {
        return closeValue;
    }

    public void setCloseValue(String closeValue) {
        this.closeValue = closeValue;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getClientCompany() {
        return clientCompany;
    }

    public void setClientCompany(String clientCompany) {
        this.clientCompany = clientCompany;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTargetCloseQuarter() {
        return targetCloseQuarter;
    }

    public void setTargetCloseQuarter(String targetCloseQuarter) {
        this.targetCloseQuarter = targetCloseQuarter;
    }

    public String getProbability() {
        return probability;
    }

    public void setProbability(String probability) {
        this.probability = probability;
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

