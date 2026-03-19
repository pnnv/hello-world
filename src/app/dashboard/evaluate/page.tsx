"use client";

import { useEvalStore } from "@/store/stores";
import { motion } from "framer-motion";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FileCheck, Code, FileText, FlaskConical, Shield, Sparkles } from "lucide-react";

type SubmissionType = "essay" | "code" | "lab";

export default function EvaluatePage() {
    const { lastResult, lastIntegrity, isEvaluating, setResult, setIntegrity, setEvaluating, reset } = useEvalStore();
    const [submission, setSubmission] = useState("");
    const [type, setType] = useState<SubmissionType>("essay");
    const [problem, setProblem] = useState("");
    const [codeLang, setCodeLang] = useState("python");

    const handleEvaluate = async () => {
        if (!submission.trim()) return;
        setEvaluating(true);
        reset();
        try {
            const [evalRes, integrityRes] = await Promise.all([
                fetch("/api/ai/evaluate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ submission, type, problem, language: codeLang }) }),
                fetch("/api/ai/integrity", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: submission }) }),
            ]);
            if (evalRes.ok) setResult(await evalRes.json());
            if (integrityRes.ok) setIntegrity(await integrityRes.json());
        } catch (err) { console.error(err); } finally { setEvaluating(false); }
    };

    const getScoreColor = (score: number, max: number) => {
        const pct = (score / max) * 100;
        if (pct >= 80) return "success.main";
        if (pct >= 60) return "warning.main";
        return "error.main";
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700} color="text.primary">Evaluate</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Submit essays, code, or lab reports for rubric-aware feedback</Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Input Panel */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* Type Selector */}
                        <ToggleButtonGroup
                            value={type}
                            exclusive
                            onChange={(_, v) => { if (v) { setType(v); reset(); } }}
                            sx={{ "& .MuiToggleButton-root": { borderRadius: 2, px: 2, py: 1, textTransform: "none", fontSize: "0.8125rem", gap: 1 } }}
                        >
                            <ToggleButton value="essay"><FileText size={16} />Essay</ToggleButton>
                            <ToggleButton value="code"><Code size={16} />Code</ToggleButton>
                            <ToggleButton value="lab"><FlaskConical size={16} />Lab Report</ToggleButton>
                        </ToggleButtonGroup>

                        {type === "code" && (
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Problem statement (optional)" fullWidth size="small" />
                                <Select value={codeLang} onChange={(e) => setCodeLang(e.target.value)} size="small" sx={{ minWidth: 120 }}>
                                    <MenuItem value="python">Python</MenuItem>
                                    <MenuItem value="javascript">JavaScript</MenuItem>
                                    <MenuItem value="java">Java</MenuItem>
                                    <MenuItem value="cpp">C++</MenuItem>
                                </Select>
                            </Box>
                        )}

                        <Card>
                            <textarea
                                value={submission} onChange={(e) => setSubmission(e.target.value)}
                                placeholder={type === "code" ? "Paste your code here..." : type === "lab" ? "Paste your lab report..." : "Paste your essay here..."}
                                style={{
                                    width: "100%", height: 320, padding: 16, fontSize: 14, resize: "none",
                                    background: "transparent", border: "none", outline: "none", color: "#2D3142",
                                    fontFamily: type === "code" ? "monospace" : "inherit",
                                }}
                            />
                        </Card>

                        <Button
                            variant="contained" fullWidth onClick={handleEvaluate}
                            disabled={!submission.trim() || isEvaluating}
                            startIcon={isEvaluating ? undefined : <FileCheck size={18} />}
                            sx={{ py: 1.5 }}
                        >
                            {isEvaluating ? "Evaluating..." : "Evaluate with Rubric"}
                        </Button>
                    </Box>
                </Grid>

                {/* Results Panel */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {lastResult && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <Card>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                            <Typography variant="subtitle1" fontWeight={600}>Rubric Results</Typography>
                                            <Typography variant="h5" fontWeight={700} sx={{ color: getScoreColor(lastResult.overallScore, 100) }}>
                                                {lastResult.overallScore}<Typography component="span" variant="body2" color="text.secondary">/100</Typography>
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                            {lastResult.criteria.map((c) => (
                                                <Box key={c.name}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                                        <Typography variant="caption" color="text.secondary">{c.name}</Typography>
                                                        <Typography variant="caption" sx={{ color: getScoreColor(c.score, c.maxScore) }}>{c.score}/{c.maxScore}</Typography>
                                                    </Box>
                                                    <LinearProgress variant="determinate" value={(c.score / c.maxScore) * 100}
                                                        sx={{ height: 6, borderRadius: 3, bgcolor: "#F0F1F5", "& .MuiLinearProgress-bar": { bgcolor: getScoreColor(c.score, c.maxScore) } }} />
                                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>{c.suggestion}</Typography>
                                                </Box>
                                            ))}
                                        </Box>

                                        {lastResult.strengths?.length > 0 && (
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>✦ Strengths</Typography>
                                                {lastResult.strengths.map((s, i) => <Typography key={i} variant="caption" color="text.secondary" sx={{ display: "block", ml: 1.5 }}>• {s}</Typography>)}
                                            </Box>
                                        )}
                                        {lastResult.improvements?.length > 0 && (
                                            <Box sx={{ mt: 1 }}>
                                                <Typography variant="caption" sx={{ color: "warning.dark", fontWeight: 600 }}>⚡ Improvements</Typography>
                                                {lastResult.improvements.map((s, i) => <Typography key={i} variant="caption" color="text.secondary" sx={{ display: "block", ml: 1.5 }}>• {s}</Typography>)}
                                            </Box>
                                        )}
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
                                            {lastResult.overallFeedback}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {lastIntegrity && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <Card>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Shield size={16} />
                                                <Typography variant="subtitle2" fontWeight={600}>Integrity Report</Typography>
                                            </Box>
                                            <Typography variant="h6" fontWeight={700}
                                                sx={{ color: lastIntegrity.originalityScore >= 80 ? "success.main" : lastIntegrity.originalityScore >= 60 ? "warning.main" : "error.main" }}>
                                                {lastIntegrity.originalityScore}%
                                            </Typography>
                                        </Box>

                                        <Grid container spacing={1} sx={{ mb: 2 }}>
                                            <Grid size={6}>
                                                <Box sx={{ bgcolor: "background.default", borderRadius: 2, p: 1.5 }}>
                                                    <Typography variant="caption" color="text.secondary">AI Risk</Typography>
                                                    <Typography variant="body2" fontWeight={500} sx={{
                                                        color: lastIntegrity.analysis.aiGeneratedRisk === "low" ? "success.main"
                                                            : lastIntegrity.analysis.aiGeneratedRisk === "medium" ? "warning.main" : "error.main",
                                                        textTransform: "capitalize"
                                                    }}>
                                                        {lastIntegrity.analysis.aiGeneratedRisk}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={6}>
                                                <Box sx={{ bgcolor: "background.default", borderRadius: 2, p: 1.5 }}>
                                                    <Typography variant="caption" color="text.secondary">Style</Typography>
                                                    <Typography variant="body2" fontWeight={500} color="text.primary" sx={{ textTransform: "capitalize" }}>
                                                        {lastIntegrity.analysis.styleConsistency?.replace(/_/g, " ")}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        {lastIntegrity.suggestions?.length > 0 && (
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "info.main", fontWeight: 600 }}>📝 Suggestions</Typography>
                                                {lastIntegrity.suggestions.map((s, i) => <Typography key={i} variant="caption" color="text.secondary" sx={{ display: "block", ml: 1.5 }}>• {s}</Typography>)}
                                            </Box>
                                        )}
                                        {lastIntegrity.overallNote && <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic", mt: 1, display: "block" }}>{lastIntegrity.overallNote}</Typography>}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {!lastResult && !isEvaluating && (
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Sparkles size={40} color="#D0D4E0" style={{ margin: "0 auto 12px" }} />
                                    <Typography variant="body2" color="text.secondary">Submit your work to get rubric-aware feedback and integrity analysis</Typography>
                                </CardContent>
                            </Card>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
