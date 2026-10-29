import React, { useState, useMemo, useEffect } from 'react';

// Default initial records matching screenshot exactly
const INITIAL_AI_RECORDS = [
  {
    id: 1,
    asset: 'Loop S1 E03',
    subtext: 'Subtitle EN/HI/TA',
    operation: 'Whisper-X',
    engine: '—',
    status: 'DONE',
    runTime: '12 min',
    confidence: '99.4%',
    tokensUsed: '14,200',
    model: 'Whisper-X v3 Large',
    targetLang: 'English, Hindi, Tamil',
    outputFormat: 'SRT / VTT / WebVTT'
  },
  {
    id: 2,
    asset: 'Karthi promo',
    subtext: 'Trailer cut',
    operation: 'LoopAI v2',
    engine: '—',
    status: 'DONE',
    runTime: '8 min',
    confidence: '98.8%',
    tokensUsed: '8,400',
    model: 'LoopAI Vision-Cut 4K',
    targetLang: 'Tamil (Original)',
    outputFormat: 'MP4 ProRes / H.265'
  },
  {
    id: 3,
    asset: 'Loop Sports',
    subtext: 'Auto thumbnail',
    operation: 'LoopAI v2',
    engine: '—',
    status: 'QUEUED',
    runTime: '—',
    confidence: 'Pending',
    tokensUsed: '—',
    model: 'LoopAI Diffusion Frame-Gen',
    targetLang: 'Global',
    outputFormat: 'JPG / WebP 16:9 & 9:16'
  },
  {
    id: 4,
    asset: 'Jailer Special Feature',
    subtext: 'AI Auto Tags',
    operation: 'LoopAI v2',
    engine: '—',
    status: 'DONE',
    runTime: '4 min',
    confidence: '99.1%',
    tokensUsed: '5,100',
    model: 'Loop-BERT Semantic Tagger',
    targetLang: 'Tamil, Telugu, English',
    outputFormat: 'JSON Meta Tags'
  },
  {
    id: 5,
    asset: 'Ponniyin Selvan Docu',
    subtext: 'Multi-language Dub',
    operation: 'Whisper-X',
    engine: '—',
    status: 'DONE',
    runTime: '24 min',
    confidence: '97.6%',
    tokensUsed: '32,800',
    model: 'Neural Voice Sync v4',
    targetLang: 'Kannada, Malayalam, Hindi',
    outputFormat: 'Dolby 5.1 Stems'
  },
  {
    id: 6,
    asset: 'OTT Weekly Reel',
    subtext: 'AI Highlight Cut',
    operation: 'LoopAI v2',
    engine: '—',
    status: 'QUEUED',
    runTime: '—',
    confidence: 'Pending',
    tokensUsed: '—',
    model: 'LoopAI Scene-Ranker',
    targetLang: 'Multi-lingual',
    outputFormat: 'MP4 1080p Shorts'
  }
];

// 9 Planned Capabilities matching Screenshot 1 exactly (3x3 grid)
const PLANNED_AI_CAPABILITIES = [
  { id: 'ai-auto-tags', label: 'AI Auto Tags', desc: 'Automatic extraction of actors, genres, scene moods, and semantic keywords.', defaultEngine: 'Loop-BERT Semantic Tagger', throughput: '450 assets/hr' },
  { id: 'ai-desc-gen', label: 'AI Description Generator', desc: 'Context-aware synopses, loglines, and SEO metadata generated in 12 languages.', defaultEngine: 'Gemini 1.5 Pro / LoopLLM', throughput: '1,200 synopses/hr' },
  { id: 'ai-subtitle-gen', label: 'AI Subtitle Generator', desc: 'Timecode-accurate subtitles with speaker diarization and audio filtering.', defaultEngine: 'Whisper-X v3 Enterprise', throughput: '120 hrs/hr' },
  { id: 'ai-translation', label: 'AI Translation', desc: 'Colloquial translation preserving regional idioms and cinematic cadence.', defaultEngine: 'Neural Indic Translate v4', throughput: '80 languages' },
  { id: 'ai-thumb-gen', label: 'AI Thumbnail Generator', desc: 'Dynamic CTR-optimized posters and visual keyframes tailored to user affinity.', defaultEngine: 'LoopAI Diffusion Engine', throughput: '600 posters/hr' },
  { id: 'ai-trailer-gen', label: 'AI Trailer Generator', desc: 'Automated 30s & 60s teaser cut from peak emotional and action beats.', defaultEngine: 'LoopAI Vision-Cut 4K', throughput: '25 cuts/hr' },
  { id: 'ai-recommendations', label: 'AI Recommendations', desc: 'Graph neural network predicting churn, binge loops, and personalized rail ordering.', defaultEngine: 'Loop RecSys Core', throughput: '18M queries/sec' },
  { id: 'ai-category-pred', label: 'AI Category Prediction', desc: 'Multi-label taxonomy classifier predicting age rating, violence, and mood.', defaultEngine: 'Content-Guard AI', throughput: '900 assets/hr' },
  { id: 'trending-pred', label: 'Trending Prediction', desc: 'Predictive virality modeling across social sentiment and regional watch spikes.', defaultEngine: 'Trend-Forecast Pro', throughput: 'Real-time telemetry' }
];

