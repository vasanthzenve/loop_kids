import React, { useState, useMemo, useEffect } from 'react';

// Default initial records matching screenshot exactly
const INITIAL_NODES = [
  {
    id: 1,
    edge: 'BLR-Edge-01',
    subtext: 'South',
    region: '4.6 Mbps',
    bitrate: '—',
    status: 'HEALTHY',
    health: '—',
    latency: '14 ms',
    packetLoss: '0.01%',
    viewers: '248,500',
    cdnProvider: 'Loop Cloudflare Tier 1',
    protocol: 'CMAF / HLS Low Latency',
    failoverEdge: 'BLR-Edge-02 (Standby)'
  },
  {
    id: 2,
    edge: 'DEL-Edge-02',
    subtext: 'North',
    region: '4.1 Mbps',
    bitrate: '—',
    status: 'HEALTHY',
    health: '—',
    latency: '18 ms',
    packetLoss: '0.02%',
    viewers: '312,000',
    cdnProvider: 'Loop Akamai Edge-Tier',
    protocol: 'CMAF / HLS Low Latency',
    failoverEdge: 'DEL-Edge-03 (Standby)'
  },
  {
    id: 3,
    edge: 'MUM-Edge-04',
    subtext: 'West',
    region: '3.8 Mbps',
    bitrate: '—',
    status: 'DEGRADED',
    health: '—',
    latency: '42 ms',
    packetLoss: '0.84%',
    viewers: '194,200',
    cdnProvider: 'Loop Fastly PoP',
    protocol: 'HLS Fallback v2',
    failoverEdge: 'PUN-Edge-01 (Rerouting 30%)'
  },
  {
    id: 4,
    edge: 'HYD-Edge-03',
    subtext: 'South-Central',
    region: '4.4 Mbps',
    bitrate: '—',
    status: 'HEALTHY',
    health: '—',
    latency: '16 ms',
    packetLoss: '0.01%',
    viewers: '165,800',
    cdnProvider: 'Loop Cloudflare Tier 1',
    protocol: 'CMAF / HLS Low Latency',
    failoverEdge: 'BLR-Edge-01 (Mesh)'
  },
  {
    id: 5,
    edge: 'CCU-Edge-05',
    subtext: 'East',
    region: '4.2 Mbps',
    bitrate: '—',
    status: 'HEALTHY',
    health: '—',
    latency: '22 ms',
    packetLoss: '0.03%',
    viewers: '128,400',
    cdnProvider: 'Loop Akamai Edge-Tier',
    protocol: 'CMAF / HLS Low Latency',
    failoverEdge: 'BHU-Edge-01 (Standby)'
  },
  {
    id: 6,
    edge: 'DXB-Edge-01',
    subtext: 'Middle East',
    region: '4.8 Mbps',
    bitrate: '—',
    status: 'HEALTHY',
    health: '—',
    latency: '26 ms',
    packetLoss: '0.01%',
    viewers: '185,000',
    cdnProvider: 'Loop AWS CloudFront Global',
    protocol: 'CMAF / HLS Low Latency',
    failoverEdge: 'DOH-Edge-01 (Standby)'
  }
];

// 6 Planned Capabilities matching Screenshot 1 exactly (3x2 grid)
const PLANNED_BROADCAST_CAPABILITIES = [
  { id: 'live-broadcast', label: 'Live Broadcast', desc: 'Ultra-low latency sub-second live ingestion (SRT/RTMP) with automatic transcode ladders.', activeCapacity: '18 Active 4K Feeds', cluster: 'Edge Ingest Cluster A' },
  { id: 'language-feeds', label: 'Language Feeds', desc: 'Multi-audio track synchronization with zero-drift dynamic audio pass-through.', activeCapacity: '9 Live Commentary Feeds', cluster: 'Audio Syncer v3' },
  { id: 'cdn-monitoring', label: 'CDN Monitoring', desc: 'Multi-CDN steering with real-time RUM (Real User Measurement) route optimization.', activeCapacity: '42 Global Edge PoPs', cluster: 'DNS Traffic Arbiter' },
  { id: 'bitrate-monitoring', label: 'Bitrate Monitoring', desc: 'Adaptive bitrate (ABR) ladder telemetry monitoring buffer health and dropped chunks.', activeCapacity: '4.2 Mbps Network Mean', cluster: 'ABR Telemetry Engine' },
  { id: 'streaming-health', label: 'Streaming Health', desc: 'Continuous stream probe analyzing freeze frames, audio clipping, and black screen detection.', activeCapacity: '99.98% High Availability', cluster: 'QoE Sentinel AI' },
  { id: 'disaster-recovery', label: 'Disaster Recovery', desc: 'Instant hot-failover across primary and secondary satellite / terrestrial fiber links.', activeCapacity: '< 400ms Switchover', cluster: 'Failover Hub Tier 0' }
];

