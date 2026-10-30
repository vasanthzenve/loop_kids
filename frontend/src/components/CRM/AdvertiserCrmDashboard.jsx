import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 2 exactly
const INITIAL_ADVERTISER_CAMPAIGNS = [
  {
    id: 1,
    campaign: 'Monsoon Drive',
    brand: 'Maruti Suzuki',
    targetAudience: 'Tier-1, 25-44, Auto',
    spend: '₹4.6 L',
    spendAmount: 460000,
    status: 'LIVE',
    period: 'Jan',
    cpm: '₹185',
    ctr: '4.1%',
    impressions: '2.5M',
    gpsTargeting: 'Delhi NCR, Mumbai, Bengaluru Geofence (15km radius)',
    adFormat: '15s Non-Skippable Mid-Roll + Companion Banner',
    category: 'Automotive / Passenger Vehicles',
    contactPerson: 'Rohan Sharma',
    phone: '+91 98101 22334',
    email: 'rohan.s@maruti.co.in',
    notes: 'Targeting auto intenders across top 8 metropolitan hubs during commute hours.'
  },
  {
    id: 2,
    campaign: 'Chai Premium',
    brand: 'Tata Tea',
    targetAudience: 'South, 18-55',
    spend: '₹2.1 L',
    spendAmount: 210000,
    status: 'LIVE',
    period: 'Jan',
    cpm: '₹160',
    ctr: '3.4%',
    impressions: '1.3M',
    gpsTargeting: 'Tamil Nadu, Karnataka, Andhra Pradesh & Telangana Regional IP Geofence',
    adFormat: 'Bilingual Regional Video Ads + Pause Screen Overlay',
    category: 'FMCG / Hot Beverages',
    contactPerson: 'Divya Ramesh',
    phone: '+91 98450 77881',
    email: 'divya.ramesh@tatateaconsumer.com',
    notes: 'Regional tea blend campaign running on vernacular morning entertainment streams.'
  },
  {
    id: 3,
    campaign: 'App Install Push',
    brand: 'Swiggy',
    targetAudience: 'Pan India, 18-34',
    spend: '₹6.8 L',
    spendAmount: 680000,
    status: 'LIVE',
    period: 'Jan',
    cpm: '₹195',
    ctr: '4.9%',
    impressions: '3.8M',
    gpsTargeting: 'Pan India Urban Metros + Tier 2 College Towns',
    adFormat: 'Interactive Deep-Link CTA Banner & 6s Bumper Ads',
    category: 'Quick Commerce & Food Delivery',
    contactPerson: 'Karan Mehta',
    phone: '+91 99802 33411',
    email: 'growth-media@swiggy.in',
    notes: 'Lunchtime and late-night binge watching food ordering conversion campaign.'
  },
  {
    id: 4,
    campaign: 'Festive 2027',
    brand: 'Tanishq',
    targetAudience: 'Female 25-50',
    spend: '₹12 L',
    spendAmount: 1200000,
    status: 'SCHEDULED',
    period: 'Mar',
    cpm: '₹240',
    ctr: '3.9%',
    impressions: '5.0M',
    gpsTargeting: 'Affluent High-Income Pin Codes across Tier-1 Cities',
    adFormat: '4K HDR Full-Screen Masthead & CTV Curated Showcase',
    category: 'Luxury Jewelry & Lifestyle',
    contactPerson: 'Arundhati Sen',
    phone: '+91 98205 99443',
    email: 'arundhati.s@titan.co.in',
    notes: 'Upcoming wedding and Akshaya Tritiya high-ticket gold jewelry campaign.'
  },
  {
    id: 5,
    campaign: 'Ultra Fast Grocery',
    brand: 'Zepto',
    targetAudience: 'Metros 18-32',
    spend: '₹5.4 L',
    spendAmount: 540000,
    status: 'LIVE',
    period: 'Feb',
    cpm: '₹175',
    ctr: '4.6%',
    impressions: '3.1M',
    gpsTargeting: 'High-Density Dark Store Coverage Pincodes in Mumbai, BLR & Gurugram',
    adFormat: '10-Minute Countdown Interactive Ad Unit',
    category: 'Quick Commerce',
    contactPerson: 'Aadit Palicha',
    phone: '+91 99201 44556',
    email: 'partnerships@zeptonow.com',
    notes: 'Geo-targeted snacking and midnight craving delivery promotion.'
  },
  {
    id: 6,
    campaign: 'Smart EV Wave',
    brand: 'Ola Electric',
    targetAudience: 'Urban 21-40',
    spend: '₹8.2 L',
    spendAmount: 820000,
    status: 'PAUSED',
    period: 'Feb',
    cpm: '₹210',
    ctr: '3.2%',
    impressions: '4.0M',
    gpsTargeting: 'Green Zone Smart Cities and Tech Corridors',
    adFormat: 'Interactive 3D Virtual Test Ride Experience Ad',
    category: 'Clean Energy / EV Mobility',
    contactPerson: 'Ankush Aggarwal',
    phone: '+91 97410 88992',
    email: 'ev-media@olaelectric.com',
    notes: 'Gen 3 Scooter launch test-ride booking drive.'
  }
];

