import React, { useState, useMemo, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, Container, Box, Grid,
  CssBaseline, ThemeProvider, createTheme, IconButton, Avatar,
  Chip, Stack, Drawer, List, ListItem, ListItemButton, ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TypeAnimation } from "react-type-animation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion, AnimatePresence } from "framer-motion";
import WebIcon from "@mui/icons-material/Web";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CodeIcon from "@mui/icons-material/Code";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// ─── Google Fonts ────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  `}</style>
);

// ─── Sections ────────────────────────────────────────────────────────────────
const sections = [
  { id: "hero", title: "Home" },
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

// ─── Floating Dot Grid Background ────────────────────────────────────────────
const DotGrid = ({ mode }) => (
  <Box sx={{
    position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: mode === "dark"
      ? "radial-gradient(circle, rgba(0,229,255,0.12) 1px, transparent 1px)"
      : "radial-gradient(circle, rgba(0,100,220,0.08) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
  }} />
);

// ─── Orb Glow ─────────────────────────────────────────────────────────────────
const Orb = ({ top, left, size = 400, color1, color2, delay = "0s" }) => (
  <Box sx={{
    position: "absolute", width: size, height: size, borderRadius: "50%", pointerEvents: "none", zIndex: 0,
    background: `radial-gradient(circle, ${color1}, ${color2})`,
    filter: "blur(90px)",
    top, left,
    animation: `orbFloat 10s ease-in-out infinite alternate`,
    animationDelay: delay,
    "@keyframes orbFloat": {
      "0%": { transform: "translateY(0px) scale(1)" },
      "100%": { transform: "translateY(-30px) scale(1.08)" },
    },
  }} />
);

// ─── Section Label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children, mode }) => (
  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2 }}>
    <Box sx={{ width: 28, height: 2, background: mode === "dark" ? "#00e5ff" : "#007aff", borderRadius: 1 }} />
    <Typography variant="overline" sx={{
      fontSize: "0.72rem", letterSpacing: 4, fontFamily: "'DM Sans', sans-serif",
      color: mode === "dark" ? "#00e5ff" : "#007aff", fontWeight: 500,
    }}>
      {children}
    </Typography>
    <Box sx={{ width: 28, height: 2, background: mode === "dark" ? "#00e5ff" : "#007aff", borderRadius: 1 }} />
  </Box>
);

// ─── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, i, mode }) => (
  <Grid item xs={12} sm={6} md={4}>
    <motion.div custom={i * 0.08} variants={fadeUp} whileHover={{ y: -6 }} style={{ height: "100%" }}>
      <Box sx={{
        height: "100%", display: "flex", flexDirection: "column",
        background: mode === "dark" ? "rgba(15,18,28,0.7)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${mode === "dark" ? "rgba(0,229,255,0.12)" : "rgba(0,100,220,0.1)"}`,
        borderRadius: "16px", overflow: "hidden",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        "&:hover": {
          borderColor: mode === "dark" ? "rgba(0,229,255,0.35)" : "rgba(0,100,220,0.3)",
          boxShadow: mode === "dark"
            ? "0 20px 60px rgba(0,229,255,0.12), 0 0 0 1px rgba(0,229,255,0.15)"
            : "0 20px 60px rgba(0,100,220,0.1)",
        },
      }}>
        {/* Image */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Box component="img" src={project.img} alt={project.title} sx={{
            width: "100%", height: 190, objectFit: "cover",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.06)" },
          }} />
          <Box sx={{
            position: "absolute", inset: 0,
            background: mode === "dark"
              ? "linear-gradient(to bottom, transparent 50%, rgba(10,12,20,0.85) 100%)"
              : "linear-gradient(to bottom, transparent 50%, rgba(240,245,255,0.6) 100%)",
          }} />
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem",
            color: mode === "dark" ? "#f0faff" : "#0a1628", mb: 0.8,
          }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{
            color: mode === "dark" ? "#8ba8b8" : "#5a6e85",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7,
            fontSize: "0.84rem", flexGrow: 1,
          }}>
            {project.desc}
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
            <Button
              href={project.live} target="_blank" rel="noopener noreferrer"
              size="small" endIcon={<OpenInNewIcon sx={{ fontSize: "0.85rem !important" }} />}
              sx={{
                flex: 1, borderRadius: "8px", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "0.82rem",
                background: mode === "dark"
                  ? "linear-gradient(135deg, #00b4d8, #0077b6)"
                  : "linear-gradient(135deg, #0077b6, #0096c7)",
                color: "#fff", textTransform: "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                "&:hover": { opacity: 0.88, transform: "translateY(-1px)" },
              }}
            >Live</Button>
            <Button
              href={project.github} target="_blank" rel="noopener noreferrer"
              size="small" startIcon={<CodeIcon sx={{ fontSize: "0.9rem !important" }} />}
              sx={{
                flex: 1, borderRadius: "8px", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "0.82rem", textTransform: "none",
                color: mode === "dark" ? "#90caf9" : "#0077b6",
                border: `1px solid ${mode === "dark" ? "rgba(100,180,255,0.3)" : "rgba(0,119,182,0.3)"}`,
                "&:hover": {
                  background: mode === "dark" ? "rgba(100,180,255,0.08)" : "rgba(0,119,182,0.06)",
                  borderColor: mode === "dark" ? "rgba(100,180,255,0.6)" : "rgba(0,119,182,0.6)",
                },
              }}
            >Code</Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  </Grid>
);

