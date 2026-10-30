import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 2 exactly
const INITIAL_INVESTOR_DEALS = [
  {
    id: 1,
    investor: 'Blume Ventures',
    subtext: 'Seed',
    roundAllocation: '₹12 Cr',
    roundAmount: 120000000,
    commitment: '0',
    stage: 'CLOSED',
    status: '₹12 Cr',
    partnerName: 'Sajith Pai',
    partnerEmail: 'sajith@blume.vc',
    phone: '+91 98200 11990',
    equityPercentage: '10.5%',
    boardSeat: 'Yes - Primary Board Observer',
    antiDilution: 'Broad-based weighted average',
    notes: 'Lead investor in Seed round. SHA and SSA executed; equity shares allotted.'
  },
  {
    id: 2,
    investor: 'Peak XV',
    subtext: 'Series A',
    roundAllocation: '₹30 Cr',
    roundAmount: 300000000,
    commitment: '2',
    stage: 'TERM SHEET',
    status: '—',
    partnerName: 'Shailendra Singh',
    partnerEmail: 'ssingh@peakxv.com',
    phone: '+91 98110 44556',
    equityPercentage: '14.0%',
    boardSeat: 'Full Board Seat (Series A Director)',
    antiDilution: 'Standard institutional 1x non-participating preferred',
    notes: 'Term sheet issued; commercial and tech diligence phase 2 currently underway.'
  },
  {
    id: 3,
    investor: 'Tiger Global',
    subtext: 'Series A',
    roundAllocation: '₹50 Cr',
    roundAmount: 500000000,
    commitment: '1',
    stage: 'PITCH',
    status: '—',
    partnerName: 'Scott Shleifer',
    partnerEmail: 'investor-relations@tigerglobal.com',
    phone: '+1 212 984 8800',
    equityPercentage: '18.0%',
    boardSeat: 'Board Observer Rights',
    antiDilution: 'Full ratchet downside protection requested',
    notes: 'Introductory management presentation completed; partner meeting scheduled.'
  },
  {
    id: 4,
    investor: 'Mukesh Bansal',
    subtext: 'Angel',
    roundAllocation: '₹2 Cr',
    roundAmount: 20000000,
    commitment: '0',
    stage: 'CLOSED',
    status: '₹2 Cr',
    partnerName: 'Mukesh Bansal',
    partnerEmail: 'mukesh@curefit.com',
    phone: '+91 98800 77112',
    equityPercentage: '1.8%',
    boardSeat: 'Advisory Council Member',
    antiDilution: 'Pari passu with Founders',
    notes: 'Strategic angel backing; key advisor on product-market fit and subscriber retention.'
  },
  {
    id: 5,
    investor: 'Accel India',
    subtext: 'Series A',
    roundAllocation: '₹25 Cr',
    roundAmount: 250000000,
    commitment: '1',
    stage: 'DILIGENCE',
    status: '—',
    partnerName: 'Prashanth Prakash',
    partnerEmail: 'prashanth@accel.com',
    phone: '+91 98450 33221',
    equityPercentage: '12.5%',
    boardSeat: 'Board Observer',
    antiDilution: 'Weighted average anti-dilution',
    notes: 'Financial & IP audit docs shared in virtual data room (VDR).'
  },
  {
    id: 6,
    investor: 'Kalaari Capital',
    subtext: 'Pre-Series A',
    roundAllocation: '₹15 Cr',
    roundAmount: 150000000,
    commitment: '0',
    stage: 'CLOSED',
    status: '₹15 Cr',
    partnerName: 'Vani Kola',
    partnerEmail: 'vkola@kalaari.com',
    phone: '+91 98201 66778',
    equityPercentage: '9.2%',
    boardSeat: 'Board Observer',
    antiDilution: 'Standard institutional preference',
    notes: 'Follow-on rights exercised during bridge round.'
  }
];

