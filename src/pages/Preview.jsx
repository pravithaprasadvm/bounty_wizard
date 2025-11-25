import React from "react";
import { useBounty } from "../context/BountyContext";

export default function Preview({ onEdit, onSubmit }) {
  const { state } = useBounty();

  const payload = {
    title: state.title,
    description: state.description,
    projectTitle: state.projectTitle,
    type: state.type,
    dominant_core: state.dominant_core,
    mode: state.mode,
    ...(state.mode === "physical" ? { location: state.location } : {}),
    reward: { ...state.reward },
    timeline: {
      expiration_date: state.timeline.expiration_date,
      estimated_completion: state.timeline.estimated_completion,
    },
    hasImpactCertificate: state.hasImpactCertificate,
    impactBriefMessage: state.impactBriefMessage,
    sdgs: state.sdgs,
    has_backer: state.has_backer,
    ...(state.has_backer ? { backer: state.backer } : {}),
    terms_accepted: state.terms_accepted,
  };

  const handleSubmit = () => {
    sessionStorage.setItem("bounty_payload", JSON.stringify(payload));
    onSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-10 text-center">
        Preview Bounty Details
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 border border-gray-300">
        {/* Basic Info */}
        <Section title="Basic Information">
          <Field label="Title" value={payload.title} />
          <Field label="Description" value={payload.description} multiline />
          <Field label="Project Title" value={payload.projectTitle || "—"} />
          <Field label="Type" value={payload.type} />
          <Field label="Dominant Impact Core" value={payload.dominant_core} />
          <Field label="Mode" value={payload.mode} />
          {payload.mode === "physical" && (
            <Field label="Location" value={payload.location} />
          )}
        </Section>

        {/* Reward */}
        <Section title="Reward">
          <div className="grid grid-cols-3 gap-6">
            <Field label="Currency" value={payload.reward.currency} />
            <Field label="Amount" value={payload.reward.amount} />
            <Field label="Winners" value={payload.reward.winners} />
          </div>
        </Section>

        {/* Timeline */}
        <Section title="Timeline">
          <Field
            label="Expiration Date"
            value={
              payload.timeline.expiration_date
                ? new Date(payload.timeline.expiration_date).toLocaleString()
                : "—"
            }
          />
          <div className="mt-3">
            <p className="font-semibold mb-2">Estimated Completion Time</p>
            <ul className="list-disc list-inside">
              <li>Days: {payload.timeline.estimated_completion.days}</li>
              <li>Hours: {payload.timeline.estimated_completion.hours}</li>
              <li>Minutes: {payload.timeline.estimated_completion.minutes}</li>
            </ul>
          </div>
        </Section>

        {/* Impact Certificate */}
        <Section title="Impact Certificate">
          <Field
            label="Has Certificate"
            value={payload.hasImpactCertificate ? "Yes" : "No"}
          />
          {payload.hasImpactCertificate && (
            <Field
              label="Impact Brief Message"
              value={payload.impactBriefMessage || "—"}
              multiline
            />
          )}
        </Section>

        {/* SDGs */}
        <Section title="SDGs">
          <p>
            {payload.sdgs.length ? payload.sdgs.join(", ") : "None selected"}
          </p>
        </Section>

        {/* Backer */}
        <Section title="Backer Information">
          <Field label="Has Backer" value={payload.has_backer ? "Yes" : "No"} />
          {payload.has_backer && (
            <>
              <Field label="Backer Name" value={payload.backer.name} />
              <Field label="Backer Logo URL" value={payload.backer.logoURL || "—"} />
              <Field label="Backer Message" value={payload.backer.message || "—"} />
            </>
          )}
        </Section>

        {/* Terms */}
        <Section title="Terms & Conditions">
          <Field
            label="Terms Accepted"
            value={payload.terms_accepted ? "Yes" : "No"}
          />
        </Section>
      </div>

      <div className="flex justify-between mt-10">
        <button
          className="px-8 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          onClick={onEdit}
          type="button"
        >
          Edit
        </button>
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={handleSubmit}
          type="button"
        >
          Create Bounty
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({ label, value, multiline = false }) {
  return multiline ? (
    <p className="mb-3 whitespace-pre-wrap">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  ) : (
    <p className="mb-3">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