// ─── Skill Chip ─────────────────────────────────────────────────────────────
const SkillChip = ({ label, color, mode }) => (
  <motion.div variants={fadeUp} whileHover={{ scale: 1.06 }}>
    <Box sx={{
      px: 2, py: 0.8, borderRadius: "8px", fontSize: "0.84rem",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: 0.3,
      border: `1.5px solid ${color}22`,
      color: color,
      background: `${color}10`,
      transition: "all 0.25s ease",
      cursor: "default",
      "&:hover": {
        background: `${color}20`,
        border: `1.5px solid ${color}66`,
        boxShadow: `0 0 16px ${color}33`,
      },
    }}>{label}</Box>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Main = () => {
  const [mode, setMode] = useState("dark");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: "#00b4d8" },
      background: mode === "dark"
        ? { default: "#080c14", paper: "#0f1520" }
        : { default: "#f5f8ff", paper: "#ffffff" },
    },
    typography: { fontFamily: "'DM Sans', system-ui, sans-serif" },
  }), [mode]);

  const C = {
    cyan: mode === "dark" ? "#00e5ff" : "#0077b6",
    mint: "#00e676",
    text: mode === "dark" ? "#e2eaf5" : "#0d1b2a",
    muted: mode === "dark" ? "#6b8399" : "#607590",
    bg: mode === "dark" ? "#080c14" : "#f5f8ff",
    card: mode === "dark" ? "rgba(12,18,32,0.8)" : "rgba(255,255,255,0.9)",
  };

  const gradientText = {
    background: mode === "dark"
      ? "linear-gradient(120deg, #00e5ff 0%, #00e676 60%, #29b6f6 100%)"
      : "linear-gradient(120deg, #0077b6 0%, #00b4d8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const openResume = () => window.open("/resume.pdf", "_blank", "noopener,noreferrer");

  const navBtn = (href, label) => (
    <Button key={label} href={href} sx={{
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.9rem",
      color: C.text, textTransform: "none", letterSpacing: 0.3, borderRadius: "8px",
      px: 1.5, py: 0.8,
      transition: "all 0.2s ease",
      "&:hover": { color: C.cyan, background: `${C.cyan}10` },
    }}>{label}</Button>
  );

  const projects = [
    { title: "Taskly — Task Tracker", desc: "Modern, intuitive task management with clean UI and real-time state.", img: "/projects/taskly.png", github: "https://github.com/nikgitofficial/taskly", live: "https://taskly-plum.vercel.app/about" },
    { title: "TeamSphere HR System", desc: "Manage employees, automate payroll, and track attendance seamlessly.", img: "/projects/teamsphere.png", github: "https://github.com/nikgitofficial/Teamsphere", live: "https://teamsphere-lyart.vercel.app/about" },
    { title: "Answerly", desc: "Questionnaire platform with dynamic form generation and response tracking.", img: "/projects/answerly.png", github: "https://github.com/nikgitofficial/answerlyv1", live: "https://answerlyv1.vercel.app/about" },
    { title: "Personal Record Keeper", desc: "Secure, user-friendly application for managing personal data.......", img: "/projects/personal-record-keeper.png", github: "https://github.com/nikgitofficial/Personal-Record-Keeper", live: "https://personal-record-keeper.vercel.app/" },
    { title: "File Uploader", desc: "Robust file upload system with cloud storage, previews, and share links.", img: "/projects/fileuploader.png", github: "https://github.com/nikgitofficial/fileuploader", live: "https://fileuploader-dun.vercel.app/" },
    { title: "NikoNikonik — Media App", desc: "Social media web app with login, feed, and media management features.", img: "/projects/nikonikonik.png", github: "https://github.com/nikgitofficial/NikoNikonik", live: "https://niko-nikonik-rouge.vercel.app/welcome" },
    { title: "Nik Notes", desc: "Notes app with media attachments, rich-text editing, and user auth.", img: "/projects/niknotes.png", github: "https://github.com/nikgitofficial/niknotes", live: "https://niknotes.vercel.app" },
    { title: "NikBlog", desc: "Personal blog showcasing dev reflections, tutorials, and project write-ups.", img: "/projects/nikblog.png", github: "https://github.com/nikgitofficial/personalblog", live: "https://personalblog-ffpe.vercel.app/" },
    { title: "TimeTracker", desc: "Full-stack time tracking system with reports, entries, and team views.", img: "/projects/timetracker.png", github: "https://github.com/nikgitofficial/timetracker", live: "https://timetracker-vsdw.vercel.app/" },
    { title: "KPI Dashboard", desc: "Real-time agent transaction tracker with EOD reporting and analytics.", img: "/projects/kpi.png", github: "https://github.com/nikgitofficial/kpi", live: "https://kpi-l59z.vercel.app/" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <FontLoader />
      <CssBaseline />

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${mode === "dark" ? "#080c14" : "#f0f4ff"}; }
        ::-webkit-scrollbar-thumb { background: ${mode === "dark" ? "#1e3045" : "#b0c4de"}; border-radius: 3px; }
        ::selection { background: rgba(0,180,216,0.3); }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

          {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
          <AppBar elevation={0} position="fixed" sx={{
            backdropFilter: "blur(20px)",
            background: scrolled
              ? (mode === "dark" ? "rgba(8,12,20,0.92)" : "rgba(245,248,255,0.92)")
              : "transparent",
            borderBottom: scrolled
              ? `1px solid ${mode === "dark" ? "rgba(0,180,216,0.12)" : "rgba(0,100,180,0.1)"}`
              : "1px solid transparent",
            transition: "all 0.4s ease",
          }}>
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2.5, md: 5 }, minHeight: "68px !important" }}>

              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar src="/pic1.png" alt="Nikko" sx={{
                  width: 36, height: 36, borderRadius: "10px",
                  border: `1.5px solid ${mode === "dark" ? "rgba(0,229,255,0.3)" : "rgba(0,119,182,0.3)"}`,
                }} />
                <Typography sx={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem", letterSpacing: 1,
                  ...gradientText,
                }}>
                  Nikk.dev
                </Typography>
              </Box>

              {/* Desktop Nav */}
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
                {sections.map(s => navBtn(`#${s.id}`, s.title))}
              </Box>

              {/* Right Controls */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")} size="small"
                  sx={{ color: C.muted, "&:hover": { color: C.cyan } }}>
                  {mode === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </IconButton>
                <IconButton sx={{ display: { xs: "flex", md: "none" }, color: C.muted }}
                  onClick={() => setDrawerOpen(true)} size="small">
                  <MenuIcon fontSize="small" />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Mobile Drawer */}
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
            PaperProps={{ sx: {
              width: 260, background: mode === "dark" ? "#0a0f1c" : "#f5f8ff",
              backdropFilter: "blur(20px)", borderLeft: `1px solid ${mode === "dark" ? "rgba(0,229,255,0.1)" : "rgba(0,100,180,0.1)"}`,
            }}}>
            <Box sx={{ p: 3 }}>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, mb: 3, ...gradientText }}>
                Nikk.dev
              </Typography>
              <List disablePadding>
                {sections.map(s => (
                  <ListItem key={s.id} disablePadding>
                    <ListItemButton component="a" href={`#${s.id}`}
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        borderRadius: "8px", mb: 0.5, py: 1,
                        fontFamily: "'DM Sans', sans-serif",
                        color: C.text,
                        "&:hover": { background: `${C.cyan}12`, color: C.cyan },
                      }}>
                      <ListItemText primary={s.title} primaryTypographyProps={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Button fullWidth onClick={openResume} startIcon={<DescriptionIcon />}
                sx={{
                  mt: 3, borderRadius: "10px", py: 1.2, color: "#fff", textTransform: "none",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                  background: "linear-gradient(135deg, #00b4d8, #0077b6)",
                }}>Resume</Button>
            </Box>
          </Drawer>

          {/* ── HERO ───────────────────────────────────────────────────────── */}
          <Box id="hero" sx={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            textAlign: "center", position: "relative", overflow: "hidden",
            background: mode === "dark"
              ? "radial-gradient(ellipse 100% 80% at 50% 0%, #0a1628 0%, #080c14 100%)"
              : "radial-gradient(ellipse 100% 80% at 50% 0%, #ddeeff 0%, #f5f8ff 100%)",
            pt: 10,
          }}>
            <DotGrid mode={mode} />
            <Orb top="-10%" left="60%" size={500}
              color1={mode === "dark" ? "rgba(0,100,180,0.18)" : "rgba(0,150,220,0.12)"}
              color2="transparent" />
            <Orb top="40%" left="-10%" size={350}
              color1={mode === "dark" ? "rgba(0,200,150,0.12)" : "rgba(0,180,130,0.08)"}
              color2="transparent" delay="3s" />

            <motion.div initial="hidden" animate="visible" variants={stagger}
              style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>

              {/* Badge */}
              <motion.div variants={fadeUp}>
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1, mb: 2,
                  px: 2, py: 0.7, borderRadius: "100px",
                  background: mode === "dark" ? "rgba(0,180,216,0.1)" : "rgba(0,119,182,0.08)",
                  border: `1px solid ${mode === "dark" ? "rgba(0,180,216,0.25)" : "rgba(0,119,182,0.2)"}`,
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#00e676",
                    animation: "orbFloat 2s ease-in-out infinite alternate" }} />
                  <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
                    fontWeight: 500, color: mode === "dark" ? "#7dd3fc" : "#0077b6", letterSpacing: 1 }}>
                    Available for work
                  </Typography>
                </Box>
              </motion.div>

              {/* ── ADDED: Location tag under badge ── */}
              <motion.div variants={fadeUp}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, mb: 3 }}>
                  <LocationOnIcon sx={{ fontSize: "0.85rem", color: C.muted }} />
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                    color: C.muted, letterSpacing: 0.5,
                  }}>
                    Davao City, Philippines
                  </Typography>
                </Box>
              </motion.div>

              {/* Heading */}
              <motion.div variants={fadeUp}>
                <Typography variant="h1" sx={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.08,
                  fontSize: { xs: "2.6rem", sm: "3.8rem", md: "5rem" },
                  color: C.text, mb: 2,
                  "& .type-highlight": { ...gradientText },
                }}>
                  <TypeAnimation
                    sequence={["Hi, I'm Nikko.", 2500, "Web Developer.", 2500, "UI/UX Builder.", 2500]}
                    wrapper="span"
                    speed={55}
                    repeat={Infinity}
                    className="type-highlight"
                    style={{ display: "inline-block" }}
                  />
                </Typography>
              </motion.div>

              {/* Sub */}
              <motion.div variants={fadeUp}>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  fontSize: { xs: "1rem", md: "1.2rem" }, color: C.muted,
                  maxWidth: 560, mx: "auto", mb: 5, lineHeight: 1.8,
                }}>
                 I craft modern, performant web applications — clean architecture,
                 sharp UI, and seamless UX that users actually enjoy.
                </Typography>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
                  <Button href="#projects" size="large" sx={{
                    borderRadius: "10px", px: 4, py: 1.4, textTransform: "none",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.95rem",
                    color: "#fff", background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
                    boxShadow: "0 8px 32px rgba(0,180,216,0.35)",
                    "&:hover": { boxShadow: "0 12px 40px rgba(0,180,216,0.5)", transform: "translateY(-2px)" },
                    transition: "all 0.3s ease",
                  }}>View My Work</Button>

                  <Button onClick={openResume} size="large" startIcon={<DescriptionIcon />} sx={{
                    borderRadius: "10px", px: 4, py: 1.4, textTransform: "none",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.95rem",
                    color: C.cyan, border: `1.5px solid ${mode === "dark" ? "rgba(0,229,255,0.3)" : "rgba(0,119,182,0.3)"}`,
                    "&:hover": {
                      background: mode === "dark" ? "rgba(0,229,255,0.07)" : "rgba(0,119,182,0.06)",
                      borderColor: C.cyan,
                    },
                    transition: "all 0.3s ease",
                  }}>Resume</Button>

                  <Button href="https://personalblog-ffpe.vercel.app/" target="_blank" rel="noopener noreferrer"
                    size="large" startIcon={<WebIcon />} sx={{
                      borderRadius: "10px", px: 4, py: 1.4, textTransform: "none",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.95rem",
                      color: C.muted,
                      border: `1.5px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                      "&:hover": { color: C.text, borderColor: mode === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)" },
                      transition: "all 0.3s ease",
                    }}>Blog</Button>
                </Stack>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div variants={fadeUp} style={{ marginTop: 64 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
                    letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>Scroll</Typography>
                  <Box sx={{
                    width: 1.5, height: 40,
                    background: `linear-gradient(to bottom, ${C.cyan}, transparent)`,
                    animation: "fadeInUp 1.5s ease infinite",
                  }} />
                </Box>
              </motion.div>
            </motion.div>
          </Box>

          {/* ── ABOUT ──────────────────────────────────────────────────────── */}
          <Box id="about" sx={{
            py: { xs: 12, md: 16 }, position: "relative", overflow: "hidden",
            background: mode === "dark"
              ? "linear-gradient(180deg, #080c14 0%, #0c1220 100%)"
              : "linear-gradient(180deg, #f5f8ff 0%, #eef3ff 100%)",
          }}>
            <Orb top="10%" left="70%" size={300}
              color1={mode === "dark" ? "rgba(0,230,118,0.1)" : "rgba(0,180,100,0.08)"}
              color2="transparent" delay="2s" />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <motion.div variants={fadeUp}>
                  <Box sx={{ textAlign: "center", mb: 8 }}>
                    <SectionLabel mode={mode}>Who I Am</SectionLabel>
                    <Typography variant="h2" sx={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: { xs: "2.2rem", md: "3rem" }, ...gradientText, mb: 2,
                    }}>About Me</Typography>
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif", color: C.muted,
                      maxWidth: 500, mx: "auto", lineHeight: 1.8, fontSize: "1rem",
                    }}>
                      Passionate about building things that live on the internet — from robust backends to polished interfaces.
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Box sx={{
                    display: "flex", flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "center", md: "flex-start" }, gap: { xs: 6, md: 8 },
                  }}>
                    {/* Avatar */}
                    <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <Box sx={{
                        width: 170, height: 170, borderRadius: "50%", position: "relative",
                        "&::before": {
                          content: '""', position: "absolute", inset: -4, borderRadius: "50%",
                          background: "conic-gradient(#00e5ff, #00e676, #0077b6, #00e5ff)",
                          animation: "spinSlow 8s linear infinite",
                          zIndex: 0,
                        },
                      }}>
                        <Avatar src="/pic2.png" alt="Nikko" sx={{
                          width: 170, height: 170, position: "relative", zIndex: 1,
                          border: `4px solid ${mode === "dark" ? "#080c14" : "#f5f8ff"}`,
                        }} />
                      </Box>
                      {/* Available badge under avatar */}
                      <Box sx={{
                        display: "inline-flex", alignItems: "center", gap: 0.8,
                        px: 1.8, py: 0.6, borderRadius: "100px",
                        background: mode === "dark" ? "rgba(0,230,118,0.08)" : "rgba(0,180,100,0.08)",
                        border: `1px solid ${mode === "dark" ? "rgba(0,230,118,0.25)" : "rgba(0,180,100,0.2)"}`,
                      }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#00e676" }} />
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                          fontWeight: 500, color: "#00e676", letterSpacing: 0.5,
                        }}>Open to opportunities</Typography>
                      </Box>

                      {/* ── ADDED: Location under avatar badge ── */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: "0.82rem", color: C.muted }} />
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
                          color: C.muted, letterSpacing: 0.3,
                        }}>Davao City, PH</Typography>
                      </Box>
                    </Box>

                    {/* Text */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem",
                        lineHeight: 1.9, color: C.muted, mb: 2.5,
                      }}>
                        I'm a <Box component="span" sx={{ color: C.text, fontWeight: 600 }}>Full-Stack Web Developer</Box> with
                        a strong foundation in building modern, scalable, and responsive web applications.
                      </Typography>
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem",
                        lineHeight: 1.9, color: C.muted, mb: 2.5,
                      }}>
                        My core stack is the <Box component="span" sx={{ color: C.cyan, fontWeight: 600 }}>MERN stack</Box> paired
                        with <Box component="span" sx={{ color: C.cyan, fontWeight: 600 }}>Next.js</Box> and Typescript, Tailwind CSS on the
                        frontend, and <Box component="span" sx={{ color: C.cyan, fontWeight: 600 }}>NodeJs & Django Python</Box> for
                        backend services when needed.
                      </Typography>
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem",
                        lineHeight: 1.9, color: C.muted,
                      }}>
                        I care deeply about clean code, thoughtful UI design, and delivering experiences that are
                        both functional and delightful to use.
                      </Typography>

                      {/* Stats */}
                      <Stack
                        direction="row"
                        spacing={0}
                        sx={{
                          mt: 5,
                          justifyContent: { xs: "center", md: "flex-start" },
                          borderTop: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                          pt: 4,
                          gap: 0,
                        }}
                      >
                        {[
                          ["20+", "Projects Built"],
                          ["3+", "Years Experience"],
                          ["MERN/NextJs", "Focus"],
                        ].map(([val, lbl], index) => (
                          <Box key={lbl} sx={{
                            textAlign: "center", flex: 1,
                            borderRight: index < 2
                              ? `1px solid ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
                              : "none",
                            px: 2,
                          }}>
                            <Typography sx={{
                              fontFamily: "'Syne', sans-serif", fontWeight: 800,
                              fontSize: "1.7rem", ...gradientText, lineHeight: 1.2,
                            }}>{val}</Typography>
                            <Typography sx={{
                              fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
                              color: C.muted, letterSpacing: 1.5, textTransform: "uppercase", mt: 0.5,
                            }}>{lbl}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

       {/* ── SKILLS ─────────────────────────────────────────────────────── */}