// 10 Planned Capabilities matching Screenshot 1 exactly
const PLANNED_CAPABILITIES = [
  {
    id: 'campaign-creation',
    label: 'Campaign Creation',
    desc: 'Self-serve multi-format studio for video bumpers, non-skippable mid-rolls, CTV mastheads, and sponsored pause banners.',
    stat: '9 Ad Formats Supported',
    sla: 'Sub-minute launch',
    workflow: 'Objective Selection → Creative Upload → Target Audience Rule → Real-time Bid Allocation'
  },
  {
    id: 'target-audience',
    label: 'Target Audience',
    desc: 'High-precision deterministic viewer demographic segmentation by age, income tier, streaming device, and language preference.',
    stat: '42 Audience Clusters',
    sla: '100% Deterministic',
    workflow: 'First-party OTT Behavioral Ingest → Cohort Clustering → Frequency Capping → Lookalike Expansion'
  },
  {
    id: 'gps-ads',
    label: 'GPS Ads',
    desc: 'Hyperlocal geofencing down to pin codes, metro rail transit corridors, EV charging points, and airport departures.',
    stat: '500+ Geofence Hubs',
    sla: '<50m Radius Accuracy',
    workflow: 'IP/GPS Telemetry Ping → Geofence Radius Validation → Localized Creative Delivery → Footfall Attribution'
  },
  {
    id: 'regional-ads',
    label: 'Regional Ads',
    desc: 'Automated vernacular translation, localized audio dubbing, and state-specific promotional disclosures across 8 Indian languages.',
    stat: '8 Vernacular Feeds',
    sla: 'Dynamic Language Stitch',
    workflow: 'Master Asset → Regional AI Dubbing → Cultural Nuance Filter → State-level Content Compliance'
  },
  {
    id: 'ai-ad-optimizer',
    label: 'AI Ad Optimizer',
    desc: 'Machine-learning dynamic creative optimization (DCO) that adjusts ad placement based on user engagement and view duration.',
    stat: '+28% CTR Uplift',
    sla: 'Real-time Bidding (RTB)',
    workflow: 'Content Scene Analysis → Sentiment Matching → Dynamic Overlay Generation → Bid Price Micro-adjustment'
  },
  {
    id: 'ad-performance',
    label: 'Ad Performance',
    desc: 'Comprehensive telemetry on video completion rate (VCR), audio mute status, viewability score, and conversion attribution.',
    stat: '98.2% Viewability Score',
    sla: 'Live Telemetry Pings',
    workflow: 'VAST/VMAP Ingestion → Client Beacon Tracking → Fraud Detection Filter → Executive Dashboard Sync'
  },
  {
    id: 'billing',
    label: 'Billing',
    desc: 'Automated wallet deductions, agency credit line management, prepaid ad budget caps, and multi-currency clearing.',
    stat: '₹14.2 L Daily Volume',
    sla: 'Instant Escrow Clearance',
    workflow: 'Impression Counter → Pacing Verification → Wallet Debit → GST Compliance Ledger Update'
  },
  {
    id: 'invoices',
    label: 'Invoices',
    desc: 'GST-compliant automated invoicing with e-way bill reconciliation, tax breakdown, agency commission slips, and PDF export.',
    stat: '100% Tax Compliant',
    sla: 'Automated E-Invoicing',
    workflow: 'Monthly Billing Cycle → Pacing Audit → GSTIN Verification → DigiSign Tax Invoice PDF Dispatch'
  },
  {
    id: 'ctr',
    label: 'CTR',
    desc: 'Click-through rate analytics, interactive QR code scans on Smart TVs, deep-link triggers, and companion rail engagements.',
    stat: '3.8% Platform Average',
    sla: 'Real-time telemetry',
    workflow: 'Interactive Ad Ping → User Tap/QR Scan → Redirection Verification → Anti-bot Scrubbing'
  },
  {
    id: 'revenue',
    label: 'Revenue',
    desc: 'Yield optimization engine combining direct premium brand sales with programmatic waterfall and private marketplace (PMP) auctions.',
    stat: '₹4.8 Cr Monthly Ad ARR',
    sla: 'Automated Yield Maximizer',
    workflow: 'Inventory Forecast → Floor Price Engine → PMP Header Bidding → Net Revenue Attribution'
  }
];

