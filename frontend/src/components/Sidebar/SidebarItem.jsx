import React from 'react';
import Icons from './Icons';

export const SidebarItem = ({
  item,
  isActive,
  isCollapsed,
  onSelect
}) => {
  const IconComponent = Icons[item.icon] || Icons.Dashboard;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      title={isCollapsed ? item.label : undefined}
      className={`group relative w-full flex items-center transition-all duration-150 select-none text-left outline-none focus:outline-none ${
        isCollapsed
          ? 'justify-center py-2.5 px-0'
          : 'px-5 py-2.5 gap-3.5'
      } ${
        isActive
          ? 'bg-[#211708] text-[#E5A93C] font-semibold'
          : 'text-[#94949E] hover:text-[#EDEDEE] hover:bg-[#141416] font-medium'
      }`}
    >
      {/* Active Gold Left Indicator Bar */}
      {isActive && (
        <span
          className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.6)]"
          aria-hidden="true"
        />
      )}

      {/* Item Icon */}
      <div
        className={`flex-shrink-0 transition-colors duration-150 ${
          isActive
            ? 'text-[#E5A93C]'
            : 'text-[#858590] group-hover:text-[#D4D4D8]'
        }`}
      >
        <IconComponent />
      </div>

      {/* Item Label (Hidden when collapsed) */}
      {!isCollapsed && (
        <span className="truncate text-[13.5px] tracking-wide">
          {item.label}
        </span>
      )}

      {/* Badge / Pill if available */}
      {!isCollapsed && item.badge && (
        <span className="ml-auto text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#1F1F24] text-[#A1A1AA] border border-[#2B2B33]">
          {item.badge}
        </span>
      )}

      {/* Floating Tooltip when Collapsed */}
      {isCollapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181B] text-[#F4F4F5] text-xs rounded-md shadow-xl border border-[#27272A] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
          {item.label}
        </div>
      )}
    </button>
  );
};

export default SidebarItem;

