import React, { useState, useMemo, useEffect } from 'react';

// Default initial records matching screenshot exactly
const INITIAL_RECORDS = [
  {
    id: 1,
    title: 'Pulli Raja',
    category: 'Film',
    type: 'Tamil',
    language: '—',
    status: 'LIVE',
    release: 'Live',
    duration: '2h 14m',
    resolution: '4K HDR',
    rating: 'U/A 16+',
    synopsis: 'A gripping political action drama tracing the rise of a grassroots activist navigating the complex corridors of power in Tamil Nadu.',
    director: 'K. Balachandran',
    episodes: 1
  },
  {
    id: 2,
    title: 'Velluvachi Godaramma',
    category: 'Film',
    type: 'Telugu',
    language: '—',
    status: 'SCHEDULED',
    release: 'Feb 12',
    duration: '2h 28m',
    resolution: '4K Dolby Vision',
    rating: 'U',
    synopsis: 'An epic emotional journey set along the Godavari river celebrating rural heritage, musical folklore, and generational bonds.',
    director: 'S. V. Krishna',
    episodes: 1
  },
  {
    id: 3,
    title: 'Antaheen',
    category: 'Film',
    type: 'Bengali',
    language: '—',
    status: 'ENCODING',
    release: 'Mar 04',
    duration: '2h 05m',
    resolution: '1080p HD',
    rating: 'U/A 13+',
    synopsis: 'An atmospheric neo-noir relationship mystery weaving through Kolkata rainstorms, anonymous phone calls, and unspoken affection.',
    director: 'Aniruddha Roy',
    episodes: 1
  },
  {
    id: 4,
    title: 'Vada Chennai Chronicles',
    category: 'Series',
    type: 'Tamil',
    language: 'Tamil, Telugu',
    status: 'LIVE',
    release: 'Live',
    duration: '8 Episodes',
    resolution: '4K HDR',
    rating: 'A 18+',
    synopsis: 'A sprawling underworld saga detailing the harbor factions of North Chennai across three decades.',
    director: 'V. Maaran',
    episodes: 8
  },
  {
    id: 5,
    title: 'Kantara: Legend of the Woods',
    category: 'Film',
    type: 'Kannada',
    language: 'Kannada, Hindi',
    status: 'LIVE',
    release: 'Live',
    duration: '2h 30m',
    resolution: '4K Dolby Atmos',
    rating: 'U/A 16+',
    synopsis: 'A divine conflict between tribal tradition and bureaucratic dominion deep within sacred coastal forests.',
    director: 'Rishab Shetty',
    episodes: 1
  },
  {
    id: 6,
    title: 'The Malabar Code',
    category: 'Series',
    type: 'Malayalam',
    language: 'Malayalam',
    status: 'SCHEDULED',
    release: 'Feb 28',
    duration: '6 Episodes',
    resolution: '4K HDR',
    rating: 'U/A 16+',
    synopsis: 'Coast Guard intelligence investigates a mysterious offshore beacon transmitting encrypted shortwave signals.',
    director: 'Amal Neeraj',
    episodes: 6
  }
];

const CAPABILITIES = [
  { id: 'movie-upload', label: 'Movie Upload', count: '1,840 Films', status: 'Ready' },
  { id: 'series-upload', label: 'Series Upload', count: '420 Series', status: 'Ready' },
  { id: 'episodes', label: 'Episodes', count: '3,890 Episodes', status: 'Active' },
  { id: 'trailers', label: 'Trailers', count: '940 Clips', status: 'Active' },
  { id: 'music', label: 'Music', count: '2,400 Tracks', status: 'Active' },
  { id: 'live-tv', label: 'Live TV', count: '24 Channels', status: 'Live 24/7' },
  { id: 'sports', label: 'Sports', count: '8 Tournaments', status: 'Live Streams' },
  { id: 'events', label: 'Events', count: '14 PPV Shows', status: 'Scheduled' },
  { id: 'kids-content', label: 'Kids Content', count: '560 Titles', status: 'Curated', highlighted: true },
  { id: 'regional-content', label: 'Regional Content', count: '9 Languages', status: 'Active' },
  { id: 'scheduling', label: 'Scheduling', count: '96 Queued', status: 'Automated' },
  { id: 'publishing', label: 'Publishing', count: 'Multi-CDN', status: 'Connected' },
];

