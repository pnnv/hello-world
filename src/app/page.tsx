"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {
  Brain,
  BookOpen,
  BarChart3,
  Shield,
  ArrowRight,
  Globe,
  Target,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Knowledge Graph Tutoring",
    description: "Auto-generate concept maps from your syllabus. AI diagnoses learning gaps and gives Socratic step-by-step coaching.",
  },
  {
    icon: BarChart3,
    title: "Bayesian Mastery Tracking",
    description: "Real-time mastery tracking using Bayesian Knowledge Tracing. See exactly what you know and what needs work.",
  },
  {
    icon: BookOpen,
    title: "Rubric-Aware Grading",
    description: "Submit essays, code, or labs. Get criterion-by-criterion feedback with actionable improvement suggestions.",
  },
  {
    icon: Target,
    title: "Smart Spaced Repetition",
    description: "Exam-date-aware scheduling powered by SM-2+ algorithm. Know your readiness score and optimal study plan.",
  },
  {
    icon: Globe,
    title: "Multilingual Voice Interface",
    description: "Ask questions in Hindi. Full voice interaction with culturally-adapted explanations for Indian students.",
  },
  {
    icon: Shield,
    title: "Academic Integrity",
    description: "Originality scoring, citation suggestions, and writing style analysis. Builds integrity as a skill.",
  },
];

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero */}
      <Box component="section" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 3 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ textAlign: "center" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  borderRadius: 5,
                  bgcolor: "rgba(124, 140, 245, 0.08)",
                  color: "primary.main",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  mb: 5,
                  border: "1px solid rgba(124, 140, 245, 0.15)",
                }}
              >
                <Sparkles size={14} />
                AI-Powered Learning Platform
              </Box>
            </motion.div>

            {/* Heading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4rem", lg: "5rem" },
                fontWeight: 800,
                letterSpacing: "-0.03em",
                mb: 2,
                color: "text.primary",
              }}
            >
              Vidya<span className="gradient-text">Mind</span>
            </Typography>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Typography variant="h5" sx={{ color: "text.secondary", fontWeight: 300, mb: 2, letterSpacing: "0.02em" }}>
                The Cognitive Learning Operating System
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 560, mx: "auto", mb: 5, lineHeight: 1.7 }}>
                AI-powered personalized tutoring with knowledge graph diagnosis,
                Bayesian mastery tracking, rubric-aware grading, and multilingual
                voice — built for every student in India.
              </Typography>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Link href="/auth">
                  <Button variant="contained" size="large" endIcon={<ArrowRight size={16} />}
                    sx={{ px: 4, py: 1.5, fontSize: "0.9rem" }}>
                    Start Learning
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="outlined" size="large"
                    sx={{ px: 4, py: 1.5, fontSize: "0.9rem", borderColor: "divider", color: "text.secondary", "&:hover": { borderColor: "primary.main", bgcolor: "rgba(124,140,245,0.04)" } }}>
                    View Demo
                  </Button>
                </Link>
              </Box>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 4, sm: 8 }, mt: 10 }}>
                {[
                  { value: "5/5", label: "Exploration Paths" },
                  { value: "BKT", label: "Mastery Algorithm" },
                  { value: "10+", label: "Indian Languages" },
                  { value: "< 3s", label: "Voice Response" },
                ].map((stat) => (
                  <Box key={stat.label} sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700} className="gradient-text">
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Features */}
      <Box component="section" sx={{ py: 14, px: 3 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2, letterSpacing: "-0.01em", color: "text.primary" }}>
              Every Learning Path, <span className="gradient-text">One Platform</span>
            </Typography>
            <Typography variant="body2" align="center" sx={{ color: "text.secondary", maxWidth: 480, mx: "auto", mb: 8 }}>
              VidyaMind integrates multiple learning paths into a unified
              cognitive learning experience powered by AI.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {features.map((feature, i) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card sx={{ height: "100%", transition: "all 0.3s ease", "&:hover": { borderColor: "primary.light", boxShadow: "0 4px 16px rgba(124,140,245,0.08)" } }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{
                        width: 40, height: 40, borderRadius: 2,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        bgcolor: "rgba(124, 140, 245, 0.08)", mb: 2,
                      }}>
                        <feature.icon size={20} color="#7C8CF5" />
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box component="section" sx={{ py: 14, px: 3 }}>
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 8, letterSpacing: "-0.01em", color: "text.primary" }}>
              How It Works
            </Typography>
          </motion.div>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { step: "01", title: "Upload Your Syllabus", desc: "Drop a PDF or paste your syllabus. VidyaMind auto-generates a knowledge graph of concepts with prerequisite chains." },
              { step: "02", title: "Learn with AI Tutor", desc: "Click any concept on the graph. The Socratic AI tutor guides you with hints, questions, and culturally-adapted analogies." },
              { step: "03", title: "Track Your Mastery", desc: "Bayesian Knowledge Tracing updates your mastery in real-time. See your exam readiness score and optimized study schedule." },
              { step: "04", title: "Get Graded & Improve", desc: "Submit essays or code for rubric-decomposed feedback. Academic integrity tools help you cite properly." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                  <Box sx={{
                    width: 48, height: 48, borderRadius: 3,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    bgcolor: "primary.main", color: "white",
                    fontSize: "0.875rem", fontWeight: 700, flexShrink: 0,
                  }}>
                    {item.step}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Box sx={{ textAlign: "center", mt: 8 }}>
              <Link href="/auth">
                <Button variant="contained" size="large" sx={{ px: 5, py: 1.5 }}>
                  Get Started Now
                </Button>
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Divider />
      <Box component="footer" sx={{ py: 4, px: 3, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          VidyaMind — The Cognitive Learning Operating System ·{" "}
          <span className="gradient-text" style={{ fontWeight: 500 }}>AI in Education & Skilling</span>
        </Typography>
      </Box>
    </Box>
  );
}
