import React, { useState, useMemo, useEffect, useRef } from 'react';

// Default initial production houses representing major Indian studios
const SAMPLE_PRODUCTION_HOUSES = [
  {
    id: 1,
    company: 'Hombale Films',
    contactPerson: 'Vijay Kiragandur',
    language: 'Kannada',
    region: 'South',
    phone: '+91 98450 11223',
    email: 'deals@hombalefilms.in',
    status: 'NEGOTIATING',
    nextAction: 'Review Final Term Sheet v3',
    contentOffered: 'Kantara Prequel + 3 Film Slate',
    notes: 'Pan-India theatrical & post-theatrical SVOD exclusive window (60 days).',
    dealValue: '₹35 Cr',
    headquarters: 'Bengaluru, Karnataka',
    tentpoleTitles: ['KGF Chapter 1 & 2', 'Kantara', 'Salaar: Part 1'],
    lastContacted: '2 days ago'
  },
  {
    id: 2,
    company: 'Lyca Productions',
    contactPerson: 'Subaskaran A.',
    language: 'Tamil',
    region: 'South',
    phone: '+91 98400 44556',
    email: 'acquisitions@lycaproductions.com',
    status: 'SIGNED',
    nextAction: 'Execute Master Deed & Digital Delivery',
    contentOffered: 'Vettaiyan + Indian 2 Digital Rights',
    notes: 'Signed multi-territory SVOD rights with Dolby Atmos audio stems.',
    dealValue: '₹62 Cr',
    headquarters: 'Chennai, Tamil Nadu',
    tentpoleTitles: ['Ponniyin Selvan 1 & 2', '2.0', 'Kaththi'],
    lastContacted: 'Yesterday'
  },
  {
    id: 3,
    company: 'Mythri Movie Makers',
    contactPerson: 'Naveen Yerneni',
    language: 'Telugu',
    region: 'South',
    phone: '+91 98480 33445',
    email: 'content@mythriofficial.com',
    status: 'MEETING SCHEDULED',
    nextAction: 'Zoom Call with Head of OTT, Thursday 4 PM',
    contentOffered: 'Pushpa 2 The Rule (South Dubs)',
    notes: 'Discussing 4-week post-theatrical OTT holdback and TVOD window.',
    dealValue: '₹48 Cr',
    headquarters: 'Hyderabad, Telangana',
    tentpoleTitles: ['Pushpa: The Rise', 'Waltair Veerayya', 'Rangasthalam'],
    lastContacted: '3 days ago'
  },
  {
    id: 4,
    company: 'Geetha Arts',
    contactPerson: 'Allu Aravind',
    language: 'Telugu',
    region: 'South',
    phone: '+91 98490 55667',
    email: 'syndication@geethaarts.in',
    status: 'INTERESTED',
    nextAction: 'Send Catalogue & Revenue Share Deck',
    contentOffered: 'Family Drama & Rom-com Franchise Slate',
    notes: 'Keen on regional subscription revenue share model with minimum guarantee.',
    dealValue: '₹18 Cr',
    headquarters: 'Hyderabad, Telangana',
    tentpoleTitles: ['Ala Vaikunthapurramuloo', 'Magadheera', 'Ghajini'],
    lastContacted: '1 week ago'
  },
  {
    id: 5,
    company: 'SVF Entertainment',
    contactPerson: 'Shrikant Mohta',
    language: 'Bengali',
    region: 'East',
    phone: '+91 98300 22334',
    email: 'rights@svf.in',
    status: 'CONTACTED',
    nextAction: 'Follow up on Introductory NDA',
    contentOffered: 'Bengali Neo-Noir & Festival Winner Package (12 Films)',
    notes: 'Initial reach-out completed by regional acquisitions lead.',
    dealValue: '₹8.5 Cr',
    headquarters: 'Kolkata, West Bengal',
    tentpoleTitles: ['Chander Pahar', 'Autograph', 'Baishe Srabon'],
    lastContacted: '4 days ago'
  },
  {
    id: 6,
    company: 'Sithara Entertainments',
    contactPerson: 'Suryadevara Naga Vamsi',
    language: 'Telugu',
    region: 'South',
    phone: '+91 99480 66778',
    email: 'vamsi@sitharaent.com',
    status: 'FOLLOW UP',
    nextAction: 'Send Revised Royalty Tier Proposals',
    contentOffered: 'Youth Urban Comedy + Crime Thriller Slate',
    notes: 'Requested adjustment on satellite linear holdback clause.',
    dealValue: '₹14 Cr',
    headquarters: 'Hyderabad, Telangana',
    tentpoleTitles: ['Jersey', 'Tillu Square', 'Bheemla Nayak'],
    lastContacted: '5 days ago'
  },
  {
    id: 7,
    company: 'Drishyam Films',
    contactPerson: 'Manish Mundra',
    language: 'Hindi',
    region: 'National',
    phone: '+91 98200 99881',
    email: 'sales@drishyamfilms.com',
    status: 'SIGNED',
    nextAction: 'Ingest Master ProRes Files to DAM',
    contentOffered: '5 Indie Award-Winning Feature Dramas',
    notes: 'Complete 4K HDR deliverables ready on AWS S3 bucket.',
    dealValue: '₹6.2 Cr',
    headquarters: 'Mumbai, Maharashtra',
    tentpoleTitles: ['Newton', 'Masaan', 'Ankhon Dekhi'],
    lastContacted: 'Yesterday'
  }
];

