package com.loopnexus.crm.navigation.controller;

import com.loopnexus.crm.navigation.dto.SidebarItemDto;
import com.loopnexus.crm.navigation.dto.SidebarSectionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/navigation")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class SidebarNavigationController {

    @GetMapping("/sidebar")
    public ResponseEntity<List<SidebarSectionDto>> getSidebarNavigation(
            @RequestParam(name = "role", defaultValue = "INVESTOR_RELATIONS") String currentRole) {
        
        List<SidebarSectionDto> sections = Arrays.asList(
            SidebarSectionDto.builder()
                .id("executive")
                .title("EXECUTIVE")
                .items(Arrays.asList(
                    new SidebarItemDto("executive-dashboard", "Executive Dashboard", "Dashboard", "/executive/dashboard", null, List.of("EXECUTIVE", "SUPER_ADMIN")),
                    new SidebarItemDto("work-executed", "Work Executed", "WorkExecuted", "/executive/work-executed", null, List.of("EXECUTIVE", "SUPER_ADMIN")),
                    new SidebarItemDto("audit-logs", "Audit Logs", "AuditLogs", "/executive/audit-logs", null, List.of("SUPER_ADMIN", "COMPLIANCE")),
                    new SidebarItemDto("access-control", "Access Control", "AccessControl", "/executive/access-control", null, List.of("SUPER_ADMIN", "SECURITY"))
                ))
                .build(),

            SidebarSectionDto.builder()
                .id("crm")
                .title("CRM")
                .items(Arrays.asList(
                    new SidebarItemDto("user-crm", "User CRM", "UserCRM", "/crm/users", null, List.of("CRM_DIRECTOR", "ADMIN")),
                    new SidebarItemDto("production-house-crm", "Production House CRM", "ProductionHouse", "/crm/production-houses", null, List.of("CRM_DIRECTOR", "ADMIN")),
                    new SidebarItemDto("celebrity-crm", "Celebrity CRM", "CelebrityCRM", "/crm/celebrities", null, List.of("CRM_DIRECTOR", "TALENT_LEAD")),
                    new SidebarItemDto("director-portal", "Director Portal", "DirectorPortal", "/crm/directors", null, List.of("CRM_DIRECTOR", "EXECUTIVE")),
                    new SidebarItemDto("sponsor-crm", "Sponsor CRM", "SponsorCRM", "/crm/sponsors", null, List.of("SALES", "CRM_DIRECTOR")),
                    new SidebarItemDto("advertiser-crm", "Advertiser CRM", "AdvertiserCRM", "/crm/advertisers", null, List.of("ADVERTISER_LEAD", "SALES")),
                    new SidebarItemDto("investor-crm", "Investor CRM", "InvestorCRM", "/crm/investors", null, List.of("INVESTOR_RELATIONS", "EXECUTIVE")),
                    new SidebarItemDto("sales-crm", "Sales CRM", "SalesCRM", "/crm/sales", null, List.of("SALES", "COMMERCIAL")),
                    new SidebarItemDto("team-directory", "Team Directory", "TeamDirectory", "/crm/team", null, List.of("ALL"))
                ))
                .build(),

            SidebarSectionDto.builder()
                .id("content-ops")
                .title("CONTENT & OPS")
                .items(Arrays.asList(
                    new SidebarItemDto("ott-cms", "OTT CMS", "OTT_CMS", "/content/ott-cms", null, List.of("CONTENT_MGR", "ADMIN")),
                    new SidebarItemDto("ai-content-management", "AI Content Management", "AIContent", "/content/ai-content", null, List.of("CONTENT_MGR", "AI_SPECIALIST")),
                    new SidebarItemDto("content-licensing", "Content Licensing", "ContentLicensing", "/content/licensing", null, List.of("LEGAL", "LICENSING")),
                    new SidebarItemDto("broadcasting-control", "Broadcasting Control", "BroadcastingControl", "/content/broadcasting", null, List.of("BROADCAST_LEAD")),
                    new SidebarItemDto("digital-asset-management", "Digital Asset Management", "DigitalAsset", "/content/dam", null, List.of("MEDIA_OPS")),
                    new SidebarItemDto("mobile-app-management", "Mobile App Management", "MobileApp", "/content/mobile-apps", null, List.of("DEV_OPS", "MOBILE_LEAD"))
                ))
                .build(),

            SidebarSectionDto.builder()
                .id("events-partners")
                .title("EVENTS & PARTNERS")
                .items(Arrays.asList(
                    new SidebarItemDto("event-crm", "Event CRM", "EventCRM", "/partners/events", null, List.of("EVENT_MGR")),
                    new SidebarItemDto("franchise-crm", "Franchise CRM", "FranchiseCRM", "/partners/franchises", null, List.of("FRANCHISE_LEAD")),
                    new SidebarItemDto("vendor-crm", "Vendor CRM", "VendorCRM", "/partners/vendors", null, List.of("PROCUREMENT"))
                ))
                .build(),

            SidebarSectionDto.builder()
                .id("support-marketing")
                .title("SUPPORT & MARKETING")
                .items(Arrays.asList(
                    new SidebarItemDto("customer-support", "Customer Support", "CustomerSupport", "/support/tickets", null, List.of("SUPPORT")),
                    new SidebarItemDto("marketing-automation", "Marketing Automation", "MarketingAutomation", "/marketing/automation", null, List.of("MARKETING")),
                    new SidebarItemDto("notification-center", "Notification Center", "NotificationCenter", "/support/notifications", null, List.of("ALL")),
                    new SidebarItemDto("internal-mail", "Internal Mail", "InternalMail", "/support/mail", null, List.of("ALL"))
                ))
                .build(),

            SidebarSectionDto.builder()
                .id("back-office")
                .title("BACK OFFICE")
                .items(Arrays.asList(
                    new SidebarItemDto("finance", "Finance", "Finance", "/back-office/finance", null, List.of("FINANCE")),
                    new SidebarItemDto("hr", "HR", "HR", "/back-office/hr", null, List.of("HR")),
                    new SidebarItemDto("legal", "Legal", "Legal", "/back-office/legal", null, List.of("LEGAL")),
                    new SidebarItemDto("hr-people-access", "HR · People & Access", "HRPeopleAccess", "/back-office/people-access", null, List.of("HR", "SECURITY")),
                    new SidebarItemDto("expenses-ledger", "Expenses Ledger", "ExpensesLedger", "/back-office/expenses", null, List.of("FINANCE")),
                    new SidebarItemDto("nda-agreements", "NDA Agreements", "NDAAgreements", "/back-office/nda-agreements", null, List.of("LEGAL")),
                    new SidebarItemDto("nda-signatures-visitors", "NDA Signatures (Visitors)", "NDASignatures", "/back-office/nda-signatures", null, List.of("LEGAL", "SECURITY"))
                ))
                .build(),

            SidebarSectionDto.builder()
                .id("intelligence")
                .title("INTELLIGENCE")
                .items(Arrays.asList(
                    new SidebarItemDto("ai-analytics", "AI Analytics", "AIAnalytics", "/intelligence/analytics", null, List.of("DATA_SCI", "EXECUTIVE")),
                    new SidebarItemDto("security-center", "Security Center", "SecurityCenter", "/intelligence/security", null, List.of("SECURITY")),
                    new SidebarItemDto("ai-command-center", "AI Command Center", "AICommandCenter", "/intelligence/command-center", null, List.of("AI_LEAD", "EXECUTIVE"))
                ))
                .build()
        );

        return ResponseEntity.ok(sections);
    }
}