<Box
  id="skills"
  sx={{
    py: { xs: 12, md: 16 },
    position: "relative",
    overflow: "hidden",
    background:
      mode === "dark"
        ? "linear-gradient(180deg, #0c1220 0%, #080c14 100%)"
        : "linear-gradient(180deg, #eef3ff 0%, #f5f8ff 100%)",
  }}
>
  <DotGrid mode={mode} />

  <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeUp}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <SectionLabel mode={mode}>What I Know</SectionLabel>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "2.2rem", md: "3rem" },
              ...gradientText,
              mb: 1.5,
            }}
          >
            Skills & Tech Stack
          </Typography>

          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: C.muted,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Full-stack capabilities across frontend, backend, and cloud — from pixel-perfect UIs to scalable APIs.
          </Typography>
        </Box>
      </motion.div>

      {[
        {
  label: "Core Technologies",
  color: mode === "dark" ? "#00b4d8" : "#0077b6",
  skills: [
    "Next.js 15+ (App Router)",
    "React 19",
    "TypeScript",
    "JavaScript (ES2026)",
    "Tailwind CSS",
    "Shadcn/UI",
    "Material UI",
    "HTML5",
    "CSS3",
    "Responsive Design",
    "RESTful APIs",
    "Git",
    "GitHub",
  ],
},
        {
          label: "Backend",
          color: "#9c27b0",
          skills: [
            "Node.js",
            "Express.js",
            "Python",
            "Django",
            "PostgreSQL",
            "MongoDB",
            "JWT Auth",
          ],
        },
        {
  label: "Tools & Deployment",
  color: "#7b1fa2",
  skills: [
    "VS Code",
    "Git",
    "GitHub",
    "Postman",
    "NPM",
    "Yarn",
    "pnpm",
    "Vercel",
    "Netlify",
    "GitHub Actions (CI/CD)",
    "Cloudinary",
    "Blob Storage",
    "Resend",
    "Render",
    "ESLint",
    "Prettier"
  ],
},
        {
          label: "Currently Exploring",
          color: "#00c853",
          skills: ["GraphQL", "Docker", "AI Integration (OpenAI)"],
        },
      ].map(({ label, color, skills }) => (
        <Box key={label} sx={{ mb: 7 }}>
          <motion.div variants={fadeUp}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  maxWidth: 120,
                  height: 1,
                  background: `${color}33`,
                }}
              />

              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color,
                }}
              >
                {label}
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  maxWidth: 120,
                  height: 1,
                  background: `${color}33`,
                }}
              />
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            {skills.map((s) => (
              <SkillChip key={s} label={s} color={color} mode={mode} />
            ))}
          </Box>
        </Box>
      ))}
    </motion.div>
  </Container>