export const BroadcastingControlDashboard = () => {
  const [records, setRecords] = useState(INITIAL_NODES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('AVG BITRATE');
  
  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);

  // New Node form state
  const [newNode, setNewNode] = useState({
    edge: '',
    subtext: 'South',
    region: '4.5 Mbps',
    status: 'HEALTHY',
    cdnProvider: 'Loop Cloudflare Tier 1',
    viewers: '50,000'
  });

  // Fetch from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/content/broadcasting/nodes')
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
        item.edge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status === selectedStatusFilter;
      } else if (activeKpi === 'AVG BITRATE') {
        matchesStatus = true;
      } else if (activeKpi === 'EDGE NODES') {
        matchesStatus = true;
      } else if (activeKpi === 'LIVE STREAMS') {
        matchesStatus = item.status === 'HEALTHY';
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Add New Edge Node
  const handleCreateNode = (e) => {
    e.preventDefault();
    if (!newNode.edge.trim()) return;

    const newEntry = {
      id: Date.now(),
      edge: newNode.edge.trim(),
      subtext: newNode.subtext || 'Regional',
      region: newNode.region || '4.2 Mbps',
      bitrate: '—',
      status: newNode.status,
      health: '—',
      latency: '15 ms',
      packetLoss: '0.01%',
      viewers: newNode.viewers || '80,000',
      cdnProvider: newNode.cdnProvider,
      protocol: 'CMAF / HLS Low Latency',
      failoverEdge: 'Auto Mesh Failover'
    };

    fetch('http://localhost:8080/api/v1/content/broadcasting/nodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewNode({
      edge: '',
      subtext: 'South',
      region: '4.5 Mbps',
      status: 'HEALTHY',
      cdnProvider: 'Loop Cloudflare Tier 1',
      viewers: '50,000'
    });
  };

  // Export to CSV
  const handleExport = () => {
    const headers = 'ID,Edge,Subtext,Region,Bitrate,Status,Health\n';
    const rows = filteredRecords.map(r => 
      `"${r.id}","${r.edge}","${r.subtext}","${r.region}","${r.bitrate}","${r.status}","${r.health}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loop_broadcasting_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'HEALTHY':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062114] text-[#22C55E] border border-[#14532D]">
            HEALTHY
          </span>
        );
      case 'DEGRADED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#221607] text-[#F59E0B] border border-[#78350F]">
            DEGRADED
          </span>
        );
      case 'OFFLINE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#220B10] text-[#F87171] border border-[#7F1D1D]">
            OFFLINE
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

          {/* Main Title Row with Golden Radio Waves Broadcast Icon */}
          <div className="flex items-center gap-4">
            {/* Broadcast Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M12 12h.01" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              Broadcasting Control
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Live broadcast, CDN, bitrate &amp; disaster recovery.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (WITH RADIANT GOLD GLOW ON 'AVG BITRATE')
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Edge Nodes */}
          <div 
            onClick={() => setActiveKpi('EDGE NODES')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'EDGE NODES'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              EDGE NODES
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              42
            </div>
          </div>

          {/* 2. Live Streams */}
          <div 
            onClick={() => setActiveKpi('LIVE STREAMS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'LIVE STREAMS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              LIVE STREAMS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              18
            </div>
          </div>

          {/* 3. Avg Bitrate (Default Glowing Card from Screenshot: 4.2 Mbps) */}
          <div 
            onClick={() => setActiveKpi('AVG BITRATE')}
            className={`p-5 rounded-xl bg-[#120E08] border transition-all cursor-pointer relative overflow-visible ${
              activeKpi === 'AVG BITRATE'
                ? 'border-[#8F6622] shadow-[0_0_28px_rgba(245,158,11,0.28)] ring-1 ring-[#D4AF37]/40'
                : 'border-[#3D2D15] hover:border-[#7E5C20]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none rounded-xl" />
            <div className="relative z-10">
              <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A064] uppercase flex items-center justify-between">
                <span>AVG BITRATE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#FBBF24] mt-3 font-normal">
                4.2 Mbps
              </div>
            </div>
          </div>

          {/* 4. Uptime */}
          <div 
            onClick={() => setActiveKpi('UPTIME')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'UPTIME'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              UPTIME
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              99.98%
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
                    Edge Node Health
                  </div>
                  {['ALL', 'HEALTHY', 'DEGRADED', 'OFFLINE'].map((st) => (
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
            DATA TABLE (EDGE, REGION, BITRATE, STATUS, HEALTH, ACTION)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1F1911] bg-[#080604]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F1911] text-[11px] font-mono tracking-[0.2em] text-[#716654] uppercase bg-[#0B0906]">
                <th className="py-3.5 px-5 font-medium">EDGE</th>
                <th className="py-3.5 px-5 font-medium">REGION</th>
                <th className="py-3.5 px-5 font-medium">BITRATE</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
                <th className="py-3.5 px-5 font-medium">HEALTH</th>
                <th className="py-3.5 px-5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17130D]">
              {filteredRecords.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-[#110D08]/60 transition-colors group"
                >
                  {/* Edge & Subtext */}
                  <td className="py-4 px-5">
                    <div className="font-medium text-sm text-[#F5EDE2] group-hover:text-white">
                      {item.edge}
                    </div>
                    <div className="text-xs text-[#7A705E] mt-0.5">
                      {item.subtext}
                    </div>
                  </td>

                  {/* Region (Showing 4.6 Mbps / 4.1 Mbps / 3.8 Mbps as in Screenshot) */}
                  <td className="py-4 px-5 text-sm text-[#BDB2A0] font-normal">
                    {item.region}
                  </td>

                  {/* Bitrate */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.bitrate}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Health */}
                  <td className="py-4 px-5 text-sm text-[#7A705E]">
                    {item.health}
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
                    No edge nodes found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLANNED CAPABILITIES SECTION (EXACT 6 CARDS FROM SCREENSHOT 1)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-4 pt-4">
          {/* Header */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            PLANNED CAPABILITIES
          </div>

          {/* Grid of 6 Capability Tiles matching Screenshot 1 (3x2 grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PLANNED_BROADCAST_CAPABILITIES.map((cap) => {
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
          MODAL: EDGE NODE DETAIL & STREAM TELEMETRY
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
                EDGE NODE TELEMETRY · {selectedRecordForDetail.subtext}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {selectedRecordForDetail.edge}
              </h3>
              <p className="text-xs text-[#8A7964]">
                CDN Provider: <span className="text-white font-medium">{selectedRecordForDetail.cdnProvider}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">OPERATIONAL STATUS</span>
                <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">STREAM BITRATE</span>
                <span className="text-white">{selectedRecordForDetail.region}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">RTT LATENCY</span>
                <span className="text-emerald-400 font-bold">{selectedRecordForDetail.latency}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14]">
                <span className="text-[#6B6152] block text-[10px]">PACKET LOSS</span>
                <span className="text-white">{selectedRecordForDetail.packetLoss}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">CONCURRENT AUDIENCE</span>
              <span className="text-[#FBBF24] font-bold">{selectedRecordForDetail.viewers} Connected</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] text-xs font-mono space-y-1">
              <span className="text-[#6B6152] block text-[10px]">FAILOVER ROUTE</span>
              <span className="text-[#BDB2A0]">{selectedRecordForDetail.failoverEdge}</span>
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
          MODAL: DEPLOY NEW BROADCAST NODE
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
                INFRASTRUCTURE PROVISIONING
              </span>
              <h3 className="text-xl font-serif text-white font-normal">
                Deploy New Edge Node
              </h3>
            </div>

            <form onSubmit={handleCreateNode} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  Node Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={newNode.edge}
                  onChange={(e) => setNewNode({ ...newNode, edge: e.target.value })}
                  placeholder="e.g. MAA-Edge-06"
                  className="w-full bg-[#14100A] border border-[#261E14] focus:border-[#FBBF24] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Region Subtext
                  </label>
                  <input
                    type="text"
                    value={newNode.subtext}
                    onChange={(e) => setNewNode({ ...newNode, subtext: e.target.value })}
                    placeholder="e.g. South / North / MENA"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Target Bitrate
                  </label>
                  <input
                    type="text"
                    value={newNode.region}
                    onChange={(e) => setNewNode({ ...newNode, region: e.target.value })}
                    placeholder="e.g. 4.5 Mbps"
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
                    value={newNode.status}
                    onChange={(e) => setNewNode({ ...newNode, status: e.target.value })}
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="HEALTHY">HEALTHY</option>
                    <option value="DEGRADED">DEGRADED</option>
                    <option value="OFFLINE">OFFLINE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                    Audience Capacity
                  </label>
                  <input
                    type="text"
                    value={newNode.viewers}
                    onChange={(e) => setNewNode({ ...newNode, viewers: e.target.value })}
                    placeholder="e.g. 150,000"
                    className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A99D8B] font-mono text-[11px] mb-1">
                  CDN Provider Backbone
                </label>
                <select
                  value={newNode.cdnProvider}
                  onChange={(e) => setNewNode({ ...newNode, cdnProvider: e.target.value })}
                  className="w-full bg-[#14100A] border border-[#261E14] rounded-lg px-3 py-2 text-white outline-none"
                >
                  <option value="Loop Cloudflare Tier 1">Loop Cloudflare Tier 1</option>
                  <option value="Loop Akamai Edge-Tier">Loop Akamai Edge-Tier</option>
                  <option value="Loop Fastly PoP">Loop Fastly PoP</option>
                  <option value="Loop AWS CloudFront Global">Loop AWS CloudFront Global</option>
                </select>
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
                  Deploy Node
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
                BROADCAST ARCHITECTURE SPEC
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
                <span className="text-[#8C7D68]">Active Capacity:</span>
                <span className="text-[#FBBF24] font-bold">{selectedCapability.activeCapacity}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#14100A] border border-[#261E14] flex items-center justify-between">
                <span className="text-[#8C7D68]">Assigned Cluster:</span>
                <span className="text-emerald-400 font-bold">{selectedCapability.cluster}</span>
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

export default BroadcastingControlDashboard;

