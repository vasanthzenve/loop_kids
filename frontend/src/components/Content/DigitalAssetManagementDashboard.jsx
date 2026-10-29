import React, { useState, useMemo, useEffect } from 'react';

// Default initial records matching screenshot exactly
const INITIAL_ASSETS = [
  {
    id: 1,
    asset: 'Karthi-pitch.pdf',
    subtext: 'Document',
    type: 'Edwin',
    owner: '4.2 MB',
    status: 'APPROVED',
    size: '—',
    dimensions: '14 Pages · PDF/A-1b',
    checksum: 'sha256:8f4c...92e1',
    watermark: 'Dynamic User Watermarked (Edwin)',
    uploadedAt: 'Today, 11:24 AM',
    storageBucket: 's3://loop-dam-cold/docs/'
  },
  {
    id: 2,
    asset: 'Loop-launch-key.mov',
    subtext: 'Video',
    type: 'Akash',
    owner: '1.2 GB',
    status: 'ENCODING',
    size: '—',
    dimensions: '3840x2160 · ProRes 422 HQ',
    checksum: 'sha256:a1e4...77bc',
    watermark: 'Forensic Video Invisible Stamped',
    uploadedAt: 'Today, 09:15 AM',
    storageBucket: 's3://loop-dam-hot/masters/'
  },
  {
    id: 3,
    asset: 'Banner-A.png',
    subtext: 'Image',
    type: 'Priya',
    owner: '6 MB',
    status: 'APPROVED',
    size: '—',
    dimensions: '2560x1440 · PNG Lossless',
    checksum: 'sha256:3d7b...45a9',
    watermark: 'Metadata DRM Tagged',
    uploadedAt: 'Yesterday, 04:45 PM',
    storageBucket: 's3://loop-dam-hot/marketing/'
  },
  {
    id: 4,
    asset: 'Master-Teaser-4K.mov',
    subtext: 'Video',
    type: 'Mani',
    owner: '4.8 GB',
    status: 'APPROVED',
    size: '—',
    dimensions: '4096x2160 · DCI 4K Scope',
    checksum: 'sha256:f901...33d8',
    watermark: 'Forensic Audio & Video Watermark',
    uploadedAt: 'Oct 26, 02:10 PM',
    storageBucket: 's3://loop-dam-hot/masters/'
  },
  {
    id: 5,
    asset: 'Soundtrack-Master.wav',
    subtext: 'Audio',
    type: 'Anirudh',
    owner: '85 MB',
    status: 'APPROVED',
    size: '—',
    dimensions: '96kHz / 24-bit PCM Stereo',
    checksum: 'sha256:4c22...11ee',
    watermark: 'Acoustic Fingerprint Indexed',
    uploadedAt: 'Oct 25, 06:30 PM',
    storageBucket: 's3://loop-dam-warm/audio/'
  },
  {
    id: 6,
    asset: 'Global-Sponsorship-NDA.docx',
    subtext: 'Document',
    type: 'Edwin',
    owner: '1.8 MB',
    status: 'PENDING',
    size: '—',
    dimensions: '6 Pages · OOXML Signed',
    checksum: 'sha256:99ab...5410',
    watermark: 'Confidential Internal Watermark',
    uploadedAt: 'Oct 24, 10:15 AM',
    storageBucket: 's3://loop-dam-cold/legal/'
  }
];

// 8 Planned Capabilities matching Screenshot 2 exactly (3-column grid)
const PLANNED_DAM_CAPABILITIES = [
  { id: 'movie-posters', label: 'Movie Posters', desc: 'High-res vertical one-sheets, character posters, and localized regional banners.', assetCount: '24,500 Files', formatSpecs: 'TIFF, PSD, PNG 300DPI' },
  { id: 'videos', label: 'Videos', desc: 'ProRes master files, mezzanine cuts, teasers, sizzle reels, and episodic masters.', assetCount: '8,400 Master Reels', formatSpecs: 'ProRes 4444, XAVC-I, IMF' },
  { id: 'scripts', label: 'Scripts', desc: 'Screenplays, shooting scripts, dialog continuity logs, and censor script dossiers.', assetCount: '1,200 PDF Scripts', formatSpecs: 'Final Draft, PDF/A' },
  { id: 'contracts', label: 'Contracts', desc: 'Executed talent agreements, co-production deeds, chain of title, and music sync releases.', assetCount: '3,800 Contracts', formatSpecs: 'Digitally Sealed PDF' },
  { id: 'logos', label: 'Logos', desc: 'Loop OTT corporate vector kits, partner badge lockups, and film festival laurels.', assetCount: '450 Vector Kits', formatSpecs: 'SVG, AI, EPS, Transparent PNG' },
  { id: 'music', label: 'Music', desc: 'Uncompressed multitrack audio stems, stereo mixdowns, and Foley SFX libraries.', assetCount: '18,900 Stems', formatSpecs: '24-bit 96kHz WAV, FLAC' },
  { id: 'images', label: 'Images', desc: 'High-speed set stills, behind-the-scenes photography, and red carpet galleries.', assetCount: '120,000 Photos', formatSpecs: 'RAW DNG, JPEG Fine' },
  { id: 'documents', label: 'Documents', desc: 'Pitch decks, brand guidelines, regulatory filings, and technical architecture whitepapers.', assetCount: '4,500 Files', formatSpecs: 'PDF, Keynote, PPTX' }
];