const PIPELINE_STAGES = [
  'CONTACTED',
  'INTERESTED',
  'MEETING SCHEDULED',
  'NEGOTIATING',
  'SIGNED',
  'DECLINED',
  'FOLLOW UP'
];

export const ProducerPipelineDashboard = () => {
  // Contacts state
  const [records, setRecords] = useState(SAMPLE_PRODUCTION_HOUSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedContactForDetail, setSelectedContactForDetail] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // File upload input ref for CSV import
  const fileInputRef = useRef(null);

  // New Contact Form State
  const [newContact, setNewContact] = useState({
    company: '',
    contactPerson: '',
    language: 'Tamil',
    region: 'South',
    phone: '',
    email: '',
    status: 'CONTACTED',
    nextAction: '',
    contentOffered: '',
    notes: '',
    dealValue: ''
  });

  // Fetch real records from Spring Boot backend if available
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/production-houses/records')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch(() => {});
  }, []);

  // Compute stage counts dynamically
  const stageCounts = useMemo(() => {
    const counts = {
      CONTACTED: 0,
      INTERESTED: 0,
      'MEETING SCHEDULED': 0,
      NEGOTIATING: 0,
      SIGNED: 0,
      DECLINED: 0,
      'FOLLOW UP': 0
    };
    records.forEach(item => {
      if (counts[item.status] !== undefined) {
        counts[item.status]++;
      }
    });
    return counts;
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.contactPerson && item.contactPerson.toLowerCase().includes(q)) ||
        (item.language && item.language.toLowerCase().includes(q)) ||
        (item.region && item.region.toLowerCase().includes(q)) ||
        (item.status && item.status.toLowerCase().includes(q));

      const matchesStage = selectedStageFilter === 'ALL' || item.status === selectedStageFilter;
      return matchesSearch && matchesStage;
    });
  }, [records, searchQuery, selectedStageFilter]);

  // Handle stage card click
  const handleStageCardClick = (stage) => {
    if (selectedStageFilter === stage) {
      setSelectedStageFilter('ALL');
    } else {
      setSelectedStageFilter(stage);
    }
  };

  // Toast helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Handle Create New Contact
  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!newContact.company.trim()) return;

    const newEntry = {
      id: Date.now(),
      company: newContact.company.trim(),
      contactPerson: newContact.contactPerson.trim() || 'Head of Acquisition',
      language: newContact.language || 'Tamil',
      region: newContact.region || 'South',
      phone: newContact.phone || '+91 98000 00000',
      email: newContact.email || `contact@${newContact.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
      status: newContact.status,
      nextAction: newContact.nextAction || 'Schedule introductory alignment call',
      contentOffered: newContact.contentOffered || 'Feature Films / Series Slate',
      notes: newContact.notes || 'Added from Producer Pipeline dashboard.',
      dealValue: newContact.dealValue || '₹10 Cr'
    };

    setRecords(prev => [newEntry, ...prev]);
    setIsAddModalOpen(false);
    setNewContact({
      company: '',
      contactPerson: '',
      language: 'Tamil',
      region: 'South',
      phone: '',
      email: '',
      status: 'CONTACTED',
      nextAction: '',
      contentOffered: '',
      notes: '',
      dealValue: ''
    });

    // POST to backend
    fetch('http://localhost:8080/api/v1/crm/production-houses/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    showToast(`Added "${newEntry.company}" to pipeline!`);
  };

  // Handle CSV file upload & parsing
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
      if (lines.length <= 1) {
        showToast('CSV file is empty or only contains headers.');
        return;
      }

      // Expected columns: company, contact_person, language, region, phone, email, status, content_offered, notes
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
      const parsedContacts = [];

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim().replace(/^"|"$/g, ''));
        if (parts.length >= 2 && parts[0]) {
          parsedContacts.push({
            id: Date.now() + i,
            company: parts[0] || 'Unknown Studio',
            contactPerson: parts[1] || 'Producer / Lead',
            language: parts[2] || 'Multi-lingual',
            region: parts[3] || 'National',
            phone: parts[4] || '+91 98000 00000',
            email: parts[5] || 'deals@studio.com',
            status: (parts[6] && PIPELINE_STAGES.includes(parts[6].toUpperCase())) ? parts[6].toUpperCase() : 'CONTACTED',
            contentOffered: parts[7] || 'Catalog Titles',
            notes: parts[8] || 'Imported via CSV file.',
            nextAction: 'Review imported studio profile',
            dealValue: 'TBD'
          });
        }
      }

      if (parsedContacts.length > 0) {
        setRecords(prev => [...parsedContacts, ...prev]);
        setIsImportModalOpen(false);
        showToast(`Successfully imported ${parsedContacts.length} production house contacts!`);

        // POST bulk to backend
        fetch('http://localhost:8080/api/v1/crm/production-houses/bulk-import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsedContacts)
        }).catch(() => {});
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  // Download sample CSV template
  const downloadSampleTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "company,contact_person,language,region,phone,email,status,content_offered,notes\n" +
      "KRG Studios,Karthik Gowda,Kannada,South,+91 98450 99887,karthik@krg.in,INTERESTED,3 Kannada Tentpoles,SVOD 60-day window\n" +
      "Dream Warrior Pictures,SR Prabhu,Tamil,South,+91 98401 55443,prabhu@dreamwarrior.com,MEETING SCHEDULED,Kaithi Universe Spin-off,Theatrical OTT co-financing\n" +
      "Viacom18 Studios,Ajit Andhare,Hindi,National,+91 98200 11442,ajit.a@viacom18.com,NEGOTIATING,4K Digital Library,Exclusive 3-year license";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "producer_pipeline_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded sample CSV template.");
  };

  // Render Status Badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'SIGNED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#062E1E] text-[#34D399] border border-[#065F46]">
            SIGNED
          </span>
        );
      case 'NEGOTIATING':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#2B2308] text-[#FBBF24] border border-[#854D0E]">
            NEGOTIATING
          </span>
        );
      case 'MEETING SCHEDULED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#0C1B2E] text-[#60A5FA] border border-[#1E40AF]">
            MEETING
          </span>
        );
      case 'INTERESTED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#1A1C0E] text-[#A3E635] border border-[#365314]">
            INTERESTED
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#141416] text-[#A1A1AA] border border-[#27272A]">
            CONTACTED
          </span>
        );
      case 'FOLLOW UP':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#281807] text-[#F59E0B] border border-[#78350F]">
            FOLLOW UP
          </span>
        );
      case 'DECLINED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#280B0B] text-[#F87171] border border-[#7F1D1D]">
            DECLINED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#141416] text-[#A1A1AA] border border-[#27272A]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full min-h-full bg-[#050403] text-[#EDE7DE] p-4 sm:p-6 lg:p-10 select-none font-sans">
      <div className="max-w-[1520px] mx-auto space-y-6 sm:space-y-8">

        {/* ═══════════════════════════════════════════════════════════════
            TOP HEADER AREA (MATCHING EXACT SCREENSHOT)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-2">
          {/* Small Category Breadcrumb */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            PRODUCTION HOUSE CRM
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
            Producer Pipeline
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide pt-1">
            300+ production houses contacted across Tamil, Telugu, Kannada, Malayalam, Hindi, Bengali, Marathi.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TOP ACTION BUTTONS: Import CSV & + Add (EXACT SCREENSHOT MATCH)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-3 pt-1">
          {/* Import CSV Button with Tray/Arrow Up Icon */}
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider bg-[#100D09] hover:bg-[#1A140B] text-[#EDE7DE] border border-[#2B2317] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {/* Upload tray icon from screenshot */}
            <svg className="w-4 h-4 text-[#A89880]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Import CSV</span>
          </button>

          {/* + Add Button (Radiant Amber from Screenshot) */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 text-[#050403] shadow-[0_4px_22px_rgba(245,158,11,0.32)] active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-base font-extrabold leading-none">+</span>
            <span>Add</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            7 PIPELINE STAGE KPI CARDS (EXACT MATCH SCREENSHOT)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {PIPELINE_STAGES.map((stage) => {
            const count = stageCounts[stage] || 0;
            const isSelected = selectedStageFilter === stage;

            return (
              <div
                key={stage}
                onClick={() => handleStageCardClick(stage)}
                className={`p-4 rounded-xl bg-[#0B0907] border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'border-[#7E5C20] shadow-[0_0_22px_rgba(200,140,40,0.22)] bg-[#110D08]'
                    : 'border-[#211B13] hover:border-[#382D1E]'
                }`}
              >
                <div className="text-[10px] font-mono font-medium tracking-[0.16em] text-[#86755E] uppercase truncate">
                  {stage}
                </div>
                <div className="text-xl sm:text-2xl font-serif text-[#F3E3C5] font-normal mt-2">
                  {count}
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SEARCH & RECORD COUNTER BAR (MATCHING SCREENSHOT)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="relative flex items-center">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#736350]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, contact, language..."
            className="w-full pl-10 pr-24 py-2.5 bg-[#0B0907] border border-[#211B13] rounded-lg text-sm text-[#EDE7DE] placeholder-[#5A4F41] focus:outline-none focus:border-[#7E5C20] focus:ring-1 focus:ring-[#7E5C20] transition-colors"
          />

          {/* Counter "X of Y" from Screenshot */}
          <div className="absolute right-3 text-xs font-mono text-[#736350]">
            {filteredRecords.length} of {records.length}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MAIN PRODUCTION HOUSES TABLE (EXACT MATCH SCREENSHOT)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0B0907] border border-[#211B13] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A140D] text-[11px] font-mono uppercase tracking-[0.16em] text-[#7E6E59]">
                  <th className="py-4 px-5 font-medium">COMPANY</th>
                  <th className="py-4 px-5 font-medium">CONTACT</th>
                  <th className="py-4 px-5 font-medium">LANG</th>
                  <th className="py-4 px-5 font-medium">REGION</th>
                  <th className="py-4 px-5 font-medium">PHONE</th>
                  <th className="py-4 px-5 font-medium">EMAIL</th>
                  <th className="py-4 px-5 font-medium">STATUS</th>
                  <th className="py-4 px-5 font-medium">NEXT ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16120D] text-sm">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 px-6 text-center text-[#7E6E59] text-xs leading-relaxed font-sans">
                      No contacts. Click "Add" or import a CSV with columns: company, contact_person, language, region, phone, email, status, content_offered, notes
                      
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setRecords(SAMPLE_PRODUCTION_HOUSES)}
                          className="px-3.5 py-1.5 text-xs font-mono text-[#FBBF24] bg-[#181209] border border-[#483311] rounded-lg hover:bg-[#261C0D]"
                        >
                          Restore Sample Studios (7)
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsImportModalOpen(true)}
                          className="px-3.5 py-1.5 text-xs font-mono text-[#EDE7DE] bg-[#100D09] border border-[#2B2317] rounded-lg hover:bg-[#1A140B]"
                        >
                          Upload CSV File
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedContactForDetail(item)}
                      className="hover:bg-[#120F0B]/80 transition-colors group cursor-pointer"
                    >
                      {/* 1. COMPANY */}
                      <td className="py-4 px-5 font-medium text-[#EDE7DE] group-hover:text-white transition-colors">
                        <div className="font-semibold text-sm">{item.company}</div>
                        {item.dealValue && (
                          <div className="text-[11px] font-mono text-[#FBBF24]/80 mt-0.5">{item.dealValue}</div>
                        )}
                      </td>

                      {/* 2. CONTACT */}
                      <td className="py-4 px-5 text-[#C9BFB0] text-sm">
                        {item.contactPerson}
                      </td>

                      {/* 3. LANG */}
                      <td className="py-4 px-5 text-[#9A8A75] text-sm font-mono">
                        {item.language}
                      </td>

                      {/* 4. REGION */}
                      <td className="py-4 px-5 text-[#9A8A75] text-sm font-mono">
                        {item.region}
                      </td>

                      {/* 5. PHONE */}
                      <td className="py-4 px-5 text-[#9A8A75] text-xs font-mono">
                        {item.phone}
                      </td>

                      {/* 6. EMAIL */}
                      <td className="py-4 px-5 text-[#9A8A75] text-xs font-mono truncate max-w-[180px]">
                        {item.email}
                      </td>

                      {/* 7. STATUS */}
                      <td className="py-4 px-5">
                        {renderStatusBadge(item.status)}
                      </td>

                      {/* 8. NEXT ACTION */}
                      <td className="py-4 px-5 text-[#C9BFB0] text-xs max-w-[240px]">
                        <div className="truncate">{item.nextAction || '—'}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Controls strip */}
        <div className="flex items-center justify-between text-xs font-mono text-[#736350] pt-2">
          <div className="flex items-center gap-4">
            <span>Filter Active: <strong className="text-[#FBBF24]">{selectedStageFilter}</strong></span>
            {selectedStageFilter !== 'ALL' && (
              <button
                onClick={() => setSelectedStageFilter('ALL')}
                className="text-[#9A8A75] hover:text-white underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                if (records.length > 0) {
                  setRecords([]);
                  showToast('Pipeline cleared. Exact empty state now visible.');
                } else {
                  setRecords(SAMPLE_PRODUCTION_HOUSES);
                  showToast('Restored 7 sample production houses.');
                }
              }}
              className="hover:text-[#FBBF24] transition-colors cursor-pointer"
            >
              {records.length > 0 ? 'Clear All Contacts (View Screenshot Empty State)' : 'Load 7 Indian Production Houses'}
            </button>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: + Add Production House
      ═══════════════════════════════════════════════════════════════ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#211B13] flex items-center justify-between bg-[#14100B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Add Production House</h3>
                  <p className="text-xs text-[#8A7964]">Register studio contact into acquisition pipeline</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Studio / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mythri Movie Makers"
                    value={newContact.company}
                    onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Naveen Yerneni"
                    value={newContact.contactPerson}
                    onChange={(e) => setNewContact({ ...newContact, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Primary Language
                  </label>
                  <select
                    value={newContact.language}
                    onChange={(e) => setNewContact({ ...newContact, language: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Region
                  </label>
                  <select
                    value={newContact.region}
                    onChange={(e) => setNewContact({ ...newContact, region: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="South">South</option>
                    <option value="North">North</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                    <option value="National">National</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Pipeline Stage
                  </label>
                  <select
                    value={newContact.status}
                    onChange={(e) => setNewContact({ ...newContact, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    {PIPELINE_STAGES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Estimated Deal Value
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25 Cr"
                    value={newContact.dealValue}
                    onChange={(e) => setNewContact({ ...newContact, dealValue: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98..."
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="deals@studio.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Content Offered / Slate
                </label>
                <input
                  type="text"
                  placeholder="e.g. Action Blockbuster + 2 Direct-to-Digital Releases"
                  value={newContact.contentOffered}
                  onChange={(e) => setNewContact({ ...newContact, contentOffered: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Next Action
                </label>
                <input
                  type="text"
                  placeholder="e.g. Send Term Sheet v2 by Thursday"
                  value={newContact.nextAction}
                  onChange={(e) => setNewContact({ ...newContact, nextAction: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#211B13]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-[#A89880] hover:text-white bg-[#15120D] border border-[#2E2417]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] tracking-wide shadow-md"
                >
                  Add to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: Import CSV
      ═══════════════════════════════════════════════════════════════ */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#211B13] flex items-center justify-between bg-[#14100B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Import Production Houses CSV</h3>
                  <p className="text-xs text-[#8A7964]">Upload spreadsheet to populate pipeline</p>
                </div>
              </div>
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-2">
                <div className="text-xs font-mono uppercase text-[#B89255] tracking-wider">
                  Required CSV Columns
                </div>
                <div className="text-xs font-mono text-[#C9BFB0] leading-relaxed break-words bg-[#0E0C09] p-2.5 rounded border border-[#1D1811]">
                  company, contact_person, language, region, phone, email, status, content_offered, notes
                </div>
              </div>

              {/* Upload Drag & Drop Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#3E2D12] hover:border-[#FBBF24] p-8 rounded-xl bg-[#090705] text-center cursor-pointer transition-colors group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <svg className="w-10 h-10 text-[#6B5A46] group-hover:text-[#FBBF24] mx-auto mb-3 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-sm font-semibold text-white group-hover:text-[#FBBF24] transition-colors">
                  Click to select a .csv file
                </div>
                <p className="text-xs text-[#7A6B58] mt-1 font-mono">
                  Standard UTF-8 comma-separated spreadsheet
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={downloadSampleTemplate}
                  className="text-xs font-mono text-[#FBBF24] hover:underline flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Sample Template (.csv)
                </button>

                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-[#A89880] hover:text-white bg-[#15120D] border border-[#2E2417]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DRAWER / MODAL: STUDIO DEAL ROOM PROFILE
      ═══════════════════════════════════════════════════════════════ */}
      {selectedContactForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3D290F] to-[#785419] flex items-center justify-center text-lg font-serif text-[#FBBF24] border border-[#926822]">
                  {selectedContactForDetail.company.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-serif text-white">{selectedContactForDetail.company}</h3>
                    {renderStatusBadge(selectedContactForDetail.status)}
                  </div>
                  <p className="text-xs text-[#8A7964] mt-0.5 font-mono">
                    {selectedContactForDetail.contactPerson} · {selectedContactForDetail.language} ({selectedContactForDetail.region})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedContactForDetail(null)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {/* Quick Deal Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Deal Valuation</div>
                  <div className="text-lg font-serif text-[#FBBF24] mt-1">{selectedContactForDetail.dealValue || '₹25 Cr'}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Territory Scope</div>
                  <div className="text-base font-serif text-white mt-1">India + Worldwide</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Next Milestone</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-1 truncate">
                    {selectedContactForDetail.nextAction || 'Agreement Review'}
                  </div>
                </div>
              </div>

              {/* Deal Details */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Content Offered &amp; Acquisition Rights
                </div>
                <div className="text-sm font-medium text-[#EDE7DE]">
                  {selectedContactForDetail.contentOffered || 'Full Theatrical & SVOD Rights Package'}
                </div>
                <p className="text-xs text-[#8A7964] leading-relaxed">
                  {selectedContactForDetail.notes || 'No legal holdback exceptions specified.'}
                </p>
              </div>

              {/* Contact Information */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Primary Studio Contact
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[#7A6B58] block">Direct Phone:</span>
                    <span className="text-[#EDE7DE]">{selectedContactForDetail.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Corporate Email:</span>
                    <span className="text-[#EDE7DE]">{selectedContactForDetail.email}</span>
                  </div>
                </div>
              </div>

              {/* Pipeline Stage Transition */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Fast Stage Transition
                </div>
                <div className="flex flex-wrap gap-2">
                  {PIPELINE_STAGES.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        const updated = { ...selectedContactForDetail, status: s };
                        setSelectedContactForDetail(updated);
                        setRecords(prev => prev.map(c => c.id === updated.id ? updated : c));
                        showToast(`Updated ${updated.company} status to "${s}"`);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono transition-colors border ${
                        selectedContactForDetail.status === s
                          ? 'border-[#FBBF24] bg-[#2A1D09] text-[#FBBF24] font-bold'
                          : 'border-[#2D2316] bg-[#110D09] text-[#9A8A75] hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Scheduled Zoom alignment call with ${selectedContactForDetail.contactPerson}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#221808] border border-[#5E4215] text-[#FBBF24] hover:bg-[#332209]"
                >
                  Schedule Call
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Dispatched NDA & Term Sheet draft to ${selectedContactForDetail.email}`);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#14120D] border border-[#2D2316] text-[#C9BFB0] hover:text-white"
                >
                  Send NDA
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContactForDetail(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#241E15] text-[#D8CFBF] hover:text-white"
              >
                Done
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

export default ProducerPipelineDashboard;

