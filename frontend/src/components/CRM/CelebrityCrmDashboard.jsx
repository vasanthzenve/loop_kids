import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 2 exactly
const INITIAL_CELEBRITIES = [
  {
    id: 1,
    artist: 'Karthi',
    subtext: 'Loop Originals · Lead',
    lastProject: 'Suresh Rao',
    manager: '0',
    availability: 'AVAILABLE FEB',
    nextEvent: '₹25 L',
    phone: '+91 98401 55667',
    email: 'mgmt@karthiofficial.in',
    agency: 'Madras Talent Management',
    ndaStatus: 'Executed',
    activeEndorsements: 4,
    remuneration: '₹25 L / Appearance',
    upcomingAppearance: 'Loop Annual OTT Gala, Chennai',
    category: 'Film Lead / Originals',
    recentProjects: ['Kaithi 2', 'Ponniyin Selvan', 'Sardar'],
    notes: 'Lead actor in flagship Loop Original spy thriller series. Highly responsive management.'
  },
  {
    id: 2,
    artist: 'Trisha',
    subtext: 'Brand campaign',
    lastProject: 'Ravi K',
    manager: '1',
    availability: 'BOOKED',
    nextEvent: '—',
    phone: '+91 98410 77889',
    email: 'teamtrisha@southtalent.com',
    agency: 'South Star Representation',
    ndaStatus: 'Executed',
    activeEndorsements: 8,
    remuneration: '₹35 L / Day',
    upcomingAppearance: 'Brand Commercial Shoot, Hyderabad',
    category: 'Pan-India Brand Ambassador',
    recentProjects: ['Leo', 'Ponniyin Selvan 2', 'Vidaa Muyarchi'],
    notes: 'Brand ambassador for Loop Festivities Q4 campaign. Schedule fully locked until March.'
  },
  {
    id: 3,
    artist: 'Vijay Sethupathi',
    subtext: 'Loop Anthology S1',
    lastProject: 'Hari',
    manager: '2',
    availability: 'NEGOTIATING',
    nextEvent: '₹40 L',
    phone: '+91 98400 99881',
    email: 'hari@vspfilms.com',
    agency: 'Direct Management',
    ndaStatus: 'Under Review',
    activeEndorsements: 5,
    remuneration: '₹40 L / Day',
    upcomingAppearance: 'Anthology Round Table Keynote',
    category: 'Lead / Character Veteran',
    recentProjects: ['Maharaja', 'Merry Christmas', 'Vikram'],
    notes: 'Negotiating exclusive 3-episode multi-character role in anthology series.'
  },
  {
    id: 4,
    artist: 'Samantha',
    subtext: 'Awards host',
    lastProject: 'Lalitha',
    manager: '0',
    availability: 'CONFIRMED',
    nextEvent: '₹18 L',
    phone: '+91 98490 22334',
    email: 'lalitha@prtalents.in',
    agency: 'Pearl Talent Agency',
    ndaStatus: 'Executed',
    activeEndorsements: 6,
    remuneration: '₹18 L / Hosting Event',
    upcomingAppearance: 'Loop Streamer Choice Awards 2026',
    category: 'Anchor / Series Star',
    recentProjects: ['Citadel: Honey Bunny', 'Kushi', 'Yashoda'],
    notes: 'Confirmed host for Mainstage ceremonies. Script draft sent to management.'
  },
  {
    id: 5,
    artist: 'Fahadh Faasil',
    subtext: 'Loop Neo-Noir Thriller',
    lastProject: 'Pradeep M',
    manager: '1',
    availability: 'AVAILABLE MAR',
    nextEvent: '₹35 L',
    phone: '+91 98470 11223',
    email: 'pradeep@malayalamarts.com',
    agency: 'Cochin Artist Hub',
    ndaStatus: 'Executed',
    activeEndorsements: 2,
    remuneration: '₹35 L / Day',
    upcomingAppearance: 'Location Recce & Character Briefing',
    category: 'Film Lead',
    recentProjects: ['Aavesham', 'Pushpa 2', 'Kumbalangi Nights'],
    notes: 'Agreed in-principle for 20-day episodic shoot across Idukki & Kochi.'
  },
  {
    id: 6,
    artist: 'Dulquer Salmaan',
    subtext: 'Pan-India Web Series',
    lastProject: 'Geo Thomas',
    manager: '3',
    availability: 'BOOKED',
    nextEvent: '₹50 L',
    phone: '+91 98471 66778',
    email: 'geo@dqmgmt.in',
    agency: 'Wayfarer Talent Collective',
    ndaStatus: 'Executed',
    activeEndorsements: 7,
    remuneration: '₹50 L / Day',
    upcomingAppearance: 'Theatrical Trailer Launch',
    category: 'Pan-India Star',
    recentProjects: ['Lucky Baskhar', 'Guns & Gulaabs', 'Sita Ramam'],
    notes: 'Co-producer and lead talent. Digital rights contract successfully sealed.'
  }
];

