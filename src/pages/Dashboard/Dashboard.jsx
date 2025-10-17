import React, { useMemo, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { initialSeed } from "../../helpers/initialSeed.js";
import CampaignForm from "../../components/CampaignForm.jsx";
import CampaignTable from "../../components/CampaignTable.jsx";

export default function Dashboard() {
    const [campaigns, setCampaigns] = useLocalStorage("campaigns", initialSeed);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");

    const sorted = useMemo(() => {
        const cmp = (a, b) => {
            const val = (key) =>
                key === "profit"
                    ? Number(a.revenue) - Number(a.cost) - (Number(b.revenue) - Number(b.cost))
                    : key === "name"
                        ? a.name.localeCompare(b.name)
                        : key === "startDate" || key === "endDate"
                            ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
                            : Number(a[key]) - Number(b[key]);
            const x = val(orderBy);
            return order === "asc" ? x : -x;
        };
        return [...campaigns].sort(cmp);
    }, [campaigns, order, orderBy]);

    const handleAdd = (payload) => setCampaigns((xs) => [payload, ...xs]);
    const handleDelete = (id) => setCampaigns((xs) => xs.filter((c) => c.id !== id));
    const handleSort = (col) =>
        setOrderBy((prevCol) => {
            setOrder((prev) => (prevCol === col && prev === "asc" ? "desc" : "asc"));
            return col;
        });

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Campaigns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage campaigns: create, delete, and view daily metrics. (Profit = Revenue - Cost)
                </Typography>
            </Box>

            <Paper variant="outlined" sx={{ p: 2 }}>
                <CampaignForm onAdd={handleAdd} />
            </Paper>

            <Paper variant="outlined">
                <CampaignTable
                    rows={sorted}
                    order={order}
                    orderBy={orderBy}
                    onSort={handleSort}
                    onDelete={handleDelete}
                />
            </Paper>
        </Stack>
    );
}