export const DigitalAssetManagementDashboard = () => {
  const [records, setRecords] = useState(INITIAL_ASSETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('STORAGE');
  
  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);

  // New Asset form state
  const [newAsset, setNewAsset] = useState({
    asset: '',
    subtext: 'Document',
    type: 'Edwin',
    owner: '5.0 MB',
    status: 'APPROVED',
    dimensions: 'PDF Lossless'
  });

  // Fetch from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/content/dam/assets')
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
        item.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status === selectedStatusFilter;
      } else if (activeKpi === 'STORAGE') {
        matchesStatus = true;
      } else if (activeKpi === 'PENDING REVIEW') {
        matchesStatus = item.status === 'ENCODING' || item.status === 'PENDING';
      } else if (activeKpi === 'WATERMARKED') {
        matchesStatus = item.status === 'APPROVED';
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Add New Asset
  const handleCreateAsset = (e) => {
    e.preventDefault();
    if (!newAsset.asset.trim()) return;

    const newEntry = {
      id: Date.now(),
      asset: newAsset.asset.trim(),
      subtext: newAsset.subtext || 'Document',
      type: newAsset.type || 'Edwin',
      owner: newAsset.owner || '8 MB',
      status: newAsset.status,
      size: '—',
      dimensions: newAsset.dimensions || 'Standard Asset',
      checksum: 'sha256:' + Math.random().toString(16).substring(2, 10),
      watermark: 'Loop DAM Auto-Stamped',
      uploadedAt: 'Just now',
      storageBucket: 's3://loop-dam-hot/uploads/'
    };

    fetch('http://localhost:8080/api/v1/content/dam/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewAsset({
      asset: '',
      subtext: 'Document',
      type: 'Edwin',
      owner: '5.0 MB',
      status: 'APPROVED',
      dimensions: 'PDF Lossless'
    });
  };

  // Export to CSV
  const handleExport = () => {
    const headers = 'ID,Asset,Subtext,Type,Owner,Status,Size\n';
    const rows = filteredRecords.map(r => 
      `"${r.id}","${r.asset}","${r.subtext}","${r.type}","${r.owner}","${r.status}","${r.size}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loop_dam_assets_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062114] text-[#22C55E] border border-[#14532D]">
            APPROVED
          </span>
        );
      case 'ENCODING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#081B2F] text-[#38BDF8] border border-[#0369A1]">
            ENCODING
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#221607] text-[#F59E0B] border border-[#78350F]">
            PENDING
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

          {/* Main Title Row with Golden Photo Frame DAM Icon */}
          <div className="flex items-center gap-4">
            {/* DAM Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <polyline points="21 15 16 10 5 21" stroke="currentColor" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Digital Asset Management
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Posters, videos, scripts, contracts, logos &amp; music.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (WITH RADIANT GOLD GLOW ON 'STORAGE')
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Assets */}
          <div 
            onClick={() => setActiveKpi('ASSETS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'ASSETS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              ASSETS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              412 K
            </div>
          </div>

          {/* 2. Storage (Default Glowing Card from Screenshot: 38 TB) */}
          <div 
            onClick={() => setActiveKpi('STORAGE')}
            className={`p-5 rounded-xl bg-[#120E08] border transition-all cursor-pointer relative overflow-visible ${
              activeKpi === 'STORAGE'
                ? 'border-[#8F6622] shadow-[0_0_28px_rgba(245,158,11,0.28)] ring-1 ring-[#D4AF37]/40'
                : 'border-[#3D2D15] hover:border-[#7E5C20]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none rounded-xl" />
            <div className="relative z-10">
              <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A064] uppercase flex items-center justify-between">
                <span>STORAGE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#FBBF24] mt-3 font-normal">
                38 TB
              </div>
            </div>
          </div>

          {/* 3. Pending Review */}
          <div 
            onClick={() => setActiveKpi('PENDING REVIEW')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'PENDING REVIEW'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              PENDING REVIEW
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              86
            </div>
          </div>

          {/* 4. Watermarked */}
          <div 
            onClick={() => setActiveKpi('WATERMARKED')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'WATERMARKED'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              WATERMARKED
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              100%
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
                    Asset Status
                  </div>
                  {['ALL', 'APPROVED', 'ENCODING', 'PENDING'].map((st) => (
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
            DATA TABLE (ASSET, TYPE, OWNER, STATUS, SIZE, ACTION)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1F1911] bg-[#080604]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F1911] text-[11px] font-mono tracking-[0.2em] text-[#716654] uppercase bg-[#0B0906]">
                <th className="py-3.5 px-5 font-medium">ASSET</th>
                <th className="py-3.5 px-5 font-medium">TYPE</th>
                <th className="py-3.5 px-5 font-medium">OWNER</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
                <th className="py-3.5 px-5 font-medium">SIZE</th>
                <th className="py-3.5 px-5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17130D]">
              {filteredRecords.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-[#110D08]/60 transition-colors group"
                >
                  {/* Asset & Subtext */}
                  <td className="py-4 px-5">
                    <div className="font-medium text-sm text-[#F5EDE2] group-hover:text-white">
                      {item.asset}
                    </div>
                    <div className="text-xs text-[#7A705E] mt-0.5">
                      {item.subtext}
                    </div>
                  </td>

                  {/* Type (Showing Edwin / Akash / Priya as in Screenshot) */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-normal">
                    {item.type}
                  </td>

                  {/* Owner (Showing 4.2 MB / 1.2 GB / 6 MB as in Screenshot) */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.owner}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Size */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.size}
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
                    No digital assets found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLANNED CAPABILITIES SECTION (EXACT 8 CARDS FROM SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          {/* Header */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* Grid of 8 Capability Tiles matching Screenshot 2 (3-column grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PLANNED_DAM_CAPABILITIES.map((cap) => {
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
          MODAL: ASSET DETAIL & DRM TELEMETRY
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
                DIGITAL ASSET DOSSIER · {selectedRecordForDetail.subtext}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal truncate">
                {selectedRecordForDetail.asset}
              </h3>
              <p className="text-xs text-[#8A7964]">
                Author / Lead: <span className="text-white font-medium">{selectedRecordForDetail.type}</span> · Size: <span className="text-[#FBBF24] font-medium">{selectedRecordForDetail.owner}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">VERIFICATION STATUS</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">FORMAT &amp; SPECS</span>
                <span className="text-white truncate block">{selectedRecordForDetail.dimensions}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">UPLOAD TIMESTAMP</span>
                <span className="text-emerald-400 font-bold">{selectedRecordForDetail.uploadedAt}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">CHECKSUM (SHA-256)</span>
                <span className="text-white truncate block">{selectedRecordForDetail.checksum}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">WATERMARK &amp; DRM FINGERPRINT</span>
              <span className="text-[#EDE7DE]">{selectedRecordForDetail.watermark}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">COLD STORAGE ARCHIVE PATH</span>
              <span className="text-[#BDB2A0] truncate block">{selectedRecordForDetail.storageBucket}</span>
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
          MODAL: UPLOAD NEW DIGITAL ASSET
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
                ASSET REPOSITORY INGESTION
              </span>
              <h3 className="text-xl font-serif text-white font-normal">
                Upload Master Asset
              </h3>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  File Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.asset}
                  onChange={(e) => setNewAsset({ ...newAsset, asset: e.target.value })}
                  placeholder="e.g. Master-Teaser-Tamil.mov"
                  className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Category Type
                  </label>
                  <select
                    value={newAsset.subtext}
                    onChange={(e) => setNewAsset({ ...newAsset, subtext: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="Document">Document</option>
                    <option value="Video">Video</option>
                    <option value="Image">Image</option>
                    <option value="Audio">Audio</option>
                    <option value="Poster">Poster</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Creator / Lead
                  </label>
                  <input
                    type="text"
                    value={newAsset.type}
                    onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                    placeholder="e.g. Edwin / Akash"
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
                    value={newAsset.status}
                    onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="APPROVED">APPROVED</option>
                    <option value="ENCODING">ENCODING</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    File Size
                  </label>
                  <input
                    type="text"
                    value={newAsset.owner}
                    onChange={(e) => setNewAsset({ ...newAsset, owner: e.target.value })}
                    placeholder="e.g. 4.2 MB / 1.2 GB"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Format Specifications
                </label>
                <input
                  type="text"
                  value={newAsset.dimensions}
                  onChange={(e) => setNewAsset({ ...newAsset, dimensions: e.target.value })}
                  placeholder="e.g. 4K ProRes 422 / Lossless PDF"
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
                  Upload Asset
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
                DAM CATEGORY SPECIFICATION
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
                <span className="text-[#8C7D68]">Repository Volume:</span>
                <span className="text-[#FBBF24] font-bold">{selectedCapability.assetCount}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between">
                <span className="text-[#8C7D68]">Standard Ingest Formats:</span>
                <span className="text-emerald-400 font-bold">{selectedCapability.formatSpecs}</span>
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

export default DigitalAssetManagementDashboard;

