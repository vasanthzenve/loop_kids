import React, { useState, useMemo, useEffect } from 'react';

// Initial records matching Screenshot 2 exactly
const INITIAL_SUBSCRIBERS = [
  {
    id: 1,
    name: 'Rahul Verma',
    subtext: 'Chennai · Premium',
    plan: '8 movies this week',
    wallet: '₹245',
    status: 'ACTIVE',
    joined: '12 Jan',
    email: 'rahul.verma@loopcrm.in',
    phone: '+91 98401 23456',
    city: 'Chennai',
    tier: 'Premium',
    kycStatus: 'Verified',
    rewardPoints: 1480,
    activeDevices: 3,
    watchTimeHrs: 64.2,
    riskScore: 'Low (1.4%)',
    lastActive: '12 mins ago',
    preferredGenre: 'Action Thriller, Regional Tamil',
    recentActivity: [
      { title: 'Pulli Raja (Film)', time: 'Yesterday, 9:30 PM', duration: '2h 14m (Completed)' },
      { title: 'Vada Chennai Chronicles E01-E04', time: '2 days ago', duration: '3h 10m' },
      { title: 'The Malabar Code (Trailer)', time: '3 days ago', duration: '2m' }
    ],
    devices: [
      { name: 'Apple iPhone 15 Pro', os: 'iOS 17.5', ip: '49.207.18.42', status: 'Active' },
      { name: 'Sony Bravia 4K TV', os: 'Android TV 12', ip: '192.168.1.10', status: 'Active' },
      { name: 'MacBook Air M2', os: 'macOS Sonoma', ip: '49.207.18.42', status: 'Idle' }
    ]
  },
  {
    id: 2,
    name: 'Anita Sharma',
    subtext: 'Mumbai · Premium',
    plan: 'Wallet topped up',
    wallet: '₹312',
    status: 'ACTIVE',
    joined: '08 Jan',
    email: 'anita.sharma@loopcrm.in',
    phone: '+91 98200 87654',
    city: 'Mumbai',
    tier: 'Premium',
    kycStatus: 'Verified',
    rewardPoints: 2150,
    activeDevices: 4,
    watchTimeHrs: 92.0,
    riskScore: 'Low (0.9%)',
    lastActive: 'Just now',
    preferredGenre: 'Family Drama, Hindi Classics',
    recentActivity: [
      { title: 'Velluvachi Godaramma', time: 'Today, 2:15 PM', duration: '1h 45m' },
      { title: 'Weekend Live Concert Series', time: 'Yesterday', duration: '2h 00m' }
    ],
    devices: [
      { name: 'Samsung Galaxy S24 Ultra', os: 'Android 14', ip: '115.240.82.11', status: 'Active' },
      { name: 'LG OLED C3 55"', os: 'webOS 23', ip: '192.168.0.14', status: 'Active' },
      { name: 'iPad Pro 11"', os: 'iPadOS 17', ip: '115.240.82.11', status: 'Idle' },
      { name: 'Chrome Windows 11', os: 'Chrome 122', ip: '115.240.82.11', status: 'Active' }
    ]
  },
  {
    id: 3,
    name: 'Kiran Reddy',
    subtext: 'Hyderabad · Trial',
    plan: 'Day 4 of trial',
    wallet: '₹0',
    status: 'TRIAL',
    joined: '20 Jan',
    email: 'kiran.reddy@loopcrm.in',
    phone: '+91 94401 99887',
    city: 'Hyderabad',
    tier: 'Trial',
    kycStatus: 'Pending',
    rewardPoints: 150,
    activeDevices: 2,
    watchTimeHrs: 14.5,
    riskScore: 'Moderate (28%)',
    lastActive: '3 hours ago',
    preferredGenre: 'Telugu Blockbusters, Sci-Fi',
    recentActivity: [
      { title: 'Kantara: Legend Chapter 1', time: 'Today, 11:00 AM', duration: '2h 28m' },
      { title: 'Project K Teaser Reel', time: 'Yesterday', duration: '15m' }
    ],
    devices: [
      { name: 'OnePlus 12', os: 'OxygenOS 14', ip: '183.82.14.99', status: 'Active' },
      { name: 'Amazon Fire TV Stick 4K', os: 'Fire OS 7', ip: '192.168.1.5', status: 'Idle' }
    ]
  },
  {
    id: 4,
    name: 'Meena Iyer',
    subtext: 'Bengaluru · Premium',
    plan: 'Refund requested',
    wallet: '₹365',
    status: 'REFUND',
    joined: '02 Jan',
    email: 'meena.iyer@loopcrm.in',
    phone: '+91 98450 11223',
    city: 'Bengaluru',
    tier: 'Premium',
    kycStatus: 'Verified',
    rewardPoints: 840,
    activeDevices: 1,
    watchTimeHrs: 31.8,
    riskScore: 'High (74%)',
    lastActive: '1 day ago',
    preferredGenre: 'Art Cinema, Malayalam Indies',
    recentActivity: [
      { title: 'Antaheen', time: '2 days ago', duration: '2h 05m' }
    ],
    devices: [
      { name: 'iPhone 13', os: 'iOS 17.2', ip: '106.51.78.20', status: 'Idle' }
    ]
  },
  {
    id: 5,
    name: 'Suresh K',
    subtext: 'Coimbatore · Basic',
    plan: 'KYC pending',
    wallet: '—',
    status: 'KYC',
    joined: '21 Jan',
    email: 'suresh.k@loopcrm.in',
    phone: '+91 99442 33445',
    city: 'Coimbatore',
    tier: 'Basic',
    kycStatus: 'Document Uploaded',
    rewardPoints: 100,
    activeDevices: 1,
    watchTimeHrs: 5.2,
    riskScore: 'Moderate (32%)',
    lastActive: '4 hours ago',
    preferredGenre: 'Devotional, Live Sports',
    recentActivity: [
      { title: 'Live Cricket Broadcast Feed', time: 'Yesterday', duration: '1h 10m' }
    ],
    devices: [
      { name: 'Redmi Note 13 5G', os: 'Android 13', ip: '157.44.112.5', status: 'Active' }
    ]
  },
  {
    id: 6,
    name: 'Pooja Hegde',
    subtext: 'Delhi · VIP Family',
    plan: '4K Dolby Atmos active',
    wallet: '₹1,240',
    status: 'ACTIVE',
    joined: '15 Dec',
    email: 'pooja.h@loopcrm.in',
    phone: '+91 98110 55667',
    city: 'Delhi',
    tier: 'VIP Family',
    kycStatus: 'Verified',
    rewardPoints: 3820,
    activeDevices: 5,
    watchTimeHrs: 142.6,
    riskScore: 'Low (0.4%)',
    lastActive: 'Just now',
    preferredGenre: 'Bollywood, Kids Series, Live TV',
    recentActivity: [
      { title: 'Loop Kids Zone: Chhota Bheem 4K', time: 'Today, 4:00 PM', duration: '45m' },
      { title: 'Prime Time Live News Stream', time: 'Today, 1:00 PM', duration: '30m' }
    ],
    devices: [
      { name: 'Apple TV 4K', os: 'tvOS 17', ip: '122.161.45.2', status: 'Active' },
      { name: 'iPhone 15 Pro Max', os: 'iOS 17.5', ip: '122.161.45.2', status: 'Active' },
      { name: 'iPad Air M1', os: 'iPadOS 17', ip: '122.161.45.2', status: 'Idle' }
    ]
  },
  {
    id: 7,
    name: 'Vikramaditya Bose',
    subtext: 'Kolkata · Standard',
    plan: 'Payment renewal due',
    wallet: '₹45',
    status: 'ACTIVE',
    joined: '18 Nov',
    email: 'vikram.bose@loopcrm.in',
    phone: '+91 98300 77889',
    city: 'Kolkata',
    tier: 'Standard',
    kycStatus: 'Verified',
    rewardPoints: 1120,
    activeDevices: 2,
    watchTimeHrs: 55.0,
    riskScore: 'Moderate (18%)',
    lastActive: '5 hours ago',
    preferredGenre: 'Bengali Cinema, Classic Mystery',
    recentActivity: [
      { title: 'Byomkesh Bakshi Mysteries', time: 'Yesterday', duration: '1h 35m' }
    ],
    devices: [
      { name: 'Mi TV 4A 43"', os: 'PatchWall Android', ip: '182.74.88.19', status: 'Active' }
    ]
  },
  {
    id: 8,
    name: 'Deepak Menon',
    subtext: 'Kochi · Trial',
    plan: 'Day 6 of trial',
    wallet: '₹0',
    status: 'TRIAL',
    joined: '22 Jan',
    email: 'deepak.m@loopcrm.in',
    phone: '+91 94471 22334',
    city: 'Kochi',
    tier: 'Trial',
    kycStatus: 'Pending',
    rewardPoints: 220,
    activeDevices: 1,
    watchTimeHrs: 18.4,
    riskScore: 'Moderate (22%)',
    lastActive: '1 day ago',
    preferredGenre: 'Malayalam Crime Thrillers',
    recentActivity: [
      { title: 'The Malabar Code (E01-E03)', time: '2 days ago', duration: '2h 15m' }
    ],
    devices: [
      { name: 'Google Pixel 8', os: 'Android 14', ip: '117.202.16.8', status: 'Active' }
    ]
  }
];

