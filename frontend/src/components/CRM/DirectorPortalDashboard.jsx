import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 2 exactly
const INITIAL_DIRECTOR_PROJECTS = [
  {
    id: 1,
    director: 'Mani Ratnam',
    subtext: 'Untitled L1',
    film: 'Pre-production',
    stage: '₹40 Cr',
    status: 'LOCKED',
    window: 'Q3 2026',
    genre: 'Period Romance / Historical Drama',
    productionHouse: 'Madras Talkies',
    synopsis: 'An evocative multi-generational narrative examining maritime silk route heritage through coastal Tamil Nadu.',
    distributionScope: 'Pan-India Theatrical + Direct SVOD Worldwide Exclusive',
    approvalStatus: 'Final Budget Approved by Greenlight Committee',
    phone: '+91 98400 12345',
    email: 'office@madrastalkies.com',
    writer: 'Jeyamohan & Mani Ratnam',
    musicDirector: 'A. R. Rahman',
    cinematography: 'Ravi Varman',
    shootDays: '85 Days',
    locations: 'Karaikudi, Pondicherry, Sri Lanka'
  },
  {
    id: 2,
    director: 'Lokesh Kanagaraj',
    subtext: 'Loop Action S2',
    film: 'Post',
    stage: '₹65 Cr',
    status: 'LOCKED',
    window: 'Q4 2026',
    genre: 'High-Octane Action Thriller',
    productionHouse: 'G Squad / Seven Screen Studio',
    synopsis: 'A relentless underworld vigilante operation uncovering contraband networks spanning coastal transport corridors.',
    distributionScope: 'Exclusive OTT Premiere + 4K Dolby Atmos Master',
    approvalStatus: 'Rough Cut Review Completed with 98% Score',
    phone: '+91 98410 99881',
    email: 'loki@gsquadfilms.in',
    writer: 'Lokesh Kanagaraj',
    musicDirector: 'Anirudh Ravichander',
    cinematography: 'Girish Gangadharan',
    shootDays: '110 Days',
    locations: 'Chennai, Mumbai, Georgia'
  },
  {
    id: 3,
    director: 'Karan Johar',
    subtext: 'Pan-India romance',
    film: 'Pitch',
    stage: '₹80 Cr',
    status: 'REVIEWING',
    window: 'TBD',
    genre: 'Contemporary Family Romance',
    productionHouse: 'Dharma Productions',
    synopsis: 'A lavish cross-cultural wedding drama set across Rajasthan, London, and Mumbai exploring generational values.',
    distributionScope: 'Co-Financing SVOD Post-Theatrical 8-Week Window',
    approvalStatus: 'Pitch Deck under Financial Due Diligence',
    phone: '+91 98200 44556',
    email: 'syndication@dharma-det.com',
    writer: 'Sumit Roy & Shashank Khaitan',
    musicDirector: 'Pritam',
    cinematography: 'Manush Nandan',
    shootDays: '75 Days',
    locations: 'Udaipur, London, Mumbai'
  },
  {
    id: 4,
    director: 'Anurag Kashyap',
    subtext: 'Thriller anthology',
    film: 'Greenlit',
    stage: '₹22 Cr',
    status: 'LOCKED',
    window: 'Q1 2027',
    genre: 'Neo-Noir Crime Anthology',
    productionHouse: 'Good Bad Films',
    synopsis: 'A gritty four-chapter anthology dissecting unrecorded urban folklore, vigilante detectives, and dark cybercrime.',
    distributionScope: 'Worldwide Direct-to-Digital SVOD Originals',
    approvalStatus: 'Greenlit with Creative Autonomy Deed Sealed',
    phone: '+91 98211 33445',
    email: 'anurag@goodbadfilms.in',
    writer: 'Anurag Kashyap & Varun Grover',
    musicDirector: 'Amit Trivedi',
    cinematography: 'Sylvester Fonseca',
    shootDays: '45 Days',
    locations: 'Mumbai, Varanasi, Kolkata'
  },
  {
    id: 5,
    director: 'S. S. Rajamouli',
    subtext: 'Globe-Trotting Action Adventure',
    film: 'Pre-production',
    stage: '₹120 Cr',
    status: 'LOCKED',
    window: 'Q2 2027',
    genre: 'Mythological Action Adventure',
    productionHouse: 'Sri Durga Arts',
    synopsis: 'An African jungle expedition intertwining ancient Vedic lore with grand cinematic set-pieces.',
    distributionScope: 'Global Multi-Language SVOD 8-Week Window',
    approvalStatus: 'VFX Pre-visualization Approved',
    phone: '+91 98480 88990',
    email: 'ssrajamouli@durgaarts.in',
    writer: 'V. Vijayendra Prasad',
    musicDirector: 'M. M. Keeravani',
    cinematography: 'K. K. Senthil Kumar',
    shootDays: '160 Days',
    locations: 'Kenya, South Africa, Ramoji Film City'
  },
  {
    id: 6,
    director: 'Prashanth Neel',
    subtext: 'High-Octane Crime Saga',
    film: 'Post',
    stage: '₹90 Cr',
    status: 'LOCKED',
    window: 'Q1 2027',
    genre: 'Industrial Crime Epic',
    productionHouse: 'Hombale Films',
    synopsis: 'The dramatic power struggle for mineral cartels across borders with dark monolithic cinematography.',
    distributionScope: 'SVOD Exclusive Post-Theatrical',
    approvalStatus: 'DI Color Grading & Sound Mix in Progress',
    phone: '+91 98450 77665',
    email: 'neel@hombalefilms.in',
    writer: 'Prashanth Neel',
    musicDirector: 'Ravi Basrur',
    cinematography: 'Bhuvan Gowda',
    shootDays: '130 Days',
    locations: 'Hyderabad, Italy, Goa'
  }
];