export const OttCmsDashboard = () => {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedCapability, setSelectedCapability] = useState('kids-content');
  const [activeKpi, setActiveKpi] = useState('LIVE NOW');
  
  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);
  const [capabilityModalData, setCapabilityModalData] = useState(null);

  // New form state
  const [newForm, setNewForm] = useState({
    title: '',
    category: 'Film',
    type: 'Tamil',
    language: 'Tamil',
    status: 'SCHEDULED',
    release: 'Upcoming',
    synopsis: '',
    director: ''
  });

  // Fetch from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/content/ott-cms/records')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch(() => {
        // Fallback to INITIAL_RECORDS
      });
  }, []);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(item => {
      // Search matching
      const matchesSearch = 
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      // Status pill / KPI matching
      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status === selectedStatusFilter;
      } else if (activeKpi === 'LIVE NOW') {
        // show all or highlight live
        matchesStatus = true;
      } else if (activeKpi === 'SCHEDULED') {
        matchesStatus = item.status === 'SCHEDULED';
      } else if (activeKpi === 'IN REVIEW') {
        matchesStatus = item.status === 'ENCODING' || item.status === 'IN REVIEW';
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Add New Record
  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newForm.title.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newForm.title.trim(),
      category: newForm.category,
      type: newForm.type,
      language: newForm.language || '—',
      status: newForm.status,
      release: newForm.release || 'TBA',
      duration: '2h 10m',
      resolution: '4K HDR',
      rating: 'U/A',
      synopsis: newForm.synopsis || 'Added via Loop Nexus 360 OTT CMS.',
      director: newForm.director || 'Loop Productions',
      episodes: newForm.category === 'Series' ? 8 : 1
    };

    // Try posting to backend
    fetch('http://localhost:8080/api/v1/content/ott-cms/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewForm({
      title: '',
      category: 'Film',
      type: 'Tamil',
      language: 'Tamil',
      status: 'SCHEDULED',
      release: 'Upcoming',
      synopsis: '',
      director: ''
    });
  };

  // Export to CSV
  const handleExport = () => {
    const headers = 'ID,Title,Category,Type,Language,Status,Release\n';
    const rows = filteredRecords.map(r => 
      `"${r.id}","${r.title}","${r.category}","${r.type}","${r.language}","${r.status}","${r.release}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loop_ott_cms_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062114] text-[#22C55E] border border-[#14532D]">
            LIVE
          </span>
        );
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#081B2F] text-[#38BDF8] border border-[#0369A1]">
            SCHEDULED
          </span>
        );
      case 'ENCODING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0C1B2E] text-[#60A5FA] border border-[#1E40AF]">
            ENCODING
          </span>
        );
      case 'IN REVIEW':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#241708] text-[#F59E0B] border border-[#78350F]">
            IN REVIEW
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#141416] text-[#A1A1AA] border border-[#27272A]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full min-h-full bg-[#050403] text-[#EDE7DE] p-4 sm:p-6 lg:p-10 select-none font-sans">
      <div className="max-w-[1520px] mx-auto space-y-10 sm:space-y-12">

        {/* ═══════════════════════════════════════════════════════════════
            TOP HEADER AREA (EXACT SCREENSHOT 1 MATCH)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          {/* Small Category Breadcrumb */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            CONTENT &amp; OPS
          </div>

          {/* Main Title Row with Golden Film Reel Icon */}
          <div className="flex items-center gap-4">
            {/* Film Reel Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
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
              OTT CMS
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Movies, series, episodes, live TV, sports &amp; scheduling.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (WITH RADIANT GOLD GLOW ON 'LIVE NOW')
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Films Acquired */}
          <div 
            onClick={() => setActiveKpi('FILMS ACQUIRED')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'FILMS ACQUIRED'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              FILMS ACQUIRED
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              1,840
            </div>
          </div>

          {/* 2. Live Now (Default Glowing Card from Screenshot) */}
          <div 
            onClick={() => setActiveKpi('LIVE NOW')}
            className={`p-5 rounded-xl bg-[#120E08] border transition-all cursor-pointer relative overflow-visible ${
              activeKpi === 'LIVE NOW'
                ? 'border-[#8F6622] shadow-[0_0_28px_rgba(245,158,11,0.28)] ring-1 ring-[#D4AF37]/40'
                : 'border-[#3D2D15] hover:border-[#7E5C20]'
            }`}
          >
            {/* Ambient golden aura underneath */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none rounded-xl" />
            <div className="relative z-10">
              <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A064] uppercase flex items-center justify-between">
                <span>LIVE NOW</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#FBBF24] mt-3 font-normal">
                312
              </div>
            </div>
          </div>

          {/* 3. Scheduled */}
          <div 
            onClick={() => setActiveKpi('SCHEDULED')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'SCHEDULED'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              SCHEDULED
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              96
            </div>
          </div>

          {/* 4. In Review */}
          <div 
            onClick={() => setActiveKpi('IN REVIEW')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'IN REVIEW'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              IN REVIEW
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              48
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SEARCH & CONTROLS TOOLBAR (FILTER / EXPORT / + NEW)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          
          {/* Left: Search input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#716858]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className="w-full bg-[#080705] border border-[#231B12] focus:border-[#7E5C20] focus:ring-1 focus:ring-[#7E5C20]/40 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F5EDE3] placeholder-[#665D4F] outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#7A7160] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right: Action Buttons Group */}
          <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
            
            {/* Filter Toggle Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-mono tracking-wider font-semibold transition-colors cursor-pointer ${
                  selectedStatusFilter !== 'ALL' || isFilterDropdownOpen
                    ? 'bg-[#18130C] border-[#8F6622] text-[#FBBF24]'
                    : 'bg-[#0A0805] border-[#261E14] text-[#B8AA96] hover:bg-[#140F0A] hover:border-[#3D3020]'
                }`}
              >
                {/* Funnel Icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>FILTER</span>
                {selectedStatusFilter !== 'ALL' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                )}
              </button>

              {/* Filter Dropdown Menu */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0D0B08] border border-[#2D2214] shadow-2xl p-2 z-30 space-y-1">
                  <div className="text-[10px] font-mono text-[#786D5C] px-2 py-1 uppercase tracking-wider">
                    Status Filter
                  </div>
                  {['ALL', 'LIVE', 'SCHEDULED', 'ENCODING', 'IN REVIEW'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setSelectedStatusFilter(st);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                        selectedStatusFilter === st
                          ? 'bg-[#1E170E] text-[#FBBF24] font-semibold'
                          : 'text-[#A99D8B] hover:bg-[#14100A] hover:text-white'
                      }`}
                    >
                      <span>{st}</span>
                      {selectedStatusFilter === st && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={handleExport}
              title="Export visible records to CSV"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A0805] border border-[#261E14] text-[#B8AA96] hover:bg-[#140F0A] hover:border-[#3D3020] text-xs font-mono tracking-wider font-semibold transition-colors cursor-pointer"
            >
              {/* Tray Download Icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>EXPORT</span>
            </button>

            {/* + NEW Button (Vibrant Golden Orange from Screenshot) */}
            <button
              type="button"
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#0A0702] font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>+ NEW</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            DATA TABLE (EXACT TYPOGRAPHY & ROW ALIGNMENT)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1F1911] bg-[#080604]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F1911] text-[11px] font-mono tracking-[0.2em] text-[#716654] uppercase bg-[#0B0906]">
                <th className="py-3.5 px-5 font-medium">TITLE</th>
                <th className="py-3.5 px-5 font-medium">TYPE</th>
                <th className="py-3.5 px-5 font-medium">LANGUAGE</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
                <th className="py-3.5 px-5 font-medium">RELEASE</th>
                <th className="py-3.5 px-5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17130D]">
              {filteredRecords.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-[#110D08]/60 transition-colors group"
                >
                  {/* Title & Category */}
                  <td className="py-4 px-5">
                    <div className="font-medium text-sm text-[#F5EDE2] group-hover:text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#7A705E] mt-0.5">
                      {item.category}
                    </div>
                  </td>

                  {/* Type / Region */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-normal">
                    {item.type}
                  </td>

                  {/* Language */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.language}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Release */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-mono">
                    {item.release}
                  </td>

                  {/* Open Link */}
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedRecordForDetail(item)}
                      className="text-xs font-semibold text-[#FBBF24] hover:text-[#F59E0B] hover:underline cursor-pointer transition-colors"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#7A705E]">
                    No records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLANNED CAPABILITIES SECTION (SCREENSHOT 2 MATCH)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          {/* Header */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* 3-Column Grid of 12 Capability Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {CAPABILITIES.map((cap) => {
              const isKidsContent = cap.id === 'kids-content';
              const isSelected = selectedCapability === cap.id;

              return (
                <div
                  key={cap.id}
                  onClick={() => {
                    setSelectedCapability(cap.id);
                    setCapabilityModalData(cap);
                  }}
                  className={`p-4 sm:p-5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    isKidsContent || isSelected
                      ? 'bg-[#100C07] border border-[#8F6622] shadow-[0_0_22px_rgba(245,158,11,0.2)]'
                      : 'bg-[#090705] border border-[#211B13] hover:border-[#382D1D] hover:bg-[#0E0B07]'
                  }`}
                >
                  <span className="text-sm sm:text-base font-normal text-[#EAE4DC] group-hover:text-white transition-colors">
                    {cap.label}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#8C7D68] hidden sm:inline">
                      {cap.count}
                    </span>
                    <span className="text-xs text-[#716551] group-hover:text-[#FBBF24] transition-colors">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: RECORD DETAIL & METADATA VIEWER
      ═══════════════════════════════════════════════════════════════ */}
      {selectedRecordForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0D0B08] border border-[#382D1D] p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedRecordForDetail(null)}
              className="absolute top-4 right-4 text-[#7A705E] hover:text-white p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#B89255] uppercase">
                {selectedRecordForDetail.category} ? {selectedRecordForDetail.type}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {selectedRecordForDetail.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#A99D8B] leading-relaxed">
              {selectedRecordForDetail.synopsis}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">STATUS</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">RELEASE</span>
                <span className="text-white">{selectedRecordForDetail.release}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">FORMAT</span>
                <span className="text-white">{selectedRecordForDetail.resolution}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">DIRECTOR</span>
                <span className="text-white truncate block">{selectedRecordForDetail.director}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="px-4 py-2 text-xs font-mono rounded-lg bg-[#19140D] hover:bg-[#241D13] text-[#D8CDC0] border border-[#2E2417]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: ADD NEW CONTENT RECORD
      ═══════════════════════════════════════════════════════════════ */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0D0B08] border border-[#382D1D] p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsNewModalOpen(false)}
              className="absolute top-4 right-4 text-[#7A705E] hover:text-white p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#B89255] uppercase">
                OTT CMS INGESTION
              </span>
              <h3 className="text-xl font-serif text-white font-normal">
                Register New Media Title
              </h3>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="e.g. Leo Part 2"
                  className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Category
                  </label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="Film">Film</option>
                    <option value="Series">Series</option>
                    <option value="Kids">Kids Content</option>
                    <option value="Live TV">Live TV</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Type / Region
                  </label>
                  <select
                    value={newForm.type}
                    onChange={(e) => setNewForm({ ...newForm, type: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Status
                  </label>
                  <select
                    value={newForm.status}
                    onChange={(e) => setNewForm({ ...newForm, status: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="LIVE">LIVE</option>
                    <option value="ENCODING">ENCODING</option>
                    <option value="IN REVIEW">IN REVIEW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Release Date / Slot
                  </label>
                  <input
                    type="text"
                    value={newForm.release}
                    onChange={(e) => setNewForm({ ...newForm, release: e.target.value })}
                    placeholder="e.g. Mar 18 / Live"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Director / Creator
                </label>
                <input
                  type="text"
                  value={newForm.director}
                  onChange={(e) => setNewForm({ ...newForm, director: e.target.value })}
                  placeholder="Director name"
                  className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#19140D] text-[#D8CDC0] border border-[#2E2417]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#0A0702] font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: CAPABILITY DRAWER
      ═══════════════════════════════════════════════════════════════ */}
      {capabilityModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0D0B08] border border-[#382D1D] p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setCapabilityModalData(null)}
              className="absolute top-4 right-4 text-[#7A705E] hover:text-white p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#B89255] uppercase">
                PIPELINE CAPABILITY
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {capabilityModalData.label}
              </h3>
            </div>

            <p className="text-xs text-[#A99D8B] leading-relaxed">
              Configured module for {capabilityModalData.label.toLowerCase()} in Loop Nexus 360. Includes transcode profiles, multi-track DRM, and automated geo-publishing.
            </p>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C7D68]">Active Volume:</span>
              <span className="text-[#FBBF24] font-bold">{capabilityModalData.count}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCapabilityModalData(null)}
                className="px-4 py-2 text-xs font-mono rounded-lg bg-[#F59E0B] text-[#0A0702] font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OttCmsDashboard;

