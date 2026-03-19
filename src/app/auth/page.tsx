"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useKGStore, useMasteryStore } from "@/store/stores";
import { EXAMS } from "@/lib/data/exam-syllabi";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Sparkles, ArrowRight, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";

type Mode = "login" | "register";
type RegisterStep = "info" | "exam";

export default function AuthPage() {
    const router = useRouter();
    const { currentUser, register, login } = useAuthStore();
    const [mounted, setMounted] = useState(false);
    const [mode, setMode] = useState<Mode>("login");
    const [step, setStep] = useState<RegisterStep>("info");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedExam, setSelectedExam] = useState("");

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        if (mounted && currentUser) router.push("/dashboard");
    }, [mounted, currentUser, router]);

    if (!mounted || currentUser) return null;

    const handleLogin = () => {
        setError("");
        const result = login(email, password);
        if (!result.success) setError(result.error || "Login failed");
        else router.push("/dashboard");
    };

    const handleRegisterInfo = () => {
        if (!name.trim()) { setError("Name is required"); return; }
        if (!email.trim()) { setError("Email is required"); return; }
        if (password.length < 4) { setError("Password must be at least 4 characters"); return; }
        setError("");
        setStep("exam");
    };

    const handleRegisterExam = () => {
        if (!selectedExam) { setError("Please select an exam"); return; }
        setError("");
        useKGStore.getState().reset();
        useMasteryStore.getState().resetMastery();
        const result = register(name, email, password, selectedExam);
        if (!result.success) setError(result.error || "Registration failed");
        else router.push("/dashboard");
    };

    const switchMode = (m: Mode) => {
        setMode(m);
        setStep("info");
        setError("");
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2, bgcolor: "background.default" }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%", maxWidth: mode === "register" && step === "exam" ? 720 : 440 }}
            >
                {/* Logo */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.main", mx: "auto", mb: 2, borderRadius: 3 }}>
                        <Sparkles size={20} color="white" />
                    </Avatar>
                    <Typography variant="h5" fontWeight={700} color="text.primary">
                        Score<span className="gradient-text">Craft</span>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">AI Learning Platform</Typography>
                </Box>

                <Card>
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        {/* Mode Tabs */}
                        <Box sx={{ display: "flex", borderRadius: 2, overflow: "hidden", mb: 4, bgcolor: "background.default" }}>
                            {(["login", "register"] as Mode[]).map((m) => (
                                <Button
                                    key={m}
                                    fullWidth
                                    onClick={() => switchMode(m)}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 0,
                                        fontSize: "0.875rem",
                                        fontWeight: mode === m ? 600 : 400,
                                        color: mode === m ? "text.primary" : "text.secondary",
                                        bgcolor: mode === m ? "rgba(124, 140, 245, 0.08)" : "transparent",
                                    }}
                                >
                                    {m === "login" ? "Sign In" : "Create Account"}
                                </Button>
                            ))}
                        </Box>

                        <AnimatePresence mode="wait">
                            {/* LOGIN */}
                            {mode === "login" && (
                                <motion.div key="login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" fullWidth onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                                        <TextField
                                            label="Password" type={showPassword ? "text" : "password"} value={password}
                                            onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" fullWidth
                                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
                                        <Button variant="contained" fullWidth onClick={handleLogin} endIcon={<ArrowRight size={16} />} sx={{ py: 1.5 }}>
                                            Sign In
                                        </Button>
                                    </Box>
                                </motion.div>
                            )}

                            {/* REGISTER — Step 1 */}
                            {mode === "register" && step === "info" && (
                                <motion.div key="register-info" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                                        <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" fullWidth />
                                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" fullWidth />
                                        <TextField
                                            label="Password" type={showPassword ? "text" : "password"} value={password}
                                            onChange={(e) => setPassword(e.target.value)} placeholder="Create password (4+ characters)" fullWidth
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
                                        <Button variant="contained" fullWidth onClick={handleRegisterInfo} endIcon={<ArrowRight size={16} />} sx={{ py: 1.5 }}>
                                            Choose Your Exam
                                        </Button>
                                    </Box>
                                </motion.div>
                            )}

                            {/* REGISTER — Step 2: Exam */}
                            {mode === "register" && step === "exam" && (
                                <motion.div key="register-exam" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                                    <Button startIcon={<ArrowLeft size={14} />} onClick={() => setStep("info")} sx={{ mb: 2, color: "text.secondary", fontSize: "0.75rem" }}>
                                        Back
                                    </Button>

                                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
                                        What are you preparing for?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        ScoreCraft will personalize everything for your exam.
                                    </Typography>

                                    <Grid container spacing={2} sx={{ mb: 3 }}>
                                        {EXAMS.map((exam) => (
                                            <Grid size={{ xs: 12, sm: 6 }} key={exam.id}>
                                                <Card
                                                    onClick={() => setSelectedExam(exam.id)}
                                                    sx={{
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        borderColor: selectedExam === exam.id ? "primary.main" : "divider",
                                                        bgcolor: selectedExam === exam.id ? "rgba(124, 140, 245, 0.04)" : "background.paper",
                                                        "&:hover": { borderColor: "primary.light" },
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                                                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                                                            <Typography fontSize="1.5rem">{exam.icon}</Typography>
                                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: selectedExam === exam.id ? "primary.main" : "text.primary" }}>
                                                                    {exam.name}
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, lineHeight: 1.4 }}>
                                                                    {exam.description}
                                                                </Typography>
                                                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                                                    <Chip label={`${exam.subjects.length} subjects`} size="small" sx={{ height: 20, fontSize: "0.625rem" }} />
                                                                    <Chip label={new Date(exam.examDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })} size="small" sx={{ height: 20, fontSize: "0.625rem" }} />
                                                                </Box>
                                                            </Box>
                                                            {selectedExam === exam.id && (
                                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                                    <Avatar sx={{ width: 20, height: 20, bgcolor: "primary.main" }}>
                                                                        <Check size={12} color="white" />
                                                                    </Avatar>
                                                                </motion.div>
                                                            )}
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {error && <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>{error}</Alert>}

                                    <Button variant="contained" fullWidth onClick={handleRegisterExam} disabled={!selectedExam} endIcon={<ArrowRight size={16} />} sx={{ py: 1.5 }}>
                                        Start Learning
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <Typography variant="caption" align="center" display="block" sx={{ mt: 3, color: "text.secondary" }}>
                    ScoreCraft — AI Learning Platform
                </Typography>
            </motion.div>
        </Box>
    );
}
