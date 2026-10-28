import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LoginPage from './components/Auth/LoginPage';
import { NAVIGATION_DATA } from './components/Sidebar/navigationData';

export function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check saved session on initial load
    const savedLocal = localStorage.getItem('loop_user');
    if (savedLocal) {
      try { return JSON.parse(savedLocal); } catch (e) {}
    }
    const savedSession = sessionStorage.getItem('loop_user');
    if (savedSession) {
      try { return JSON.parse(savedSession); } catch (e) {}
    }
    return null;
  });

  const [activeModuleId, setActiveModuleId] = useState('advertiser-crm');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('loop_user');
    sessionStorage.removeItem('loop_user');
    setCurrentUser(null);
  };

  // If user is not authenticated, show LoginPage
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Find active item metadata
  const activeItemMeta = (() => {
    for (const section of NAVIGATION_DATA) {
      const match = section.items.find((item) => item.id === activeModuleId);
      if (match) {
        return {
          ...match,
          sectionTitle: section.title
        };
      }
    }
    return {
      label: 'Advertiser CRM',
      sectionTitle: 'CRM',
      id: 'advertiser-crm'
    };
  })();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070709] text-[#E4E4E7] box-border">
      {/* ── SIDEBAR COMPONENT (DESKTOP + MOBILE DRAWER) ──────────────────────── */}
      <Sidebar
        activeItem={activeModuleId}
        onSelectItem={(id) => setActiveModuleId(id)}
        currentUser={currentUser}
        onLogout={handleLogout}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* ── MAIN CONTENT WORKSPACE AREA ──────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-[#0A0A0C]">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-[#1A1A1F] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[#08080A]/90 backdrop-blur-md sticky top-0 z-20 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#141418] transition-colors focus:outline-none cursor-pointer flex-shrink-0"
              aria-label="Open sidebar menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#71717A] uppercase font-mono truncate hidden sm:inline">
                {activeItemMeta.sectionTitle}
              </span>
              <span className="text-[#3F3F46] hidden sm:inline">/</span>
              <h1 className="text-xs sm:text-sm font-semibold text-[#F4F4F5] tracking-wide truncate">
                {activeItemMeta.label}
              </h1>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 flex-shrink-0">
            {/* System Status (Visible on md+) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#141418] border border-[#23232A] rounded-full text-xs text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>System: <strong className="text-white font-medium">Active</strong></span>
            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-[#141418] border border-[#23232A] rounded-full text-[11px] sm:text-xs text-[#A1A1AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span>
              <span className="font-mono text-[#E5A93C] font-semibold">{currentUser.role}</span>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md bg-[#18181D] hover:bg-[#25252D] text-[#D4D4D8] border border-[#2E2E38] transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Content Body with Fluid Responsive Padding */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-5 sm:space-y-6 flex-1 box-border">
          
          {/* Welcome Banner */}
          <div className="p-5 sm:p-6 lg:p-7 rounded-2xl bg-gradient-to-r from-[#14120C] via-[#101014] to-[#0D0D10] border border-[#262115] shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(229,169,60,0.12),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="inline-block px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold font-mono tracking-widest text-[#E5A93C] bg-[#221808] border border-[#44310E] rounded-md uppercase">
                ACTIVE WORKSPACE &nbsp;•&nbsp; {currentUser.role}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white">
                {activeItemMeta.label}
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
                Loop Nexus 360 Operating System is active. Access authorized for <code className="text-[#E5A93C] font-mono">{currentUser.email}</code>. Use the navigation sidebar to explore all 29 modules across Content, CRM, Operations, and Intelligence.
              </p>
            </div>
          </div>

          {/* Statistics Cards (Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
            {[
              { label: 'Active Campaigns', value: '48', change: '+12%', note: 'vs last month' },
              { label: 'Revenue Generated', value: '$2,840,900', change: '+18.4%', note: 'Q4 Run Rate' },
              { label: 'Pending Approvals', value: '14', change: '-3', note: 'Requires review' },
              { label: 'Security Health', value: '100%', change: 'SECURE', note: 'Zero incidents' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl bg-[#0F0F12] border border-[#1E1E24] hover:border-[#2C2C35] transition-colors">
                <span className="text-[11px] sm:text-xs text-[#8E8E98] uppercase tracking-wider font-medium">{stat.label}</span>
                <div className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">{stat.value}</div>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="text-[#E5A93C] font-semibold">{stat.change}</span>
                  <span className="text-[#64646E]">{stat.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* User & Security Session Details (Responsive Stack) */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#0F0F12] border border-[#1E1E24] space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-white">Active Session Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs font-mono">
              <div className="p-3 sm:p-3.5 rounded-lg bg-[#141418] border border-[#1F1F26]">
                <span className="text-[#71717A] text-[10px] block uppercase">AUTHENTICATED USER</span>
                <span className="text-white font-bold text-sm">{currentUser.name}</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-lg bg-[#141418] border border-[#1F1F26]">
                <span className="text-[#71717A] text-[10px] block uppercase">PRIMARY EMAIL</span>
                <span className="text-[#E5A93C] font-bold text-sm truncate block">{currentUser.email}</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-lg bg-[#141418] border border-[#1F1F26] sm:col-span-2 lg:col-span-1">
                <span className="text-[#71717A] text-[10px] block uppercase">ASSIGNED ROLE</span>
                <span className="text-emerald-400 font-bold text-sm">{currentUser.role}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
