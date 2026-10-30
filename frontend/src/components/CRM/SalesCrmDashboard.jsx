import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 1 exactly
const INITIAL_SALES_DEALS = [
  {
    id: 1,
    deal: 'Reliance Jio bundle',
    owner: 'Sunny',
    dealValue: '₹15 Cr',
    dealAmount: 150000000,
    stakeholders: '2',
    stage: 'PROPOSAL',
    closeValue: '₹15 Cr',
    category: 'Telco OTT Bundling / Fiber Integration',
    clientCompany: 'Jio Platforms Limited',
    contactPerson: 'Kiran Thomas',
    email: 'kiran.thomas@ril.com',
    phone: '+91 98200 44550',
    targetCloseQuarter: 'Q4 2026',
    probability: '75%',
    notes: 'Annual master bundling for JioFiber and JioCinema complementary premium subscriber tier.'
  },
  {
    id: 2,
    deal: 'Vodafone IDEA bundle',
    owner: 'Ranjan',
    dealValue: '₹8 Cr',
    dealAmount: 80000000,
    stakeholders: '1',
    stage: 'NEGOTIATION',
    closeValue: '₹8 Cr',
    category: 'Postpaid Telco Add-On',
    clientCompany: 'Vodafone Idea Ltd',
    contactPerson: 'Akshaya Moondra',
    email: 'a.moondra@vodafoneidea.com',
    phone: '+91 98190 22119',
    targetCloseQuarter: 'Q1 2027',
    probability: '85%',
    notes: 'Vi Movies & TV app integration contract. Revenue-share terms undergoing final legal vetting.'
  },
  {
    id: 3,
    deal: 'Airtel Xstream',
    owner: 'Edwin',
    dealValue: '₹22 Cr',
    dealAmount: 220000000,
    stakeholders: '3',
    stage: 'DISCOVERY',
    closeValue: '₹22 Cr',
    category: 'DTH & Broadband Content Pack',
    clientCompany: 'Bharti Airtel Ltd',
    contactPerson: 'Gopal Vittal',
    email: 'gopal.vittal@airtel.com',
    phone: '+91 98100 66332',
    targetCloseQuarter: 'Q1 2027',
    probability: '50%',
    notes: 'Pan-India Airtel Xstream Premium bundle proposal for 10M broadband subscriber homes.'
  },
  {
    id: 4,
    deal: 'Tata Play Binge',
    owner: 'Priya',
    dealValue: '₹18 Cr',
    dealAmount: 180000000,
    stakeholders: '2',
    stage: 'CLOSED',
    closeValue: '₹18 Cr',
    category: 'Connected TV Smart Hub',
    clientCompany: 'Tata Play Limited',
    contactPerson: 'Harit Nagpal',
    email: 'harit.n@tataplay.com',
    phone: '+91 98201 33221',
    targetCloseQuarter: 'Q3 2026',
    probability: '100%',
    notes: 'Closed multi-year contract for default inclusion in Tata Play Binge Super Plan.'
  },
  {
    id: 5,
    deal: 'Amazon Prime Channels',
    owner: 'Akash',
    dealValue: '₹21 Cr',
    dealAmount: 210000000,
    stakeholders: '4',
    stage: 'PROPOSAL',
    closeValue: '₹21 Cr',
    category: 'OTT Channel Distribution',
    clientCompany: 'Amazon Seller Services Private Limited',
    contactPerson: 'Gaurav Gandhi',
    email: 'gandhig@amazon.com',
    phone: '+91 98110 99441',
    targetCloseQuarter: 'Q4 2026',
    probability: '70%',
    notes: 'Add-on channel subscription agreement pitched to Amazon Prime Video India.'
  }
];

