
const toMs = (v) => {
    const ms = Date.parse(v);
    return Number.isFinite(ms) ? ms : NaN;
};

const getProfit = (x) => Number(x?.revenue ?? 0) - Number(x?.cost ?? 0);

const primitiveCompare = (a, b) => (a === b ? 0 : a < b ? -1 : 1);

const compareDates = (a, b) => {
    const A = toMs(a);
    const B = toMs(b);
    const aValid = !Number.isNaN(A);
    const bValid = !Number.isNaN(B);
    if (aValid && bValid) return primitiveCompare(A, B);
    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;
    return 0;
};

export function getCampaignComparator(orderBy = "name", order = "asc") {
    return (a, b) => {
        let base = 0;

        switch (orderBy) {
            case "startDate":
                base = compareDates(a.startDate, b.startDate);
                break;
            case "endDate":
                base = compareDates(a.endDate, b.endDate);
                break;
            case "profit":
                base = primitiveCompare(getProfit(a), getProfit(b));
                break;
            case "name":
            default: {
                const an = (a.name ?? "").toString();
                const bn = (b.name ?? "").toString();
                base = an.localeCompare(bn, undefined, { sensitivity: "base" });
                break;
            }
        }

        return order === "asc" ? base : -base;
    };
}

export function sortCampaigns(rows, { orderBy = "name", order = "asc" } = {}) {
    const cmp = getCampaignComparator(orderBy, order);
    return (rows ?? [])
        .map((item, idx) => ({ item, idx }))
        .sort((a, b) => {
            const res = cmp(a.item, b.item);
            return res !== 0 ? res : a.idx - b.idx;
        })
        .map((x) => x.item);
}