// 6 Planned Capabilities matching Screenshot 1 & 3 exactly (3x2 grid)
const PLANNED_CAPABILITIES = [
  {
    id: 'movie-pipeline',
    label: 'Movie Pipeline',
    desc: 'Direct-to-OTT & theatrical acquisition slate tracking, script loglines, and stage gating from pitch to premiere.',
    stat: '58 Active Films',
    sla: 'Real-time pipeline',
    workflow: 'Pitch Submission → Story Dept Review → Financial Feasibility → Greenlight Board'
  },
  {
    id: 'upcoming-projects',
    label: 'Upcoming Projects',
    desc: 'Tentpole release calendars, pre-production prep logs, principal photography tracking, and shoot days telemetry.',
    stat: '12 Slates in Prep',
    sla: 'Weekly Milestone Sync',
    workflow: 'Location Recce → Cast Finalization → Call Sheet Automation → Dailies Review'
  },
  {
    id: 'meetings',
    label: 'Meetings',
    desc: 'Pitch sessions, writer room meetings, rough cut screenings, and executive creative feedback logs.',
    stat: '24 Scheduled / Wk',
    sla: '< 24 hr confirmation',
    workflow: 'Calendar Booking → Script Sync → Virtual Screening Room → Executive Notes'
  },
  {
    id: 'contracts',
    label: 'Contracts',
    desc: 'Director agreements, royalty clauses, creative control deeds, final cut privileges, and co-production SLAs.',
    stat: '100% Sealed & Vaulted',
    sla: 'Instant DigiSign',
    workflow: 'Term Sheet → Legal Due Diligence → Direct Contract Binding → Bank Guarantee'
  },
  {
    id: 'approvals',
    label: 'Approvals',
    desc: 'Budget signoffs, tranche disbursals, key art approvals, teaser release cuts, and censor dossier submissions.',
    stat: '7 Pending Approvals',
    sla: '< 12 hr SLA',
    workflow: 'Asset Submission → Automated QC → Department Signoff → Final Greenlit Lock'
  },
  {
    id: 'distribution',
    label: 'Distribution',
    desc: 'Global release windows, TVOD/SVOD stagger, multi-territory holdbacks, airline licensing, and linear rights.',
    stat: '42 Territories',
    sla: 'Global CDN Sync',
    workflow: 'Window Definition → Geo-fence Configuration → Ingest to OTT CMS → DRM Keys Release'
  }
];

