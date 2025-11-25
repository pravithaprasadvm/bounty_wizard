import React from "react";

export default function StepIndicator({ currentPage }) {
  const steps = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex items-center justify-center gap-6 py-6">
      {steps.map((step) => {
        const isActive = step === currentPage;
        const isCompleted = step < currentPage;

        return (
          <div key={step} className="flex flex-col items-center gap-2">
            <div
              className={`
                w-10 h-10 flex items-center justify-center rounded-full border
                transition-all duration-300 text-sm font-medium
                ${
                  isActive
                    ? "bg-[#0085FF] text-white border-[#0085FF]" 
                    : isCompleted
                    ? "bg-white text-[#0085FF] border-[#0085FF]" 
                    : "bg-white border-gray-300 text-gray-400" 
                }
              `}
            >
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
}
