import React, { useState, useRef, useEffect } from 'react';
import Icons from './Icons';

export const UserProfileBadge = ({
  user,
  isCollapsed,
  onRoleChange,
  onLogout
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative border-t border-[#18181B] bg-[#070708] p-3 select-none" ref={menuRef}>
      {/* User Bar Button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        title={isCollapsed ? `${user.name} (${user.role})` : undefined}
        className={`w-full flex items-center transition-colors duration-150 rounded-lg group ${
          isCollapsed
            ? 'justify-center p-1.5 hover:bg-[#141416]'
            : 'px-2 py-2 gap-3 hover:bg-[#121215] text-left'
        }`}
      >
        {/* Avatar circle */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/90 bg-[#161208] flex items-center justify-center shadow-[0_0_8px_rgba(212,175,55,0.2)]">
            <span className="text-[#E5A93C] text-xs font-bold tracking-wider">
              {user.initials || 'ED'}
            </span>
          </div>
          {/* Online green indicator */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0A0A0B]" />
        </div>

        {/* User Details */}
        {!isCollapsed && (
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-[13.5px] font-semibold text-[#F3F4F6] truncate group-hover:text-white">
              {user.name}
            </div>
            <div className="text-[10px] font-medium tracking-wider uppercase text-[#737380] font-mono truncate">
              {user.role}
            </div>
          </div>
        )}

        {/* Chevron Icon */}
        {!isCollapsed && (
          <div className={`text-[#71717A] group-hover:text-white transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-4 h-4" />
          </div>
        )}
      </button>

      {/* Role Switcher & Account Dropdown */}
      {menuOpen && (
        <div className={`absolute bottom-full mb-2 bg-[#121215] border border-[#27272A] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 ${
          isCollapsed ? 'left-3 w-64' : 'left-3 right-3'
        }`}>
          <div className="px-3 py-2 border-b border-[#1E1E24]">
            <div className="text-xs font-semibold text-[#E4E4E7]">{user.name}</div>
            <div className="text-[10px] text-[#A1A1AA] truncate font-mono">{user.email || 'edwin@zenve.in'}</div>
          </div>

          {/* Active Role Selector */}
          <div className="py-2">
            <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider uppercase text-[#71717A]">
              Switch Role / Context
            </div>
            {user.availableRoles?.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  if (onRoleChange) onRoleChange(r);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                  user.role === r
                    ? 'bg-[#221707] text-[#E5A93C] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#1A1A1F]'
                }`}
              >
                <span>{r}</span>
                {user.role === r && <span className="text-[#E5A93C] text-xs">✓</span>}
              </button>
            ))}
          </div>

          {/* Settings & Sign Out */}
          <div className="pt-1 border-t border-[#1E1E24] flex flex-col space-y-0.5">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                alert("Account Settings dialog for Edwin (edwin@zenve.in)");
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1F] rounded-md transition-colors"
            >
              Account Settings
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileBadge;
