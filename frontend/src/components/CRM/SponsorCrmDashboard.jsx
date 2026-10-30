import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 2 exactly
const INITIAL_SPONSOR_DEALS = [
  {
    id: 1,
    sponsor: 'Tata Motors',
    subtext: 'Title Sponsor · Loop Nite',
    packageTier: 'Contract',
    stage: '₹6.5 Cr',
    status: 'CLOSED',
    renewal: '2027',
    category: 'Automotive (EV & SUV)',
    contactPerson: 'Vivek Srivatsa',
    phone: '+91 98201 11223',
    email: 'corporate.sponsorships@tatamotors.com',
    impressionsGuaranteed: '42M OTT Impressions',
    roiMetric: '3.8x Brand Recall',
    deliverables: 'Co-branded Opening Stinger, Masthead Carousel, VIP Gala Red Carpet Integration',
    contractDuration: '2 Years (Multi-Season)',
    billingMilestones: '40% Advance, 30% Mid-Season, 30% Post-Gala',
    notes: 'Title sponsorship agreement executed with multi-season options.'
  },
  {
    id: 2,
    sponsor: 'Amazon Pay',
    subtext: 'Wallet integration',
    packageTier: 'Negotiating',
    stage: '₹3 Cr',
    status: 'HOT',
    renewal: '—',
    category: 'Fintech / Digital Payments',
    contactPerson: 'Meghna Agarwal',
    phone: '+91 98110 33445',
    email: 'm-agarwal@amazon.com',
    impressionsGuaranteed: '25M Checkout Views',
    roiMetric: '4.2x Conversion Lift',
    deliverables: 'Default 1-Click Checkout Cashbacks, Dedicated Promo Rails, Push Notifications',
    contractDuration: '1 Year Annual Mandate',
    billingMilestones: 'Quarterly Invoicing on Settlement Volume',
    notes: 'Term sheet finalized for seamless wallet top-up cashbacks on Loop subscriptions.'
  },
  {
    id: 3,
    sponsor: 'Cadbury',
    subtext: 'Pre-roll bundle',
    packageTier: 'Proposal',
    stage: '₹1.4 Cr',
    status: 'WARM',
    renewal: '—',
    category: 'FMCG / Confectionery',
    contactPerson: 'Anand Kulkarni',
    phone: '+91 98200 88990',
    email: 'anand.k@mondelezinternational.com',
    impressionsGuaranteed: '18M Non-Skippable Views',
    roiMetric: '2.9x Brand Favorability',
    deliverables: 'Festive Season 15s Non-Skippable Pre-rolls, Sweet Moments Pause Screens',
    contractDuration: '6 Months Festive Campaign',
    billingMilestones: '50% Upfront, 50% Post Campaign Pacing Audit',
    notes: 'Proposal pitched to GroupM media buying agency; review due this Friday.'
  },
  {
    id: 4,
    sponsor: 'Maruti Suzuki',
    subtext: 'Game sponsor',
    packageTier: 'Onboarded',
    stage: '₹2.2 Cr',
    status: 'CLOSED',
    renewal: '2027',
    category: 'Automotive (NEXA)',
    contactPerson: 'Shashank Srivastava',
    phone: '+91 98100 55667',
    email: 'nexa.branding@maruti.co.in',
    impressionsGuaranteed: '30M Engagement Pings',
    roiMetric: '3.4x Test Drive Leads',
    deliverables: 'Interactive Predictor Gamification Hub, Live Sports Leaderboards',
    contractDuration: '2 Years Annual Agreement',
    billingMilestones: 'Milestone Disbursal per Tournament Stage',
    notes: 'Onboarded for annual live sports gaming hub interactive banner integration.'
  },
  {
    id: 5,
    sponsor: 'Dream11',
    subtext: 'Live Sports Streaming Title',
    packageTier: 'Contract',
    stage: '₹18 Cr',
    status: 'CLOSED',
    renewal: '2027',
    category: 'Sports Tech / Gaming',
    contactPerson: 'Harsh Jain',
    phone: '+91 98200 44112',
    email: 'partnerships@dream11.com',
    impressionsGuaranteed: '120M Stream Impressions',
    roiMetric: '5.1x App Installs',
    deliverables: 'Live Scorecard Bug, Over-by-Over L-Band Banners, Studio Analysis Segments',
    contractDuration: '3-Year Master Broadcast Deal',
    billingMilestones: 'Per Tournament Tranche Clearance',
    notes: 'Master linear & OTT live cricket broadcast multi-year partnership.'
  },
  {
    id: 6,
    sponsor: 'PhonePe',
    subtext: 'Exclusive UPI Checkout Partner',
    packageTier: 'Negotiating',
    stage: '₹5.5 Cr',
    status: 'HOT',
    renewal: '2026',
    category: 'Fintech',
    contactPerson: 'Sameer Nigam',
    phone: '+91 98450 77112',
    email: 'alliances@phonepe.com',
    impressionsGuaranteed: '40M Checkout Screens',
    roiMetric: '4.6x Autopay Mandates',
    deliverables: 'Instant UPI Autopay Co-branded Vouchers, ₹50 Flat Cashback on Annual Pass',
    contractDuration: '1 Year Recurring Mandate',
    billingMilestones: 'Monthly Invoicing & Reconciliation',
    notes: 'Final legal clauses around transaction chargeback liability being reconciled.'
  }
];

