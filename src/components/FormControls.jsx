import React from 'react';

export function Button({ children, onClick, variant='primary', disabled=false }) {
  const base = 'px-4 py-2 rounded-lg font-medium';
  if (variant==='primary') return <button onClick={onClick} disabled={disabled} className={`${base} bg-[#0085FF] text-white ${disabled?'opacity-60':''}`}>{children}</button>
  return <button onClick={onClick} disabled={disabled} className={`${base} border border-[#0085FF] text-[#0085FF] ${disabled?'opacity-60':''}`}>{children}</button>
}
