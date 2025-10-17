import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import './App.scss';
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        secondary: { main: "#9c27b0" },
    },
    shape: { borderRadius: 12 },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Campaign Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Dashboard />
            </Container>
        </ThemeProvider>
    );
}
