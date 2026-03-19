"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { currentUser } = useAuthStore();
    const router = useRouter();
    const drawerWidth = collapsed ? 68 : 240;

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (mounted && !currentUser) {
            router.push("/auth");
        }
    }, [mounted, currentUser, router]);

    if (!mounted || !currentUser) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
                <CircularProgress size={28} sx={{ color: "primary.main" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: `${drawerWidth}px`,
                    p: { xs: 3, lg: 4 },
                    transition: "margin-left 250ms ease-in-out",
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