</Box>

          {/* ── PROJECTS ───────────────────────────────────────────────────── */}
          <Box id="projects" sx={{
            py: { xs: 12, md: 16 }, position: "relative", overflow: "hidden",
            background: mode === "dark"
              ? "linear-gradient(180deg, #080c14 0%, #0c1220 100%)"
              : "linear-gradient(180deg, #f5f8ff 0%, #eef3ff 100%)",
          }}>
            <Orb top="-5%" left="80%" size={400}
              color1={mode === "dark" ? "rgba(0,100,180,0.15)" : "rgba(0,100,200,0.08)"}
              color2="transparent" />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <motion.div variants={fadeUp}>
                  <Box sx={{ textAlign: "center", mb: 8 }}>
                    <SectionLabel mode={mode}>What I've Built</SectionLabel>
                    <Typography variant="h2" sx={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: { xs: "2.2rem", md: "3rem" }, ...gradientText,
                    }}>Featured Projects</Typography>
                  </Box>
                </motion.div>

                <Grid container spacing={3}>
                  {projects.map((p, i) => (
                    <ProjectCard key={p.title} project={p} i={i} mode={mode} />
                  ))}
                </Grid>
              </motion.div>
            </Container>
          </Box>

          {/* ── CONTACT ────────────────────────────────────────────────────── */}
          <Box id="contact" sx={{
            py: { xs: 12, md: 16 }, position: "relative", overflow: "hidden",
            background: mode === "dark"
              ? "linear-gradient(180deg, #0c1220 0%, #080c14 100%)"
              : "linear-gradient(180deg, #eef3ff 0%, #f5f8ff 100%)",
          }}>
            <DotGrid mode={mode} />
            <Orb top="20%" left="10%" size={350}
              color1={mode === "dark" ? "rgba(0,180,216,0.12)" : "rgba(0,100,180,0.08)"}
              color2="transparent" delay="1s" />

            <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <motion.div variants={fadeUp}>
                  <Box sx={{ textAlign: "center", mb: 6 }}>
                    <SectionLabel mode={mode}>Let's Talk</SectionLabel>
                    <Typography variant="h2" sx={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: { xs: "2.2rem", md: "3rem" }, ...gradientText, mb: 2,
                    }}>Get In Touch</Typography>
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif", color: C.muted,
                      lineHeight: 1.8, fontSize: "1.05rem",
                    }}>
                      Open to collaboration, freelance work, and full-time roles. Let's build something great together.
                    </Typography>
                  </Box>
                </motion.div>

                {/* Contact Card */}
                <motion.div variants={fadeUp}>
                  <Box sx={{
                    background: C.card, backdropFilter: "blur(20px)",
                    border: `1px solid ${mode === "dark" ? "rgba(0,180,216,0.15)" : "rgba(0,100,180,0.12)"}`,
                    borderRadius: "20px", p: { xs: 3.5, md: 5 },
                    boxShadow: mode === "dark"
                      ? "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                      : "0 24px 80px rgba(0,80,160,0.08)",
                  }}>
                    <Stack spacing={3}>
                      {[
                        { icon: <EmailIcon />, label: "nickforjobacc@gmail.com", href: "mailto:nickforjobacc@gmail.com", color: mode === "dark" ? "#00e5ff" : "#0077b6" },
                        { icon: <GitHubIcon />, label: "github.com/nikgitofficial", href: "https://github.com/nikgitofficial", color: C.text },
                        // ── ADDED: LinkedIn ──
                       { icon: <LinkedInIcon />, label: "linkedin.com/in/nikko", href: "https://www.linkedin.com/in/nikko-mp-undefined-458682298/", color: "#0a66c2" },
                        { icon: <PhoneIcon />, label: "+63 9514190949", href: "tel:+639514190949", color: "#00e676" },
                        // ── ADDED: Location in contact card ──
                        { icon: <LocationOnIcon />, label: "Davao City, Philippines", href: "#", color: C.muted },
                      ].map(({ icon, label, href, color }) => (
                        <Box key={label} component="a" href={href} target="_blank" rel="noopener noreferrer"
                          sx={{
                            display: "flex", alignItems: "center", gap: 2.5, p: 2,
                            borderRadius: "12px", textDecoration: "none",
                            border: `1px solid transparent`,
                            transition: "all 0.25s ease",
                            "&:hover": {
                              background: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,80,160,0.04)",
                              borderColor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,80,160,0.08)",
                              transform: "translateX(4px)",
                            },
                          }}>
                          <Box sx={{ color, display: "flex" }}>{icon}</Box>
                          <Typography sx={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                            color: C.text, fontSize: "0.95rem",
                          }}>{label}</Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Button fullWidth href="mailto:nickforjobacc@gmail.com" size="large" sx={{
                      mt: 4, borderRadius: "12px", py: 1.6, textTransform: "none",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem",
                      color: "#fff", background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
                      boxShadow: "0 8px 32px rgba(0,180,216,0.3)",
                      "&:hover": { boxShadow: "0 12px 40px rgba(0,180,216,0.45)", transform: "translateY(-2px)" },
                      transition: "all 0.3s ease",
                    }}>Send a Message</Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

          {/* ── FOOTER ─────────────────────────────────────────────────────── */}
          <Box component="footer" sx={{
            py: 4, textAlign: "center",
            background: mode === "dark" ? "#060a12" : "#e8eeff",
            borderTop: `1px solid ${mode === "dark" ? "rgba(0,180,216,0.1)" : "rgba(0,100,180,0.1)"}`,
          }}>
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
              color: C.muted, letterSpacing: 0.5,
            }}>
              © {new Date().getFullYear()} Nikko — Designed & Built with care.
            </Typography>
            {/* ── ADDED: Footer subline ── */}
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
              color: C.muted, letterSpacing: 0.5, mt: 0.5, opacity: 0.6,
            }}>
              Based in Davao, Philippines · Open to remote & on-site roles
            </Typography>
          </Box>

          {/* Scroll to Top */}
          <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              position: "fixed", bottom: 24, right: 24, width: 44, height: 44,
              background: mode === "dark" ? "rgba(0,180,216,0.15)" : "rgba(0,119,182,0.12)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${mode === "dark" ? "rgba(0,180,216,0.3)" : "rgba(0,119,182,0.25)"}`,
              color: C.cyan, zIndex: 999,
              "&:hover": {
                background: mode === "dark" ? "rgba(0,180,216,0.25)" : "rgba(0,119,182,0.2)",
                transform: "translateY(-3px)",
              },
              transition: "all 0.3s ease",
            }}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>

        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Main;