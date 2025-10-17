const toMs = (v) => {
    const ms = Date.parse(v);
    return Number.isFinite(ms) ? ms : NaN;
};

export function validateCampaign(form) {
    const errors = {};

    if (!form.name || !form.name.trim()) {
        errors.name = "Required";
    }

    const startMs = toMs(form.startDate);
    const endMs = toMs(form.endDate);

    if (!form.startDate || Number.isNaN(startMs)) {
        errors.startDate = "Invalid date";
    }
    if (!form.endDate || Number.isNaN(endMs)) {
        errors.endDate = "Invalid date";
    }
    if (!errors.startDate && !errors.endDate && endMs < startMs) {
        errors.endDate = "End date must be ≥ start date";
    }

    const clicks = Number(form.clicks ?? 0);
    const cost = Number(form.cost ?? 0);
    const revenue = Number(form.revenue ?? 0);

    if (!Number.isFinite(clicks) || clicks < 0) errors.clicks = "Must be ≥ 0";
    if (!Number.isFinite(cost) || cost < 0) errors.cost = "Must be ≥ 0";
    if (!Number.isFinite(revenue) || revenue < 0) errors.revenue = "Must be ≥ 0";

    return { errors, valid: Object.keys(errors).length === 0 };
}