// 9 Planned Capabilities matching Screenshot 1 exactly (3x3 grid)
const PLANNED_CAPABILITIES = [
  {
    id: 'sponsor-database',
    label: 'Sponsor Database',
    desc: 'Centralized directory of tier-1 corporate sponsors, media agencies, brand leads, and historical spend telemetry.',
    stat: '180+ Enterprise Brands',
    sla: 'Real-time sync',
    workflow: 'Brand Dossier Ingest → Media Agency Mapping → Category Classification → Contact Tree'
  },
  {
    id: 'lead-management',
    label: 'Lead Management',
    desc: 'Inbound sponsor inquiries, RFP qualification, automated lead scoring, and account executive routing.',
    stat: '38 Active Leads',
    sla: '< 2 hr turnaround',
    workflow: 'Lead Capture → Qualification Scoring → Conflict Check → AE Assignment'
  },
  {
    id: 'proposal-tracking',
    label: 'Proposal Tracking',
    desc: 'Custom pitch decks, CPM rate-cards, inventory availability heatmaps, and revision control logs.',
    stat: '14 Active Proposals',
    sla: '< 24 hr generation',
    workflow: 'Inventory Lock → Rate Card Engine → Deck Customization → Versioned Dispatch'
  },
  {
    id: 'package-selection',
    label: 'Package Selection',
    desc: 'Pre-configured title sponsor bundles, live event stingers, pause-screen ads, and interactive CTV overlays.',
    stat: '12 Curated Bundles',
    sla: 'Instant Configurator',
    workflow: 'Objective Filter → Audience Match → Multi-Screen Packaging → Margin Optimization'
  },
  {
    id: 'contract-management',
    label: 'Contract Management',
    desc: 'Standardized sponsorship agreements, mutual NDAs, brand safety guidelines, and digital Aadhaar/DocuSign seal.',
    stat: '100% Legally Sealed',
    sla: 'Instant DigiSign',
    workflow: 'Legal Template → Custom Addenda → Agency Review → Digital Signature'
  },
  {
    id: 'payment-tracking',
    label: 'Payment Tracking',
    desc: 'Tranche invoicing, advance retainers, media agency commission reconciliation, and GST/TDS tax compliance.',
    stat: '₹62 Cr Contracted ARR',
    sla: 'Auto-Reconciliation',
    workflow: 'Pacing Audit → Milestone Invoice → Bank Settlement → Ledger Audit'
  },
  {
    id: 'brand-visibility',
    label: 'Brand Visibility',
    desc: 'Real-time ad impression telemetry, view-through rates (VTR), click-through rate (CTR), and screen share analytics.',
    stat: '99.4% Ad Delivery',
    sla: 'Sub-second telemetry',
    workflow: 'VAST/VMAP Ingest → Player Pings → Fraud Filtering → Visibility Dashboard'
  },
  {
    id: 'roi-dashboard',
    label: 'ROI Dashboard',
    desc: 'Brand lift studies, attribution modeling, promo-code redemptions, and cross-screen sentiment analysis.',
    stat: '3.8x Avg Brand Lift',
    sla: 'Automated Reporting',
    workflow: 'Ad Logs → Survey Sample Polls → Conversion Webhook → Executive PDF Report'
  },
  {
    id: 'renewals',
    label: 'Renewals',
    desc: 'Automated 90-60-30 day renewal notices, first right of refusal triggers, and multi-year escalators.',
    stat: '82% Renewal Rate',
    sla: 'Automated Alerts',
    workflow: 'Term Monitoring → Health Score Check → Early Renewal Incentive → Deed Extension'
  }
];

