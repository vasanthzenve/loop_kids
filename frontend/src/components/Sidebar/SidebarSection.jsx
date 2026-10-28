import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import Icons from './Icons';

export const SidebarSection = ({
  section,
  activeItemId,
  isCollapsed,
  onSelectItem,
  collapsible = true
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!section.items || section.items.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section Header */}
      {!isCollapsed ? (
        <div
          onClick={() => collapsible && setIsOpen(!isOpen)}
          className={`flex items-center justify-between px-5 pt-5 pb-2 text-[11px] font-semibold tracking-[0.14em] text-[#63636E] uppercase select-none ${
            collapsible ? 'cursor-pointer hover:text-[#9D9DA8]' : ''
          }`}
        >
          <span>{section.title}</span>
          {collapsible && (
            <div className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
              <Icons.ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full my-3 px-3">
          <div className="h-[1px] bg-[#18181C]" />
        </div>
      )}

      {/* Section Items */}
      {(!collapsible || isOpen || isCollapsed) && (
        <div className="flex flex-col space-y-0.5">
          {section.items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={activeItemId === item.id}
              isCollapsed={isCollapsed}
              onSelect={onSelectItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;

