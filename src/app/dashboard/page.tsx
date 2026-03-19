"use client";

import { motion } from "framer-motion";
import { Brain, BookOpen, FileCheck, Calendar, Upload, Target, Flame, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import { useKGStore, useMasteryStore } from "@/store/stores";
import { useAuthStore } from "@/store/auth-store";
import { getExamById, buildKGFromExam } from "@/lib/data/exam-syllabi";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { knowledgeGraph, forExamId, isGenerating, setKnowledgeGraph, setGenerating, setError } = useKGStore();
    const { mastery, getExamReadiness, initializeConcepts, setExamDate } = useMasteryStore();
    const { currentUser } = useAuthStore();
    const [textInput, setTextInput] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [mounted, setMounted] = useState(false);
    const autoLoadedRef = useRef(false);
    const router = useRouter();

    const exam = currentUser?.selectedExam ? getExamById(currentUser.selectedExam) : null;

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted || !exam || autoLoadedRef.current) return;
        const examMismatch = knowledgeGraph && forExamId && forExamId !== exam.id;
        const noKG = !knowledgeGraph;
        if (noKG || examMismatch) {
            autoLoadedRef.current = true;
            if (examMismatch) {
                useKGStore.getState().reset();
                useMasteryStore.getState().resetMastery();
            }
            if (exam.examDate) setExamDate(exam.examDate);
            const kg = buildKGFromExam(exam);
            setKnowledgeGraph(kg, exam.id);
            initializeConcepts(kg.concepts.map((c) => c.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, knowledgeGraph, exam]);

    const readiness = getExamReadiness();
    const totalConcepts = knowledgeGraph?.concepts.length || 0;
    const masteredCount = Object.values(mastery).filter((m) => m.mastery >= 0.85).length;
    const learningCount = Object.values(mastery).filter((m) => m.mastery >= 0.4 && m.mastery < 0.85).length;

    const handleGenerateKG = useCallback(async (text: string, subject?: string) => {
        if (!text.trim()) return;
        setGenerating(true);
        try {
            const res = await fetch("/api/ai/generate-kg", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.slice(0, 12000), subject: subject || "Subject" }) });
            if (!res.ok) throw new Error("Failed");
            const kg = await res.json();
            setKnowledgeGraph(kg, exam?.id);
            initializeConcepts(kg.concepts.map((c: { id: string }) => c.id));
        } catch { setError("Failed to generate knowledge graph. Check your API key."); }
        finally { setGenerating(false); }
    }, [setGenerating, setKnowledgeGraph, setError, initializeConcepts, exam]);

    const handleFileUpload = useCallback(async (file: File) => {
        const text = await file.text();
        handleGenerateKG(text);
    }, [handleGenerateKG]);

    if (!mounted) {
        return (
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Box sx={{ height: 28, width: 144, borderRadius: 2, bgcolor: "action.hover", mb: 2 }} />
                <Grid container spacing={2}>
                    {[0, 1, 2, 3].map(i => <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}><Box sx={{ height: 96, borderRadius: 4, bgcolor: "action.hover" }} /></Grid>)}
                </Grid>
            </Box>
        );
    }

    const getMasteryColor = (m: number) => m >= 0.85 ? "primary.main" : m >= 0.65 ? "success.main" : m >= 0.4 ? "warning.main" : m >= 0.15 ? "error.main" : "text.disabled";

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color="text.primary">Dashboard</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {exam ? `${exam.icon} Preparing for ${exam.name}` : "Welcome back. Let's continue learning."}
                        </Typography>
                    </Box>
                    {exam?.examDate && (
                        <Box sx={{ textAlign: "right" }}>
                            <Typography variant="caption" color="text.secondary">Exam Date</Typography>
                            <Typography variant="body2" fontWeight={600} color="text.primary">
                                {new Date(exam.examDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </motion.div>

            {/* Stats */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {[
                    { label: "Exam Readiness", value: `${readiness}%`, icon: Target, detail: readiness > 70 ? "On track" : "Keep studying" },
                    { label: "Concepts Mastered", value: `${masteredCount}/${totalConcepts}`, icon: Brain, detail: `${learningCount} in progress` },
                    { label: "Study Streak", value: "7 days", icon: Flame, detail: "Personal best" },
                    { label: "XP Earned", value: `${Object.values(mastery).reduce((s, m) => s + m.totalAttempts * 10, 0)}`, icon: Sparkles, detail: "Scholar Level" },
                ].map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <Card sx={{ transition: "all 0.2s ease", "&:hover": { boxShadow: 3 } }}>
                                <CardContent sx={{ p: 2.5 }}>
                                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: "0.03em" }}>{stat.label}</Typography>
                                            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mt: 0.5 }}>{stat.value}</Typography>
                                            <Typography variant="caption" color="text.secondary">{stat.detail}</Typography>
                                        </Box>
                                        <Box sx={{ width: 36, height: 36, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(124, 140, 245, 0.08)" }}>
                                            <stat.icon size={16} color="#7C8CF5" />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* KG / Upload Section */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card sx={{ p: 3 }}>
                            {knowledgeGraph ? (
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={600} color="text.primary">{knowledgeGraph.subject}</Typography>
                                            <Typography variant="caption" color="text.secondary">{knowledgeGraph.concepts.length} concepts mapped</Typography>
                                        </Box>
                                        <Link href="/dashboard/knowledge-graph">
                                            <Button size="small" endIcon={<ChevronRight size={14} />} sx={{ color: "primary.main", bgcolor: "rgba(124,140,245,0.08)", "&:hover": { bgcolor: "rgba(124,140,245,0.12)" } }}>
                                                View Graph
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Box sx={{ maxHeight: 256, overflow: "auto" }}>
                                        {knowledgeGraph.concepts.slice(0, 8).map((concept) => {
                                            const m = mastery[concept.id]?.mastery || 0;
                                            return (
                                                <Link key={concept.id} href={`/dashboard/learn?concept=${concept.id}`} style={{ textDecoration: "none" }}>
                                                    <Box sx={{
                                                        display: "flex", alignItems: "center", gap: 1.5, px: 1.5, py: 1, borderRadius: 2,
                                                        "&:hover": { bgcolor: "action.hover" }, cursor: "pointer", transition: "all 0.2s ease",
                                                    }}>
                                                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: getMasteryColor(m), flexShrink: 0 }} />
                                                        <Typography variant="body2" color="text.primary" sx={{ flex: 1 }}>{concept.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{Math.round(m * 100)}%</Typography>
                                                    </Box>
                                                </Link>
                                            );
                                        })}
                                    </Box>
                                    <Button size="small" onClick={() => { useKGStore.getState().reset(); useMasteryStore.getState().resetMastery(); }} sx={{ mt: 2, color: "text.secondary", fontSize: "0.6875rem" }}>
                                        Upload new syllabus
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>Get Started</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Upload your syllabus or paste content to generate a knowledge graph.</Typography>

                                    <Box
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFileUpload(f); }}
                                        sx={{
                                            borderRadius: 3, p: 4, textAlign: "center", cursor: "pointer",
                                            border: `2px dashed ${dragOver ? "#7C8CF5" : "#E8EAF0"}`,
                                            bgcolor: dragOver ? "rgba(124,140,245,0.04)" : "transparent",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <Upload size={32} color="#B8BCD0" style={{ margin: "0 auto 12px" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Drop a file or{" "}
                                            <label style={{ cursor: "pointer", fontWeight: 500, color: "#7C8CF5" }}>
                                                browse
                                                <input type="file" style={{ display: "none" }} accept=".txt,.md,.pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
                                            </label>
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>Supports .txt, .md files</Typography>
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>Or paste your syllabus:</Typography>
                                        <textarea
                                            value={textInput}
                                            onChange={(e) => setTextInput(e.target.value)}
                                            placeholder="Paste your syllabus, course outline, or textbook chapter here..."
                                            style={{
                                                width: "100%", height: 112, borderRadius: 12, padding: 16, fontSize: 14, resize: "none",
                                                background: "#F5F6FA", border: "1px solid #E8EAF0", color: "#2D3142",
                                                fontFamily: "inherit", outline: "none",
                                            }}
                                        />
                                        <Button
                                            variant="contained" fullWidth onClick={() => handleGenerateKG(textInput)}
                                            disabled={!textInput.trim() || isGenerating} startIcon={<Brain size={16} />}
                                            sx={{ mt: 1.5, py: 1.5 }}
                                        >
                                            {isGenerating ? "Generating..." : "Generate Knowledge Graph"}
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Card>
                    </motion.div>
                </Grid>

                {/* Quick Actions */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, letterSpacing: "0.03em" }}>Quick Actions</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            {[
                                { href: "/dashboard/knowledge-graph", icon: Brain, label: "Knowledge Graph", desc: "Explore concept map" },
                                { href: "/dashboard/learn", icon: BookOpen, label: "AI Tutor", desc: "Socratic learning" },
                                { href: "/dashboard/evaluate", icon: FileCheck, label: "Submit Work", desc: "Get rubric feedback" },
                                { href: "/dashboard/planner", icon: Calendar, label: "Study Planner", desc: "Spaced repetition" },
                            ].map((action) => (
                                <Link key={action.href} href={action.href} style={{ textDecoration: "none" }}>
                                    <Card sx={{ transition: "all 0.2s ease", "&:hover": { borderColor: "primary.light", boxShadow: 2 } }}>
                                        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 }, display: "flex", alignItems: "center", gap: 2 }}>
                                            <Box sx={{ width: 36, height: 36, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(124,140,245,0.08)" }}>
                                                <action.icon size={16} color="#7C8CF5" />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" fontWeight={500} color="text.primary">{action.label}</Typography>
                                                <Typography variant="caption" color="text.secondary">{action.desc}</Typography>
                                            </Box>
                                            <ChevronRight size={16} color="#B8BCD0" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </Box>

                        {/* Readiness Bar */}
                        <Card sx={{ mt: 2 }}>
                            <CardContent sx={{ p: 2.5 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: "block", fontWeight: 500 }}>Exam Readiness</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={readiness}
                                    sx={{ height: 8, borderRadius: 4, bgcolor: "#F0F1F5", "& .MuiLinearProgress-bar": { bgcolor: "primary.main", borderRadius: 4 } }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                    <Typography variant="caption" color="text.secondary">0%</Typography>
                                    <Typography variant="subtitle2" fontWeight={700} color="text.primary">{readiness}%</Typography>
                                    <Typography variant="caption" color="text.secondary">100%</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
}
