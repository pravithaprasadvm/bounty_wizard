import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BountyProvider } from './context/BountyContext';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Preview from './pages/Preview';
import Result from './pages/Result';

export default function App() {
  const TOTAL = 6;
  const [page, setPage] = useState(1);
  const nav = useNavigate();

  // -----------------------------
  // SESSION TIMEOUT LOGIC
  // -----------------------------
  const TIMEOUT_MS = 10 * 60 * 1000;   // 10 minutes
  const WARNING_MS = 9 * 60 * 1000;    // Show warning at 9 minutes

  const resetSessionTimer = useCallback(() => {
    localStorage.setItem("lastActivity", Date.now());
  }, []);

  useEffect(() => {
    resetSessionTimer();

    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach(evt => window.addEventListener(evt, resetSessionTimer));

    const interval = setInterval(() => {
      const last = Number(localStorage.getItem("lastActivity"));
      const now = Date.now();

      if (now - last >= TIMEOUT_MS) {
        alert("Your session has expired due to inactivity.");
        localStorage.removeItem("bounty_form");
        sessionStorage.removeItem("bounty_payload");
        nav("/");
        window.location.reload();
      } 
      else if (now - last >= WARNING_MS) {
        console.log("1 minute left before timeout.");
      }
    }, 10000); // checks every 10 seconds

    return () => {
      events.forEach(evt => window.removeEventListener(evt, resetSessionTimer));
      clearInterval(interval);
    };
  }, [nav, resetSessionTimer]);
  // -----------------------------

  const go = (p) => {
    setPage(p);
    if (p === 1) nav('/');
    if (p === 2) nav('/step/1');
    if (p === 3) nav('/step/2');
    if (p === 4) nav('/step/3');
    if (p === 5) nav('/preview');
    if (p === 6) nav('/result');
  };

  return (
    <BountyProvider>
      <div className="min-h-screen bg-gray-50">
        <TopBar currentPage={page} totalPages={TOTAL} />
        <div className="md:flex">
          <Sidebar current={page} go={go} />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/step/1" element={<Step1 onNext={() => go(3)} />} />
              <Route path="/step/2" element={<Step2 onNext={() => go(4)} onBack={() => go(2)} />} />
              <Route path="/step/3" element={<Step3 onBack={() => go(3)} onNext={() => go(5)} />} />
              <Route path="/preview" element={<Preview onEdit={() => go(4)} onSubmit={() => {
                const payload = JSON.parse(localStorage.getItem('bounty_form') || '{}');
                sessionStorage.setItem('bounty_payload', JSON.stringify(payload, null, 2));
                go(6);
              }} />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </main>
        </div>
      </div>
    </BountyProvider>
  );
}
