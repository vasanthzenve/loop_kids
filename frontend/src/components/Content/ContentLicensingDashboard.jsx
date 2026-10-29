import React, { useState, useMemo, useEffect } from 'react';

// Default initial records matching screenshot exactly
const INITIAL_LICENSES = [
  {
    id: 1,
    title: 'Pulli Raja',
    geography: 'India',
    territory: '2y exclusive',
    window: '—',
    status: 'ACTIVE',
    expiry: 'Dec 2027',
    licensor: 'Sun Pictures Ltd',
    fee: '₹12.5 Cr',
    rightsType: 'SVOD Exclusive + Catchup',
    linearBroadcast: 'Excluded',
    geoFence: 'IN, LK, NP'
  },
  {
    id: 2,
    title: 'Velluvachi',
    geography: 'Worldwide ex US',
    territory: '3y',
    window: '—',
    status: 'ACTIVE',
    expiry: 'Aug 2028',
    licensor: 'Mythri Movie Makers',
    fee: '₹18.0 Cr',
    rightsType: 'Global SVOD / AVOD',
    linearBroadcast: 'Permitted non-exclusive',
    geoFence: 'Worldwide except US & CA'
  },
  {
    id: 3,
    title: 'Kumbalangi 2',
    geography: 'India',
    territory: '18m',
    window: '—',
    status: 'RENEW',
    expiry: 'Feb 2027',
    licensor: 'Bhavana Studios',
    fee: '₹6.2 Cr',
    rightsType: 'First Window OTT',
    linearBroadcast: 'Holdback until Day 90',
    geoFence: 'IN, AE, SG, MY'
  },
  {
    id: 4,
    title: 'KGF Chapter 3 Prep',
    geography: 'South Asia',
    territory: '5y exclusive',
    window: '—',
    status: 'ACTIVE',
    expiry: 'Nov 2029',
    licensor: 'Hombale Films',
    fee: '₹45.0 Cr',
    rightsType: 'Multi-lingual SVOD Master',
    linearBroadcast: 'Excluded',
    geoFence: 'IN, PK, BD, LK'
  },
  {
    id: 5,
    title: 'Asuran Prequel Rights',
    geography: 'Global OTT',
    territory: '1y linear',
    window: '—',
    status: 'RENEW',
    expiry: 'Jan 2027',
    licensor: 'V Creations',
    fee: '₹9.4 Cr',
    rightsType: 'Digital Streaming & TVOD',
    linearBroadcast: 'Satellite Co-Terminus',
    geoFence: 'Global'
  },
  {
    id: 6,
    title: 'Leo: Bloodlines',
    geography: 'MENA Region',
    territory: '2y exclusive',
    window: '—',
    status: 'ACTIVE',
    expiry: 'Jun 2028',
    licensor: 'Seven Screen Studio',
    fee: '₹14.8 Cr',
    rightsType: 'Theatrical & SVOD Post-Theatrical',
    linearBroadcast: 'Pay-TV Allowed',
    geoFence: 'AE, SA, QA, OM, KW, BH'
  }
];

// 7 Planned Capabilities matching Screenshot 1 exactly
const PLANNED_LICENSING_CAPABILITIES = [
  { id: 'movie-rights', label: 'Movie Rights', desc: 'Master theatrical, SVOD, AVOD, TVOD, and airline rights lifecycle tracking.', activeVolume: '540 Titles', legalTemplate: 'IFTA Master Agreement' },
  { id: 'music-rights', label: 'Music Rights', desc: 'Sync rights, publishing royalties, mechanical licenses, and PPL/IPRS compliance.', activeVolume: '2,800 Tracks', legalTemplate: 'Sync & Performance SLA' },
  { id: 'sports-rights', label: 'Sports Rights', desc: 'Live telecast linear feeds, digital clips, highlight rights, and sub-licensing clauses.', activeVolume: '14 Tournaments', legalTemplate: 'Broadcaster Tier 1' },
  { id: 'regional-rights', label: 'Regional Rights', desc: 'State-level holdbacks, dubbing audio exclusivity, and localized terrestrial windows.', activeVolume: '8 Indian Languages', legalTemplate: 'Regional Language Addendum' },
  { id: 'international-rights', label: 'International Rights', desc: 'Diaspora territories, cross-border tax withholdings, and foreign currency escalators.', activeVolume: '42 Countries', legalTemplate: 'Cross-Border Master IP' },
  { id: 'renewals', label: 'Renewals', desc: 'Automated 90-60-30 day renewal notices with first right of refusal triggers.', activeVolume: '22 Up for Renewal', legalTemplate: 'Option Exercise Notice' },
  { id: 'expiry-alerts', label: 'Expiry Alerts', desc: 'Automated CDN purge triggers and metadata delisting webhooks to prevent infringements.', activeVolume: 'Zero Breaches', legalTemplate: 'Takedown & Deprovision' }
];