// 10 Planned Capabilities matching Screenshot 1 exactly
const PLANNED_CAPABILITIES = [
  {
    id: 'artist-profiles',
    label: 'Artist Profiles',
    desc: '360° celebrity rosters, filmography catalogues, awards, media clippings, and primary representations.',
    stat: '42 Verified Stars',
    sla: 'Real-time sync',
    workflow: 'Identity Verification → Bio & IMDB Sync → Agency Binding → Portfolio Vault'
  },
  {
    id: 'managers',
    label: 'Managers',
    desc: 'Direct manager directory, representation mandates, agency commissions, and escalation hierarchy.',
    stat: '28 Talent Agencies',
    sla: '< 1 hr response',
    workflow: 'Rep Verification → Power of Attorney → Direct Hotlines → Deal Routing'
  },
  {
    id: 'contracts',
    label: 'Contracts',
    desc: 'Standardized talent agreements, mutual NDAs, exclusivity holdbacks, moral clauses, and digital signing.',
    stat: '100% Legally Sealed',
    sla: 'DigiSign instant',
    workflow: 'Draft Generation → Legal Review → DocuSign / Aadhaar e-Sign → Vault Archival'
  },
  {
    id: 'payments',
    label: 'Payments',
    desc: 'Milestone remuneration, advance holdbacks, per diem disbursements, and GST/TDS tax compliance.',
    stat: '₹14.8 Cr Disbursed',
    sla: 'Same-day NEFT/RTGS',
    workflow: 'Milestone Signoff → Invoice Clearance → Treasury Approval → Bank Settlement'
  },
  {
    id: 'appearance-schedule',
    label: 'Appearance Schedule',
    desc: 'Automated call-sheet dispatch, shooting block calendars, promotional travel itineraries, and pilot briefings.',
    stat: '16 Active Shoots',
    sla: 'Live Sync Calendar',
    workflow: 'Call Sheet Creation → WhatsApp Alert → Artist App Confirmation → Chauffeur Dispatch'
  },
  {
    id: 'events',
    label: 'Events',
    desc: 'Red carpet premieres, trailer launches, live streaming ceremonies, and fan meet-and-greets management.',
    stat: '8 Upcoming Events',
    sla: 'Zero-delay protocol',
    workflow: 'Venue Booking → Security Protocol → VIP Green Room → Stage Cue Teleprompter'
  },
  {
    id: 'media-requests',
    label: 'Media Requests',
    desc: 'PR junket requests, press interview screening, embargo tracking, and brand quote approvals.',
    stat: '34 Requests/Wk',
    sla: '< 2 hr turnaround',
    workflow: 'Press Pitch → PR Triage → Manager Approval → Embargo Release'
  },
  {
    id: 'brand-endorsements',
    label: 'Brand Endorsements',
    desc: 'OTT festive brand integrations, sponsor spot coordination, social media shoutouts, and CPM tracking.',
    stat: '11 Live Deals',
    sla: 'Full exclusivity',
    workflow: 'Brand Brief → Artist Compatibility → Commercial Terms → Creative Signoff'
  },
  {
    id: 'digital-rights',
    label: 'Digital Rights',
    desc: 'Perpetual & term image rights, voice cloning protection, AI likeness governance, and merchandise IP.',
    stat: 'AI-Guard Protected',
    sla: 'Watermarked & Hash-Bound',
    workflow: 'Face Hash Stamp → Rights Window Log → Takedown Bot Sentinel → Royalty Credit'
  },
  {
    id: 'availability',
    label: 'Availability',
    desc: 'Global talent calendar heatmap, tentative blocks, first right of refusal, and instant availability alerts.',
    stat: '98.5% Accuracy',
    sla: 'Instant Cal Sync',
    workflow: 'Calendar Feed Integration → Conflict Detector → Tentative Hold → Lock-in Confirmation'
  }
];

