package com.loopnexus.crm.advertiser.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crm_advertiser_campaigns")
public class AdvertiserCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String campaign;

    @Column(nullable = false)
    private String brand;

    @Column(name = "target_audience")
    private String targetAudience;

    @Column(name = "spend_display")
    private String spend;

    @Column(name = "spend_amount")
    private Double spendAmount;

    @Column(nullable = false)
    private String status; // LIVE, SCHEDULED, PAUSED, COMPLETED

    @Column(name = "period_month")
    private String period; // Jan, Mar, Feb, etc.

    private String cpm; // e.g. ₹185
    private String ctr; // e.g. 3.8%
    private String impressions; // e.g. 2.4M
    
    @Column(name = "gps_targeting", length = 500)
    private String gpsTargeting;

    @Column(name = "ad_format")
    private String adFormat;

    private String category;

    @Column(name = "contact_person")
    private String contactPerson;

    private String phone;
    private String email;

    @Column(length = 1000)
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public AdvertiserCampaign() {}

    public AdvertiserCampaign(String campaign, String brand, String targetAudience, String spend,
                              Double spendAmount, String status, String period, String cpm,
                              String ctr, String impressions, String gpsTargeting,
                              String adFormat, String category, String contactPerson,
                              String phone, String email, String notes) {
        this.campaign = campaign;
        this.brand = brand;
        this.targetAudience = targetAudience;
        this.spend = spend;
        this.spendAmount = spendAmount;
        this.status = status;
        this.period = period;
        this.cpm = cpm;
        this.ctr = ctr;
        this.impressions = impressions;
        this.gpsTargeting = gpsTargeting;
        this.adFormat = adFormat;
        this.category = category;
        this.contactPerson = contactPerson;
        this.phone = phone;
        this.email = email;
        this.notes = notes;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCampaign() {
        return campaign;
    }

    public void setCampaign(String campaign) {
        this.campaign = campaign;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getSpend() {
        return spend;
    }

    public void setSpend(String spend) {
        this.spend = spend;
    }

    public Double getSpendAmount() {
        return spendAmount;
    }

    public void setSpendAmount(Double spendAmount) {
        this.spendAmount = spendAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getCpm() {
        return cpm;
    }

    public void setCpm(String cpm) {
        this.cpm = cpm;
    }

    public String getCtr() {
        return ctr;
    }

    public void setCtr(String ctr) {
        this.ctr = ctr;
    }

    public String getImpressions() {
        return impressions;
    }

    public void setImpressions(String impressions) {
        this.impressions = impressions;
    }

    public String getGpsTargeting() {
        return gpsTargeting;
    }

    public void setGpsTargeting(String gpsTargeting) {
        this.gpsTargeting = gpsTargeting;
    }

    public String getAdFormat() {
        return adFormat;
    }

    public void setAdFormat(String adFormat) {
        this.adFormat = adFormat;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