export const DirectorPortalDashboard = () => {
  const [records, setRecords] = useState(INITIAL_DIRECTOR_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('ACTIVE FILMMAKERS');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    director: '',
    subtext: 'Untitled Feature',
    film: 'Pre-production',
    stage: '₹40 Cr',
    status: 'LOCKED',
    window: 'Q3 2026',
    genre: 'Drama / Thriller',
    productionHouse: 'Loop Studios'
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/directors/records')
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
        (item.director && item.director.toLowerCase().includes(q)) ||
        (item.subtext && item.subtext.toLowerCase().includes(q)) ||
        (item.film && item.film.toLowerCase().includes(q)) ||
        (item.status && item.status.toLowerCase().includes(q)) ||
        (item.window && item.window.toLowerCase().includes(q));

      let matchesFilter = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesFilter = 
          (item.status && item.status.toUpperCase() === selectedStatusFilter.toUpperCase()) ||
          (item.film && item.film.toUpperCase() === selectedStatusFilter.toUpperCase());
      } else if (activeKpi === 'ACTIVE FILMMAKERS') {
        matchesFilter = true;
      } else if (activeKpi === 'GREENLIT FILMS') {
        matchesFilter = item.film === 'Greenlit' || item.status === 'LOCKED';
      } else if (activeKpi === 'IN POST') {
        matchesFilter = item.film === 'Post';
      } else if (activeKpi === 'PITCHING') {
        matchesFilter = item.film === 'Pitch' || item.status === 'REVIEWING';
      }

      return matchesSearch && matchesFilter;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Toast Helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Handle Create New Project
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.director.trim()) return;

    const newEntry = {
      id: Date.now(),
      director: newProject.director.trim(),
      subtext: newProject.subtext || 'Untitled Feature',
      film: newProject.film || 'Pre-production',
      stage: newProject.stage ? (newProject.stage.startsWith('₹') ? newProject.stage : `₹${newProject.stage}`) : '₹35 Cr',
      status: newProject.status || 'LOCKED',
      window: newProject.window || 'Q3 2026',
      genre: newProject.genre || 'Action Thriller',
      productionHouse: newProject.productionHouse || 'Loop Studios',
      synopsis: 'Pitch registered into Director Portal pipeline.',
      distributionScope: 'Pan-India Theatrical + Global SVOD Exclusive',
      approvalStatus: 'Approved by Acquisitions Board',
      phone: '+91 98000 12345',
      email: `${newProject.director.toLowerCase().replace(/\s+/g, '')}@cinema.in`
    };

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewProject({
      director: '',
      subtext: 'Untitled Feature',
      film: 'Pre-production',
      stage: '₹40 Cr',
      status: 'LOCKED',
      window: 'Q3 2026',
      genre: 'Drama / Thriller',
      productionHouse: 'Loop Studios'
    });

    // POST to backend
    fetch('http://localhost:8080/api/v1/crm/directors/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    showToast(`Added project "${newEntry.subtext}" by ${newEntry.director}!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Director', 'Project Subtext', 'Production Stage', 'Budget / Valuation', 'Status', 'Release Window'];
    const rows = filteredRecords.map(r => [
      r.id,
      `"${r.director}"`,
      `"${r.subtext}"`,
      `"${r.film}"`,
      `"${r.stage}"`,
      `"${r.status}"`,
      `"${r.window}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_Director_Portal_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported director projects as CSV.');
  };

  // Render Status Badge (LOCKED / REVIEWING)
  const renderStatusBadge = (status) => {
    const s = (status || '').toUpperCase();
    if (s === 'LOCKED') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062E1E] text-[#34D399] border border-[#065F46]">
          LOCKED
        </span>
      );
    }
    if (s === 'REVIEWING') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0C1B2E] text-[#60A5FA] border border-[#1E40AF]">
          REVIEWING
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
          {/* Main Title Row with Golden Film Strip Icon */}
          <div className="flex items-center gap-4">
            {/* Film Strip Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {/* Golden Film Reel / Strip Icon matching screenshot */}
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" />
                <line x1="8" y1="3" x2="8" y2="21" stroke="currentColor" />
                <line x1="16" y1="3" x2="16" y2="21" stroke="currentColor" />
                <line x1="3" y1="7.5" x2="8" y2="7.5" stroke="currentColor" />
                <line x1="3" y1="12" x2="8" y2="12" stroke="currentColor" />
                <line x1="3" y1="16.5" x2="8" y2="16.5" stroke="currentColor" />
                <line x1="16" y1="7.5" x2="21" y2="7.5" stroke="currentColor" />
                <line x1="16" y1="12" x2="21" y2="12" stroke="currentColor" />
                <line x1="16" y1="16.5" x2="21" y2="16.5" stroke="currentColor" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Director Portal
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Director pipeline, approvals &amp; distribution windows.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. ACTIVE FILMMAKERS */}
          <div 
            onClick={() => setActiveKpi('ACTIVE FILMMAKERS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'ACTIVE FILMMAKERS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              ACTIVE FILMMAKERS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              58
            </div>
          </div>

          {/* 2. GREENLIT FILMS */}
          <div 
            onClick={() => setActiveKpi('GREENLIT FILMS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'GREENLIT FILMS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              GREENLIT FILMS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              12
            </div>
          </div>

          {/* 3. IN POST */}
          <div 
            onClick={() => setActiveKpi('IN POST')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'IN POST'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              IN POST
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              7
            </div>
          </div>

          {/* 4. PITCHING */}
          <div 
            onClick={() => setActiveKpi('PITCHING')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'PITCHING'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              PITCHING
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              24
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
                    Stage &amp; Status Filter
                  </div>
                  {['ALL', 'LOCKED', 'REVIEWING', 'Pre-production', 'Post', 'Pitch', 'Greenlit'].map((status) => (
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
            MAIN DIRECTOR PROJECTS TABLE (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0B0907] border border-[#211B13] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A140D] text-[11px] font-mono uppercase tracking-[0.16em] text-[#7E6E59]">
                  <th className="py-4 px-6 font-medium">DIRECTOR</th>
                  <th className="py-4 px-6 font-medium">FILM</th>
                  <th className="py-4 px-6 font-medium">STAGE</th>
                  <th className="py-4 px-6 font-medium">STATUS</th>
                  <th className="py-4 px-6 font-medium">WINDOW</th>
                  <th className="py-4 px-6 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16120D] text-sm">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7E6E59] font-mono text-xs">
                      No director slates match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-[#120F0B]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedProjectForDetail(item)}
                    >
                      {/* 1. DIRECTOR Column: Bold Title + Subtext */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#EDE7DE] text-base group-hover:text-white transition-colors">
                          {item.director}
                        </div>
                        <div className="text-xs text-[#7A6B58] mt-0.5 font-normal">
                          {item.subtext}
                        </div>
                      </td>

                      {/* 2. FILM Column (Pre-production, Post, Pitch, Greenlit) */}
                      <td className="py-4 px-6 text-[#C9BFB0] text-sm font-normal">
                        {item.film}
                      </td>

                      {/* 3. STAGE Column (Budget e.g. ₹40 Cr, ₹65 Cr) */}
                      <td className="py-4 px-6 font-serif text-[#EDE7DE] text-base">
                        {item.stage}
                      </td>

                      {/* 4. STATUS Column (LOCKED / REVIEWING) */}
                      <td className="py-4 px-6">
                        {renderStatusBadge(item.status)}
                      </td>

                      {/* 5. WINDOW Column (Q3 2026, Q4 2026, TBD, Q1 2027) */}
                      <td className="py-4 px-6 text-[#9A8A75] text-sm font-mono">
                        {item.window}
                      </td>

                      {/* 6. Action: Open */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectForDetail(item);
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
            PLANNED CAPABILITIES SECTION (EXACT MATCH SCREENSHOT 1 & 3)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* 6 Capability Boxes in 3-Column Grid matching Screenshot 1 & 3 */}
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
          MODAL: + NEW DIRECTOR PITCH / SLATE
      ═══════════════════════════════════════════════════════════════ */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#211B13] flex items-center justify-between bg-[#14100B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" />
                    <line x1="8" y1="3" x2="8" y2="21" stroke="currentColor" />
                    <line x1="16" y1="3" x2="16" y2="21" stroke="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Add Director Project Pitch</h3>
                  <p className="text-xs text-[#8A7964]">Register feature film slate into acquisition pipeline</p>
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

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Filmmaker / Director Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gautham Vasudev Menon"
                  value={newProject.director}
                  onChange={(e) => setNewProject({ ...newProject, director: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Project Title / Working Subtext *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhruva Natchathiram 2 / Untitled Crime Series"
                  value={newProject.subtext}
                  onChange={(e) => setNewProject({ ...newProject, subtext: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Production Phase
                  </label>
                  <select
                    value={newProject.film}
                    onChange={(e) => setNewProject({ ...newProject, film: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="Pre-production">Pre-production</option>
                    <option value="Post">Post</option>
                    <option value="Pitch">Pitch</option>
                    <option value="Greenlit">Greenlit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Budget / Valuation
                  </label>
                  <input
                    type="text"
                    placeholder="₹40 Cr"
                    value={newProject.stage}
                    onChange={(e) => setNewProject({ ...newProject, stage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Contract Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="LOCKED">LOCKED</option>
                    <option value="REVIEWING">REVIEWING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Distribution Window
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Q3 2026 / TBD"
                    value={newProject.window}
                    onChange={(e) => setNewProject({ ...newProject, window: e.target.value })}
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
                  Save Pitch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DRAWER / MODAL: DIRECTOR PROJECT DEAL ROOM
      ═══════════════════════════════════════════════════════════════ */}
      {selectedProjectForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3D290F] to-[#785419] flex items-center justify-center text-lg font-serif text-[#FBBF24] border border-[#926822]">
                  🎬
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-serif text-white">{selectedProjectForDetail.director}</h3>
                    {renderStatusBadge(selectedProjectForDetail.status)}
                  </div>
                  <p className="text-xs text-[#8A7964] mt-0.5 font-mono">
                    {selectedProjectForDetail.subtext} · Phase: {selectedProjectForDetail.film}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProjectForDetail(null)}
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
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Budget / Valuation</div>
                  <div className="text-lg font-serif text-[#FBBF24] mt-1">{selectedProjectForDetail.stage}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Target Window</div>
                  <div className="text-base font-serif text-white mt-1">{selectedProjectForDetail.window}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Status</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-2">{selectedProjectForDetail.status}</div>
                </div>
              </div>

              {/* Creative & Synopsis */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Synopsis &amp; Production Scope
                </div>
                <p className="text-xs text-[#C9BFB0] leading-relaxed">
                  {selectedProjectForDetail.synopsis || 'Feature narrative examining generational themes.'}
                </p>
                <div className="text-xs text-[#7A6B58] font-mono">
                  Production Banner: <span className="text-[#EDE7DE]">{selectedProjectForDetail.productionHouse || 'Madras Talkies'}</span>
                </div>
              </div>

              {/* Key Creative Crew */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Creative Package &amp; Department Leads
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[#7A6B58] block">Writer / Screenplay:</span>
                    <span className="text-[#EDE7DE]">{selectedProjectForDetail.writer || 'Director & Screenplay Team'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Original Music:</span>
                    <span className="text-[#EDE7DE]">{selectedProjectForDetail.musicDirector || 'Leading Composer'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Cinematography:</span>
                    <span className="text-[#EDE7DE]">{selectedProjectForDetail.cinematography || 'Master DOP'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Planned Shoot:</span>
                    <span className="text-[#EDE7DE]">{selectedProjectForDetail.shootDays || '90 Shoot Days'}</span>
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
                    showToast(`Dispatched Greenlight approval letter to ${selectedProjectForDetail.director}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#221808] border border-[#5E4215] text-[#FBBF24] hover:bg-[#332209]"
                >
                  Approve Slate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Scheduled Rough Cut screening session with ${selectedProjectForDetail.director}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#14120D] border border-[#2D2316] text-[#C9BFB0] hover:text-white"
                >
                  Schedule Screening
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProjectForDetail(null)}
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
                  🎬
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white">{selectedCapability.label}</h3>
                  <div className="text-[11px] font-mono text-[#8A7964]">Director Portal Subsystem</div>
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
                Director Subsystem Online
              </span>

              <button
                onClick={() => {
                  showToast(`Executed test batch for ${selectedCapability.label}.`);
                  setSelectedCapability(null);
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] tracking-wide"
              >
                Run Diagnostics
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

export default DirectorPortalDashboard;