// 9 Planned Capabilities matching Screenshot 2 exactly
const PLANNED_CAPABILITIES = [
  {
    id: 'lead-management',
    label: 'Lead Management',
    desc: 'Automated inbound inquiry capture, enterprise lead enrichment, qualification scoring, and executive account routing.',
    stat: '142 Active Leads',
    sla: 'Sub-minute Routing',
    workflow: 'Lead Capture → Company Enrichment → BANT Qualification → Account Executive Assignment'
  },
  {
    id: 'sponsor-sales',
    label: 'Sponsor Sales',
    desc: 'High-value sports and entertainment title sponsorships, broadcast bugs, co-branded integrations, and gala packages.',
    stat: '₹62 Cr ARR Contracted',
    sla: 'Custom Pitch Deck Generator',
    workflow: 'Inventory Audit → Valuation Engine → Bespoke Deck Formulation → Agency Negotiation'
  },
  {
    id: 'corporate-sales',
    label: 'Corporate Sales',
    desc: 'B2B enterprise corporate vouchers, employee wellness subscriptions, banking loyalty integrations, and credit card perks.',
    stat: '28 Fortune 500 Clients',
    sla: 'Bulk Voucher Delivery',
    workflow: 'RFP Submission → Bulk Tier Discounting → Enterprise Master Agreement → API Voucher Provisioning'
  },
  {
    id: 'movie-sales',
    label: 'Movie Sales',
    desc: 'Theatrical distribution advances, digital streaming premiere syndications, pay-per-view (TVOD), and airline rights.',
    stat: '34 Film Titles Pitched',
    sla: 'Global Window Pacing',
    workflow: 'Script Valuation → Territorial Rights Mapping → Minimum Guarantee (MG) Negotiation → Window Agreement'
  },
  {
    id: 'subscription-sales',
    label: 'Subscription Sales',
    desc: 'Direct-to-consumer annual subscriptions, promotional gift cards, festive sales bundles, and campus ambassador drives.',
    stat: '1.4M Direct Subs',
    sla: 'Instant Gateway Settlement',
    workflow: 'Pricing Experimentation → Checkout Optimization → Upsell Triggers → Churn Mitigation'
  },
  {
    id: 'partner-sales',
    label: 'Partner Sales',
    desc: 'Telecom carrier bundling, ISP broadband addons, smart TV OEM pre-installs, and payment wallet cashback distribution.',
    stat: '3 Strategic Telco Alliances',
    sla: 'Direct Billing API',
    workflow: 'Joint Business Plan → Technical API Handshake → Carrier Billing Ingest → Revenue Share Ledger'
  },
  {
    id: 'targets',
    label: 'Targets',
    desc: 'Rep quota pacing, territorial goals, monthly recurring revenue (MRR) milestones, and team performance heatmaps.',
    stat: '112% Quota Attainment',
    sla: 'Daily Telemetry Pacing',
    workflow: 'Annual Revenue Plan → Rep Territory Partitioning → Pacing Gauges → Mid-quarter Rebalance'
  },
  {
    id: 'commissions',
    label: 'Commissions',
    desc: 'Multi-tier sales commission ladders, accelerator thresholds, split-deal reconciliations, and payroll disbursement slips.',
    stat: '100% Audit Reconciled',
    sla: 'Automated Pay Slips',
    workflow: 'Cash Collection Event → Gross Margin Audit → Ladder Percentage Calculation → Payroll Credit'
  },
  {
    id: 'forecast',
    label: 'Forecast',
    desc: 'AI-assisted pipeline forecasting, weighted pipeline probability modeling, deal slippage alerts, and runway planning.',
    stat: '₹84 Cr Weighted Forecast',
    sla: 'Real-time AI Pacing',
    workflow: 'CRM Opportunity Stage → Historical Conversion Weights → Deal Velocity Monitor → Executive MIS'
  }
];

