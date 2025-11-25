import React from "react";
import { useBounty } from "../context/BountyContext";

export default function Result() {
  const { reset } = useBounty();
  const raw = sessionStorage.getItem("bounty_payload");
  const payload = raw ? JSON.parse(raw) : null;

  if (!payload) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Result</h2>
        <div className="border rounded p-6 bg-gray-50 text-gray-600">
          No payload found.
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            reset();
            window.location.href = "/";
          }}
        >
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Bounty Created Successfully</h2>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-gray-200">

        {/* Basic Info */}
        <Section title="Basic Information">
          <Field label="Title" value={payload.title} />
          <Field label="Description" value={payload.description} multiline />
          <Field label="Project Title" value={payload.projectTitle || "—"} />
          <Field label="Type" value={payload.type} />
          <Field label="Dominant Impact Core" value={payload.dominant_core} />
          <Field label="Mode" value={payload.mode} />
          {payload.mode === "physical" && <Field label="Location" value={payload.location} />}
        </Section>

        {/* Reward */}
        <Section title="Reward">
          <Field label="Currency" value={payload.reward.currency} />
          <Field label="Amount" value={payload.reward.amount} />
          <Field label="Winners" value={payload.reward.winners} />
        </Section>

        {/* Timeline */}
        <Section title="Timeline">
          <Field label="Expiration Date" value={payload.timeline.expiration_date} />
          <div>
            <p className="font-semibold mb-2">Estimated Completion Time</p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Days: {payload.timeline.estimated_completion.days}</li>
              <li>Hours: {payload.timeline.estimated_completion.hours}</li>
              <li>Minutes: {payload.timeline.estimated_completion.minutes}</li>
            </ul>
          </div>
        </Section>

        {/* Impact Certificate */}
        <Section title="Impact Certificate">
          <Field label="Has Certificate" value={payload.hasImpactCertificate ? "Yes" : "No"} />
          {payload.hasImpactCertificate && (
            <Field label="Impact Brief Message" value={payload.impactBriefMessage || "—"} multiline />
          )}
        </Section>

        {/* SDGs */}
        <Section title="SDGs">
          <p>{payload.sdgs.length ? payload.sdgs.join(", ") : "None selected"}</p>
        </Section>

        {/* Backer Information */}
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

        {/* Terms & Conditions */}
        <Section title="Terms & Conditions">
          <Field label="Terms Accepted" value={payload.terms_accepted ? "Yes" : "No"} />
        </Section>
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            reset();
            window.location.href = "/";
          }}
        >
          Create Another Bounty
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-1">{title}</h3>
      {children}
    </section>
  );
}

function Field({ label, value, multiline = false }) {
  return multiline ? (
    <p className="mb-4 whitespace-pre-wrap">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  ) : (
    <p className="mb-2">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