export const CelebrityCrmDashboard = () => {
  const [records, setRecords] = useState(INITIAL_CELEBRITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('SIGNED ARTISTS');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedArtistForDetail, setSelectedArtistForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Artist Form State
  const [newArtist, setNewArtist] = useState({
    artist: '',
    subtext: 'Loop Originals · Lead',
    lastProject: 'Suresh Rao',
    manager: '0',
    availability: 'AVAILABLE FEB',
    nextEvent: '₹25 L',
    phone: '',
    email: '',
    agency: 'Direct Management',
    remuneration: '₹25 L'
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/celebrities/records')
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
        (item.artist && item.artist.toLowerCase().includes(q)) ||
        (item.subtext && item.subtext.toLowerCase().includes(q)) ||
        (item.lastProject && item.lastProject.toLowerCase().includes(q)) ||
        (item.availability && item.availability.toLowerCase().includes(q));

      let matchesFilter = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesFilter = item.availability && item.availability.toUpperCase().includes(selectedStatusFilter.toUpperCase());
      } else if (activeKpi === 'SIGNED ARTISTS') {
        matchesFilter = true;
      } else if (activeKpi === 'PENDING NDAS') {
        matchesFilter = item.availability === 'NEGOTIATING' || item.ndaStatus === 'Under Review';
      } else if (activeKpi === 'LIVE ENDORSEMENTS') {
        matchesFilter = item.availability === 'CONFIRMED' || item.availability === 'BOOKED';
      }

      return matchesSearch && matchesFilter;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Toast Helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Handle Create New Artist
  const handleCreateArtist = (e) => {
    e.preventDefault();
    if (!newArtist.artist.trim()) return;

    const newEntry = {
      id: Date.now(),
      artist: newArtist.artist.trim(),
      subtext: newArtist.subtext || 'Loop Originals · Lead',
      lastProject: newArtist.lastProject || 'Suresh Rao',
      manager: newArtist.manager || '0',
      availability: newArtist.availability || 'AVAILABLE FEB',
      nextEvent: newArtist.nextEvent || '₹25 L',
      phone: newArtist.phone || '+91 98000 12345',
      email: newArtist.email || `${newArtist.artist.toLowerCase().replace(/\s+/g, '')}@talent.in`,
      agency: newArtist.agency || 'Madras Talent Management',
      ndaStatus: 'Executed',
      activeEndorsements: 3,
      remuneration: newArtist.remuneration || '₹25 L / Event',
      upcomingAppearance: 'Upcoming Loop Feature Briefing',
      category: 'Star Talent',
      notes: 'Added from Celebrity CRM dashboard.'
    };

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewArtist({
      artist: '',
      subtext: 'Loop Originals · Lead',
      lastProject: 'Suresh Rao',
      manager: '0',
      availability: 'AVAILABLE FEB',
      nextEvent: '₹25 L',
      phone: '',
      email: '',
      agency: 'Direct Management',
      remuneration: '₹25 L'
    });

    // POST to backend
    fetch('http://localhost:8080/api/v1/crm/celebrities/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    showToast(`Added celebrity "${newEntry.artist}" to CRM!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Artist', 'Project / Role', 'Manager / Contact', 'Pending Deals', 'Availability', 'Fee / Next Event'];
    const rows = filteredRecords.map(r => [
      r.id,
      `"${r.artist}"`,
      `"${r.subtext}"`,
      `"${r.lastProject}"`,
      r.manager,
      `"${r.availability}"`,
      `"${r.nextEvent}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_Celebrity_CRM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported celebrity records as CSV.');
  };

  // Render Availability Badge
  const renderAvailabilityBadge = (status) => {
    const s = (status || '').toUpperCase();
    if (s.includes('AVAILABLE')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062E1E] text-[#34D399] border border-[#065F46]">
          {status}
        </span>
      );
    }
    if (s.includes('BOOKED')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0C1B2E] text-[#60A5FA] border border-[#1E40AF]">
          BOOKED
        </span>
      );
    }
    if (s.includes('NEGOTIATING')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0B2520] text-[#2DD4BF] border border-[#115E59]">
          NEGOTIATING
        </span>
      );
    }
    if (s.includes('CONFIRMED')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062E1E] text-[#34D399] border border-[#065F46]">
          CONFIRMED
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
          {/* Main Title Row with Golden 5-Point Star Icon */}
          <div className="flex items-center gap-4">
            {/* Star Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {/* 5-Point Star SVG in Golden Amber */}
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Celebrity CRM
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Artists, managers, contracts, endorsements &amp; schedules.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. SIGNED ARTISTS */}
          <div 
            onClick={() => setActiveKpi('SIGNED ARTISTS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'SIGNED ARTISTS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              SIGNED ARTISTS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              42
            </div>
          </div>

          {/* 2. PENDING NDAS */}
          <div 
            onClick={() => setActiveKpi('PENDING NDAS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'PENDING NDAS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              PENDING NDAS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              6
            </div>
          </div>

          {/* 3. LIVE ENDORSEMENTS */}
          <div 
            onClick={() => setActiveKpi('LIVE ENDORSEMENTS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'LIVE ENDORSEMENTS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              LIVE ENDORSEMENTS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              11
            </div>
          </div>

          {/* 4. AVG FEE */}
          <div 
            onClick={() => setActiveKpi('AVG FEE')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'AVG FEE'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              AVG FEE
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              ₹4.2 L
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
                    Availability Filter
                  </div>
                  {['ALL', 'AVAILABLE', 'BOOKED', 'NEGOTIATING', 'CONFIRMED'].map((status) => (
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
                      <span>{status === 'ALL' ? 'All Statuses' : status}</span>
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
            MAIN CELEBRITY ARTISTS TABLE (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0B0907] border border-[#211B13] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A140D] text-[11px] font-mono uppercase tracking-[0.16em] text-[#7E6E59]">
                  <th className="py-4 px-6 font-medium">ARTIST</th>
                  <th className="py-4 px-6 font-medium">LAST PROJECT</th>
                  <th className="py-4 px-6 font-medium">MANAGER</th>
                  <th className="py-4 px-6 font-medium">AVAILABILITY</th>
                  <th className="py-4 px-6 font-medium">NEXT EVENT</th>
                  <th className="py-4 px-6 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16120D] text-sm">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7E6E59] font-mono text-xs">
                      No celebrity records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-[#120F0B]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedArtistForDetail(item)}
                    >
                      {/* 1. ARTIST Column: Bold Title + Subtext */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#EDE7DE] text-base group-hover:text-white transition-colors">
                          {item.artist}
                        </div>
                        <div className="text-xs text-[#7A6B58] mt-0.5 font-normal">
                          {item.subtext}
                        </div>
                      </td>

                      {/* 2. LAST PROJECT Column */}
                      <td className="py-4 px-6 text-[#C9BFB0] text-sm font-normal">
                        {item.lastProject}
                      </td>

                      {/* 3. MANAGER Column (Number count / index from screenshot) */}
                      <td className="py-4 px-6 text-[#EDE7DE] text-sm font-mono">
                        {item.manager}
                      </td>

                      {/* 4. AVAILABILITY Column */}
                      <td className="py-4 px-6">
                        {renderAvailabilityBadge(item.availability)}
                      </td>

                      {/* 5. NEXT EVENT Column (Fee / next event) */}
                      <td className="py-4 px-6 font-serif text-[#EDE7DE] text-base">
                        {item.nextEvent}
                      </td>

                      {/* 6. Action: Open */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArtistForDetail(item);
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

          {/* 10 Capability Boxes in 3-Column Grid matching Screenshot 1 */}
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
          MODAL: + NEW CELEBRITY ARTIST
      ═══════════════════════════════════════════════════════════════ */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#211B13] flex items-center justify-between bg-[#14100B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Add Celebrity Artist</h3>
                  <p className="text-xs text-[#8A7964]">Register actor, director, or talent into CRM</p>
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

            <form onSubmit={handleCreateArtist} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Artist Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sivakarthikeyan"
                  value={newArtist.artist}
                  onChange={(e) => setNewArtist({ ...newArtist, artist: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Role / Alignment Subtext
                </label>
                <input
                  type="text"
                  placeholder="e.g. Loop Originals · Lead / Brand Campaign"
                  value={newArtist.subtext}
                  onChange={(e) => setNewArtist({ ...newArtist, subtext: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Manager / Point of Contact
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Suresh Rao"
                    value={newArtist.lastProject}
                    onChange={(e) => setNewArtist({ ...newArtist, lastProject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Pending Deals (Index)
                  </label>
                  <input
                    type="text"
                    placeholder="0"
                    value={newArtist.manager}
                    onChange={(e) => setNewArtist({ ...newArtist, manager: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Availability Status
                  </label>
                  <select
                    value={newArtist.availability}
                    onChange={(e) => setNewArtist({ ...newArtist, availability: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="AVAILABLE FEB">AVAILABLE FEB</option>
                    <option value="AVAILABLE MAR">AVAILABLE MAR</option>
                    <option value="BOOKED">BOOKED</option>
                    <option value="NEGOTIATING">NEGOTIATING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Next Event / Fee
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25 L"
                    value={newArtist.nextEvent}
                    onChange={(e) => setNewArtist({ ...newArtist, nextEvent: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98..."
                    value={newArtist.phone}
                    onChange={(e) => setNewArtist({ ...newArtist, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Representation Agency
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. South Star Agency"
                    value={newArtist.agency}
                    onChange={(e) => setNewArtist({ ...newArtist, agency: e.target.value })}
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
                  Save Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DRAWER / MODAL: CELEBRITY TALENT DOSSIER
      ═══════════════════════════════════════════════════════════════ */}
      {selectedArtistForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3D290F] to-[#785419] flex items-center justify-center text-lg font-serif text-[#FBBF24] border border-[#926822]">
                  ★
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-serif text-white">{selectedArtistForDetail.artist}</h3>
                    {renderAvailabilityBadge(selectedArtistForDetail.availability)}
                  </div>
                  <p className="text-xs text-[#8A7964] mt-0.5 font-mono">
                    {selectedArtistForDetail.subtext} · Rep: {selectedArtistForDetail.lastProject}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedArtistForDetail(null)}
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
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Appearance Fee</div>
                  <div className="text-lg font-serif text-[#FBBF24] mt-1">{selectedArtistForDetail.nextEvent}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Live Endorsements</div>
                  <div className="text-lg font-serif text-white mt-1">{selectedArtistForDetail.activeEndorsements || 4} Deals</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">NDA Status</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-2">{selectedArtistForDetail.ndaStatus || 'Executed'}</div>
                </div>
              </div>

              {/* Representation Details */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Representation &amp; Direct Hotline
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[#7A6B58] block">Primary Manager:</span>
                    <span className="text-[#EDE7DE]">{selectedArtistForDetail.lastProject}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Agency Firm:</span>
                    <span className="text-[#EDE7DE]">{selectedArtistForDetail.agency || 'Madras Talent Management'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Direct Phone:</span>
                    <span className="text-[#EDE7DE]">{selectedArtistForDetail.phone || '+91 98401 55667'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Corporate Email:</span>
                    <span className="text-[#EDE7DE]">{selectedArtistForDetail.email || 'team@talent.in'}</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Appearance & Filmography */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Upcoming Call &amp; Event
                </div>
                <div className="text-sm font-medium text-[#EDE7DE]">
                  {selectedArtistForDetail.upcomingAppearance || 'Loop Annual OTT Gala Ceremony'}
                </div>
                <p className="text-xs text-[#8A7964] leading-relaxed">
                  {selectedArtistForDetail.notes || 'Full contractual clearance granted for digital promotional broadcast.'}
                </p>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="px-6 py-4 border-t border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Dispatched event appearance agreement to ${selectedArtistForDetail.lastProject}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#221808] border border-[#5E4215] text-[#FBBF24] hover:bg-[#332209]"
                >
                  Book Event
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Generated mutual digital rights NDA for ${selectedArtistForDetail.artist}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#14120D] border border-[#2D2316] text-[#C9BFB0] hover:text-white"
                >
                  Issue NDA
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedArtistForDetail(null)}
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
                  ★
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white">{selectedCapability.label}</h3>
                  <div className="text-[11px] font-mono text-[#8A7964]">Celebrity CRM Subsystem</div>
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
                  <div className="text-[10px] font-mono uppercase text-[#7A6B58]">Response SLA</div>
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
                Talent Service Online
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

export default CelebrityCrmDashboard;

