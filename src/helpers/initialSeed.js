export const initialSeed = [
    {
        id: crypto.randomUUID?.() ?? String(Date.now()) + "-1",
        name: "Summer Launch",
        startDate: "2025-07-01",
        endDate: "2025-07-31",
        clicks: 1200,
        cost: 800,
        revenue: 1450,
    },
    {
        id: crypto.randomUUID?.() ?? String(Date.now()) + "-2",
        name: "Back to School",
        startDate: "2025-08-10",
        endDate: "2025-09-10",
        clicks: 980,
        cost: 600,
        revenue: 900,
    },
];
