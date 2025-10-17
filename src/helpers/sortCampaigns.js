const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const toTime = (d) => (DATE_RE.test(d) ? Date.parse(d) || 0 : 0);
const getProfit = (x) => Number(x?.revenue ?? 0) - Number(x?.cost ?? 0);

function primitiveCompare(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}

export function getCampaignComparator(orderBy = "name", order = "asc") {
    return (a, b) => {
        let left; let right;

        switch (orderBy) {
            case "startDate":
                left = toTime(a.startDate);
                right = toTime(b.startDate);
                break;
            case "profit":
                left = getProfit(a);
                right = getProfit(b);
                break;
            case "name":
            default:
                const an = (a.name ?? "").toString();
                const bn = (b.name ?? "").toString();
                const lc = an.localeCompare(bn, undefined, { sensitivity: "base" });
                return order === "asc" ? lc : -lc;
        }

        const base = primitiveCompare(left, right);
        return order === "asc" ? base : -base;
    };
}

export function sortCampaigns(rows, { orderBy = "name", order = "asc" } = {}) {
    return (rows ?? [])
        .map((item, idx) => ({ item, idx }))
        .sort((a, b) => {
            const cmp = getCampaignComparator(orderBy, order)(a.item, b.item);
            if (cmp !== 0) return cmp;
            return a.idx - b.idx;
        })
        .map((x) => x.item);
}
