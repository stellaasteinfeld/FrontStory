import React, { useState } from "react";
import { Box, Stack, TextField, Button, Divider, Typography } from "@mui/material";
import { validateCampaign } from "../helpers/validateCampaign.js";

export default function CampaignForm({ onAdd }) {
    const [form, setForm] = useState({
        name: "",
        startDate: "",
        endDate: "",
        clicks: "",
        cost: "",
        revenue: "",
    });

    const { errors, valid } = validateCampaign(form);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!valid) return;

        onAdd({
            id: crypto.randomUUID?.() ?? String(Date.now()),
            name: form.name.trim(),
            startDate: form.startDate,
            endDate: form.endDate,
            clicks: Number(form.clicks || 0),
            cost: Number(form.cost || 0),
            revenue: Number(form.revenue || 0),
        });

        setForm({
            name: "",
            startDate: "",
            endDate: "",
            clicks: "",
            cost: "",
            revenue: "",
        });
    };

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Add new campaign
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    required
                    inputProps={{ min: "1900-01-01", max: "2100-12-31" }}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                />
                <TextField
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    required
                    inputProps={{
                        min: form.startDate || "1900-01-01",
                        max: "2100-12-31",
                    }}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Clicks"
                    type="number"
                    name="clicks"
                    value={form.clicks}
                    onChange={onChange}
                    inputProps={{ min: 0, step: 1 }}
                    error={!!errors.clicks}
                    helperText={errors.clicks}
                />
                <TextField
                    label="Cost"
                    type="number"
                    name="cost"
                    value={form.cost}
                    onChange={onChange}
                    inputProps={{ min: 0, step: "0.01" }}
                    error={!!errors.cost}
                    helperText={errors.cost}
                />
                <TextField
                    label="Revenue"
                    type="number"
                    name="revenue"
                    value={form.revenue}
                    onChange={onChange}
                    inputProps={{ min: 0, step: "0.01" }}
                    error={!!errors.revenue}
                    helperText={errors.revenue}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Button type="submit" variant="contained" size="large" disabled={!valid}>
                    Add
                </Button>
            </Stack>
        </Box>
    );
}