// 11 Planned Capabilities matching Screenshot 1 exactly
const PLANNED_CAPABILITIES = [
  { 
    id: 'customer-registration', 
    label: 'Customer Registration', 
    desc: 'Self-serve onboarding, instant OTP phone authentication, multi-profile signups, and automated welcome flows.',
    throughput: '3,400 signups/day',
    sla: '99.99% uptime',
    workflow: 'Phone OTP → Profile Setup → Plan Selection → Instant Provisioning'
  },
  { 
    id: 'kyc', 
    label: 'KYC', 
    desc: 'Automated Aadhaar/PAN validation, DigiLocker API integration, video verification, and PEP risk screening.',
    throughput: '98.4% auto-approval',
    sla: '< 15 seconds',
    workflow: 'Document OCR → Face Match → NSDL / UIDAI Check → Tamper Proof Vault'
  },
  { 
    id: 'subscriptions', 
    label: 'Subscriptions', 
    desc: 'Recurring automated billing, UPI Autopay mandates, credit card tokenization, dynamic upgrades, and proration.',
    throughput: '₹4.8 Cr monthly ARR',
    sla: '99.98% payment success',
    workflow: 'Mandate Registration → D-3 Notification → Smart Retries → Auto-Renewal'
  },
  { 
    id: 'wallet', 
    label: 'Wallet', 
    desc: 'Closed-loop digital wallet, instant top-ups, promotional cashbacks, TVOD pay-per-view micropayments.',
    throughput: '₹128 avg balance',
    sla: '< 200ms transaction',
    workflow: 'Gateway Ingestion → Ledger Double-Entry → Balance Lock → Stream Settlement'
  },
  { 
    id: 'reward-points', 
    label: 'Reward Points', 
    desc: 'Watch-to-earn gamification, referral points, loyalty milestones, and digital merchandise store redemptions.',
    throughput: '18.4M points in circulation',
    sla: 'Real-time burn/earn',
    workflow: 'Watch Minutes Telemetry → Points Multiplier → Tier Upgrade → Gift Shop'
  },
  { 
    id: 'device-management', 
    label: 'Device Management', 
    desc: 'Concurrent stream enforcement, Widevine L1 device fingerprinting, remote wipe, and household session limits.',
    throughput: '4 devices / account max',
    sla: 'Sub-second session kill',
    workflow: 'Device Fingerprint → GeoIP Check → DRM Session Bind → Anomaly Blacklist'
  },
  { 
    id: 'viewing-history', 
    label: 'Viewing History', 
    desc: 'Millisecond resume-point synchronization across Smart TV, mobile, and web with automated binge detection.',
    throughput: '12M stream pings/hr',
    sla: '< 50ms sync latency',
    workflow: 'Heartbeat Ping (every 10s) → S3 Cold Log → DynamoDB Hot Cache → Continue Watching Rail'
  },
  { 
    id: 'recommendations', 
    label: 'Recommendations', 
    desc: 'Graph neural network predicting churn, next-binge affinity, language preference, and dynamic homepage rails.',
    throughput: '42.8M inference req/day',
    sla: '14ms response',
    workflow: 'Interaction Vector → Two-Tower Neural Ranker → Diversity Filter → Personalized Rail'
  },
  { 
    id: 'complaints', 
    label: 'Complaints', 
    desc: 'Omnichannel customer support ticketing, AI auto-triage for stream buffering, audio sync, and billing disputes.',
    throughput: '< 1.8 hr avg resolution',
    sla: '15 min first response',
    workflow: 'Ticket Ingestion → Sentiment Analysis → Level 2 Escalation → Automated Resolution'
  },
  { 
    id: 'refund-requests', 
    label: 'Refund Requests', 
    desc: 'Instant UPI refund arbiter with automated playback failure audit and chargeback protection.',
    throughput: '< 0.05% refund rate',
    sla: 'Instant UPI reversal',
    workflow: 'Refund Request → Playback Log Verification → Approval Rule Engine → NPCI UPI Reversal'
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    desc: 'Automated push campaigns (APNS/FCM), transactional WhatsApp notifications, email digests, and SMS OTP gateway.',
    throughput: '850K msgs/hr',
    sla: '99.4% delivery rate',
    workflow: 'Event Trigger → Template Personalization → Multi-Channel Dispatch → Delivery Receipt'
  }
];

