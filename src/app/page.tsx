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
import {
  Brain,
  BookOpen,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Personalized AI Tutoring",
    description: "Get instant, personalized tutoring that explains concepts your way.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Progress",
    description: "Track your mastery level across every topic you study.",
  },
  {
    icon: BookOpen,
    title: "Adaptive Study Plans",
    description: "Smart schedules that optimize your study time for maximum retention.",
  },
  {
    icon: MessageCircle,
    title: "Expert Feedback",
    description: "Get detailed, actionable feedback on all your work instantly.",
  },
];

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box component="section" sx={{ pt: { xs: 8, md: 16 }, pb: { xs: 8, md: 12 }, px: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Tag */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 3,
                    py: 1.25,
                    borderRadius: "20px",
                    bgcolor: "rgba(124, 140, 245, 0.1)",
                    color: "primary.main",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    mb: 4,
                    border: "1px solid rgba(124, 140, 245, 0.2)",
                  }}
                >
                  <Zap size={16} />
                  AI-Powered Learning
                </Box>

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  Master Any Subject with <span className="gradient-text" style={{ fontSize: "inherit" }}>Smart AI Tutoring</span>
                </Typography>

                {/* Subheading */}
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    color: "text.secondary",
                    lineHeight: 1.6,
                    maxWidth: "450px",
                    mb: 5,
                    fontWeight: 400,
                  }}
                >
                  Personalized learning paths, real-time feedback, and intelligent study planning all in one platform.
                </Typography>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                    <Link href="/auth">
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowRight size={18} />}
                        sx={{
                          px: 4,
                          py: 1.75,
                          fontSize: "1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: "8px",
                        }}
                      >
                        Start Free Trial
                      </Button>
                    </Link>
                    <Link href="/auth">
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.75,
                          fontSize: "1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: "8px",
                          borderColor: "divider",
                          color: "text.primary",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "rgba(124, 140, 245, 0.05)",
                          },
                        }}
                      >
                        Watch Demo
                      </Button>
                    </Link>
                  </Box>
                </motion.div>

                {/* Trust Indicators */}
                <Box sx={{ mt: 6 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.9rem", mb: 2, display: "block" }}>
                    Trusted by thousands of students
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {["⭐", "⭐", "⭐", "⭐", "⭐"].map((star, i) => (
                      <Typography key={i} sx={{ fontSize: "1rem" }}>
                        {star}
                      </Typography>
                    ))}
                    <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                      4.9/5 from 500+ reviews
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right - Feature Highlight */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(124, 140, 245, 0.08)",
                    border: "1px solid rgba(124, 140, 245, 0.15)",
                    borderRadius: "16px",
                    p: 4,
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Zap size={48} color="#7C8CF5" />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary", textAlign: "center" }}>
                    Adaptive Learning Platform
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
                    AI adjusts difficulty based on your performance in real-time
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 }, px: 3, bgcolor: "#F8F9FB" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
                mb: 3,
                color: "text.primary",
              }}
            >
              Core Features
            </Typography>
            <Typography
              align="center"
              sx={{
                fontSize: "1.125rem",
                color: "text.secondary",
                maxWidth: "500px",
                mx: "auto",
                mb: 10,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Everything you need to excel in your studies, all in one intelligent platform.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      border: "1px solid rgba(124, 140, 245, 0.1)",
                      bgcolor: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(124, 140, 245, 0.12)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3.5, textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(124, 140, 245, 0.12)",
                          mb: 2.5,
                          mx: "auto",
                        }}
                      >
                        <feature.icon size={28} color="#7C8CF5" strokeWidth={1.5} />
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, fontWeight: 400 }}>
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

      {/* How It Works Section */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 }, px: 3 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
                mb: 3,
                color: "text.primary",
              }}
            >
              Get Started in 4 Steps
            </Typography>
            <Typography
              align="center"
              sx={{
                fontSize: "1.125rem",
                color: "text.secondary",
                mb: 10,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Begin your learning journey today
            </Typography>
          </motion.div>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { step: "1", title: "Create Account", desc: "Sign up and select your learning path." },
              { step: "2", title: "Upload Materials", desc: "Add your syllabus or course materials." },
              { step: "3", title: "Learn & Practice", desc: "Use AI tutoring and adaptive exercises." },
              { step: "4", title: "Track Progress", desc: "Monitor your improvement and mastery." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 3,
                    p: 3,
                    borderRadius: "12px",
                    border: "1px solid rgba(124, 140, 245, 0.1)",
                    bgcolor: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 4px 12px rgba(124, 140, 245, 0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box sx={{ textAlign: "center", mt: 12 }}>
              <Link href="/auth">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={18} />}
                  sx={{ px: 5, py: 1.75, fontSize: "1rem", fontWeight: 600, textTransform: "none" }}
                >
                  Start Your Free Trial
                </Button>
              </Link>
              <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary" }}>
                No credit card required • 14-day free trial • Cancel anytime
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, px: 3, bgcolor: "#F8F9FB", borderTop: "1px solid rgba(124, 140, 245, 0.1)" }}>
        <Container>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>
              ScoreCraft
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your intelligent AI learning platform for academic success
            </Typography>
            <Typography variant="caption" color="text.secondary">
              © 2026 ScoreCraft. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