export const SponsorCrmDashboard = () => {
  const [records, setRecords] = useState(INITIAL_SPONSOR_DEALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('ACTIVE CONTRACTS');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedDealForDetail, setSelectedDealForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Deal Form State
  const [newDeal, setNewDeal] = useState({
    sponsor: '',
    subtext: 'Title Sponsor · Loop Nite',
    packageTier: 'Contract',
    stage: '₹5 Cr',
    status: 'HOT',
    renewal: '2027',
    category: 'Automotive',
    contactPerson: '',
    phone: '',
    email: '',
    deliverables: 'Masthead Banners, 15s Pre-rolls'
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/sponsors/records')
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
        (item.sponsor && item.sponsor.toLowerCase().includes(q)) ||
        (item.subtext && item.subtext.toLowerCase().includes(q)) ||
        (item.packageTier && item.packageTier.toLowerCase().includes(q)) ||
        (item.status && item.status.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

      let matchesFilter = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesFilter = 
          (item.status && item.status.toUpperCase() === selectedStatusFilter.toUpperCase()) ||
          (item.packageTier && item.packageTier.toUpperCase() === selectedStatusFilter.toUpperCase());
      } else if (activeKpi === 'SPONSOR LEADS') {
        matchesFilter = true;
      } else if (activeKpi === 'ACTIVE CONTRACTS') {
        matchesFilter = item.status === 'CLOSED';
      } else if (activeKpi === 'ARR SPONSORED') {
        matchesFilter = item.status === 'CLOSED' || item.status === 'HOT';
      } else if (activeKpi === 'RENEWAL RATE') {
        matchesFilter = item.renewal && item.renewal !== '—';
      }

      return matchesSearch && matchesFilter;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Toast Helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Handle Create New Deal
  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDeal.sponsor.trim()) return;

    const newEntry = {
      id: Date.now(),
      sponsor: newDeal.sponsor.trim(),
      subtext: newDeal.subtext || 'Category Sponsor',
      packageTier: newDeal.packageTier || 'Contract',
      stage: newDeal.stage ? (newDeal.stage.startsWith('₹') ? newDeal.stage : `₹${newDeal.stage}`) : '₹3.5 Cr',
      status: newDeal.status || 'HOT',
      renewal: newDeal.renewal || '2027',
      category: newDeal.category || 'Consumer Brands',
      contactPerson: newDeal.contactPerson || 'Lead Partner',
      phone: newDeal.phone || '+91 98000 12345',
      email: newDeal.email || `${newDeal.sponsor.toLowerCase().replace(/[^a-z0-9]/g, '')}@brand.in`,
      impressionsGuaranteed: '20M Impressions',
      roiMetric: '3.5x Brand Lift',
      deliverables: newDeal.deliverables || 'Masthead Banners, 15s Pre-rolls',
      contractDuration: '1 Year Annual Agreement',
      billingMilestones: 'Quarterly Invoicing',
      notes: 'Added from Sponsor CRM dashboard.'
    };

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewDeal({
      sponsor: '',
      subtext: 'Title Sponsor · Loop Nite',
      packageTier: 'Contract',
      stage: '₹5 Cr',
      status: 'HOT',
      renewal: '2027',
      category: 'Automotive',
      contactPerson: '',
      phone: '',
      email: '',
      deliverables: 'Masthead Banners, 15s Pre-rolls'
    });

    // POST to backend
    fetch('http://localhost:8080/api/v1/crm/sponsors/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    showToast(`Added sponsor "${newEntry.sponsor}" to pipeline!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Sponsor', 'Package Subtext', 'Package Tier', 'Deal Valuation', 'Status', 'Renewal Year'];
    const rows = filteredRecords.map(r => [
      r.id,
      `"${r.sponsor}"`,
      `"${r.subtext}"`,
      `"${r.packageTier}"`,
      `"${r.stage}"`,
      `"${r.status}"`,
      `"${r.renewal}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_Sponsor_CRM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported sponsor records as CSV.');
  };

  // Render Status Badge (CLOSED / HOT / WARM)
  const renderStatusBadge = (status) => {
    const s = (status || '').toUpperCase();
    if (s === 'CLOSED') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062E1E] text-[#34D399] border border-[#065F46]">
          CLOSED
        </span>
      );
    }
    if (s === 'HOT') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#281807] text-[#F59E0B] border border-[#78350F]">
          HOT
        </span>
      );
    }
    if (s === 'WARM') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0C1B2E] text-[#60A5FA] border border-[#1E40AF]">
          WARM
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#141416] text-[#A1A1AA] border border-[#27272A]">
        {status}
      </span>
    );
  };

  return (
    <div className="w-full min-h-full bg-[#050403] text-[#EDE7DE] p-4 sm:p-6 lg:p-10 select-none font-sans">
      <div className="max-w-[1520px] mx-auto space-y-10 sm:space-y-12">

        {/* ═══════════════════════════════════════════════════════════════
            TOP HEADER AREA (MATCHING EXACT SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          {/* Main Title Row with Golden Handshake Icon */}
          <div className="flex items-center gap-4">
            {/* Handshake Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {/* Handshake SVG in Golden Amber */}
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <path d="M11 15h2m-2-3h2m-2-3h2M4 19h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                <path d="M7 15l2-2-2-2m10 4l-2-2 2-2" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Sponsor CRM
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Sponsorship leads, packages, contracts &amp; ROI.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. SPONSOR LEADS */}
          <div 
            onClick={() => setActiveKpi('SPONSOR LEADS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'SPONSOR LEADS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              SPONSOR LEADS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              38
            </div>
          </div>

          {/* 2. ACTIVE CONTRACTS */}
          <div 
            onClick={() => setActiveKpi('ACTIVE CONTRACTS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'ACTIVE CONTRACTS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              ACTIVE CONTRACTS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              14
            </div>
            <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
              +3
            </div>
          </div>

          {/* 3. ARR SPONSORED */}
          <div 
            onClick={() => setActiveKpi('ARR SPONSORED')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'ARR SPONSORED'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              ARR SPONSORED
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              ₹62 Cr
            </div>
          </div>

          {/* 4. RENEWAL RATE */}
          <div 
            onClick={() => setActiveKpi('RENEWAL RATE')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'RENEWAL RATE'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              RENEWAL RATE
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              82%
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SEARCH & ACTION TOOLBAR (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#736350]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-2 bg-[#0B0907] border border-[#211B13] rounded-lg text-sm text-[#EDE7DE] placeholder-[#5A4F41] focus:outline-none focus:border-[#7E5C20] focus:ring-1 focus:ring-[#7E5C20] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#8A7A66] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons: FILTER, EXPORT, + NEW */}
          <div className="flex items-center gap-3">
            {/* Filter Button & Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors border ${
                  selectedStatusFilter !== 'ALL' || isFilterDropdownOpen
                    ? 'border-[#7E5C20] bg-[#1A140B] text-[#FBBF24]'
                    : 'border-[#2B2317] bg-[#100D09] hover:bg-[#1A140B] text-[#D8CFBF]'
                }`}
              >
                <svg className="w-3.5 h-3.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span>FILTER</span>
                {selectedStatusFilter !== 'ALL' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                )}
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0F0C08] border border-[#3E2D12] rounded-xl shadow-2xl py-1 z-30 font-sans">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-[#8A7964] uppercase tracking-wider border-b border-[#211B13]">
                    Status &amp; Package Filter
                  </div>
                  {['ALL', 'CLOSED', 'HOT', 'WARM', 'Contract', 'Negotiating', 'Proposal', 'Onboarded'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatusFilter(status);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#1C160F] transition-colors ${
                        selectedStatusFilter === status ? 'text-[#FBBF24] font-semibold bg-[#16110A]' : 'text-[#C9BFB0]'
                      }`}
                    >
                      <span>{status === 'ALL' ? 'All Records' : status}</span>
                      {selectedStatusFilter === status && (
                        <svg className="w-3.5 h-3.5 text-[#FBBF24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Button */}
            <button 
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border border-[#2B2317] bg-[#100D09] hover:bg-[#1A140B] text-[#D8CFBF] transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>EXPORT</span>
            </button>

            {/* + NEW Button (Bright Amber/Orange from Screenshot) */}
            <button 
              type="button"
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] transition-all shadow-[0_2px_12px_rgba(245,158,11,0.28)] active:scale-95 cursor-pointer"
            >
              <span className="text-sm font-bold leading-none">+</span>
              <span>NEW</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MAIN SPONSOR DEALS TABLE (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0B0907] border border-[#211B13] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A140D] text-[11px] font-mono uppercase tracking-[0.16em] text-[#7E6E59]">
                  <th className="py-4 px-6 font-medium">SPONSOR</th>
                  <th className="py-4 px-6 font-medium">PACKAGE</th>
                  <th className="py-4 px-6 font-medium">STAGE</th>
                  <th className="py-4 px-6 font-medium">STATUS</th>
                  <th className="py-4 px-6 font-medium">RENEWAL</th>
                  <th className="py-4 px-6 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16120D] text-sm">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7E6E59] font-mono text-xs">
                      No sponsor records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-[#120F0B]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedDealForDetail(item)}
                    >
                      {/* 1. SPONSOR Column: Bold Title + Subtext */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#EDE7DE] text-base group-hover:text-white transition-colors">
                          {item.sponsor}
                        </div>
                        <div className="text-xs text-[#7A6B58] mt-0.5 font-normal">
                          {item.subtext}
                        </div>
                      </td>

                      {/* 2. PACKAGE Column */}
                      <td className="py-4 px-6 text-[#C9BFB0] text-sm font-normal">
                        {item.packageTier}
                      </td>

                      {/* 3. STAGE Column (Deal Valuation e.g. ₹6.5 Cr, ₹3 Cr) */}
                      <td className="py-4 px-6 font-serif text-[#EDE7DE] text-base">
                        {item.stage}
                      </td>

                      {/* 4. STATUS Column (CLOSED / HOT / WARM) */}
                      <td className="py-4 px-6">
                        {renderStatusBadge(item.status)}
                      </td>

                      {/* 5. RENEWAL Column (2027, —, 2026) */}
                      <td className="py-4 px-6 text-[#9A8A75] text-sm font-mono">
                        {item.renewal}
                      </td>

                      {/* 6. Action: Open */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDealForDetail(item);
                          }}
                          className="text-[#D4A359] hover:text-[#FBBF24] font-medium text-sm transition-colors cursor-pointer"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLANNED CAPABILITIES SECTION (EXACT MATCH SCREENSHOT 1)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* 9 Capability Boxes in 3-Column Grid matching Screenshot 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PLANNED_CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(cap)}
                className="p-4 sm:p-5 rounded-xl bg-[#0B0907] border border-[#211B13] hover:border-[#7E5C20] transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[#EDE7DE] group-hover:text-[#FBBF24] transition-colors">
                    {cap.label}
                  </span>
                  <svg 
                    className="w-4 h-4 text-[#554634] group-hover:text-[#FBBF24] group-hover:translate-x-0.5 transition-all" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#7A6B58] font-mono">
                  <span>{cap.stat}</span>
                  <span className="text-emerald-500/80">{cap.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: + NEW SPONSOR DEAL
      ═══════════════════════════════════════════════════════════════ */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#211B13] flex items-center justify-between bg-[#14100B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M11 15h2m-2-3h2m-2-3h2M4 19h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">New Sponsor Partnership</h3>
                  <p className="text-xs text-[#8A7964]">Register corporate sponsor into pipeline</p>
                </div>
              </div>
              <button 
                onClick={() => setIsNewModalOpen(false)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Sponsor Brand *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reliance Jio / Samsung India"
                  value={newDeal.sponsor}
                  onChange={(e) => setNewDeal({ ...newDeal, sponsor: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Campaign / Package Subtext *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Title Sponsor · Loop Premier League"
                  value={newDeal.subtext}
                  onChange={(e) => setNewDeal({ ...newDeal, subtext: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Package Tier
                  </label>
                  <select
                    value={newDeal.packageTier}
                    onChange={(e) => setNewDeal({ ...newDeal, packageTier: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="Contract">Contract</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Onboarded">Onboarded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Stage Valuation
                  </label>
                  <input
                    type="text"
                    placeholder="₹5 Cr"
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={newDeal.status}
                    onChange={(e) => setNewDeal({ ...newDeal, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="HOT">HOT</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="WARM">WARM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Renewal Year
                  </label>
                  <input
                    type="text"
                    placeholder="2027 / —"
                    value={newDeal.renewal}
                    onChange={(e) => setNewDeal({ ...newDeal, renewal: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Brand Alliances"
                    value={newDeal.contactPerson}
                    onChange={(e) => setNewDeal({ ...newDeal, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech, FMCG, Auto"
                    value={newDeal.category}
                    onChange={(e) => setNewDeal({ ...newDeal, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#211B13]">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-[#A89880] hover:text-white bg-[#15120D] border border-[#2E2417]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] tracking-wide shadow-md"
                >
                  Save Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DRAWER / MODAL: SPONSOR BRAND DEAL ROOM
      ═══════════════════════════════════════════════════════════════ */}
      {selectedDealForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3D290F] to-[#785419] flex items-center justify-center text-lg font-serif text-[#FBBF24] border border-[#926822]">
                  🤝
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-serif text-white">{selectedDealForDetail.sponsor}</h3>
                    {renderStatusBadge(selectedDealForDetail.status)}
                  </div>
                  <p className="text-xs text-[#8A7964] mt-0.5 font-mono">
                    {selectedDealForDetail.subtext} · Tier: {selectedDealForDetail.packageTier}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDealForDetail(null)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Deal Valuation</div>
                  <div className="text-lg font-serif text-[#FBBF24] mt-1">{selectedDealForDetail.stage}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Renewal Cycle</div>
                  <div className="text-base font-serif text-white mt-1">{selectedDealForDetail.renewal}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Brand Lift ROI</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-2">{selectedDealForDetail.roiMetric || '3.8x Lift'}</div>
                </div>
              </div>

              {/* Deliverables */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Contracted Sponsorship Deliverables
                </div>
                <div className="text-sm font-medium text-[#EDE7DE]">
                  {selectedDealForDetail.deliverables || 'Masthead Banners, 15s Non-Skippable Pre-rolls'}
                </div>
                <p className="text-xs text-[#8A7964] leading-relaxed">
                  {selectedDealForDetail.notes || 'Full category exclusivity granted for duration of broadcast.'}
                </p>
              </div>

              {/* Contact Liaison */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Brand Liaison &amp; Corporate Contact
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[#7A6B58] block">Corporate Liaison:</span>
                    <span className="text-[#EDE7DE]">{selectedDealForDetail.contactPerson || 'Brand Partnerships Lead'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Category:</span>
                    <span className="text-[#EDE7DE]">{selectedDealForDetail.category || 'Automotive / Fintech'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Direct Phone:</span>
                    <span className="text-[#EDE7DE]">{selectedDealForDetail.phone || '+91 98201 11223'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Corporate Email:</span>
                    <span className="text-[#EDE7DE]">{selectedDealForDetail.email || 'alliances@brand.com'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="px-6 py-4 border-t border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Dispatched milestone reconciliation invoice to ${selectedDealForDetail.sponsor}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#221808] border border-[#5E4215] text-[#FBBF24] hover:bg-[#332209]"
                >
                  Generate Invoice
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Scheduled quarterly ROI brand review meeting with ${selectedDealForDetail.contactPerson}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#14120D] border border-[#2D2316] text-[#C9BFB0] hover:text-white"
                >
                  Schedule Review
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDealForDetail(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#241E15] text-[#D8CFBF] hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: PLANNED CAPABILITY INSPECTOR
      ═══════════════════════════════════════════════════════════════ */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.95)] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  🤝
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white">{selectedCapability.label}</h3>
                  <div className="text-[11px] font-mono text-[#8A7964]">Sponsor CRM Microservice Engine</div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCapability(null)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <p className="text-[#C9BFB0] leading-relaxed">
                {selectedCapability.desc}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#070604] border border-[#211B13] rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-[#7A6B58]">Active Metric</div>
                  <div className="text-base font-serif text-[#FBBF24] mt-1">{selectedCapability.stat}</div>
                </div>
                <div className="p-3.5 bg-[#070604] border border-[#211B13] rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-[#7A6B58]">Service SLA</div>
                  <div className="text-base font-serif text-emerald-400 mt-1">{selectedCapability.sla}</div>
                </div>
              </div>

              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-2">
                <div className="text-xs font-mono uppercase text-[#B89255] tracking-wider">
                  Automated Pipeline
                </div>
                <div className="text-xs font-mono text-[#C9BFB0] leading-relaxed">
                  {selectedCapability.workflow}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#211B13] bg-[#14100B] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sponsor Service Online
              </span>

              <button
                onClick={() => {
                  showToast(`Dispatched test telemetry for ${selectedCapability.label}.`);
                  setSelectedCapability(null);
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] tracking-wide"
              >
                Run Validation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TOAST NOTIFICATION
      ═══════════════════════════════════════════════════════════════ */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16120B] border border-[#7E5C20] text-[#EDE7DE] px-4 py-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-slideUp font-sans text-xs">
          <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-ping" />
          <span>{notificationToast}</span>
        </div>
      )}

    </div>
  );
};

export default SponsorCrmDashboard;