export const AdvertiserCrmDashboard = () => {
  const [records, setRecords] = useState(INITIAL_ADVERTISER_CAMPAIGNS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('LIVE CAMPAIGNS');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedCampaignForDetail, setSelectedCampaignForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Campaign Form State
  const [newCampaign, setNewCampaign] = useState({
    campaign: '',
    brand: '',
    targetAudience: 'Tier-1, 25-44, Auto',
    spend: '₹5 L',
    spendAmount: 500000,
    status: 'LIVE',
    period: 'Jan',
    cpm: '₹185',
    ctr: '3.8%',
    impressions: '2.5M',
    gpsTargeting: 'Pan-India Urban Metros (10km radius)',
    adFormat: '15s Non-Skippable Mid-Roll',
    category: 'Consumer Tech',
    contactPerson: '',
    phone: '',
    email: '',
    notes: 'Premium high-impact OTT video campaign.'
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/advertisers/records')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.campaign && item.campaign.toLowerCase().includes(q)) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.targetAudience && item.targetAudience.toLowerCase().includes(q)) ||
        (item.status && item.status.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

      let matchesFilter = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesFilter = item.status?.toUpperCase() === selectedStatusFilter.toUpperCase();
      }

      return matchesSearch && matchesFilter;
    });
  }, [records, searchQuery, selectedStatusFilter]);

  // Toast Helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3800);
  };

  // Create Campaign Handler
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.campaign.trim() || !newCampaign.brand.trim()) {
      showToast('Please enter Campaign Title and Brand Name.');
      return;
    }

    const createdRecord = {
      ...newCampaign,
      id: Date.now()
    };

    // Optimistic UI update
    setRecords(prev => [createdRecord, ...prev]);
    setIsNewModalOpen(false);
    showToast(`Campaign "${createdRecord.campaign}" launched successfully!`);

    // Persist to Spring Boot backend
    fetch('http://localhost:8080/api/v1/crm/advertisers/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCampaign)
    })
      .then(res => res.ok ? res.json() : null)
      .then(serverItem => {
        if (serverItem && serverItem.id) {
          setRecords(prev => prev.map(r => r.id === createdRecord.id ? serverItem : r));
        }
      })
      .catch(() => {});

    // Reset Form
    setNewCampaign({
      campaign: '',
      brand: '',
      targetAudience: 'Tier-1, 25-44, Auto',
      spend: '₹5 L',
      spendAmount: 500000,
      status: 'LIVE',
      period: 'Jan',
      cpm: '₹185',
      ctr: '3.8%',
      impressions: '2.5M',
      gpsTargeting: 'Pan-India Urban Metros (10km radius)',
      adFormat: '15s Non-Skippable Mid-Roll',
      category: 'Consumer Tech',
      contactPerson: '',
      phone: '',
      email: '',
      notes: 'Premium high-impact OTT video campaign.'
    });
  };

  // Status Toggle in Drawer
  const handleToggleStatus = (id, newStatus) => {
    setRecords(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedCampaignForDetail && selectedCampaignForDetail.id === id) {
      setSelectedCampaignForDetail(prev => ({ ...prev, status: newStatus }));
    }
    showToast(`Campaign status updated to ${newStatus}`);

    fetch(`http://localhost:8080/api/v1/crm/advertisers/${id}/status?status=${newStatus}`, {
      method: 'PUT'
    }).catch(() => {});
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Campaign', 'Brand', 'Target Audience', 'Spend', 'Status', 'Period', 'CPM', 'CTR', 'Impressions', 'GPS Targeting'];
    const rows = filteredRecords.map(r => [
      `"${r.campaign || ''}"`,
      `"${r.brand || ''}"`,
      `"${r.targetAudience || ''}"`,
      `"${r.spend || ''}"`,
      `"${r.status || ''}"`,
      `"${r.period || ''}"`,
      `"${r.cpm || ''}"`,
      `"${r.ctr || ''}"`,
      `"${r.impressions || ''}"`,
      `"${r.gpsTargeting || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_Advertiser_CRM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported advertiser campaigns to CSV');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6 sm:space-y-8 box-border text-[#E4E4E7]">

      {/* ── TOAST NOTIFICATION ────────────────────────────────────────────── */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16120B] border border-[#F59E0B]/60 text-[#FBBF24] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fade-in text-sm font-medium">
          <svg className="w-5 h-5 text-[#F59E0B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{notificationToast}</span>
        </div>
      )}

      {/* ── HEADER (MATCHING SCREENSHOT 2 EXACTLY) ───────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center gap-3.5">
          {/* Rounded squircle megaphone icon box */}
          <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center shadow-lg shadow-amber-950/20 flex-shrink-0">
            <svg className="w-6 h-6 text-[#FBBF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {/* Clean Megaphone / Speaker matching screenshot */}
              <path d="m3 11 18-5v12L3 13v-2z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F4F5] tracking-tight">
              Advertiser CRM
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light">
          Campaigns, GPS-targeted ads, billing &amp; performance.
        </p>
      </div>

      {/* ── 4 KPI STAT CARDS (MATCHING SCREENSHOT 2 VALUES & GLOW) ───────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
        {[
          {
            key: 'LIVE CAMPAIGNS',
            label: 'LIVE CAMPAIGNS',
            value: '127',
            subtext: 'Active broadcast slots',
            accent: '#FBBF24'
          },
          {
            key: 'AVG CPM',
            label: 'AVG CPM',
            value: '₹185',
            subtext: 'Effective programmatic yield',
            accent: '#FBBF24'
          },
          {
            key: "TODAY'S REVENUE",
            label: "TODAY'S REVENUE",
            value: '₹14.2 L',
            subtext: 'Gross ad billing pacing',
            accent: '#FBBF24'
          },
          {
            key: 'CTR',
            label: 'CTR',
            value: '3.8%',
            subtext: '+0.6% vs benchmark',
            accent: '#FBBF24'
          }
        ].map((stat) => {
          const isSelected = activeKpi === stat.key;
          return (
            <div
              key={stat.key}
              onClick={() => {
                setActiveKpi(stat.key);
                if (stat.key === 'LIVE CAMPAIGNS') setSelectedStatusFilter('LIVE');
                else setSelectedStatusFilter('ALL');
              }}
              className={`p-4 sm:p-5 rounded-xl bg-[#090704] border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'border-[#8A6720] shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                  : 'border-[#221A0F] hover:border-[#4A391A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs tracking-wider text-[#A1A1AA] uppercase font-mono font-medium">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FBBF24] mt-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#71717A] mt-1.5 flex items-center gap-1 font-mono">
                {stat.subtext}
              </div>
              {/* Subtle radiant corner accent */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-amber-500/5 blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
            </div>
          );
        })}
      </div>

      {/* ── ACTION TOOLBAR (SEARCH, FILTER, EXPORT, + NEW) ───────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search input with magnifying glass */}
        <div className="relative flex-1 max-w-md">
          <svg className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 bg-[#090704] border border-[#261E14] focus:border-[#F59E0B] rounded-lg text-xs sm:text-sm text-white placeholder-[#71717A] outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#71717A] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          {/* FILTER BUTTON & DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border transition-colors flex items-center gap-2 cursor-pointer ${
                selectedStatusFilter !== 'ALL'
                  ? 'bg-[#1F170B] border-[#F59E0B] text-[#FBBF24]'
                  : 'bg-[#0E0B07] border-[#2A2012] hover:bg-[#1A140B] text-[#D4D4D8]'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>FILTER{selectedStatusFilter !== 'ALL' ? `: ${selectedStatusFilter}` : ''}</span>
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#110D08] border border-[#2E2314] shadow-2xl py-2 z-30 animate-fade-in text-xs font-medium">
                <div className="px-3 py-1 text-[10px] text-[#8A7964] font-mono uppercase tracking-wider">
                  Filter by Status
                </div>
                {['ALL', 'LIVE', 'SCHEDULED', 'PAUSED'].map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      setSelectedStatusFilter(st);
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 transition-colors flex items-center justify-between ${
                      selectedStatusFilter === st ? 'bg-[#221808] text-[#FBBF24]' : 'text-[#D4D4D8] hover:bg-[#1A140B]'
                    }`}
                  >
                    <span>{st === 'ALL' ? 'All Campaigns' : st}</span>
                    {selectedStatusFilter === st && <span className="text-[#FBBF24]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* EXPORT BUTTON */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-lg bg-[#0E0B07] border border-[#2A2012] hover:bg-[#1A140B] text-[#D4D4D8] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>EXPORT</span>
          </button>

          {/* + NEW BUTTON (Amber pill button) */}
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F59E0B] via-[#E5A93C] to-[#D97706] hover:brightness-110 text-black text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-amber-900/30 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-sm font-bold leading-none">+</span>
            <span>NEW</span>
          </button>
        </div>
      </div>

      {/* ── CAMPAIGNS TABLE (MATCHING SCREENSHOT 2 HEADERS & COLUMNS) ─────── */}
      <div className="rounded-xl border border-[#1F190F] bg-[#070503] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1E170F] bg-[#0A0805] text-[#8E7E68] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 font-semibold">CAMPAIGN</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">BRAND</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">TARGETING</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">STATUS</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">SPEND</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17120B]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#71717A] text-xs font-mono">
                    No advertiser campaigns match the search criteria. Click "+ NEW" to launch a campaign.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const isLive = item.status === 'LIVE';
                  const isScheduled = item.status === 'SCHEDULED';
                  const isPaused = item.status === 'PAUSED';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#120D08]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedCampaignForDetail(item)}
                    >
                      {/* CAMPAIGN */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-semibold text-white group-hover:text-[#FBBF24] transition-colors text-xs sm:text-sm">
                          {item.campaign}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#8A7964] font-medium mt-0.5">
                          {item.brand}
                        </div>
                      </td>

                      {/* BRAND (In screenshot shows audience targeting, e.g. "Tier-1, 25-44, Auto") */}
                      <td className="py-4 px-4 sm:px-6 text-[#A1A1AA] text-xs sm:text-sm font-sans">
                        {item.targetAudience}
                      </td>

                      {/* TARGETING (In screenshot shows budget/spend value, e.g. "₹4.6 L") */}
                      <td className="py-4 px-4 sm:px-6 font-serif text-[#FBBF24] text-xs sm:text-sm tracking-wide">
                        {item.spend}
                      </td>

                      {/* STATUS (Pill badge: LIVE green, SCHEDULED blue, PAUSED amber) */}
                      <td className="py-4 px-4 sm:px-6">
                        {isLive && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#052814] text-[#10B981] border border-[#065F46]">
                            LIVE
                          </span>
                        )}
                        {isScheduled && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#0C2033] text-[#38BDF8] border border-[#0369A1]">
                            SCHEDULED
                          </span>
                        )}
                        {isPaused && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#2A1D07] text-[#F59E0B] border border-[#78350F]">
                            PAUSED
                          </span>
                        )}
                        {!isLive && !isScheduled && !isPaused && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
                            {item.status}
                          </span>
                        )}
                      </td>

                      {/* SPEND (In screenshot shows Month/Period, e.g. "Jan", "Mar") */}
                      <td className="py-4 px-4 sm:px-6 text-[#D4D4D8] text-xs sm:text-sm font-mono">
                        {item.period}
                      </td>

                      {/* OPEN ACTION */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCampaignForDetail(item);
                          }}
                          className="text-[#E5A93C] hover:text-[#FBBF24] font-medium text-xs sm:text-sm transition-colors hover:underline cursor-pointer"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PLANNED CAPABILITIES (10 CARDS MATCHING SCREENSHOT 1 EXACTLY) ── */}
      <div className="space-y-3 pt-6 sm:pt-8 border-t border-[#1C160E]">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#8A7964] uppercase">
          PLANNED CAPABILITIES
        </div>

        {/* 3 Columns Grid matching screenshot layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLANNED_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              onClick={() => setSelectedCapability(cap)}
              className="p-4 rounded-lg bg-[#090704] border border-[#1E170E] hover:border-[#8A6720] hover:bg-[#120E09] transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#D4D4D8] group-hover:text-white transition-colors">
                  {cap.label}
                </span>
                <span className="text-xs text-[#8A7964] group-hover:text-[#FBBF24] transition-colors">
                  →
                </span>
              </div>
              <div className="text-[11px] text-[#71717A] mt-2 line-clamp-1">
                {cap.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CAMPAIGN AD STUDIO DRAWER (OPENED VIA "Open") ─────────────────── */}
      {selectedCampaignForDetail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-2xl bg-[#090705] border-l border-[#261E14] h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between border-b border-[#221A11] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#221808] text-[#FBBF24] border border-[#44310E]">
                      {selectedCampaignForDetail.category || 'Ad Campaign'}
                    </span>
                    <span className="text-xs font-mono text-[#8A7964]">
                      ID #{selectedCampaignForDetail.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                    {selectedCampaignForDetail.campaign}
                  </h2>
                  <p className="text-sm text-[#F59E0B] font-medium">
                    {selectedCampaignForDetail.brand}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCampaignForDetail(null)}
                  className="w-8 h-8 rounded-lg bg-[#14100A] text-[#A1A1AA] hover:text-white hover:bg-[#201A10] flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Status & Quick Toggle */}
              <div className="p-4 rounded-xl bg-[#120E09] border border-[#2E2417] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#8A7964] font-mono uppercase">Current Status</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedCampaignForDetail.status}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(selectedCampaignForDetail.id, 'LIVE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedCampaignForDetail.status === 'LIVE'
                        ? 'bg-[#052814] text-[#10B981] border border-[#065F46]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Go Live
                  </button>
                  <button
                    onClick={() => handleToggleStatus(selectedCampaignForDetail.id, 'PAUSED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedCampaignForDetail.status === 'PAUSED'
                        ? 'bg-[#2A1D07] text-[#F59E0B] border border-[#78350F]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Pause
                  </button>
                  <button
                    onClick={() => handleToggleStatus(selectedCampaignForDetail.id, 'SCHEDULED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedCampaignForDetail.status === 'SCHEDULED'
                        ? 'bg-[#0C2033] text-[#38BDF8] border border-[#0369A1]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Schedule
                  </button>
                </div>
              </div>

              {/* Performance Telemetry Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Total Spend</div>
                  <div className="text-lg font-serif font-bold text-[#FBBF24] mt-0.5">
                    {selectedCampaignForDetail.spend}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Avg CPM</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {selectedCampaignForDetail.cpm || '₹185'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">CTR</div>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                    {selectedCampaignForDetail.ctr || '3.8%'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Impressions</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {selectedCampaignForDetail.impressions || '2.5M'}
                  </div>
                </div>
              </div>

              {/* GPS Geofencing & Audience Specs */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#8A7964] uppercase tracking-wider">
                  Targeting &amp; Distribution Architecture
                </div>
                <div className="p-4 rounded-xl bg-[#0E0B07] border border-[#241C11] space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">📍</span>
                    <div>
                      <div className="text-xs font-semibold text-white">GPS Geofencing Zone</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">
                        {selectedCampaignForDetail.gpsTargeting || 'Pan-India Urban Hubs & Metros (15km radius)'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#1C160E]">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">🎯</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Audience Cohort</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5">
                        {selectedCampaignForDetail.targetAudience}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#1C160E]">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">🎬</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Ad Format / Creative Unit</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5">
                        {selectedCampaignForDetail.adFormat || '15s Non-Skippable Mid-Roll + Companion Banner'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Brand Liaison */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#8A7964] uppercase tracking-wider">
                  Brand Representative &amp; Billing
                </div>
                <div className="p-4 rounded-xl bg-[#0E0B07] border border-[#241C11] space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Brand Account Lead:</span>
                    <span className="text-white font-medium">{selectedCampaignForDetail.contactPerson || 'Media Buying Desk'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Direct Phone:</span>
                    <span className="text-[#FBBF24] font-mono">{selectedCampaignForDetail.phone || '+91 98100 00000'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Billing Email:</span>
                    <span className="text-[#A1A1AA] font-mono">{selectedCampaignForDetail.email || 'billing@brand.com'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8A7964]">Pacing Schedule:</span>
                    <span className="text-white font-medium">{selectedCampaignForDetail.period} 2026/2027</span>
                  </div>
                </div>
              </div>

              {/* Campaign Notes */}
              {selectedCampaignForDetail.notes && (
                <div className="p-3.5 rounded-lg bg-[#140F09] border border-[#2B1F11] text-xs text-[#A1A1AA] leading-relaxed">
                  <strong className="text-white block mb-1">Campaign Strategy:</strong>
                  {selectedCampaignForDetail.notes}
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-[#221A11] flex items-center justify-between gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  showToast(`Triggered AI Ad Optimizer for ${selectedCampaignForDetail.campaign}`);
                }}
                className="px-4 py-2 rounded-lg bg-[#1C160E] hover:bg-[#2A2014] text-[#FBBF24] border border-[#44310E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>⚡ Run AI Ad Optimizer</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`GST Invoice generated for ${selectedCampaignForDetail.brand}`);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#14100A] hover:bg-[#201A10] text-white border border-[#2E2417] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Download Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignForDetail(null)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black text-xs font-bold hover:brightness-110 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE CAMPAIGN MODAL (TRIGGERED BY + NEW) ────────────────────── */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div
            className="w-full max-w-xl bg-[#0C0905] border border-[#3E2D12] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#241C11] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#44310E] flex items-center justify-center text-[#FBBF24]">
                  +
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Launch New Ad Campaign
                  </h3>
                  <p className="text-xs text-[#8A7964]">
                    Set live campaign, audience targeting, GPS geofencing &amp; budget.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#14100A] text-[#A1A1AA] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCampaign.campaign}
                    onChange={(e) => setNewCampaign({ ...newCampaign, campaign: e.target.value })}
                    placeholder="e.g. Monsoon Drive"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Brand / Advertiser *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCampaign.brand}
                    onChange={(e) => setNewCampaign({ ...newCampaign, brand: e.target.value })}
                    placeholder="e.g. Maruti Suzuki"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={newCampaign.targetAudience}
                    onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                    placeholder="Tier-1, 25-44, Auto"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Spend / Budget
                  </label>
                  <input
                    type="text"
                    value={newCampaign.spend}
                    onChange={(e) => setNewCampaign({ ...newCampaign, spend: e.target.value })}
                    placeholder="₹4.6 L"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none font-serif text-[#FBBF24]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Month / Period
                  </label>
                  <select
                    value={newCampaign.period}
                    onChange={(e) => setNewCampaign({ ...newCampaign, period: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    GPS Geofence Region
                  </label>
                  <input
                    type="text"
                    value={newCampaign.gpsTargeting}
                    onChange={(e) => setNewCampaign({ ...newCampaign, gpsTargeting: e.target.value })}
                    placeholder="Delhi NCR, Mumbai Geofence (15km)"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Ad Format
                  </label>
                  <select
                    value={newCampaign.adFormat}
                    onChange={(e) => setNewCampaign({ ...newCampaign, adFormat: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="15s Non-Skippable Mid-Roll + Companion Banner">15s Non-Skippable Mid-Roll</option>
                    <option value="6s Pre-Roll Bumper">6s Pre-Roll Bumper</option>
                    <option value="Interactive Smart TV Pause Screen">Interactive Smart TV Pause Screen</option>
                    <option value="4K HDR Masthead Showcase">4K HDR Masthead Showcase</option>
                    <option value="Vernacular Audio Dubbed Stream">Vernacular Audio Dubbed Stream</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={newCampaign.contactPerson}
                    onChange={(e) => setNewCampaign({ ...newCampaign, contactPerson: e.target.value })}
                    placeholder="Media Director"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Status
                  </label>
                  <select
                    value={newCampaign.status}
                    onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="LIVE">LIVE (Immediate Pacing)</option>
                    <option value="SCHEDULED">SCHEDULED (Upcoming Slot)</option>
                    <option value="PAUSED">PAUSED (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#241C11]">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#14100A] hover:bg-[#201A10] text-[#A1A1AA] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#F59E0B] via-[#E5A93C] to-[#D97706] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md shadow-amber-950/40"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CAPABILITY DETAILS MODAL (TRIGGERED BY PLANNED CAPABILITIES) ─── */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div
            className="w-full max-w-lg bg-[#0C0905] border border-[#3E2D12] rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#241C11] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F59E0B] tracking-wider">
                  Capability Architecture
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {selectedCapability.label}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCapability(null)}
                className="w-7 h-7 rounded-lg bg-[#14100A] text-[#A1A1AA] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
              {selectedCapability.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#2E2417]">
                <div className="text-[10px] text-[#8A7964] font-mono uppercase">Target Benchmark</div>
                <div className="text-sm font-bold text-[#FBBF24] mt-0.5">{selectedCapability.stat}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#2E2417]">
                <div className="text-[10px] text-[#8A7964] font-mono uppercase">Operational SLA</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedCapability.sla}</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#110D08] border border-[#241C11]">
              <div className="text-[10px] font-mono text-[#8A7964] uppercase mb-1">
                Data Pipeline &amp; Delivery Engine:
              </div>
              <div className="text-xs text-[#A1A1AA] font-mono">
                {selectedCapability.workflow}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#241C11]">
              <button
                onClick={() => setSelectedCapability(null)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black text-xs font-bold hover:brightness-110 transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdvertiserCrmDashboard;

