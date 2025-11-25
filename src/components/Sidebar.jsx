import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Sidebar({ go }) {
  const location = useLocation();

  // detect active step based on URL
  const getActive = () => {
    if (location.pathname === '/') return 1;
    if (location.pathname === '/step/1') return 2;
    if (location.pathname === '/step/2') return 3;
    if (location.pathname === '/step/3') return 4;
    return 0;
  };

  const current = getActive();

  const items = [
    { k:1, label:'Dashboard' },
    { k:2, label:'Basics' },
    { k:3, label:'Rewards' },
    { k:4, label:'Backer' }
  ];

  return (
    <aside className="hidden md:block w-56 border-r bg-white p-4">
      <h3 className="text-lg font-semibold mb-4">Bounty</h3>
      <nav className="space-y-2">
        {items.map(it => (
          <button
            key={it.k}
            onClick={() => go(it.k)}
            className={`w-full text-left px-3 py-2 rounded 
              ${current === it.k 
                ? 'bg-[#E6F2FF] border-l-4 border-[#0085FF]' 
                : 'hover:bg-gray-50'
              }`}
          >
            <div className="flex justify-between">
              <span>{it.label}</span>
              <span className="text-sm text-gray-500">{it.k}</span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
