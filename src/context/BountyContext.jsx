import React, { createContext, useContext, useState, useEffect } from "react";

const BountyContext = createContext();

// ---------------- DEFAULT CLEAN STATE ----------------
const defaultState = {
  title: "",
  description: "",
  projectTitle: "",
  type: "Development",
  dominant_core: "Social",
  mode: "digital",
  location: "",
  reward: {
    currency: "",
    amount: "",
    winners: 1,
  },
  timeline: {
    expiration_date: "",
    estimated_completion: {
      days: "",
      hours: "",
      minutes: "",
    },
  },
  hasImpactCertificate: false,
  impactBriefMessage: "",
  sdgs: [],
  has_backer: false,
  backer: {
    name: "",
    logoURL: "",
    logoFile: null,
    message: "",
  },
  terms_accepted: false,
};

export const BountyProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  // ----------- SAFE RESTORE FROM LOCAL STORAGE -----------
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bounty_form");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore known fields, prevents corrupted data
        setState({ ...defaultState, ...parsed });
      }
    } catch {
      console.error("Failed to restore saved state.");
      localStorage.removeItem("bounty_form");
    }
  }, []);

  // ----------- AUTOSAVE (ONLY VALID STATE) -----------
  useEffect(() => {
    localStorage.setItem("bounty_form", JSON.stringify(state));
  }, [state]);

  // ----------- UPDATE FUNCTIONS -----------
  const update = (patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const updateNested = (path, value) => {
    const keys = path.split(".");
    setState((prev) => {
      const copy = structuredClone(prev);
      let pointer = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        pointer = pointer[keys[i]];
      }
      pointer[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  // ----------- FULL RESET (For Submit or Exit) -----------
  const reset = () => {
    setState(defaultState);
    localStorage.removeItem("bounty_form");
    sessionStorage.removeItem("bounty_payload");
  };

  return (
    <BountyContext.Provider value={{ state, update, updateNested, reset }}>
      {children}
    </BountyContext.Provider>
  );
};

export const useBounty = () => useContext(BountyContext);
