import React, { useState } from "react";
import { useBounty } from "../context/BountyContext";
import { Input, TextArea, Select } from "../components/Inputs";
import { validateStep1 } from "../utils/validation";

export default function Step1({ onNext }) {
  const { state, update } = useBounty();
  const errors = validateStep1(state);

  // Track touched fields
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Mark all fields as touched on Next attempt
  const handleNext = () => {
    setTouched({
      title: true,
      description: true,
      projectTitle: true,
      type: true,
      dominant_core: true,
      mode: true,
      location: true,
    });

    if (Object.keys(errors).length === 0) {
      onNext();
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Basic Details</h2>

      <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
        <Input
          label="Bounty Title *"
          value={state.title}
          onChange={(v) => update({ title: v })}
          onBlur={() => handleBlur("title")}
          error={touched.title ? errors.title : ""}
          maxLength={40}
        />

        <TextArea
          label="Bounty Description *"
          value={state.description}
          onChange={(v) => update({ description: v })}
          onBlur={() => handleBlur("description")}
          error={touched.description ? errors.description : ""}
        />

        <Input
          label="Project Title (Optional)"
          value={state.projectTitle}
          onChange={(v) => update({ projectTitle: v })}
          onBlur={() => handleBlur("projectTitle")}
          error={touched.projectTitle ? errors.projectTitle : ""}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Select
            label="Bounty Type"
            value={state.type}
            onChange={(v) => update({ type: v })}
            options={["Content", "Design", "Development", "Marketing", "Other"]}
            onBlur={() => handleBlur("type")}
            error={touched.type ? errors.type : ""}
          />

          <Select
            label="Dominant Impact Core"
            value={state.dominant_core}
            onChange={(v) => update({ dominant_core: v })}
            options={["Water", "Earth", "Social", "Energy"]}
            onBlur={() => handleBlur("dominant_core")}
            error={touched.dominant_core ? errors.dominant_core : ""}
          />
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Bounty Mode *</label>

          <div className="flex gap-4">
            <button
              type="button"
              className={`px-6 py-3 rounded-xl border transition-all ${
                state.mode === "digital"
                  ? "border-blue-500 bg-blue-50 text-blue-600 font-medium shadow-sm"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => update({ mode: "digital", location: "" })}
              onBlur={() => handleBlur("mode")}
            >
              Digital
            </button>

            <button
              type="button"
              className={`px-6 py-3 rounded-xl border transition-all ${
                state.mode === "physical"
                  ? "border-blue-500 bg-blue-50 text-blue-600 font-medium shadow-sm"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => update({ mode: "physical" })}
              onBlur={() => handleBlur("mode")}
            >
              Physical
            </button>
          </div>
        </div>

        {state.mode === "physical" && (
          <div className="mt-6">
            <Input
              label="Location *"
              value={state.location}
              onChange={(v) => update({ location: v })}
              onBlur={() => handleBlur("location")}
              error={touched.location ? errors.location : ""}
            />
          </div>
        )}

        <div className="flex justify-end mt-10">
          <button
            className={`px-6 py-3 rounded-xl text-white font-medium shadow transition-all ${
              !isValid ? "bg-gray-300 cursor-not-allowed" : "bg-[#0085FF] hover:bg-[#0074e6]"
            }`}
            onClick={handleNext}
            disabled={!isValid}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