export const ContentLicensingDashboard = () => {
  const [records, setRecords] = useState(INITIAL_LICENSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('GEO BLOCKS');
  
  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);

  // New License form state
  const [newLicense, setNewLicense] = useState({
    title: '',
    geography: 'India',
    territory: '2y exclusive',
    status: 'ACTIVE',
    expiry: 'Dec 2028',
    licensor: '',
    fee: '₹10.0 Cr',
    rightsType: 'SVOD Exclusive'
  });

  // Fetch from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/content/licensing/records')
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
      const matchesSearch = 
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.geography.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status === selectedStatusFilter;
      } else if (activeKpi === 'GEO BLOCKS') {
        matchesStatus = true;
      } else if (activeKpi === 'RENEWING 30D') {
        matchesStatus = item.status === 'RENEW';
      } else if (activeKpi === 'LIVE LICENSES') {
        matchesStatus = item.status === 'ACTIVE';
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Add New License
  const handleCreateLicense = (e) => {
    e.preventDefault();
    if (!newLicense.title.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newLicense.title.trim(),
      geography: newLicense.geography || 'India',
      territory: newLicense.territory || '2y exclusive',
      window: '—',
      status: newLicense.status,
      expiry: newLicense.expiry || 'Dec 2028',
      licensor: newLicense.licensor || 'Studio Partner',
      fee: newLicense.fee || '₹5.0 Cr',
      rightsType: newLicense.rightsType || 'SVOD Exclusive',
      linearBroadcast: 'Excluded',
      geoFence: newLicense.geography
    };

    fetch('http://localhost:8080/api/v1/content/licensing/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewLicense({
      title: '',
      geography: 'India',
      territory: '2y exclusive',
      status: 'ACTIVE',
      expiry: 'Dec 2028',
      licensor: '',
      fee: '₹10.0 Cr',
      rightsType: 'SVOD Exclusive'
    });
  };

  // Export to CSV
  const handleExport = () => {
    const headers = 'ID,Title,Geography,Territory,Window,Status,Expiry\n';
    const rows = filteredRecords.map(r => 
      `"${r.id}","${r.title}","${r.geography}","${r.territory}","${r.window}","${r.status}","${r.expiry}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loop_licensing_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062114] text-[#22C55E] border border-[#14532D]">
            ACTIVE
          </span>
        );
      case 'RENEW':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#081B2F] text-[#38BDF8] border border-[#0369A1]">
            RENEW
          </span>
        );
      case 'DISPUTE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#220B10] text-[#F87171] border border-[#7F1D1D]">
            DISPUTE
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
            TOP HEADER AREA (EXACT SCREENSHOT 2 MATCH)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          {/* Small Category Breadcrumb */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            CONTENT &amp; OPS
          </div>

          {/* Main Title Row with Golden Document & Lock Icon */}
          <div className="flex items-center gap-4">
            {/* Document License Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
                />
                <circle cx="12" cy="14" r="2" stroke="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v2" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Content Licensing
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Rights, renewals and expiry alerts across geographies.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (WITH RADIANT GOLD GLOW ON 'GEO BLOCKS')
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Live Licenses */}
          <div 
            onClick={() => setActiveKpi('LIVE LICENSES')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'LIVE LICENSES'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              LIVE LICENSES
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              540
            </div>
          </div>

          {/* 2. Renewing 30D */}
          <div 
            onClick={() => setActiveKpi('RENEWING 30D')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'RENEWING 30D'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              RENEWING 30D
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              22
            </div>
          </div>

          {/* 3. Geo Blocks (Default Glowing Card from Screenshot: India + ME) */}
          <div 
            onClick={() => setActiveKpi('GEO BLOCKS')}
            className={`p-5 rounded-xl bg-[#120E08] border transition-all cursor-pointer relative overflow-visible ${
              activeKpi === 'GEO BLOCKS'
                ? 'border-[#8F6622] shadow-[0_0_28px_rgba(245,158,11,0.28)] ring-1 ring-[#D4AF37]/40'
                : 'border-[#3D2D15] hover:border-[#7E5C20]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none rounded-xl" />
            <div className="relative z-10">
              <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A064] uppercase flex items-center justify-between">
                <span>GEO BLOCKS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#FBBF24] mt-3 font-normal">
                India + ME
              </div>
            </div>
          </div>

          {/* 4. Disputes */}
          <div 
            onClick={() => setActiveKpi('DISPUTES')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'DISPUTES'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              DISPUTES
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              1
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
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>FILTER</span>
                {selectedStatusFilter !== 'ALL' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                )}
              </button>

              {/* Filter Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0D0B08] border border-[#2D2214] shadow-2xl p-2 z-30 space-y-1">
                  <div className="text-[10px] font-mono text-[#786D5C] px-2 py-1 uppercase tracking-wider">
                    License Status
                  </div>
                  {['ALL', 'ACTIVE', 'RENEW', 'DISPUTE'].map((st) => (
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
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>EXPORT</span>
            </button>

            {/* + NEW Button (Vibrant Golden Orange) */}
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
            DATA TABLE (TITLE, TERRITORY, WINDOW, STATUS, EXPIRY, ACTION)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1F1911] bg-[#080604]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F1911] text-[11px] font-mono tracking-[0.2em] text-[#716654] uppercase bg-[#0B0906]">
                <th className="py-3.5 px-5 font-medium">TITLE</th>
                <th className="py-3.5 px-5 font-medium">TERRITORY</th>
                <th className="py-3.5 px-5 font-medium">WINDOW</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
                <th className="py-3.5 px-5 font-medium">EXPIRY</th>
                <th className="py-3.5 px-5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17130D]">
              {filteredRecords.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-[#110D08]/60 transition-colors group"
                >
                  {/* Title & Geography */}
                  <td className="py-4 px-5">
                    <div className="font-medium text-sm text-[#F5EDE2] group-hover:text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#7A705E] mt-0.5">
                      {item.geography}
                    </div>
                  </td>

                  {/* Territory */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-normal">
                    {item.territory}
                  </td>

                  {/* Window */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.window}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Expiry */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-mono">
                    {item.expiry}
                  </td>

                  {/* Open Action Link */}
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
                    No licenses found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLANNED CAPABILITIES SECTION (EXACT 7 CARDS FROM SCREENSHOT 1)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          {/* Header */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* Grid of 7 Capability Tiles matching Screenshot 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PLANNED_LICENSING_CAPABILITIES.map((cap) => {
              return (
                <div
                  key={cap.id}
                  onClick={() => setSelectedCapability(cap)}
                  className="p-4 sm:p-5 rounded-xl bg-[#090705] border border-[#211B13] hover:border-[#8F6622] hover:bg-[#100C07] hover:shadow-[0_0_20px_rgba(245,158,11,0.18)] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="text-sm sm:text-base font-normal text-[#EAE4DC] group-hover:text-white transition-colors">
                    {cap.label}
                  </span>

                  <span className="text-xs text-[#716551] group-hover:text-[#FBBF24] transition-colors">
                    →
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: LICENSE AGREEMENT DETAIL
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
                CONTENT LICENSE DOSSIER · {selectedRecordForDetail.geography}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {selectedRecordForDetail.title}
              </h3>
              <p className="text-xs text-[#8A7964]">
                Licensor: <span className="text-white font-medium">{selectedRecordForDetail.licensor}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">CURRENT STATUS</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">TERRITORY PERIOD</span>
                <span className="text-white">{selectedRecordForDetail.territory}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">EXPIRY DATE</span>
                <span className="text-emerald-400 font-bold">{selectedRecordForDetail.expiry}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">LICENSE FEE</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.fee}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">RIGHTS SCOPE</span>
              <span className="text-[#EDE7DE]">{selectedRecordForDetail.rightsType}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">GEO-FENCE ENCRYPTION</span>
              <span className="text-[#BDB2A0]">{selectedRecordForDetail.geoFence}</span>
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
          MODAL: REGISTER NEW LICENSE
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
                RIGHTS REGISTRATION
              </span>
              <h3 className="text-xl font-serif text-white font-normal">
                Register Content License
              </h3>
            </div>

            <form onSubmit={handleCreateLicense} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newLicense.title}
                  onChange={(e) => setNewLicense({ ...newLicense, title: e.target.value })}
                  placeholder="e.g. Vikram Chapter 2"
                  className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Geography
                  </label>
                  <input
                    type="text"
                    value={newLicense.geography}
                    onChange={(e) => setNewLicense({ ...newLicense, geography: e.target.value })}
                    placeholder="e.g. India or Worldwide"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Territory Window
                  </label>
                  <input
                    type="text"
                    value={newLicense.territory}
                    onChange={(e) => setNewLicense({ ...newLicense, territory: e.target.value })}
                    placeholder="e.g. 2y exclusive"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Status
                  </label>
                  <select
                    value={newLicense.status}
                    onChange={(e) => setNewLicense({ ...newLicense, status: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="RENEW">RENEW</option>
                    <option value="DISPUTE">DISPUTE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={newLicense.expiry}
                    onChange={(e) => setNewLicense({ ...newLicense, expiry: e.target.value })}
                    placeholder="e.g. Dec 2028"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Licensor Studio / Partner
                </label>
                <input
                  type="text"
                  value={newLicense.licensor}
                  onChange={(e) => setNewLicense({ ...newLicense, licensor: e.target.value })}
                  placeholder="e.g. Lyca Productions"
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
                  Register License
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: CAPABILITY DRAWER
      ═══════════════════════════════════════════════════════════════ */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0D0B08] border border-[#382D1D] p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-4 right-4 text-[#7A705E] hover:text-white p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#B89255] uppercase">
                LEGAL FRAMEWORK SPEC
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {selectedCapability.label}
              </h3>
            </div>

            <p className="text-xs text-[#A99D8B] leading-relaxed">
              {selectedCapability.desc}
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between">
                <span className="text-[#8C7D68]">Active Volume:</span>
                <span className="text-[#FBBF24] font-bold">{selectedCapability.activeVolume}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between">
                <span className="text-[#8C7D68]">Standard Legal SLA:</span>
                <span className="text-emerald-400 font-bold">{selectedCapability.legalTemplate}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCapability(null)}
                className="px-4 py-2 text-xs font-mono rounded-lg bg-[#F59E0B] text-[#0A0702] font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContentLicensingDashboard;

