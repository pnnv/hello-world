"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
    LayoutDashboard,
    Brain,
    BookOpen,
    FileCheck,
    Calendar,
    ChevronLeft,
    Sparkles,
    LogOut,
    Map,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { getExamById } from "@/lib/data/exam-syllabi";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/knowledge-graph", label: "Syllabus Tracker", icon: Brain },
    { href: "/dashboard/roadmap", label: "Roadmap", icon: Map },
    { href: "/dashboard/learn", label: "Learn", icon: BookOpen },
    { href: "/dashboard/evaluate", label: "Evaluate", icon: FileCheck },
    { href: "/dashboard/planner", label: "Study Planner", icon: Calendar },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { currentUser, logout } = useAuthStore();
    const sidebarWidth = collapsed ? 68 : 240;
    const exam = currentUser?.selectedExam ? getExamById(currentUser.selectedExam) : null;

    const handleLogout = () => {
        logout();
        router.push("/auth");
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: sidebarWidth,
                    boxSizing: "border-box",
                    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    borderRight: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                },
            }}
        >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, height: 64, flexShrink: 0, borderBottom: 1, borderColor: "divider" }}>
                <Box sx={{
                    width: 36, height: 36, borderRadius: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    bgcolor: "primary.main", flexShrink: 0,
                }}>
                    <Sparkles size={16} color="white" />
                </Box>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Typography variant="subtitle1" fontWeight={700} color="text.primary" lineHeight={1.2}>
                                ScoreCraft
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.625rem" }}>
                                AI Learning Platform
                            </Typography>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            {/* User Info */}
            {currentUser && !collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.light", color: "primary.dark", fontSize: "0.75rem", fontWeight: 700 }}>
                                {currentUser.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={500} noWrap color="text.primary">
                                    {currentUser.name}
                                </Typography>
                                {exam && (
                                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block", fontSize: "0.625rem" }}>
                                        {exam.icon} {exam.shortName}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </motion.div>
            )}

            {/* Navigation */}
            <List sx={{ flex: 1, py: 2, px: 1, overflow: "auto" }}>
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname?.startsWith(item.href));

                    return (
                        <Tooltip key={item.href} title={collapsed ? item.label : ""} placement="right">
                            <Link href={item.href} style={{ textDecoration: "none" }}>
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        borderRadius: 2.5,
                                        mb: 0.5,
                                        px: collapsed ? 2.5 : 2,
                                        py: 1,
                                        minHeight: 42,
                                        justifyContent: collapsed ? "center" : "flex-start",
                                        position: "relative",
                                        "&.Mui-selected": {
                                            bgcolor: "rgba(124, 140, 245, 0.08)",
                                            "&:hover": { bgcolor: "rgba(124, 140, 245, 0.12)" },
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                left: 0,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                width: 3,
                                                height: 20,
                                                borderRadius: "0 4px 4px 0",
                                                bgcolor: "primary.main",
                                            },
                                        },
                                        "&:hover": { bgcolor: "action.hover" },
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        minWidth: collapsed ? 0 : 36,
                                        color: isActive ? "primary.main" : "text.secondary",
                                        justifyContent: "center",
                                    }}>
                                        <item.icon size={18} />
                                    </ListItemIcon>
                                    {!collapsed && (
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontSize: "0.8125rem",
                                                fontWeight: isActive ? 600 : 500,
                                                color: isActive ? "primary.main" : "text.secondary",
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Link>
                        </Tooltip>
                    );
                })}
            </List>

            {/* Bottom */}
            <Box sx={{ flexShrink: 0, borderTop: 1, borderColor: "divider" }}>
                {!collapsed && (
                    <ListItemButton onClick={handleLogout} sx={{ px: 2, py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
                            <LogOut size={16} />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: "0.75rem", fontWeight: 500, color: "text.secondary" }} />
                    </ListItemButton>
                )}
                <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={onToggle} size="small" sx={{ color: "text.secondary" }}>
                        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronLeft size={16} />
                        </motion.div>
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    );
}