// 9 Planned Capabilities matching Screenshot 1 exactly
const PLANNED_CAPABILITIES = [
  {
    id: 'investor-profile',
    label: 'Investor Profile',
    desc: 'Comprehensive LP dossiers, mandate thesis, check sizes, follow-on reserves, and partner investment histories.',
    stat: '48 Institutional LPs',
    sla: 'Real-time Dossiers',
    workflow: 'Partner Sourcing → LP Profiling → Check Size Validation → Co-investment Allocation'
  },
  {
    id: 'investment-tracking',
    label: 'Investment Tracking',
    desc: 'Real-time subscription pacing, tranche disbursements, escrow releases, and bank reconciliation.',
    stat: '₹40 Cr Secured ARR',
    sla: 'Direct Escrow Sync',
    workflow: 'Term Sheet Signature → Virtual Escrow Deposit → Condition Precedent Audit → Tranche Release'
  },
  {
    id: 'cap-table',
    label: 'Cap Table',
    desc: 'Fully audited equity ownership waterfall, ESOP pool modeling, convertible note round simulations, and fully diluted share registry.',
    stat: '22 Cap Table Shareholders',
    sla: 'Automated Waterfall Audit',
    workflow: 'Share Allotment Deed → Board Stamp Duty → ROC MCA Filing → Real-Time Cap Table Sync'
  },
  {
    id: 'dividends',
    label: 'Dividends',
    desc: 'Class A & B equity dividend distribution ledger, cumulative preference share interest calculations, and TDS withholding tax filing.',
    stat: '100% Tax Compliant',
    sla: 'Automated Withholding',
    workflow: 'Board Approval → Profit Allocation Rule → Shareholder Bank Settlement → TDS Certificate Dispatch'
  },
  {
    id: 'reports',
    label: 'Reports',
    desc: 'Quarterly investor updates, MIS dashboards, cohort retention curves, cash runway burnout analysis, and unit economics.',
    stat: '18 Month Runway Pacing',
    sla: 'Automated Monthly MIS',
    workflow: 'Telemetry Aggregation → P&L Financial Audit → Investor Deck Compiler → Secure VDR Link Dispatch'
  },
  {
    id: 'board-meetings',
    label: 'Board Meetings',
    desc: 'Board resolution circulars, AGM/EGM agenda tracking, voting quorum logs, and MCA Section 173 compliance minutes.',
    stat: '100% Statutory Quorum',
    sla: 'Digital Minute Signing',
    workflow: 'Agenda Notice → Virtual Room Conclave → Quorum Verification → Digital Minute Book Execution'
  },
  {
    id: 'documents',
    label: 'Documents',
    desc: 'Virtual Data Room (VDR) housing SHAs, SSAs, audited financials, trademark registries, and statutory filings.',
    stat: '256-bit Encrypted VDR',
    sla: 'Audit Logging Active',
    workflow: 'Legal Drafting → Investor Council Review → Aadhaar / DocuSign Seal → Immutable Archive'
  },
  {
    id: 'announcements',
    label: 'Announcements',
    desc: 'Press release syndication, strategic partnership broadcasts, milestone announcements, and confidential partner advisories.',
    stat: '14 Curated Releases',
    sla: 'Simultaneous Embargo Lift',
    workflow: 'PR Draft → Board & Investor Sign-off → Wire Service Feed → Social & Media Syndication'
  },
  {
    id: 'roi',
    label: 'ROI',
    desc: 'Internal rate of return (IRR), multiple on invested capital (MOIC), valuation uplift metrics, and exit scenario modeling.',
    stat: '4.8x MOIC Current Model',
    sla: 'Real-time IRR Engine',
    workflow: 'Financial Modeling → Market Multiple Benchmark → Discounted Cash Flow → LP Returns Report'
  }
];

