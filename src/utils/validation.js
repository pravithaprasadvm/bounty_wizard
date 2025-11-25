export function validateStep1(data) {
  const errors = {};

  if (!data.title || data.title.trim() === "")
    errors.title = "Title is required";
  else if (data.title.length > 40)
    errors.title = "Max 40 characters";

  if (!data.description || data.description.trim() === "")
    errors.description = "Description is required";

  if (data.mode === "physical" && (!data.location || data.location.trim() === ""))
    errors.location = "Location is required";

  return errors;
}

export function validateStep2(data) {
  const errors = {};

  const r = data.reward;

  if (!r.currency) errors.reward_currency = "Currency required";
  if (!r.amount || Number(r.amount) <= 0)
    errors.reward_amount = "Amount must be greater than 0";
  if (!r.winners || Number(r.winners) <= 0)
    errors.reward_winners = "At least 1 winner required";

  if (!data.timeline.expiration_date)
    errors.expiration_date = "Expiration date is required";

  if (
    data.hasImpactCertificate &&
    (!data.impactBriefMessage || data.impactBriefMessage.trim() === "")
  )
    errors.impactBriefMessage = "Impact brief message required";

  return errors;
}

export function validateStep3(data) {
  const errors = {};

  if (!data.terms_accepted)
    errors.terms_accepted = "You must accept the terms & conditions";

  if (data.has_backer) {
    if (!data.backer.name) errors.backer_name = "Backer name required";

    if (!data.backer.logoURL && !data.backer.logoFile)
      errors.backer_logo = "Backer logo required";
  }

  return errors;
}
