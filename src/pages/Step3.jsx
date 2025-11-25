import React from "react";
import { useBounty } from "../context/BountyContext";
import { Input } from "../components/Inputs";
import { validateStep3 } from "../utils/validation";

export default function Step3({ onBack, onNext }) {
  const { state, update } = useBounty();
  const errors = validateStep3(state);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    update({
      backer: { ...state.backer, logoFile: file, logoURL: url },
    });
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Backer Information
      </h2>

      {/* Has Backer */}
      <div className="bg-white p-8 rounded-2xl shadow border border-gray-100 mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Has Backer?
        </label>

        <div className="flex gap-4">
          <button
            className={`px-5 py-2 rounded-xl border text-sm font-medium ${
              state.has_backer
                ? "bg-[#0085FF] text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => update({ has_backer: true })}
          >
            Yes
          </button>

          <button
            className={`px-5 py-2 rounded-xl border text-sm font-medium ${
              !state.has_backer
                ? "bg-[#0085FF] text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => update({ has_backer: false })}
          >
            No
          </button>
        </div>
      </div>

      {state.has_backer && (
        <div className="bg-white p-8 rounded-2xl shadow border border-gray-100 mb-8">
          <Input
            label="Backer Name *"
            value={state.backer.name}
            onChange={(v) =>
              update({ backer: { ...state.backer, name: v } })
            }
            error={errors.backer_name}
          />

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backer Logo (URL or Upload)
            </label>

            <input
              type="text"
              value={state.backer.logoURL}
              placeholder="https://example.com/logo.png"
              className={`w-full border rounded-xl px-4 py-3 shadow-sm ${
                errors.backer_logo ? "border-red-400" : "border-gray-300"
              }`}
              onChange={(e) =>
                update({
                  backer: {
                    ...state.backer,
                    logoURL: e.target.value,
                    logoFile: null,
                  },
                })
              }
            />

            <div className="text-center my-4 text-gray-500">or</div>

            <label className="block w-full p-4 border rounded-xl bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </label>

            {state.backer.logoURL && (
              <img
                src={state.backer.logoURL}
                className="h-20 mt-4 object-contain border rounded-md shadow"
                alt="Backer Logo"
              />
            )}
          </div>

          <div className="mt-6">
            <Input
              label="Backer Message (optional)"
              value={state.backer.message}
              onChange={(v) =>
                update({ backer: { ...state.backer, message: v } })
              }
            />
          </div>
        </div>
      )}

      {/* Terms */}
      <div className="bg-white p-8 rounded-2xl shadow border border-gray-100 mb-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={state.terms_accepted}
            onChange={(e) =>
              update({ terms_accepted: e.target.checked })
            }
            className="w-5 h-5 accent-[#0085FF]"
          />
          <span className="text-sm text-gray-700">
            I accept the{" "}
            <button className="text-[#0085FF] underline">
              Terms & Conditions
            </button>
          </span>
        </label>

        {errors.terms_accepted && (
          <p className="text-red-500 text-sm mt-1">
            {errors.terms_accepted}
          </p>
        )}
      </div>

      <div className="flex justify-between mt-10">
        <button
          className="px-6 py-3 rounded-xl border bg-white"
          onClick={onBack}
        >
          Back
        </button>

        <button
          disabled={Object.keys(errors).length > 0}
          className={`px-6 py-3 rounded-xl text-white font-medium ${
            Object.keys(errors).length > 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#0085FF] hover:bg-[#0074e6]"
          }`}
          onClick={onNext}
        >
          Preview
        </button>
      </div>
    </div>
  );
}