export const AiContentManagementDashboard = () => {
  const [records, setRecords] = useState(INITIAL_AI_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('SUBTITLES');
  
  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);

  // New AI Job form state
  const [newJob, setNewJob] = useState({
    asset: '',
    subtext: 'Auto subtitle',
    operation: 'Whisper-X',
    model: 'Whisper-X v3 Large',
    targetLang: 'English, Tamil',
    priority: 'HIGH'
  });

  // Fetch from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/content/ai-jobs')
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
        item.operation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status === selectedStatusFilter;
      } else if (activeKpi === 'SUBTITLES') {
        matchesStatus = true;
      } else if (activeKpi === 'AUTO-TAGGED') {
        matchesStatus = item.subtext.toLowerCase().includes('tag') || item.status === 'DONE';
      } else if (activeKpi === 'TRAILERS CUT') {
        matchesStatus = item.subtext.toLowerCase().includes('trailer');
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Add New AI Job
  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJob.asset.trim()) return;

    const newEntry = {
      id: Date.now(),
      asset: newJob.asset.trim(),
      subtext: newJob.subtext,
      operation: newJob.operation,
      engine: '—',
      status: 'QUEUED',
      runTime: '—',
      confidence: 'Processing',
      tokensUsed: 'Queued',
      model: newJob.model,
      targetLang: newJob.targetLang,
      outputFormat: 'Automated Pipeline'
    };

    fetch('http://localhost:8080/api/v1/content/ai-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewJob({
      asset: '',
      subtext: 'Auto subtitle',
      operation: 'Whisper-X',
      model: 'Whisper-X v3 Large',
      targetLang: 'English, Tamil',
      priority: 'HIGH'
    });
  };

  // Export to CSV
  const handleExport = () => {
    const headers = 'ID,Asset,Operation,Engine,Status,RunTime\n';
    const rows = filteredRecords.map(r => 
      `"${r.id}","${r.asset} (${r.subtext})","${r.operation}","${r.engine}","${r.status}","${r.runTime}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loop_ai_content_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DONE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062114] text-[#22C55E] border border-[#14532D]">
            DONE
          </span>
        );
      case 'QUEUED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#220B10] text-[#F87171] border border-[#7F1D1D]">
            QUEUED
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#081B2F] text-[#38BDF8] border border-[#0369A1]">
            PROCESSING
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

          {/* Main Title Row with Golden AI Sparkle Icon */}
          <div className="flex items-center gap-4">
            {/* AI Sparkle Icon in Rounded Dark Square */}
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
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
                />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              AI Content Management
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Auto tags, subtitles, translation, thumbnails &amp; trailers.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (WITH RADIANT GOLD GLOW ON 'SUBTITLES')
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Auto-Tagged */}
          <div 
            onClick={() => setActiveKpi('AUTO-TAGGED')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'AUTO-TAGGED'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              AUTO-TAGGED
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              38 K
            </div>
          </div>

          {/* 2. Subtitles (Default Glowing Card from Screenshot) */}
          <div 
            onClick={() => setActiveKpi('SUBTITLES')}
            className={`p-5 rounded-xl bg-[#120E08] border transition-all cursor-pointer relative overflow-visible ${
              activeKpi === 'SUBTITLES'
                ? 'border-[#8F6622] shadow-[0_0_28px_rgba(245,158,11,0.28)] ring-1 ring-[#D4AF37]/40'
                : 'border-[#3D2D15] hover:border-[#7E5C20]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none rounded-xl" />
            <div className="relative z-10">
              <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A064] uppercase flex items-center justify-between">
                <span>SUBTITLES</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#FBBF24] mt-3 font-normal">
                12.4 K hrs
              </div>
            </div>
          </div>

          {/* 3. Trailers Cut */}
          <div 
            onClick={() => setActiveKpi('TRAILERS CUT')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'TRAILERS CUT'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              TRAILERS CUT
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              412
            </div>
          </div>

          {/* 4. Saved (₹1.8 Cr) */}
          <div 
            onClick={() => setActiveKpi('SAVED')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'SAVED'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              SAVED
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              ₹1.8 Cr
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
                    Pipeline Status
                  </div>
                  {['ALL', 'DONE', 'QUEUED', 'PROCESSING'].map((st) => (
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
            DATA TABLE (EXACT ASSET, OPERATION, ENGINE, STATUS, RUN TIME)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1F1911] bg-[#080604]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F1911] text-[11px] font-mono tracking-[0.2em] text-[#716654] uppercase bg-[#0B0906]">
                <th className="py-3.5 px-5 font-medium">ASSET</th>
                <th className="py-3.5 px-5 font-medium">OPERATION</th>
                <th className="py-3.5 px-5 font-medium">ENGINE</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
                <th className="py-3.5 px-5 font-medium">RUN TIME</th>
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

                  {/* Operation */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-normal">
                    {item.operation}
                  </td>

                  {/* Engine */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.engine}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Run Time */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-mono">
                    {item.runTime}
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
                    No AI jobs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLANNED CAPABILITIES SECTION (EXACT 3x3 GRID FROM SCREENSHOT 1)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          {/* Header */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* 3-Column Grid of 9 Capability Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PLANNED_AI_CAPABILITIES.map((cap) => {
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
          MODAL: AI JOB DETAIL & TELEMETRY
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
                AI PIPELINE TELEMETRY · {selectedRecordForDetail.operation}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {selectedRecordForDetail.asset}
              </h3>
              <p className="text-xs text-[#8A7964]">
                {selectedRecordForDetail.subtext}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">EXECUTION STATUS</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">TOTAL RUN TIME</span>
                <span className="text-white">{selectedRecordForDetail.runTime}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">CONFIDENCE SCORE</span>
                <span className="text-emerald-400 font-bold">{selectedRecordForDetail.confidence}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">MODEL ENGINE</span>
                <span className="text-white truncate block">{selectedRecordForDetail.model}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">TARGET LOCALIZATIONS</span>
              <span className="text-[#EDE7DE]">{selectedRecordForDetail.targetLang}</span>
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
          MODAL: TRIGGER NEW AI JOB
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
                AI AUTOMATION QUEUE
              </span>
              <h3 className="text-xl font-serif text-white font-normal">
                Dispatch Neural Content Job
              </h3>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Asset Name *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.asset}
                  onChange={(e) => setNewJob({ ...newJob, asset: e.target.value })}
                  placeholder="e.g. Master Teaser 4K"
                  className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Task Subtext
                </label>
                <input
                  type="text"
                  value={newJob.subtext}
                  onChange={(e) => setNewJob({ ...newJob, subtext: e.target.value })}
                  placeholder="e.g. Subtitle EN/HI/TA or Trailer cut"
                  className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Pipeline Engine
                  </label>
                  <select
                    value={newJob.operation}
                    onChange={(e) => setNewJob({ ...newJob, operation: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="Whisper-X">Whisper-X</option>
                    <option value="LoopAI v2">LoopAI v2</option>
                    <option value="LoopAI Vision">LoopAI Vision</option>
                    <option value="Gemini 1.5">Gemini 1.5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Priority
                  </label>
                  <select
                    value={newJob.priority}
                    onChange={(e) => setNewJob({ ...newJob, priority: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="HIGH">High (GPU Tier 1)</option>
                    <option value="NORMAL">Normal</option>
                    <option value="BATCH">Batch (Off-Peak)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Target Languages / Meta Tags
                </label>
                <input
                  type="text"
                  value={newJob.targetLang}
                  onChange={(e) => setNewJob({ ...newJob, targetLang: e.target.value })}
                  placeholder="e.g. English, Tamil, Telugu"
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
                  Queue Job
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
                NEURAL ENGINE SPECS
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
                <span className="text-[#8C7D68]">Base Model:</span>
                <span className="text-[#FBBF24] font-bold">{selectedCapability.defaultEngine}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between">
                <span className="text-[#8C7D68]">Cluster Throughput:</span>
                <span className="text-emerald-400 font-bold">{selectedCapability.throughput}</span>
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

export default AiContentManagementDashboard;