export const UserCrmDashboard = () => {
  const [records, setRecords] = useState(INITIAL_SUBSCRIBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeKpi, setActiveKpi] = useState('ACTIVE SUBSCRIBERS');

  // Modals & Drawers
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedSubscriberForDetail, setSelectedSubscriberForDetail] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // New Subscriber Form State
  const [newSub, setNewSub] = useState({
    name: '',
    city: 'Chennai',
    tier: 'Premium',
    plan: '8 movies this week',
    wallet: '₹250',
    status: 'ACTIVE',
    phone: '',
    email: ''
  });

  // Fetch real data from backend if running
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/crm/users/records')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch(() => {
        // Standalone fallback to initial records
      });
  }, []);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(item => {
      const matchesSearch = 
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesStatus = true;
      if (selectedStatusFilter !== 'ALL') {
        matchesStatus = item.status === selectedStatusFilter;
      } else if (activeKpi === 'ACTIVE SUBSCRIBERS') {
        matchesStatus = item.status === 'ACTIVE';
      } else if (activeKpi === 'TRIAL → PAID') {
        matchesStatus = item.status === 'TRIAL' || item.status === 'ACTIVE';
      } else if (activeKpi === 'CHURN RISK') {
        matchesStatus = item.status === 'REFUND' || item.status === 'KYC';
      }

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, selectedStatusFilter, activeKpi]);

  // Handle Create New Subscriber
  const handleCreateSubscriber = (e) => {
    e.preventDefault();
    if (!newSub.name.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newSub.name.trim(),
      subtext: `${newSub.city} · ${newSub.tier}`,
      plan: newSub.plan || 'Standard active',
      wallet: newSub.wallet ? (newSub.wallet.startsWith('₹') ? newSub.wallet : `₹${newSub.wallet}`) : '₹0',
      status: newSub.status,
      joined: 'Today',
      email: newSub.email || `${newSub.name.toLowerCase().replace(/\s+/g, '.')}@loopcrm.in`,
      phone: newSub.phone || '+91 98000 12345',
      city: newSub.city,
      tier: newSub.tier,
      kycStatus: newSub.status === 'KYC' ? 'Pending' : 'Verified',
      rewardPoints: 500,
      activeDevices: 1,
      watchTimeHrs: 0.0,
      riskScore: 'Low (1.0%)',
      lastActive: 'Just now',
      preferredGenre: 'Action, Drama',
      recentActivity: [
        { title: 'Account Initialized & Plan Activated', time: 'Just now', duration: 'Setup' }
      ],
      devices: [
        { name: 'Primary Registered Device', os: 'Mobile / TV', ip: '127.0.0.1', status: 'Active' }
      ]
    };

    // Optimistic UI update
    setRecords(prev => [newEntry, ...prev]);
    setIsNewModalOpen(false);
    setNewSub({
      name: '',
      city: 'Chennai',
      tier: 'Premium',
      plan: '8 movies this week',
      wallet: '₹250',
      status: 'ACTIVE',
      phone: '',
      email: ''
    });

    // POST to backend
    fetch('http://localhost:8080/api/v1/crm/users/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {});

    showToast(`Subscriber "${newEntry.name}" created successfully!`);
  };

  // Toast helper
  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Subscriber Name', 'Details', 'Plan', 'Wallet', 'Status', 'Joined Date', 'Email', 'Phone', 'City'];
    const rows = filteredRecords.map(r => [
      r.id,
      `"${r.name}"`,
      `"${r.subtext}"`,
      `"${r.plan}"`,
      `"${r.wallet}"`,
      r.status,
      r.joined,
      r.email || '',
      r.phone || '',
      r.city || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loop_User_CRM_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported subscriber records as CSV.');
  };

  // Render Status Badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#062E1E] text-[#34D399] border border-[#065F46]">
            ACTIVE
          </span>
        );
      case 'TRIAL':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#0C1B2E] text-[#60A5FA] border border-[#1E40AF]">
            TRIAL
          </span>
        );
      case 'REFUND':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#281807] text-[#F59E0B] border border-[#78350F]">
            REFUND
          </span>
        );
      case 'KYC':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-[#2B2308] text-[#FBBF24] border border-[#854D0E]">
            KYC
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
            TOP HEADER AREA (MATCHING SCREENSHOT 2 EXACTLY)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          {/* Small Category Breadcrumb */}
          <div className="text-[11px] font-mono font-semibold tracking-[0.28em] text-[#B89255] uppercase">
            CRM
          </div>

          {/* Main Title Row with Golden User CRM Icon */}
          <div className="flex items-center gap-4">
            {/* User CRM Icon in Rounded Dark Square */}
            <div className="w-12 h-12 rounded-xl bg-[#130E07] border border-[#3E2D12] flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {/* Golden 2-Person Silhouette Icon */}
              <svg 
                className="w-6 h-6 text-[#FBBF24]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-none">
              User CRM
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-[#8D887E] font-normal tracking-wide">
            Subscribers, KYC, wallets, reward points and viewing history.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4 KPI STAT CARDS (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Active Subscribers */}
          <div 
            onClick={() => setActiveKpi('ACTIVE SUBSCRIBERS')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'ACTIVE SUBSCRIBERS'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              ACTIVE SUBSCRIBERS
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              1.2 L
            </div>
            <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
              +18% w/w
            </div>
          </div>

          {/* 2. Trial -> Paid */}
          <div 
            onClick={() => setActiveKpi('TRIAL → PAID')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'TRIAL → PAID'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              TRIAL → PAID
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              62%
            </div>
            <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
              +4 pts
            </div>
          </div>

          {/* 3. Avg Wallet Balance */}
          <div 
            onClick={() => setActiveKpi('AVG WALLET BALANCE')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'AVG WALLET BALANCE'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              AVG WALLET BALANCE
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              ₹128
            </div>
            <div className="mt-2 text-xs font-mono text-[#86755E] tracking-wide">
              Closed loop wallet
            </div>
          </div>

          {/* 4. Churn Risk */}
          <div 
            onClick={() => setActiveKpi('CHURN RISK')}
            className={`p-5 rounded-xl bg-[#0B0907] border transition-all cursor-pointer ${
              activeKpi === 'CHURN RISK'
                ? 'border-[#7E5C20] shadow-[0_0_25px_rgba(200,140,40,0.22)] bg-[#110D08]'
                : 'border-[#211B13] hover:border-[#332A1E]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#86755E] uppercase">
              CHURN RISK
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F3E3C5] mt-3 font-normal">
              6.1%
            </div>
            <div className="mt-2 text-xs font-mono text-amber-500/80 tracking-wide">
              -1.2% this quarter
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SEARCH & ACTIONS TOOLBAR (EXACT MATCH SCREENSHOT 2)
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
                    Status Filter
                  </div>
                  {['ALL', 'ACTIVE', 'TRIAL', 'REFUND', 'KYC'].map((status) => (
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
            MAIN SUBSCRIBERS TABLE (EXACT MATCH SCREENSHOT 2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0B0907] border border-[#211B13] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A140D] text-[11px] font-mono uppercase tracking-[0.16em] text-[#7E6E59]">
                  <th className="py-4 px-6 font-medium">SUBSCRIBER</th>
                  <th className="py-4 px-6 font-medium">PLAN</th>
                  <th className="py-4 px-6 font-medium">WALLET</th>
                  <th className="py-4 px-6 font-medium">STATUS</th>
                  <th className="py-4 px-6 font-medium">JOINED</th>
                  <th className="py-4 px-6 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16120D] text-sm">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7E6E59] font-mono text-xs">
                      No subscriber records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-[#120F0B]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedSubscriberForDetail(item)}
                    >
                      {/* 1. SUBSCRIBER Column: Bold Title + Subtext */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#EDE7DE] group-hover:text-white transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#7A6B58] mt-0.5">
                          {item.subtext}
                        </div>
                      </td>

                      {/* 2. PLAN Column */}
                      <td className="py-4 px-6 text-[#C9BFB0] text-sm font-normal">
                        {item.plan}
                      </td>

                      {/* 3. WALLET Column */}
                      <td className="py-4 px-6 font-serif text-[#EDE7DE] text-base">
                        {item.wallet}
                      </td>

                      {/* 4. STATUS Column */}
                      <td className="py-4 px-6">
                        {renderStatusBadge(item.status)}
                      </td>

                      {/* 5. JOINED Column */}
                      <td className="py-4 px-6 text-[#9A8A75] text-sm font-mono">
                        {item.joined}
                      </td>

                      {/* 6. Action: Open */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubscriberForDetail(item);
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

          {/* 11 Capability Boxes in 3-Column Grid matching Screenshot 1 */}
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
                  <span>{cap.throughput}</span>
                  <span className="text-emerald-500/80">{cap.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: + NEW SUBSCRIBER
      ═══════════════════════════════════════════════════════════════ */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#211B13] flex items-center justify-between bg-[#14100B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">New Subscriber Registration</h3>
                  <p className="text-xs text-[#8A7964]">Add user to CRM with membership and wallet provisioning</p>
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

            {/* Modal Form */}
            <form onSubmit={handleCreateSubscriber} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Krishnan"
                  value={newSub.name}
                  onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <select
                    value={newSub.city}
                    onChange={(e) => setNewSub({ ...newSub, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Kochi">Kochi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Membership Tier
                  </label>
                  <select
                    value={newSub.tier}
                    onChange={(e) => setNewSub({ ...newSub, tier: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="Premium">Premium</option>
                    <option value="Trial">Trial</option>
                    <option value="VIP Family">VIP Family</option>
                    <option value="Standard">Standard</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Initial Wallet (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="250"
                    value={newSub.wallet}
                    onChange={(e) => setNewSub({ ...newSub, wallet: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                  </input>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Initial Status
                  </label>
                  <select
                    value={newSub.status}
                    onChange={(e) => setNewSub({ ...newSub, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="TRIAL">TRIAL</option>
                    <option value="KYC">KYC</option>
                    <option value="REFUND">REFUND</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                  Plan Description / Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8 movies this week / Day 1 of trial"
                  value={newSub.plan}
                  onChange={(e) => setNewSub({ ...newSub, plan: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98..."
                    value={newSub.phone}
                    onChange={(e) => setNewSub({ ...newSub, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#070604] border border-[#2D2316] rounded-lg text-sm text-[#EDE7DE] focus:outline-none focus:border-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89880] uppercase tracking-wider mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="user@loopcrm.in"
                    value={newSub.email}
                    onChange={(e) => setNewSub({ ...newSub, email: e.target.value })}
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
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] tracking-wide shadow-md"
                >
                  Create Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DRAWER / MODAL: SUBSCRIBER DETAIL INSPECTION (360° PROFILE)
      ═══════════════════════════════════════════════════════════════ */}
      {selectedSubscriberForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0E0C09] border border-[#3E2D12] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3D290F] to-[#785419] flex items-center justify-center text-lg font-serif text-[#FBBF24] border border-[#926822]">
                  {selectedSubscriberForDetail.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-serif text-white">{selectedSubscriberForDetail.name}</h3>
                    {renderStatusBadge(selectedSubscriberForDetail.status)}
                  </div>
                  <p className="text-xs text-[#8A7964] mt-0.5 font-mono">
                    {selectedSubscriberForDetail.subtext} · Joined {selectedSubscriberForDetail.joined}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSubscriberForDetail(null)}
                className="text-[#8A7964] hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {/* Quick KPI Strip */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Wallet Balance</div>
                  <div className="text-lg font-serif text-[#FBBF24] mt-1">{selectedSubscriberForDetail.wallet}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Reward Points</div>
                  <div className="text-lg font-serif text-white mt-1">{selectedSubscriberForDetail.rewardPoints || 1200} pts</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">KYC Status</div>
                  <div className="text-sm font-semibold text-emerald-400 mt-1">{selectedSubscriberForDetail.kycStatus || 'Verified'}</div>
                </div>
                <div className="p-3 bg-[#070604] border border-[#211B13] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8A7964] uppercase">Active Devices</div>
                  <div className="text-lg font-serif text-white mt-1">{selectedSubscriberForDetail.activeDevices || 2} / 4</div>
                </div>
              </div>

              {/* Contact & Profile Details */}
              <div className="p-4 bg-[#070604] border border-[#211B13] rounded-xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Profile Telemetry
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#7A6B58] block">Email Address:</span>
                    <span className="text-[#EDE7DE] font-mono">{selectedSubscriberForDetail.email || 'user@loopcrm.in'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Contact Number:</span>
                    <span className="text-[#EDE7DE] font-mono">{selectedSubscriberForDetail.phone || '+91 98000 12345'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Watch Time Total:</span>
                    <span className="text-[#EDE7DE] font-mono">{selectedSubscriberForDetail.watchTimeHrs || 42.5} Hours</span>
                  </div>
                  <div>
                    <span className="text-[#7A6B58] block">Churn Probability:</span>
                    <span className="text-[#F59E0B] font-mono">{selectedSubscriberForDetail.riskScore || 'Low (2.1%)'}</span>
                  </div>
                </div>
              </div>

              {/* Recent Viewing Activity */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255] flex items-center justify-between">
                  <span>Recent Viewing History</span>
                  <span className="text-[11px] text-[#7A6B58] lowercase">synced across all screens</span>
                </div>
                <div className="divide-y divide-[#1D1710] bg-[#070604] border border-[#211B13] rounded-xl overflow-hidden">
                  {(selectedSubscriberForDetail.recentActivity || [
                    { title: 'Pulli Raja (Film)', time: 'Yesterday', duration: '2h 14m' },
                    { title: 'Live Cricket Feed', time: '2 days ago', duration: '1h 10m' }
                  ]).map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[#EDE7DE] font-medium">{item.title}</div>
                        <div className="text-[11px] text-[#7A6B58]">{item.time}</div>
                      </div>
                      <span className="font-mono text-[#FBBF24]/90">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registered Devices */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B89255]">
                  Hardware & DRM Bindings
                </div>
                <div className="space-y-2">
                  {(selectedSubscriberForDetail.devices || [
                    { name: 'Apple iPhone 15 Pro', os: 'iOS 17.5', ip: '49.207.18.42', status: 'Active' },
                    { name: 'Sony Bravia 4K TV', os: 'Android TV 12', ip: '192.168.1.10', status: 'Active' }
                  ]).map((dev, idx) => (
                    <div key={idx} className="p-3 bg-[#070604] border border-[#211B13] rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-[#EDE7DE]">{dev.name}</div>
                        <div className="text-[11px] text-[#7A6B58] font-mono">{dev.os} · IP: {dev.ip}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        {dev.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="px-6 py-4 border-t border-[#211B13] bg-[#14100B] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Credited ₹100 promotional wallet balance to ${selectedSubscriberForDetail.name}`);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#221808] border border-[#5E4215] text-[#FBBF24] hover:bg-[#332209]"
                >
                  + Top-up ₹100
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Sent KYC verification SMS to ${selectedSubscriberForDetail.phone}`);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#14120D] border border-[#2D2316] text-[#C9BFB0] hover:text-white"
                >
                  Trigger KYC
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubscriberForDetail(null)}
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
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#211B13] bg-[#14100B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#221808] border border-[#523A12] flex items-center justify-center text-[#FBBF24]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white">{selectedCapability.label}</h3>
                  <div className="text-[11px] font-mono text-[#8A7964]">Loop CRM Microservice Engine</div>
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

            {/* Content */}
            <div className="p-6 space-y-5 text-sm">
              <p className="text-[#C9BFB0] leading-relaxed">
                {selectedCapability.desc}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#070604] border border-[#211B13] rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-[#7A6B58]">Active Throughput</div>
                  <div className="text-base font-serif text-[#FBBF24] mt-1">{selectedCapability.throughput}</div>
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

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#211B13] bg-[#14100B] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Microservice Online
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    showToast(`Dispatched test request to ${selectedCapability.label} engine.`);
                    setSelectedCapability(null);
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#E59307] text-[#050403] tracking-wide"
                >
                  Execute Test Batch
                </button>
              </div>
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

export default UserCrmDashboard;

