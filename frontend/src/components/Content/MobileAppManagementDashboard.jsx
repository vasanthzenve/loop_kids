import React, { useState, useMemo, useEffect } from 'react';

// Default initial records matching screenshot exactly
const INITIAL_RELEASES = [
  {
    id: 1,
    platform: 'Android',
    subtext: '1.4.2',
    version: 'Production',
    channel: '—',
    status: 'ROLLING 25%',
    rollout: '—',
    buildNumber: '10402',
    bundleId: 'com.loop.ott.android',
    minOs: 'Android 8.0 (Oreo) +',
    crashFreeRate: '99.8%',
    activeDevices: '2.1 L Devices',
    storeUrl: 'Google Play Store Console',
    releaseNotes: 'Fixed 4K HDR playback stutter on Exynos chipsets, added PIP mode background playback.'
  },
  {
    id: 2,
    platform: 'iOS',
    subtext: '1.4.1',
    version: 'Production',
    channel: '—',
    status: 'REVIEW',
    rollout: '—',
    buildNumber: '10401',
    bundleId: 'com.loop.ott.ios',
    minOs: 'iOS 15.0 +',
    crashFreeRate: '99.9%',
    activeDevices: '85 K Devices',
    storeUrl: 'Apple App Store Connect',
    releaseNotes: 'Dolby Atmos spatial audio support and AirPlay 2 4K 60fps streaming optimizations.'
  },
  {
    id: 3,
    platform: 'Android TV',
    subtext: '1.2.0',
    version: 'Beta',
    channel: '—',
    status: 'INTERNAL',
    rollout: '—',
    buildNumber: '10200',
    bundleId: 'com.loop.ott.tv.android',
    minOs: 'Android TV 9.0 +',
    crashFreeRate: '99.4%',
    activeDevices: '25 K Devices',
    storeUrl: 'Internal Google Play Beta',
    releaseNotes: 'Leanback UI overhaul, universal D-pad navigation speedup, multi-audio language track selector.'
  },
  {
    id: 4,
    platform: 'Apple TV',
    subtext: '1.1.4',
    version: 'Production',
    channel: '—',
    status: 'LIVE 100%',
    rollout: '—',
    buildNumber: '10104',
    bundleId: 'com.loop.ott.tvos',
    minOs: 'tvOS 16.0 +',
    crashFreeRate: '99.95%',
    activeDevices: '12 K Devices',
    storeUrl: 'Apple tvOS App Store',
    releaseNotes: 'Siri Remote swipe gesture tuning and Top Shelf live preview integration.'
  },
  {
    id: 5,
    platform: 'Fire TV',
    subtext: '1.3.0',
    version: 'Beta',
    channel: '—',
    status: 'ROLLING 50%',
    rollout: '—',
    buildNumber: '10300',
    bundleId: 'com.loop.ott.firetv',
    minOs: 'Fire OS 7.0 +',
    crashFreeRate: '99.6%',
    activeDevices: '40 K Devices',
    storeUrl: 'Amazon Developer Portal',
    releaseNotes: 'Alexa Voice remote search hooks and hardware accelerated HEVC decoder.'
  },
  {
    id: 6,
    platform: 'Web PWA',
    subtext: '2.0.1',
    version: 'Production',
    channel: '—',
    status: 'LIVE 100%',
    rollout: '—',
    buildNumber: '20001',
    bundleId: 'app.loopott.com',
    minOs: 'Modern Chromium / Safari / Firefox',
    crashFreeRate: '99.98%',
    activeDevices: '500 K Web Users',
    storeUrl: 'Cloudflare Edge CDN',
    releaseNotes: 'Service worker offline caching, Widevine L1 & FairPlay CDM encryption pipeline.'
  }
];

// 7 Planned Capabilities matching Screenshot 1 exactly
const PLANNED_APP_CAPABILITIES = [
  { id: 'android', label: 'Android', desc: 'Google Play Store release tracks, AAB packaging, ProGuard mapping, and Play Integrity API.', targetArch: 'arm64-v8a, armeabi-v7a', activeTrack: 'Production Staged 25%' },
  { id: 'ios', label: 'iOS', desc: 'App Store Connect TestFlight pipelines, FairPlay DRM certs, and Apple Silicon native compilation.', targetArch: 'Universal (iOS / iPadOS)', activeTrack: 'App Review Pending' },
  { id: 'android-tv', label: 'Android TV', desc: 'Google TV launcher recommendations, Leanback focus state engine, and hardware 4K AV1 decoder.', targetArch: 'Android TV 9.0 - 14.0', activeTrack: 'Beta Internal 1.2.0' },
  { id: 'apple-tv', label: 'Apple TV', desc: 'tvOS native video player with automated frame-rate and dynamic range matching.', targetArch: 'tvOS 16+ Apple Silicon', activeTrack: 'Live Production 1.1.4' },
  { id: 'fire-tv', label: 'Fire TV', desc: 'Amazon Appstore catalog integration, Whisperplay second screen protocol, and Fire OS DRM.', targetArch: 'Fire OS 7 & 8', activeTrack: 'Staged Rollout 50%' },
  { id: 'web', label: 'Web', desc: 'Next-gen WebAssembly video demuxing, EME Widevine/FairPlay/PlayReady DRM, and PWA packaging.', targetArch: 'Universal HTML5 EME', activeTrack: 'Live Multi-CDN v2.0' },
  { id: 'version-control', label: 'Version Control', desc: 'Remote config kill-switch, semantic version enforcement, and forced update thresholding.', targetArch: 'Loop Cloud Config Hub', activeTrack: 'Automated Deprecation' }
];

