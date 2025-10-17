import React from "react";
import {
    Table, TableHead, TableRow, TableCell, TableBody,
    TableContainer, TableSortLabel, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CampaignTable({ rows, order, orderBy, onSort, onDelete }) {
    const cols = [
        { id: "name", label: "Name", sortable: true },
        { id: "startDate", label: "Start Date", sortable: true },
        { id: "endDate", label: "End Date", sortable: true },
        { id: "clicks", label: "Clicks", numeric: true, sortable: false },
        { id: "cost", label: "Cost", numeric: true, sortable: false },
        { id: "revenue", label: "Revenue", numeric: true, sortable: false },
        { id: "profit", label: "Profit", numeric: true, sortable: true },
        { id: "actions", label: "" },
    ];

    const handleHeaderClick = (colId) => {
        const nextOrder = orderBy === colId && order === "asc" ? "desc" : "asc";
        onSort(colId, nextOrder);
    };

    return (
        <TableContainer>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        {cols.map((c) => (
                            <TableCell
                                key={c.id}
                                align={c.numeric ? "right" : "left"}
                                sortDirection={orderBy === c.id ? order : false}
                            >
                                {c.sortable ? (
                                    <TableSortLabel
                                        active={orderBy === c.id}
                                        direction={orderBy === c.id ? order : "asc"}
                                        onClick={() => handleHeaderClick(c.id)}
                                    >
                                        {c.label}
                                    </TableSortLabel>
                                ) : (
                                    c.label
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((r) => {
                        const profit = Number(r.revenue) - Number(r.cost);
                        return (
                            <TableRow key={r.id} hover>
                                <TableCell>{r.name}</TableCell>
                                <TableCell>{r.startDate}</TableCell>
                                <TableCell>{r.endDate}</TableCell>
                                <TableCell align="right">{r.clicks}</TableCell>
                                <TableCell align="right">{Number(r.cost).toFixed(2)}</TableCell>
                                <TableCell align="right">{Number(r.revenue).toFixed(2)}</TableCell>
                                <TableCell align="right" style={{ fontWeight: 600 }}>
                                    {profit.toFixed(2)}
                                </TableCell>
                                <TableCell align="right" width={64}>
                                    <IconButton aria-label="delete" color="error" onClick={() => onDelete(r.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {rows.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={8} align="center" style={{ padding: "48px", color: "gray" }}>
                                No campaigns yet. Create one above.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