export const SalesCrmDashboard = () => {
  const [records, setRecords] = useState(INITIAL_SALES_DEALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('OPEN PIPELINE');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedDealForDetail, setSelectedDealForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Deal Form State
  const [newDeal, setNewDeal] = useState({
    deal: '',
    owner: 'Sunny',
    dealValue: '₹10 Cr',
    dealAmount: 100000000,
    stakeholders: '2',
    stage: 'PROPOSAL',
    closeValue: '₹10 Cr',
    category: 'Telco OTT Bundling',
    clientCompany: '',
    contactPerson: '',
    email: '',
    phone: '',
    targetCloseQuarter: 'Q1 2027',
    probability: '70%',
    notes: 'Strategic institutional bundling deal.'
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/sales/records')
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
        (item.deal && item.deal.toLowerCase().includes(q)) ||
        (item.owner && item.owner.toLowerCase().includes(q)) ||
        (item.clientCompany && item.clientCompany.toLowerCase().includes(q)) ||
        (item.stage && item.stage.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

      let matchesFilter = true;
      if (selectedStageFilter !== 'ALL') {
        matchesFilter = item.stage?.toUpperCase() === selectedStageFilter.toUpperCase();
      }

      return matchesSearch && matchesFilter;
    });
  }, [records, searchQuery, selectedStageFilter]);

  // Toast Helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3800);
  };

  // Create Deal Handler
  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDeal.deal.trim()) {
      showToast('Please enter Deal Title.');
      return;
    }

    const createdRecord = {
      ...newDeal,
      id: Date.now()
    };

    // Optimistic UI update
    setRecords(prev => [createdRecord, ...prev]);
    setIsNewModalOpen(false);
    showToast(`Deal "${createdRecord.deal}" added to pipeline!`);

    // Persist to Spring Boot backend
    fetch('http://localhost:8080/api/v1/crm/sales/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDeal)
    })
      .then(res => res.ok ? res.json() : null)
      .then(serverItem => {
        if (serverItem && serverItem.id) {
          setRecords(prev => prev.map(r => r.id === createdRecord.id ? serverItem : r));
        }
      })
      .catch(() => {});

    // Reset Form
    setNewDeal({
      deal: '',
      owner: 'Sunny',
      dealValue: '₹10 Cr',
      dealAmount: 100000000,
      stakeholders: '2',
      stage: 'PROPOSAL',
      closeValue: '₹10 Cr',
      category: 'Telco OTT Bundling',
      clientCompany: '',
      contactPerson: '',
      email: '',
      phone: '',
      targetCloseQuarter: 'Q1 2027',
      probability: '70%',
      notes: 'Strategic institutional bundling deal.'
    });
  };

  // Stage Transition in Drawer
  const handleUpdateStage = (id, newStage) => {
    setRecords(prev => prev.map(item => item.id === id ? { ...item, stage: newStage } : item));

    if (selectedDealForDetail && selectedDealForDetail.id === id) {
      setSelectedDealForDetail(prev => ({
        ...prev,
        stage: newStage
      }));
    }

    showToast(`Deal stage updated to ${newStage}`);

    fetch(`http://localhost:8080/api/v1/crm/sales/${id}/stage?stage=${newStage}`, {
      method: 'PUT'
    }).catch(() => {});
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Deal', 'Owner', 'Value', 'Stakeholders', 'Stage', 'Close Target', 'Company', 'Contact', 'Probability'];
    const rows = filteredRecords.map(r => [
      `"${r.deal || ''}"`,
      `"${r.owner || ''}"`,
      `"${r.dealValue || ''}"`,
      `"${r.stakeholders || ''}"`,
      `"${r.stage || ''}"`,
      `"${r.closeValue || ''}"`,
      `"${r.clientCompany || ''}"`,
      `"${r.contactPerson || ''}"`,
      `"${r.probability || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_Sales_CRM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported sales pipeline to CSV');
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

      {/* ── HEADER (MATCHING SCREENSHOT 1 EXACTLY) ───────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center gap-3.5">
          {/* Rounded squircle currency coin icon box */}
          <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center shadow-lg shadow-amber-950/20 flex-shrink-0">
            <svg className="w-6 h-6 text-[#FBBF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Gold Coin / Currency symbol matching screenshot */}
              <circle cx="12" cy="12" r="9" />
              <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
              <path d="M12 6v2m0 8v2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F4F5] tracking-tight">
              Sales CRM
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light">
          All revenue pipelines in one place.
        </p>
      </div>

      {/* ── 4 KPI STAT CARDS (MATCHING SCREENSHOT 1 VALUES & GLOW) ───────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
        {[
          {
            key: 'OPEN PIPELINE',
            label: 'OPEN PIPELINE',
            value: '₹84 Cr',
            subtext: 'Active weighted opportunities',
            accent: '#FBBF24'
          },
          {
            key: 'CLOSED THIS Q',
            label: 'CLOSED THIS Q',
            value: '₹22 Cr',
            subtext: 'Executed contracts to date',
            accent: '#FBBF24'
          },
          {
            key: 'WIN RATE',
            label: 'WIN RATE',
            value: '34%',
            subtext: '+4.2% vs trailing half',
            accent: '#FBBF24'
          },
          {
            key: 'AVG CYCLE',
            label: 'AVG CYCLE',
            value: '42 days',
            subtext: 'Lead qualification to signature',
            accent: '#FBBF24'
          }
        ].map((stat) => {
          const isSelected = activeKpi === stat.key;
          return (
            <div
              key={stat.key}
              onClick={() => {
                setActiveKpi(stat.key);
                if (stat.key === 'CLOSED THIS Q') setSelectedStageFilter('CLOSED');
                else setSelectedStageFilter('ALL');
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
              {/* Radiant corner accent */}
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
                selectedStageFilter !== 'ALL'
                  ? 'bg-[#1F170B] border-[#F59E0B] text-[#FBBF24]'
                  : 'bg-[#0E0B07] border-[#2A2012] hover:bg-[#1A140B] text-[#D4D4D8]'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>FILTER{selectedStageFilter !== 'ALL' ? `: ${selectedStageFilter}` : ''}</span>
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#110D08] border border-[#2E2314] shadow-2xl py-2 z-30 animate-fade-in text-xs font-medium">
                <div className="px-3 py-1 text-[10px] text-[#8A7964] font-mono uppercase tracking-wider">
                  Filter by Stage
                </div>
                {['ALL', 'PROPOSAL', 'NEGOTIATION', 'DISCOVERY', 'CLOSED'].map(stg => (
                  <button
                    key={stg}
                    onClick={() => {
                      setSelectedStageFilter(stg);
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 transition-colors flex items-center justify-between ${
                      selectedStageFilter === stg ? 'bg-[#221808] text-[#FBBF24]' : 'text-[#D4D4D8] hover:bg-[#1A140B]'
                    }`}
                  >
                    <span>{stg === 'ALL' ? 'All Deals' : stg}</span>
                    {selectedStageFilter === stg && <span className="text-[#FBBF24]">✓</span>}
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

      {/* ── SALES DEALS TABLE (MATCHING SCREENSHOT 1 HEADERS & COLUMNS) ───── */}
      <div className="rounded-xl border border-[#1F190F] bg-[#070503] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1E170F] bg-[#0A0805] text-[#8E7E68] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 font-semibold">DEAL</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">OWNER</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">VALUE</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">STAGE</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">CLOSE</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17120B]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#71717A] text-xs font-mono">
                    No sales deals match the search criteria. Click "+ NEW" to add a deal.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const isProposal = item.stage === 'PROPOSAL';
                  const isNegotiation = item.stage === 'NEGOTIATION';
                  const isDiscovery = item.stage === 'DISCOVERY';
                  const isClosed = item.stage === 'CLOSED';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#120D08]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedDealForDetail(item)}
                    >
                      {/* DEAL */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-semibold text-white group-hover:text-[#FBBF24] transition-colors text-xs sm:text-sm">
                          {item.deal}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#8A7964] font-medium mt-0.5">
                          {item.owner}
                        </div>
                      </td>

                      {/* OWNER column shows deal value in screenshot e.g. "₹15 Cr", "₹8 Cr" */}
                      <td className="py-4 px-4 sm:px-6 font-serif text-[#F4F4F5] text-xs sm:text-sm">
                        {item.dealValue}
                      </td>

                      {/* VALUE column shows count of stakeholders in screenshot e.g. "2", "1", "3" */}
                      <td className="py-4 px-4 sm:px-6 text-[#A1A1AA] text-xs sm:text-sm font-mono">
                        {item.stakeholders}
                      </td>

                      {/* STAGE (Badge e.g. PROPOSAL, NEGOTIATION, DISCOVERY) */}
                      <td className="py-4 px-4 sm:px-6">
                        {isProposal && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#052814] text-[#10B981] border border-[#065F46]">
                            PROPOSAL
                          </span>
                        )}
                        {isNegotiation && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#042823] text-[#2DD4BF] border border-[#0F766E]">
                            NEGOTIATION
                          </span>
                        )}
                        {isDiscovery && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#06241F] text-[#34D399] border border-[#047857]">
                            DISCOVERY
                          </span>
                        )}
                        {isClosed && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#221808] text-[#FBBF24] border border-[#44310E]">
                            CLOSED
                          </span>
                        )}
                        {!isProposal && !isNegotiation && !isDiscovery && !isClosed && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
                            {item.stage}
                          </span>
                        )}
                      </td>

                      {/* CLOSE column shows close value e.g. "₹15 Cr", "₹8 Cr", "₹22 Cr" */}
                      <td className="py-4 px-4 sm:px-6 font-serif text-[#F4F4F5] text-xs sm:text-sm">
                        {item.closeValue}
                      </td>

                      {/* OPEN ACTION */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDealForDetail(item);
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

      {/* ── PLANNED CAPABILITIES (9 CARDS MATCHING SCREENSHOT 2 EXACTLY) ─── */}
      <div className="space-y-3 pt-6 sm:pt-8 border-t border-[#1C160E]">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#8A7964] uppercase">
          PLANNED CAPABILITIES
        </div>

        {/* 3x3 Grid matching screenshot layout */}
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

      {/* ── SALES DEAL WAR ROOM DRAWER (OPENED VIA "Open") ────────────────── */}
      {selectedDealForDetail && (
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
                      {selectedDealForDetail.category || 'Revenue Deal'}
                    </span>
                    <span className="text-xs font-mono text-[#8A7964]">
                      ID #{selectedDealForDetail.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                    {selectedDealForDetail.deal}
                  </h2>
                  <p className="text-sm text-[#F59E0B] font-medium">
                    Owner: {selectedDealForDetail.owner} · Client: {selectedDealForDetail.clientCompany || 'Enterprise Account'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDealForDetail(null)}
                  className="w-8 h-8 rounded-lg bg-[#14100A] text-[#A1A1AA] hover:text-white hover:bg-[#201A10] flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Deal Stage Pipeline Bar */}
              <div className="p-4 rounded-xl bg-[#120E09] border border-[#2E2417] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#8A7964] font-mono uppercase">Current Deal Stage</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedDealForDetail.stage}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'DISCOVERY')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'DISCOVERY'
                        ? 'bg-[#06241F] text-[#34D399] border border-[#047857]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Discovery
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'PROPOSAL')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'PROPOSAL'
                        ? 'bg-[#052814] text-[#10B981] border border-[#065F46]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Proposal
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'NEGOTIATION')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'NEGOTIATION'
                        ? 'bg-[#042823] text-[#2DD4BF] border border-[#0F766E]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Negotiation
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'CLOSED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'CLOSED'
                        ? 'bg-[#221808] text-[#FBBF24] border border-[#44310E]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>

              {/* Deal Economics & Probability Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Pipeline Value</div>
                  <div className="text-lg font-serif font-bold text-[#FBBF24] mt-0.5">
                    {selectedDealForDetail.dealValue}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Target Close</div>
                  <div className="text-lg font-serif font-bold text-white mt-0.5">
                    {selectedDealForDetail.closeValue}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Decision Makers</div>
                  <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5">
                    {selectedDealForDetail.stakeholders || '2'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Win Probability</div>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                    {selectedDealForDetail.probability || '75%'}
                  </div>
                </div>
              </div>

              {/* Commercial Terms & Integration Architecture */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#8A7964] uppercase tracking-wider">
                  Contract Terms &amp; Distribution Scope
                </div>
                <div className="p-4 rounded-xl bg-[#0E0B07] border border-[#241C11] space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">💼</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Target Quarter Pacing</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">
                        Expected execution by {selectedDealForDetail.targetCloseQuarter || 'Q4 2026'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#1C160E]">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">🤝</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Commercial Model</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5">
                        Fixed Minimum Guarantee (MG) + Per-Subscriber Monthly Active User (MAU) Royalty
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#1C160E]">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">⚡</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Technical Provisioning</div>
                      <div className="text-xs text-emerald-400 mt-0.5">
                        OAuth 2.0 Single Sign-On + Direct Carrier Ingestion API Ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Contacts */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#8A7964] uppercase tracking-wider">
                  Client Stakeholder Details
                </div>
                <div className="p-4 rounded-xl bg-[#0E0B07] border border-[#241C11] space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Key Contact:</span>
                    <span className="text-white font-medium">{selectedDealForDetail.contactPerson || 'Enterprise Lead'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Phone:</span>
                    <span className="text-[#FBBF24] font-mono">{selectedDealForDetail.phone || '+91 98200 11223'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Email:</span>
                    <span className="text-[#A1A1AA] font-mono">{selectedDealForDetail.email || 'enterprise-sales@client.com'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8A7964]">Internal Deal Owner:</span>
                    <span className="text-white font-medium">{selectedDealForDetail.owner} (Senior AE)</span>
                  </div>
                </div>
              </div>

              {/* Deal Notes */}
              {selectedDealForDetail.notes && (
                <div className="p-3.5 rounded-lg bg-[#140F09] border border-[#2B1F11] text-xs text-[#A1A1AA] leading-relaxed">
                  <strong className="text-white block mb-1">Deal Intelligence &amp; Terms:</strong>
                  {selectedDealForDetail.notes}
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-[#221A11] flex items-center justify-between gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  showToast(`Contract Master Term Sheet generated for ${selectedDealForDetail.deal}`);
                }}
                className="px-4 py-2 rounded-lg bg-[#1C160E] hover:bg-[#2A2014] text-[#FBBF24] border border-[#44310E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>📄 Draft Master Agreement</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Pipeline forecast recalculated with updated probability weights`);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#14100A] hover:bg-[#201A10] text-white border border-[#2E2417] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Recalculate Weighted
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDealForDetail(null)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black text-xs font-bold hover:brightness-110 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE DEAL MODAL (TRIGGERED BY + NEW) ────────────────────────── */}
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
                    Add New Sales Deal
                  </h3>
                  <p className="text-xs text-[#8A7964]">
                    Create institutional pipeline opportunity, assign account owner &amp; target.
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

            <form onSubmit={handleCreateDeal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDeal.deal}
                    onChange={(e) => setNewDeal({ ...newDeal, deal: e.target.value })}
                    placeholder="e.g. Reliance Jio bundle"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Account Owner *
                  </label>
                  <select
                    value={newDeal.owner}
                    onChange={(e) => setNewDeal({ ...newDeal, owner: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="Sunny">Sunny</option>
                    <option value="Ranjan">Ranjan</option>
                    <option value="Edwin">Edwin</option>
                    <option value="Priya">Priya</option>
                    <option value="Akash">Akash</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Pipeline Value
                  </label>
                  <input
                    type="text"
                    value={newDeal.dealValue}
                    onChange={(e) => setNewDeal({ ...newDeal, dealValue: e.target.value, closeValue: e.target.value })}
                    placeholder="₹15 Cr"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none font-serif text-[#FBBF24]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Stakeholders
                  </label>
                  <input
                    type="text"
                    value={newDeal.stakeholders}
                    onChange={(e) => setNewDeal({ ...newDeal, stakeholders: e.target.value })}
                    placeholder="2"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Deal Stage
                  </label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="DISCOVERY">DISCOVERY</option>
                    <option value="PROPOSAL">PROPOSAL</option>
                    <option value="NEGOTIATION">NEGOTIATION</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Client Company
                  </label>
                  <input
                    type="text"
                    value={newDeal.clientCompany}
                    onChange={(e) => setNewDeal({ ...newDeal, clientCompany: e.target.value })}
                    placeholder="e.g. Jio Platforms Ltd"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={newDeal.category}
                    onChange={(e) => setNewDeal({ ...newDeal, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="Telco OTT Bundling">Telco OTT Bundling</option>
                    <option value="DTH & Broadband Content Pack">DTH & Broadband Content Pack</option>
                    <option value="Enterprise Corporate Vouchers">Enterprise Corporate Vouchers</option>
                    <option value="Movie Rights & Syndication">Movie Rights & Syndication</option>
                    <option value="OEM Smart TV Pre-install">OEM Smart TV Pre-install</option>
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
                    value={newDeal.contactPerson}
                    onChange={(e) => setNewDeal({ ...newDeal, contactPerson: e.target.value })}
                    placeholder="Vice President Partnerships"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Target Quarter
                  </label>
                  <select
                    value={newDeal.targetCloseQuarter}
                    onChange={(e) => setNewDeal({ ...newDeal, targetCloseQuarter: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="Q4 2026">Q4 2026</option>
                    <option value="Q1 2027">Q1 2027</option>
                    <option value="Q2 2027">Q2 2027</option>
                    <option value="Q3 2027">Q3 2027</option>
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
                  Add to Pipeline
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
                  Revenue Architecture
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
                Sales Pipeline &amp; Quota Delivery Engine:
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

export default SalesCrmDashboard;

