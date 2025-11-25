import React, { useState } from "react";
import { useBounty } from "../context/BountyContext";
import { Select, Input } from "../components/Inputs";

const validateStep2 = (state) => {
  const errors = {};

  if (!state.reward.currency)
    errors.currency = "Currency is required";

  if (!state.reward.amount || Number(state.reward.amount) <= 0)
    errors.amount = "Valid reward amount is required";

  if (!state.timeline.expiration_date)
    errors.expiration_date = "Expiration date is required";

  if (state.hasImpactCertificate) {
    if (!state.impactBriefMessage.trim())
      errors.impactBriefMessage = "Impact brief is required";
  }

  return errors;
};

export default function Step2({ onNext, onBack }) {
  const { state, update, updateNested } = useBounty();
  const errors = validateStep2(state);

  // Track which fields are touched
  const [touched, setTouched] = useState({});

  // Mark field as touched
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  // Handle Next click
  const handleNext = () => {
    // Mark all fields as touched on submit attempt
    setTouched({
      currency: true,
      amount: true,
      expiration_date: true,
      impactBriefMessage: true,
    });

    if (isValid) onNext();
  };

  // SDGs array (unchanged)
  const sdgs = [
    "No Poverty",
    "Zero Hunger",
    "Good Health",
    "Quality Education",
    "Gender Equality",
    "Clean Water",
    "Clean Energy",
    "Decent Work",
    "Innovation",
    "Reduced Inequality",
    "Sustainable Cities",
    "Responsible Consumption",
    "Climate Action",
    "Life Below Water",
    "Life On Land",
    "Peace & Justice",
    "Partnerships",
  ];

  const toggleSDG = (sdg) => {
    const exists = state.sdgs.includes(sdg);
    update({
      sdgs: exists
        ? state.sdgs.filter((x) => x !== sdg)
        : [...state.sdgs, sdg],
    });
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Rewards & Timeline
      </h2>

      <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Reward</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <Select
            label="Currency"
            value={state.reward.currency}
            onChange={(v) => updateNested("reward.currency", v)}
            onBlur={() => handleBlur("currency")}
            options={["USD", "INR", "EUR", "GBP"]}
            error={touched.currency ? errors.currency : ""}
          />

          <Input
            label="Total Reward Amount *"
            value={state.reward.amount}
            onChange={(v) => updateNested("reward.amount", v)}
            onBlur={() => handleBlur("amount")}
            error={touched.amount ? errors.amount : ""}
            type="number"
          />

          <Input
            label="Number of Winners"
            value={state.reward.winners}
            onChange={(v) => updateNested("reward.winners", Number(v))}
            type="number"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Timeline</h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiration Date *
          </label>

          <input
            type="datetime-local"
            value={state.timeline.expiration_date}
            onChange={(e) =>
              updateNested("timeline.expiration_date", e.target.value)
            }
            onBlur={() => handleBlur("expiration_date")}
            className={`w-full border rounded-xl px-4 py-3 shadow-sm text-gray-700 ${
              touched.expiration_date && errors.expiration_date
                ? "border-red-400"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />

          {touched.expiration_date && errors.expiration_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expiration_date}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Input
            label="Days"
            value={state.timeline.estimated_completion.days}
            onChange={(v) =>
              updateNested("timeline.estimated_completion.days", Number(v))
            }
            type="number"
          />

          <Input
            label="Hours"
            value={state.timeline.estimated_completion.hours}
            onChange={(v) =>
              updateNested("timeline.estimated_completion.hours", Number(v))
            }
            type="number"
          />

          <Input
            label="Minutes"
            value={state.timeline.estimated_completion.minutes}
            onChange={(v) =>
              updateNested("timeline.estimated_completion.minutes", Number(v))
            }
            type="number"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Impact Certificate
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={state.hasImpactCertificate}
            onChange={(e) => update({ hasImpactCertificate: e.target.checked })}
            className="w-5 h-5"
          />
          <span className="text-gray-700">Include Impact Certificate</span>
        </div>

        {state.hasImpactCertificate && (
          <>
            <textarea
              className={`w-full border rounded-xl px-4 py-3 shadow-sm text-gray-700 mb-4 h-28 ${
                touched.impactBriefMessage && errors.impactBriefMessage
                  ? "border-red-400"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Write impact brief message..."
              value={state.impactBriefMessage}
              onChange={(e) => update({ impactBriefMessage: e.target.value })}
              onBlur={() => handleBlur("impactBriefMessage")}
            />
            {touched.impactBriefMessage && errors.impactBriefMessage && (
              <p className="text-red-500 text-sm">{errors.impactBriefMessage}</p>
            )}
          </>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">SDGs</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {sdgs.map((sdg, i) => (
            <label
              key={i}
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={state.sdgs.includes(sdg)}
                onChange={() => toggleSDG(sdg)}
                className="w-5 h-5"
              />
              <span className="text-gray-700">{sdg}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          onClick={onBack}
        >
          Back
        </button>

        <button
          className={`px-6 py-3 rounded-xl text-white font-medium shadow ${
            !isValid
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#0085FF] hover:bg-[#0074e6]"
          }`}
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </div>
  );
}
