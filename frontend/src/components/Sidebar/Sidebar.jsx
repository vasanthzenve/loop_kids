import React, { useState, useMemo } from 'react';
import { NAVIGATION_DATA, CURRENT_USER } from './navigationData';
import SidebarSection from './SidebarSection';
import UserProfileBadge from './UserProfileBadge';
import Icons from './Icons';

export const Sidebar = ({
  activeItem = 'advertiser-crm',
  onSelectItem,
  initialCollapsed = false,
  currentUser = null,
  onLogout,
  isOpenMobile = false,
  onCloseMobile,
  className = ''
}) => {
  const [activeId, setActiveId] = useState(activeItem);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(currentUser || CURRENT_USER);

  // Sync if currentUser changes from parent
  React.useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleSelectItem = (id) => {
    setActiveId(id);
    if (onSelectItem) onSelectItem(id);
    if (onCloseMobile) onCloseMobile(); // Close mobile drawer on selection
  };

  const handleRoleChange = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  // Filter items if user searches
  const filteredNavData = useMemo(() => {
    if (!searchQuery.trim()) return NAVIGATION_DATA;
    const query = searchQuery.toLowerCase();
    return NAVIGATION_DATA.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(query) ||
        section.title.toLowerCase().includes(query)
      )
    })).filter((section) => section.items.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* ── MOBILE BACKDROP OVERLAY ────────────────────────────────────────── */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* ── MAIN SIDEBAR (DESKTOP IN FLOW, MOBILE AS FIXED SLIDING DRAWER) ──── */}
      <aside
        className={`h-screen flex flex-col bg-[#070708] border-r border-[#19191D] select-none transition-all duration-300 ease-in-out z-50 flex-shrink-0 ${
          // Mobile drawer positioning:
          'fixed inset-y-0 left-0 lg:static'
        } ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-[72px] w-72' : 'w-72'
        } ${className}`}
      >
        {/* ── TOP HEADER ────────────────────────────────────────────────────── */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#16161A] bg-[#070708] flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo Badge */}
            <div className="flex-shrink-0">
              <Icons.LoopLogo />
            </div>

            {/* Platform Title & Subtitle */}
            {(!isCollapsed || isOpenMobile) && (
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-[15px] sm:text-[16px] font-semibold tracking-wide text-[#F3F4F6] truncate leading-tight">
                  Loop Nexus 360
                </span>
                <span className="text-[8.5px] font-mono tracking-[0.24em] font-medium text-[#7C7C87] uppercase truncate leading-tight mt-0.5">
                  OPERATING SYSTEM
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex p-1.5 rounded-md text-[#787884] hover:text-[#FAFAFA] hover:bg-[#18181C] transition-colors focus:outline-none flex-shrink-0 ml-1 cursor-pointer"
            >
              <Icons.SidebarToggle className="w-5 h-5" />
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-md text-[#787884] hover:text-[#FAFAFA] hover:bg-[#18181C] transition-colors focus:outline-none flex-shrink-0 ml-1 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── OPTIONAL SEARCH FILTER (Visible when expanded) ──────────────────── */}
        {(!isCollapsed || isOpenMobile) && (
          <div className="px-3 pt-3 pb-1 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#5A5A66]">
                <Icons.Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick jump (Ctrl + K)..."
                className="w-full bg-[#111114] border border-[#212126] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#E4E4E7] placeholder-[#5A5A66] focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-[#71717A] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── SCROLLABLE NAVIGATION LIST ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-2">
          {filteredNavData.map((section) => (
            <SidebarSection
              key={section.id}
              section={section}
              activeItemId={activeId}
              isCollapsed={isCollapsed && !isOpenMobile}
              onSelectItem={handleSelectItem}
            />
          ))}

          {filteredNavData.length === 0 && (
            <div className="p-6 text-center text-xs text-[#71717A]">
              No modules match "{searchQuery}"
            </div>
          )}
        </div>

        {/* ── BOTTOM USER PROFILE FOOTER ─────────────────────────────────────── */}
        <UserProfileBadge
          user={user}
          isCollapsed={isCollapsed && !isOpenMobile}
          onRoleChange={handleRoleChange}
          onLogout={onLogout}
        />
      </aside>
    </>
  );
};

export default Sidebar;