export const MobileAppManagementDashboard = () => {
  const [records, setRecords] = useState(INITIAL_RELEASES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('CRASH-FREE');
  
  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);

  // New App Release form state
  const [newRelease, setNewRelease] = useState({
    platform: 'Android',
    subtext: '1.4.3',
    version: 'Production',
    status: 'ROLLING 25%',
    buildNumber: '10403',
    releaseNotes: 'Performance enhancements and bug fixes.'
  });

  // Fetch from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/content/mobile-apps/releases')
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
        item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status.includes(selectedStatusFilter);
      } else if (activeKpi === 'CRASH-FREE') {
        matchesStatus = true;
      } else if (activeKpi === 'PENDING REVIEW') {
        matchesStatus = item.status === 'REVIEW' || item.status === 'INTERNAL';
      } else if (activeKpi === 'INSTALLS') {
        matchesStatus = item.version === 'Production';
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Add New Release
  const handleCreateRelease = (e) => {
    e.preventDefault();
    if (!newRelease.platform.trim() || !newRelease.subtext.trim()) return;

    const newEntry = {
      id: Date.now(),
      platform: newRelease.platform,
      subtext: newRelease.subtext,
      version: newRelease.version,
      channel: '—',
      status: newRelease.status,
      rollout: '—',
      buildNumber: newRelease.buildNumber || '10403',
      bundleId: `com.loop.ott.${newRelease.platform.toLowerCase().replace(/\s+/g, '')}`,
      minOs: 'Current Supported OS',
      crashFreeRate: '99.9%',
      activeDevices: 'New Release',
      storeUrl: 'Deployment Target',
      releaseNotes: newRelease.releaseNotes || 'Scheduled production rollout.'
    };

    fetch('http://localhost:8080/api/v1/content/mobile-apps/releases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewRelease({
      platform: 'Android',
      subtext: '1.4.3',
      version: 'Production',
      status: 'ROLLING 25%',
      buildNumber: '10403',
      releaseNotes: 'Performance enhancements and bug fixes.'
    });
  };

  // Export to CSV
  const handleExport = () => {
    const headers = 'ID,Platform,VersionNumber,Track,Channel,Status,Rollout\n';
    const rows = filteredRecords.map(r => 
      `"${r.id}","${r.platform}","${r.subtext}","${r.version}","${r.channel}","${r.status}","${r.rollout}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loop_mobile_apps_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    if (status.includes('ROLLING')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#081B2F] text-[#38BDF8] border border-[#0369A1]">
          {status}
        </span>
      );
    }
    if (status === 'REVIEW') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0B1E38] text-[#60A5FA] border border-[#1E40AF]">
          REVIEW
        </span>
      );
    }
    if (status === 'INTERNAL') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#220B10] text-[#F87171] border border-[#7F1D1D]">
          INTERNAL
        </span>
      );
    }
    if (status.includes('LIVE')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062114] text-[#22C55E] border border-[#14532D]">
          {status}
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
            TOP HEADER AREA (EXACT SCREENSHOT 2 MATCH)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          {/* Small Category Breadcrumb */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            CONTENT &amp; OPS
          </div>

          {/* Main Title Row with Golden Smartphone Icon */}
          <div className="flex items-center gap-4">
            {/* Smartphone Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" />
                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} strokeLinecap="round" stroke="currentColor" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Mobile App Management
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Android, iOS, TV apps &amp; versioning.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (WITH RADIANT GOLD GLOW ON 'CRASH-FREE')
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Installs (3.2 L) */}
          <div 
            onClick={() => setActiveKpi('INSTALLS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'INSTALLS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              INSTALLS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              3.2 L
            </div>
          </div>

          {/* 2. Crash-Free (Default Glowing Card from Screenshot: 99.7%) */}
          <div 
            onClick={() => setActiveKpi('CRASH-FREE')}
            className={`p-5 rounded-xl bg-[#120E08] border transition-all cursor-pointer relative overflow-visible ${
              activeKpi === 'CRASH-FREE'
                ? 'border-[#8F6622] shadow-[0_0_28px_rgba(245,158,11,0.28)] ring-1 ring-[#D4AF37]/40'
                : 'border-[#3D2D15] hover:border-[#7E5C20]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none rounded-xl" />
            <div className="relative z-10">
              <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A064] uppercase flex items-center justify-between">
                <span>CRASH-FREE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#FBBF24] mt-3 font-normal">
                99.7%
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
              2
            </div>
          </div>

          {/* 4. Beta Testers */}
          <div 
            onClick={() => setActiveKpi('BETA TESTERS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'BETA TESTERS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              BETA TESTERS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              840
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
                    Release Track
                  </div>
                  {['ALL', 'ROLLING', 'REVIEW', 'INTERNAL', 'LIVE'].map((st) => (
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
            DATA TABLE (PLATFORM, VERSION, CHANNEL, STATUS, ROLLOUT, ACTION)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1F1911] bg-[#080604]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F1911] text-[11px] font-mono tracking-[0.2em] text-[#716654] uppercase bg-[#0B0906]">
                <th className="py-3.5 px-5 font-medium">PLATFORM</th>
                <th className="py-3.5 px-5 font-medium">VERSION</th>
                <th className="py-3.5 px-5 font-medium">CHANNEL</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
                <th className="py-3.5 px-5 font-medium">ROLLOUT</th>
                <th className="py-3.5 px-5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17130D]">
              {filteredRecords.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-[#110D08]/60 transition-colors group"
                >
                  {/* Platform & Version Code */}
                  <td className="py-4 px-5">
                    <div className="font-medium text-sm text-[#F5EDE2] group-hover:text-white">
                      {item.platform}
                    </div>
                    <div className="text-xs text-[#7A705E] mt-0.5 font-mono">
                      {item.subtext}
                    </div>
                  </td>

                  {/* Version Track (Showing Production / Beta as in Screenshot) */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-normal">
                    {item.version}
                  </td>

                  {/* Channel */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.channel}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Rollout */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.rollout}
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
                    No releases found matching your filters.
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

          {/* Grid of 7 Capability Tiles matching Screenshot 1 (3-column grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PLANNED_APP_CAPABILITIES.map((cap) => {
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
          MODAL: APP RELEASE DETAIL & TELEMETRY
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
                APPLICATION RELEASE DOSSIER · {selectedRecordForDetail.version}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal truncate">
                {selectedRecordForDetail.platform} v{selectedRecordForDetail.subtext}
              </h3>
              <p className="text-xs text-[#8A7964]">
                Bundle: <span className="text-white font-mono">{selectedRecordForDetail.bundleId}</span> · Build #{selectedRecordForDetail.buildNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">ROLLOUT STATUS</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">CRASH-FREE USERS</span>
                <span className="text-emerald-400 font-bold">{selectedRecordForDetail.crashFreeRate}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">MINIMUM OS TARGET</span>
                <span className="text-white truncate block">{selectedRecordForDetail.minOs}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">DEPLOYED BASE</span>
                <span className="text-white">{selectedRecordForDetail.activeDevices}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">RELEASE HIGHLIGHTS</span>
              <span className="text-[#EDE7DE]">{selectedRecordForDetail.releaseNotes}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">DISTRIBUTION TARGET</span>
              <span className="text-[#BDB2A0]">{selectedRecordForDetail.storeUrl}</span>
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
          MODAL: CREATE NEW APP RELEASE
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
                RELEASE MANAGEMENT
              </span>
              <h3 className="text-xl font-serif text-white font-normal">
                Stage New App Release
              </h3>
            </div>

            <form onSubmit={handleCreateRelease} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Platform *
                  </label>
                  <select
                    value={newRelease.platform}
                    onChange={(e) => setNewRelease({ ...newRelease, platform: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                    <option value="Android TV">Android TV</option>
                    <option value="Apple TV">Apple TV</option>
                    <option value="Fire TV">Fire TV</option>
                    <option value="Web PWA">Web PWA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Version Tag *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRelease.subtext}
                    onChange={(e) => setNewRelease({ ...newRelease, subtext: e.target.value })}
                    placeholder="e.g. 1.4.3"
                    className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Track
                  </label>
                  <select
                    value={newRelease.version}
                    onChange={(e) => setNewRelease({ ...newRelease, version: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="Production">Production</option>
                    <option value="Beta">Beta</option>
                    <option value="Alpha">Alpha</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newRelease.status}
                    onChange={(e) => setNewRelease({ ...newRelease, status: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="ROLLING 25%">ROLLING 25%</option>
                    <option value="ROLLING 50%">ROLLING 50%</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="LIVE 100%">LIVE 100%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Release Notes
                </label>
                <textarea
                  rows={3}
                  value={newRelease.releaseNotes}
                  onChange={(e) => setNewRelease({ ...newRelease, releaseNotes: e.target.value })}
                  placeholder="Highlights for App Store / Google Play"
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
                  Stage Release
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
                PLATFORM SDK SPECIFICATION
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
                <span className="text-[#8C7D68]">Target Architecture:</span>
                <span className="text-[#FBBF24] font-bold">{selectedCapability.targetArch}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between">
                <span className="text-[#8C7D68]">Current Track:</span>
                <span className="text-emerald-400 font-bold">{selectedCapability.activeTrack}</span>
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

export default MobileAppManagementDashboard;