export const InvestorCrmDashboard = () => {
  const [records, setRecords] = useState(INITIAL_INVESTOR_DEALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('CAP TABLE SIZE');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedDealForDetail, setSelectedDealForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Investor Form State
  const [newDeal, setNewDeal] = useState({
    investor: '',
    subtext: 'Series A',
    roundAllocation: '₹20 Cr',
    roundAmount: 200000000,
    commitment: '1',
    stage: 'TERM SHEET',
    status: '—',
    partnerName: '',
    partnerEmail: '',
    phone: '',
    equityPercentage: '10.0%',
    boardSeat: 'Board Observer',
    antiDilution: 'Broad-based weighted average',
    notes: 'Institutional venture capital partner diligence.'
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/investors/records')
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
        (item.investor && item.investor.toLowerCase().includes(q)) ||
        (item.subtext && item.subtext.toLowerCase().includes(q)) ||
        (item.stage && item.stage.toLowerCase().includes(q)) ||
        (item.partnerName && item.partnerName.toLowerCase().includes(q));

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

  // Create Investor / Deal Handler
  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDeal.investor.trim()) {
      showToast('Please enter Investor / Fund Name.');
      return;
    }

    const createdRecord = {
      ...newDeal,
      id: Date.now()
    };

    // Optimistic UI update
    setRecords(prev => [createdRecord, ...prev]);
    setIsNewModalOpen(false);
    showToast(`Investor "${createdRecord.investor}" added to CRM pipeline!`);

    // Persist to Spring Boot backend
    fetch('http://localhost:8080/api/v1/crm/investors/create', {
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
      investor: '',
      subtext: 'Series A',
      roundAllocation: '₹20 Cr',
      roundAmount: 200000000,
      commitment: '1',
      stage: 'TERM SHEET',
      status: '—',
      partnerName: '',
      partnerEmail: '',
      phone: '',
      equityPercentage: '10.0%',
      boardSeat: 'Board Observer',
      antiDilution: 'Broad-based weighted average',
      notes: 'Institutional venture capital partner diligence.'
    });
  };

  // Stage Transition in Drawer
  const handleUpdateStage = (id, newStage) => {
    setRecords(prev => prev.map(item => {
      if (item.id === id) {
        const updatedStatus = newStage === 'CLOSED' ? item.roundAllocation : item.status;
        return { ...item, stage: newStage, status: updatedStatus };
      }
      return item;
    }));

    if (selectedDealForDetail && selectedDealForDetail.id === id) {
      setSelectedDealForDetail(prev => ({
        ...prev,
        stage: newStage,
        status: newStage === 'CLOSED' ? prev.roundAllocation : prev.status
      }));
    }

    showToast(`Investor deal advanced to ${newStage}`);

    fetch(`http://localhost:8080/api/v1/crm/investors/${id}/stage?stage=${newStage}`, {
      method: 'PUT'
    }).catch(() => {});
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Investor', 'Round', 'Allocation', 'Commitment', 'Stage', 'Status', 'Partner', 'Equity', 'Board Seat'];
    const rows = filteredRecords.map(r => [
      `"${r.investor || ''}"`,
      `"${r.subtext || ''}"`,
      `"${r.roundAllocation || ''}"`,
      `"${r.commitment || ''}"`,
      `"${r.stage || ''}"`,
      `"${r.status || ''}"`,
      `"${r.partnerName || ''}"`,
      `"${r.equityPercentage || ''}"`,
      `"${r.boardSeat || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_Investor_CRM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported investor records to CSV');
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
          {/* Rounded squircle trending graph icon box */}
          <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center shadow-lg shadow-amber-950/20 flex-shrink-0">
            <svg className="w-6 h-6 text-[#FBBF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Trending Up Arrow / Stock Line matching screenshot */}
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F4F5] tracking-tight">
              Investor CRM
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light">
          Investor profiles, cap table, dividends, reports &amp; docs.
        </p>
      </div>

      {/* ── 4 KPI STAT CARDS (MATCHING SCREENSHOT 2 VALUES & GLOW) ───────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
        {[
          {
            key: 'CAP TABLE SIZE',
            label: 'CAP TABLE SIZE',
            value: '22',
            subtext: 'Active shareholders',
            accent: '#FBBF24'
          },
          {
            key: 'CAPITAL SECURED',
            label: 'CAPITAL SECURED',
            value: '₹40 Cr',
            subtext: 'Disbursed in equity escrow',
            accent: '#FBBF24'
          },
          {
            key: 'IN DILIGENCE',
            label: 'IN DILIGENCE',
            value: '₹18 Cr',
            subtext: 'Active VDR review pipeline',
            accent: '#FBBF24'
          },
          {
            key: 'TERM SHEETS OUT',
            label: 'TERM SHEETS OUT',
            value: '3',
            subtext: 'Pending partner IC sign-off',
            accent: '#FBBF24'
          }
        ].map((stat) => {
          const isSelected = activeKpi === stat.key;
          return (
            <div
              key={stat.key}
              onClick={() => {
                setActiveKpi(stat.key);
                if (stat.key === 'CAPITAL SECURED') setSelectedStageFilter('CLOSED');
                else if (stat.key === 'IN DILIGENCE') setSelectedStageFilter('DILIGENCE');
                else if (stat.key === 'TERM SHEETS OUT') setSelectedStageFilter('TERM SHEET');
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
                {['ALL', 'CLOSED', 'TERM SHEET', 'PITCH', 'DILIGENCE'].map(stg => (
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
                    <span>{stg === 'ALL' ? 'All Stages' : stg}</span>
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

      {/* ── INVESTORS TABLE (MATCHING SCREENSHOT 2 HEADERS & COLUMNS) ─────── */}
      <div className="rounded-xl border border-[#1F190F] bg-[#070503] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1E170F] bg-[#0A0805] text-[#8E7E68] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 font-semibold">INVESTOR</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">ROUND</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">COMMITMENT</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">STAGE</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">STATUS</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17120B]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#71717A] text-xs font-mono">
                    No investor records match the search criteria. Click "+ NEW" to add an investor.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const isClosed = item.stage === 'CLOSED';
                  const isTermSheet = item.stage === 'TERM SHEET';
                  const isPitch = item.stage === 'PITCH';
                  const isDiligence = item.stage === 'DILIGENCE';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#120D08]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedDealForDetail(item)}
                    >
                      {/* INVESTOR */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-semibold text-white group-hover:text-[#FBBF24] transition-colors text-xs sm:text-sm">
                          {item.investor}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#8A7964] font-medium mt-0.5">
                          {item.subtext}
                        </div>
                      </td>

                      {/* ROUND (Allocation e.g. "₹12 Cr", "₹30 Cr") */}
                      <td className="py-4 px-4 sm:px-6 font-serif text-[#F4F4F5] text-xs sm:text-sm">
                        {item.roundAllocation}
                      </td>

                      {/* COMMITMENT (Number e.g. "0", "2", "1") */}
                      <td className="py-4 px-4 sm:px-6 text-[#A1A1AA] text-xs sm:text-sm font-mono">
                        {item.commitment}
                      </td>

                      {/* STAGE (Badge e.g. CLOSED, TERM SHEET, PITCH) */}
                      <td className="py-4 px-4 sm:px-6">
                        {isClosed && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#052814] text-[#10B981] border border-[#065F46]">
                            CLOSED
                          </span>
                        )}
                        {isTermSheet && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#042823] text-[#2DD4BF] border border-[#0F766E]">
                            TERM SHEET
                          </span>
                        )}
                        {isPitch && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#082333] text-[#38BDF8] border border-[#0284C7]">
                            PITCH
                          </span>
                        )}
                        {isDiligence && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#2A1D07] text-[#F59E0B] border border-[#78350F]">
                            DILIGENCE
                          </span>
                        )}
                        {!isClosed && !isTermSheet && !isPitch && !isDiligence && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
                            {item.stage}
                          </span>
                        )}
                      </td>

                      {/* STATUS (Disbursed capital or dash e.g. "₹12 Cr", "—") */}
                      <td className="py-4 px-4 sm:px-6 font-serif text-[#F4F4F5] text-xs sm:text-sm">
                        {item.status}
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

      {/* ── PLANNED CAPABILITIES (9 CARDS MATCHING SCREENSHOT 1 EXACTLY) ─── */}
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

      {/* ── INVESTOR DEAL ROOM & CAP TABLE DRAWER (OPENED VIA "Open") ─────── */}
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
                      {selectedDealForDetail.subtext} Investor
                    </span>
                    <span className="text-xs font-mono text-[#8A7964]">
                      ID #{selectedDealForDetail.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                    {selectedDealForDetail.investor}
                  </h2>
                  <p className="text-sm text-[#F59E0B] font-medium">
                    Round Allocation: {selectedDealForDetail.roundAllocation}
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
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'PITCH')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'PITCH'
                        ? 'bg-[#082333] text-[#38BDF8] border border-[#0284C7]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Pitch
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'TERM SHEET')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'TERM SHEET'
                        ? 'bg-[#042823] text-[#2DD4BF] border border-[#0F766E]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Term Sheet
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'DILIGENCE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'DILIGENCE'
                        ? 'bg-[#2A1D07] text-[#F59E0B] border border-[#78350F]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Diligence
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedDealForDetail.id, 'CLOSED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDealForDetail.stage === 'CLOSED'
                        ? 'bg-[#052814] text-[#10B981] border border-[#065F46]'
                        : 'bg-[#15120D] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>

              {/* Cap Table & Valuation Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Round Size</div>
                  <div className="text-lg font-serif font-bold text-[#FBBF24] mt-0.5">
                    {selectedDealForDetail.roundAllocation}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Equity Allotment</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {selectedDealForDetail.equityPercentage || '10.5%'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Partner Votes</div>
                  <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5">
                    {selectedDealForDetail.commitment || '0'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0B07] border border-[#241C11]">
                  <div className="text-[10px] text-[#8A7964] font-mono uppercase">Capital Disbursed</div>
                  <div className="text-lg font-serif font-bold text-emerald-400 mt-0.5">
                    {selectedDealForDetail.status}
                  </div>
                </div>
              </div>

              {/* Governance & Term Sheet Legal Architecture */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#8A7964] uppercase tracking-wider">
                  Governance &amp; Rights Architecture
                </div>
                <div className="p-4 rounded-xl bg-[#0E0B07] border border-[#241C11] space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">🏛️</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Board Governance</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">
                        {selectedDealForDetail.boardSeat || 'Primary Board Observer / Advisory Seat'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#1C160E]">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">🛡️</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Anti-Dilution &amp; Liquidation Preference</div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5">
                        {selectedDealForDetail.antiDilution || 'Broad-based weighted average anti-dilution'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#1C160E]">
                    <span className="text-amber-500 font-bold text-sm mt-0.5">📁</span>
                    <div>
                      <div className="text-xs font-semibold text-white">VDR Virtual Data Room Status</div>
                      <div className="text-xs text-emerald-400 mt-0.5">
                        Audited Financials, Tech Stack Architecture &amp; Legal SHA Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner Contact & Investment Lead */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#8A7964] uppercase tracking-wider">
                  Fund Partner &amp; Lead Contact
                </div>
                <div className="p-4 rounded-xl bg-[#0E0B07] border border-[#241C11] space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Lead Partner:</span>
                    <span className="text-white font-medium">{selectedDealForDetail.partnerName || 'General Partner'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Direct Phone:</span>
                    <span className="text-[#FBBF24] font-mono">{selectedDealForDetail.phone || '+91 98200 00000'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A140B]">
                    <span className="text-[#8A7964]">Email:</span>
                    <span className="text-[#A1A1AA] font-mono">{selectedDealForDetail.partnerEmail || 'contact@fund.com'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8A7964]">Round Mandate:</span>
                    <span className="text-white font-medium">{selectedDealForDetail.subtext} 2026/2027</span>
                  </div>
                </div>
              </div>

              {/* Diligence & Deal Notes */}
              {selectedDealForDetail.notes && (
                <div className="p-3.5 rounded-lg bg-[#140F09] border border-[#2B1F11] text-xs text-[#A1A1AA] leading-relaxed">
                  <strong className="text-white block mb-1">Deal Summary &amp; Legal Notes:</strong>
                  {selectedDealForDetail.notes}
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-[#221A11] flex items-center justify-between gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  showToast(`VDR Virtual Data Room access pass generated for ${selectedDealForDetail.investor}`);
                }}
                className="px-4 py-2 rounded-lg bg-[#1C160E] hover:bg-[#2A2014] text-[#FBBF24] border border-[#44310E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>🔐 Issue VDR Pass</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Exported Cap Table SHA Draft for ${selectedDealForDetail.investor}`);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#14100A] hover:bg-[#201A10] text-white border border-[#2E2417] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Download SHA
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

      {/* ── CREATE INVESTOR / DEAL MODAL (TRIGGERED BY + NEW) ─────────────── */}
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
                    Add Investor to Cap Table
                  </h3>
                  <p className="text-xs text-[#8A7964]">
                    Record round allocation, diligence status &amp; lead partner contacts.
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
                    Investor / Fund Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDeal.investor}
                    onChange={(e) => setNewDeal({ ...newDeal, investor: e.target.value })}
                    placeholder="e.g. Peak XV"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Round Type *
                  </label>
                  <select
                    value={newDeal.subtext}
                    onChange={(e) => setNewDeal({ ...newDeal, subtext: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="Seed">Seed</option>
                    <option value="Pre-Series A">Pre-Series A</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Angel">Angel</option>
                    <option value="Strategic / Family Office">Strategic / Family Office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Allocation / Round Size
                  </label>
                  <input
                    type="text"
                    value={newDeal.roundAllocation}
                    onChange={(e) => setNewDeal({ ...newDeal, roundAllocation: e.target.value })}
                    placeholder="₹30 Cr"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none font-serif text-[#FBBF24]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Partner Votes
                  </label>
                  <input
                    type="text"
                    value={newDeal.commitment}
                    onChange={(e) => setNewDeal({ ...newDeal, commitment: e.target.value })}
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
                    onChange={(e) => {
                      const stg = e.target.value;
                      setNewDeal({
                        ...newDeal,
                        stage: stg,
                        status: stg === 'CLOSED' ? newDeal.roundAllocation : '—'
                      });
                    }}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="PITCH">PITCH</option>
                    <option value="TERM SHEET">TERM SHEET</option>
                    <option value="DILIGENCE">DILIGENCE</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Equity Allotment %
                  </label>
                  <input
                    type="text"
                    value={newDeal.equityPercentage}
                    onChange={(e) => setNewDeal({ ...newDeal, equityPercentage: e.target.value })}
                    placeholder="12.5%"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Board Seat Rights
                  </label>
                  <select
                    value={newDeal.boardSeat}
                    onChange={(e) => setNewDeal({ ...newDeal, boardSeat: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  >
                    <option value="Full Board Seat (Director)">Full Board Seat (Director)</option>
                    <option value="Board Observer">Board Observer</option>
                    <option value="Advisory Seat">Advisory Seat</option>
                    <option value="Information Rights Only">Information Rights Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Lead Partner Name
                  </label>
                  <input
                    type="text"
                    value={newDeal.partnerName}
                    onChange={(e) => setNewDeal({ ...newDeal, partnerName: e.target.value })}
                    placeholder="Managing Partner"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8A7964] uppercase block mb-1">
                    Partner Email
                  </label>
                  <input
                    type="email"
                    value={newDeal.partnerEmail}
                    onChange={(e) => setNewDeal({ ...newDeal, partnerEmail: e.target.value })}
                    placeholder="partner@fund.com"
                    className="w-full px-3 py-2 bg-[#14100A] border border-[#2E2417] rounded-lg text-xs text-white focus:border-[#F59E0B] outline-none"
                  />
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
                  Add to Cap Table
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
                  Investor Capability Architecture
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
                Governance &amp; Diligence Pipeline:
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

export default InvestorCrmDashboard;

