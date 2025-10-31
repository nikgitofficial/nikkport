import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Avatar,
  Chip,
  Stack,
  Drawer,
  List,           
  ListItem,       
  ListItemButton, 
  ListItemText,   
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TypeAnimation } from "react-type-animation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion, AnimatePresence } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";


const sections = [
  { id: "hero", title: "Home" },
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const Main = () => {
  const [mode, setMode] = useState("dark");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#61dafb" },
          background:
            mode === "dark"
              ? { default: "#0f1115", paper: "#1b1e24" }
              : { default: "#fafafa", paper: "#ffffff" },
          text:
            mode === "dark"
              ? { primary: "#fff", secondary: "#bbb" }
              : { primary: "#111", secondary: "#555" },
        },
        typography: {
          fontFamily: "Inter, system-ui, sans-serif",
          h2: { fontWeight: 700 },
          body1: { lineHeight: 1.8 },
        },
      }),
    [mode]
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* NAVBAR */}
<AppBar
  position="fixed"
  elevation={0}
  sx={{
    backdropFilter: "blur(12px)",
    background:
      mode === "dark"
        ? "rgba(20, 20, 30, 0.7)"
        : "rgba(255, 255, 255, 0.7)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    boxShadow:
      "0 0 20px rgba(0,229,255,0.15), inset 0 0 10px rgba(0,229,255,0.1)",
    transition: "all 0.4s ease",
  }}
>
  <Toolbar
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      px: { xs: 2, md: 5 },
    }}
  >
    {/* LEFT: Logo / Name */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        src="/nikko1.png"
        alt="Nikko"
        sx={{
          width: 36,
          height: 36,
          border: "2px solid transparent",
          backgroundImage:
            "linear-gradient(#fff, #fff), linear-gradient(135deg, #00e5ff, #29b6f6, #00ffb0)",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.08)",
            boxShadow: "0 0 12px rgba(0,229,255,0.6)",
          },
        }}
      />
    <Typography
  variant="h6"
  sx={{
    fontWeight: 700,
    letterSpacing: 1,
    background: mode === "dark"
      ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
      : "linear-gradient(90deg, #007aff, #00bcd4)", // lighter gradient for light mode
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: mode === "dark"
      ? "0 0 8px rgba(0,229,255,0.6)"
      : "0 0 6px rgba(0,123,255,0.4)", // softer shadow for light mode
  }}
>
  App.dev
</Typography>

    </Box>

    {/* CENTER: Navigation Links (desktop) */}
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
      {sections.map((s) => (
        <Button
          key={s.id}
          href={`#${s.id}`}
          sx={{
            color: mode === "dark" ? "#e0f7fa" : "#007aff",
            fontWeight: 500,
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,255,180,0.25))",
              color: "#00e5ff",
              boxShadow: "0 0 10px rgba(0,229,255,0.4)",
              transform: "scale(1.05)",
            },
          }}
        >
          {s.title}
        </Button>
      ))}
    </Box>

    {/* RIGHT: Theme Toggle + Hamburger (mobile) */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        sx={{
          color: "text.primary",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#00e5ff",
            textShadow: "0 0 10px rgba(0,229,255,0.6)",
            transform: "rotate(15deg) scale(1.1)",
          },
        }}
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      {/* Mobile Hamburger */}
      <IconButton
        sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  </Toolbar>

  {/* Mobile Drawer */}
<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  PaperProps={{
    sx: {
      backdropFilter: "blur(12px)",
      background:
        mode === "dark"
          ? "rgba(20, 20, 30, 0.65)"
          : "rgba(255, 255, 255, 0.7)",
      borderLeft: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 0 25px rgba(0,229,255,0.2)",
      transition: "all 0.4s ease",
    },
  }}
>
  <Box
    sx={{
      width: 250,
      display: "flex",
      flexDirection: "column",
      py: 3,
    }}
    role="presentation"
    onClick={() => setDrawerOpen(false)}
  >
    <List>
      {sections.map((s) => (
        <ListItem key={s.id} disablePadding>
          <ListItemButton
            component="a"
            href={`#${s.id}`}
            sx={{
              color: mode === "dark" ? "#e0f7fa" : "#007aff",
              fontWeight: 500,
              letterSpacing: 0.5,
              transition: "all 0.3s ease",
              borderRadius: "8px",
              mx: 1,
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,255,180,0.25))",
                color: "#00e5ff",
                boxShadow: "0 0 12px rgba(0,229,255,0.4)",
                transform: "scale(1.05)",
              },
            }}
          >
            <ListItemText primary={s.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>

  
</AppBar>



          {/* SECTIONS */}
          <Box sx={{ pt: 10 }}>
         {/* HERO */}
<Box
  id="hero"
  sx={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    background:
      mode === "dark"
        ? "linear-gradient(135deg, #0a0c10, #141820)"
        : "linear-gradient(135deg, #e3f2fd, #ffffff)",
  }}
>
  {/* Subtle animated gradient glow */}
  <Box
    sx={{
      position: "absolute",
      width: 400,
      height: 400,
      borderRadius: "50%",
      background:
        mode === "dark"
          ? "radial-gradient(circle, rgba(0,229,255,0.15), transparent 70%)"
          : "radial-gradient(circle, rgba(0,150,255,0.1), transparent 70%)",
      filter: "blur(100px)",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      animation: "pulseGlow 8s infinite alternate",
      "@keyframes pulseGlow": {
        "0%": { opacity: 0.4, transform: "translateX(-50%) scale(1)" },
        "100%": { opacity: 0.8, transform: "translateX(-50%) scale(1.2)" },
      },
    }}
  />

  <motion.div
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    sx={{ zIndex: 2 }}
  >
    <motion.div variants={fadeUp}>
      <Typography
        variant="h2"
        sx={{
          mb: 2,
          fontWeight: 800,
          letterSpacing: "0.5px",
          background: mode === "dark"
            ? "linear-gradient(90deg, #00e5ff, #00ffb0, #00b8d4, #00e5ff)"
            : "linear-gradient(90deg, #007aff, #00bcd4, #00ffb0, #29b6f6)",
          backgroundSize: "300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "textFlow 8s linear infinite",
          "@keyframes textFlow": {
            "0%": { backgroundPosition: "0%" },
            "100%": { backgroundPosition: "300%" },
          },
        }}
      >
        <TypeAnimation
          sequence={[
            "Hi, I’m Nikko ",
            2000,
            "Web Developer ",
            2000,
            "Building Modern UI/UX ",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </Typography>
    </motion.div>

    <motion.div variants={fadeUp}>
      <Typography
  variant="h5"
  sx={{
    color: mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    mb: 4,
  }}
>
  I build modern web apps with MERN & Django
</Typography>

    </motion.div>

    <motion.div variants={fadeUp}>
      <Button
        href="#projects"
        variant="contained"
        size="large"
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.2,
          fontSize: "1rem",
          background: mode === "dark"
            ? "linear-gradient(90deg, #00e5ff, #00bcd4, #00ffb0)"
            : "linear-gradient(90deg, #007aff, #00bcd4, #00ffb0)",
          boxShadow: mode === "dark"
            ? "0 0 20px rgba(0,229,255,0.5)"
            : "0 0 20px rgba(0,123,255,0.4)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: mode === "dark"
              ? "0 0 25px rgba(0,255,200,0.7)"
              : "0 0 25px rgba(0,123,255,0.6)",
          },
        }}
      >
        View My Work
      </Button>
    </motion.div>
  </motion.div>
</Box>


        {/* ABOUT SECTION */}
<Box
  id="about"
  sx={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    background:
      mode === "dark"
        ? "radial-gradient(circle at top, #101218, #1b1e24 60%)"
        : "radial-gradient(circle at top, #e8f9ff, #f7f7f7 60%)",
    p: 6,
  }}
>
  {/* Background glow */}
  <Box
    sx={{
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(0,229,255,0.2), rgba(0,255,180,0.05))",
      top: "-80px",
      right: "-100px",
      filter: "blur(100px)",
      zIndex: 0,
    }}
  />

  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    style={{ zIndex: 1 }}
  >
    {/* Avatar with pulsing border */}
    <motion.div variants={fadeUp}>
      <Box
        sx={{
          position: "relative",
          width: 140,
          height: 140,
          mb: 4,
        }}
      >
        {/* Glowing pulse border */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            p: "3px",
            background:
              "conic-gradient(#00ffb0, #00e5ff, #ff007f, #00ffb0)",
            animation: "pulse 3s ease-in-out infinite",
            "@keyframes pulse": {
              "0%": { opacity: 0.5, transform: "scale(1)" },
              "50%": { opacity: 1, transform: "scale(1.05)" },
              "100%": { opacity: 0.5, transform: "scale(1)" },
            },
          }}
        >
          <Avatar
            src="/nikko.png"
            alt="Nikko"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "3px solid transparent",
              backgroundColor: mode === "dark" ? "#1b1e24" : "#fff",
            }}
          />
        </Box>
      </Box>
    </motion.div>

    {/* Title */}
    <motion.div variants={fadeUp}>
     <Typography
  variant="h3"
  gutterBottom
  sx={{
    fontWeight: 700,
    background: mode === "dark"
      ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
      : "linear-gradient(90deg, #007aff, #00bcd4)", // lighter gradient for light mode
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: mode === "dark"
      ? "0 0 10px rgba(0,229,255,0.6)"
      : "0 0 6px rgba(0,123,255,0.4)", // softer shadow for light mode
  }}
>
  About Me
</Typography>

    </motion.div>

    {/* Description */}
    <motion.div variants={fadeUp}>
      <Typography
        variant="body1"
        maxWidth="md"
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: mode === "dark" ? "#d0d0d0" : "#333",
        }}
      >
        I’m a <strong>Web Developer</strong> who builds modern, responsive, and
        scalable applications using the <strong>MERN stack</strong>,{" "}
        <strong>Vite</strong>, and <strong>Material-UI</strong> — with backend
        experience in <strong>Django</strong> and <strong>Python</strong>.  
        My focus is creating seamless user experiences, clean architecture, and
        high-performance web solutions that look great and perform flawlessly
        across all devices.
      </Typography>
    </motion.div>
  </motion.div>
</Box>



          {/* SKILLS */}
<Box
  id="skills"
  sx={{
    minHeight: "80vh",
    textAlign: "center",
    py: 10,
    background:
      mode === "dark"
        ? "linear-gradient(135deg, #111318, #171a20)"
        : "linear-gradient(135deg, #f9f9f9, #e6e6e6)",
  }}
>
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Header */}
    <motion.div variants={fadeUp}>
     <Typography
  variant="h3"
  gutterBottom
  sx={{
    fontWeight: 700,
    background: mode === "dark"
      ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
      : "linear-gradient(90deg, #007aff, #00bcd4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: mode === "dark"
      ? "0 0 8px rgba(0,229,255,0.4)"
      : "0 0 6px rgba(0,123,255,0.3)",
  }}
>
  Skills & Tech Stack
</Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: mode === "dark" ? "#e0f7fa" : "#007aff",
          maxWidth: 700,
          mx: "auto",
          mt: 1,
        }}
      >
        My expertise spans frontend, backend, and full-stack web development —
        building modern, scalable, and efficient web applications with the MERN stack,
        Material UI, and Python/Django integrations.
      </Typography>
    </motion.div>

    {/* Core Technologies */}
    <motion.div variants={fadeUp}>
      <Typography
        variant="h5"
        sx={{ mt: 6, mb: 2, fontWeight: 600, textTransform: "uppercase" }}
      >
        Core Technologies
      </Typography>
    </motion.div>

    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" sx={{ mt: 2 }}>
      {[
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React.js",
        "Vite",
        "Material UI",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Git / GitHub",
        "RESTful APIs",
      ].map((skill, i) => (
        <motion.div key={skill} custom={i * 0.1} variants={fadeUp} whileHover={{ scale: 1.1 }}>
         <Chip
  label={skill}
  variant="outlined"
  sx={{
    fontSize: "1rem",
    m: 1,
    px: 1.5,
    py: 0.5,
    fontWeight: 500,
    borderRadius: "8px",
    borderWidth: "2px",
    borderColor: mode === "dark" ? "#2196f3" : "#007aff",
    color: mode === "dark" ? "#2196f3" : "#007aff",
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
    "&:hover": {
      background: mode === "dark"
        ? "linear-gradient(135deg, rgba(33,150,243,0.15), rgba(0,255,255,0.25))"
        : "linear-gradient(135deg, rgba(0,123,255,0.15), rgba(0,188,212,0.2))",
      borderColor: mode === "dark" ? "#00bcd4" : "#00bcd4",
      color: mode === "dark" ? "#00e5ff" : "#fff",
      boxShadow: mode === "dark" ? "0 0 12px rgba(0,229,255,0.6)" : "0 0 8px rgba(0,123,255,0.4)",
      transform: "scale(1.08)",
    },
  }}
/>

        </motion.div>
      ))}
    </Stack>

    {/* Backend & Tools */}
    <motion.div variants={fadeUp}>
      <Typography
        variant="h5"
        sx={{ mt: 6, mb: 2, fontWeight: 600, textTransform: "uppercase" }}
      >
        Backend & Tools
      </Typography>
    </motion.div>

    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" sx={{ mt: 2 }}>
      {[
        "Python",
        "Django",
        "Postman",
        "JWT Authentication",
        "Cloud Deployment (Vercel / Netlify)",
        "NPM / Yarn",
        "VS Code",
        "Blob Storage",
        "Cloudinary",
        "Resend (Email / OTP Service)",
      ].map((skill, i) => (
        <motion.div key={skill} custom={i * 0.1} variants={fadeUp} whileHover={{ scale: 1.1 }}>
          <Chip
            label={skill}
            variant="outlined"
            sx={{
              fontSize: "1rem",
              m: 1,
              px: 1.5,
              py: 0.5,
              fontWeight: 500,
              borderRadius: "8px",
              borderWidth: "2px",
              borderColor: "#9c27b0",
              color: "#9c27b0",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, rgba(156,39,176,0.15), rgba(255,0,255,0.25))",
                borderColor: "#e040fb",
                color: "#e1bee7",
                boxShadow: "0 0 12px rgba(224,64,251,0.6)",
                transform: "scale(1.08)",
              },
            }}
          />
        </motion.div>
      ))}
    </Stack>

    {/* Currently Exploring */}
    <motion.div variants={fadeUp}>
      <Typography
        variant="h5"
        sx={{ mt: 6, mb: 2, fontWeight: 600, textTransform: "uppercase" }}
      >
        Currently Exploring
      </Typography>
    </motion.div>

    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" sx={{ mt: 2 }}>
      {[
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "GraphQL",
        "Docker",
        "AI Integration (OpenAI API)",
      ].map((skill, i) => (
        <motion.div key={skill} custom={i * 0.1} variants={fadeUp} whileHover={{ scale: 1.1 }}>
          <Chip
            label={skill}
            variant="outlined"
            sx={{
              fontSize: "1rem",
              m: 1,
              px: 1.5,
              py: 0.5,
              fontWeight: 500,
              borderRadius: "8px",
              borderWidth: "2px",
              borderColor: "#4caf50",
              color: "#4caf50",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, rgba(76,175,80,0.15), rgba(0,255,128,0.25))",
                borderColor: "#00e676",
                color: "#c8e6c9",
                boxShadow: "0 0 12px rgba(0,230,118,0.6)",
                transform: "scale(1.08)",
              },
            }}
          />
        </motion.div>
      ))}
    </Stack>
  </motion.div>
</Box>

{/* PROJECTS */}
<Box
  id="projects"
  sx={{
    minHeight: "100vh",
    py: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background:
      mode === "dark"
        ? "linear-gradient(135deg, #0f1115, #1b1e24)"
        : "linear-gradient(135deg, #f2f8ff, #ffffff)",
  }}
>
  <Container maxWidth="lg">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: mode === "dark"
              ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
              : "linear-gradient(90deg, #007aff, #00bcd4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: mode === "dark"
              ? "0 0 8px rgba(0,229,255,0.4)"
              : "0 0 6px rgba(0,123,255,0.3)",
          }}
        >
          Featured Projects
        </Typography>
      </motion.div>

      {/* Project Cards */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mt: 4 }}>
        {[
          {
            title: "Task tracker",
            desc: "Taskly — A modern and intuitive task management app...",
            img: "/projects/taskly.png",
            github: "https://github.com/nikgitofficial/taskly",
            live: "https://taskly-plum.vercel.app/login",
          },
          {
            title: "TeamSphere HR System",
            desc: "Manage employees, automate payroll, and track attendance seamlessly...",
            img: "/projects/teamsphere.png",
            github: "https://github.com/nikgitofficial/Teamsphere",
            live: "https://teamsphere-lyart.vercel.app/about",
          },
          {
            title: "Answerly",
            desc: "About My Questionnaire App...",
            img: "/projects/answerly.png",
            github: "https://github.com/nikgitofficial/answerlyv1",
            live: "https://answerlyv1.vercel.app/about",
          },
          {
            title: "Personal-Record-Keeper",
            desc: "Personal Record Keeper — A secure and user-friendly application...",
            img: "/projects/personal-record-keeper.png",
            github: "https://github.com/nikgitofficial/Personal-Record-Keeper",
            live: "https://personal-record-keeper.vercel.app/",
          },
          {
            title: "File Uploader",
            desc: "File Uploader — A robust and user-friendly file upload system...",
            img: "/projects/fileuploader.png",
            github: "https://github.com/nikgitofficial/fileuploader",
            live: "https://fileuploader-dun.vercel.app/",
          },
          {
            title: "Chat Application",
            desc: "Niko Nikonik – A modern web app where users can log in...",
            img: "/projects/nikonikonik.png",
            github: "https://github.com/nikgitofficial/NikoNikonik",
            live: "https://niko-nikonik-rouge.vercel.app/welcome",
          },
        ].map((project, i) => (
          <Grid item xs={12} sm={6} md={4} key={project.title}>
            <motion.div
              custom={i * 0.2}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  background: mode === "dark"
                    ? "rgba(20,20,30,0.6)"
                    : "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                  borderRadius: 3,
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: mode === "dark"
                      ? "0 0 20px rgba(0,229,255,0.3), inset 0 0 10px rgba(0,229,255,0.1)"
                      : "0 0 20px rgba(0,123,255,0.3), inset 0 0 10px rgba(0,123,255,0.05)",
                  },
                }}
              >
                {/* Image Preview */}
                <Box
                  component="img"
                  src={project.img}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: mode === "dark"
                        ? "0 0 12px rgba(0,229,255,0.5)"
                        : "0 0 12px rgba(0,123,255,0.3)",
                    },
                  }}
                />

                {/* Text */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      background: mode === "dark"
                        ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
                        : "linear-gradient(90deg, #007aff, #00bcd4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: mode === "dark"
                        ? "0 0 8px rgba(0,229,255,0.4)"
                        : "0 0 6px rgba(0,123,255,0.3)",
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: mode === "dark" ? "#cfd8dc" : "#555", mb: 3 }}
                  >
                    {project.desc}
                  </Typography>
                </Box>

                {/* Buttons */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      fontWeight: 500,
                      background: mode === "dark"
                        ? "linear-gradient(135deg, #00e5ff, #29b6f6)"
                        : "linear-gradient(135deg, #007aff, #00bcd4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: mode === "dark"
                          ? "linear-gradient(135deg, #00ffb0, #00e5ff)"
                          : "linear-gradient(135deg, #00bcd4, #007aff)",
                        boxShadow: mode === "dark"
                          ? "0 0 10px rgba(0,229,255,0.5)"
                          : "0 0 10px rgba(0,123,255,0.4)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Live Demo
                  </Button>
                  <Button
                    variant="outlined"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      fontWeight: 500,
                      color: mode === "dark" ? "#e0f7fa" : "#007aff",
                      borderColor: mode === "dark" ? "#e0f7fa" : "#007aff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: mode === "dark"
                          ? "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,255,180,0.25))"
                          : "linear-gradient(135deg, rgba(0,123,255,0.15), rgba(0,188,212,0.25))",
                        color: mode === "dark" ? "#00e5ff" : "#00bcd4",
                        boxShadow: mode === "dark"
                          ? "0 0 10px rgba(0,229,255,0.4)"
                          : "0 0 10px rgba(0,123,255,0.3)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    GitHub
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  </Container>
</Box>



{/* CONTACT */}
<Box
  id="contact"
  sx={{
    minHeight: "80vh",
    textAlign: "center",
    py: 10,
    background:
      mode === "dark"
        ? "linear-gradient(135deg, #1b1e24, #111318)"
        : "linear-gradient(135deg, #f9f9f9, #ffffff)",
  }}
>
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Header */}
    <motion.div variants={fadeUp}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: mode === "dark"
            ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
            : "linear-gradient(90deg, #007aff, #00bcd4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: mode === "dark"
            ? "0 0 8px rgba(0,229,255,0.4)"
            : "0 0 6px rgba(0,123,255,0.3)",
        }}
      >
        Get In Touch
      </Typography>
    </motion.div>

    {/* Description */}
    <motion.div variants={fadeUp}>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          maxWidth: 600,
          mx: "auto",
          color: mode === "dark" ? "#e0f7fa" : "#007aff",
        }}
      >
        I’m open to collaboration, freelance projects, and full-time roles.
        Let’s build something awesome together.
      </Typography>
    </motion.div>

    {/* Contact Info */}
    <motion.div variants={fadeUp}>
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          mb: 5,
          "& svg": {
            transition: "all 0.3s ease",
            "&:hover": { transform: "scale(1.2)", color: "#00e5ff" },
          },
        }}
      >
        {/* Email */}
        <Stack direction="row" spacing={2} alignItems="center">
          <EmailIcon sx={{ color: mode === "dark" ? "#00e5ff" : "#007aff" }} />
          <Typography variant="body1">nickforjobacc@gmail.com</Typography>
        </Stack>

        {/* GitHub */}
        <Stack direction="row" spacing={2} alignItems="center">
          <GitHubIcon sx={{ color: mode === "dark" ? "#e0f7fa" : "#333" }} />
          <Typography
            variant="body1"
            component="a"
            href="https://github.com/nikgitofficial"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#00e5ff",
                textShadow: mode === "dark"
                  ? "0 0 8px rgba(0,229,255,0.4)"
                  : "0 0 6px rgba(0,123,255,0.3)",
              },
            }}
          >
            github.com/nikgitofficial
          </Typography>
        </Stack>

        {/* Phone */}
        <Stack direction="row" spacing={2} alignItems="center">
          <PhoneIcon sx={{ color: mode === "dark" ? "#00ffb0" : "#1976d2" }} />
          <Typography variant="body1">+63 9514190949</Typography>
        </Stack>
      </Stack>
    </motion.div>

    {/* Contact Button */}
    <motion.div variants={fadeUp}>
      <Button
        variant="contained"
        size="large"
        href="mailto:nickforjobacc@gmail.com"
        sx={{
          borderRadius: 3,
          px: 5,
          fontWeight: 500,
          background: mode === "dark"
            ? "linear-gradient(135deg, #00e5ff, #29b6f6)"
            : "linear-gradient(135deg, #007aff, #00bcd4)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: mode === "dark"
              ? "linear-gradient(135deg, #00ffb0, #00e5ff)"
              : "linear-gradient(135deg, #00bcd4, #007aff)",
            boxShadow: mode === "dark"
              ? "0 0 12px rgba(0,229,255,0.6)"
              : "0 0 10px rgba(0,123,255,0.4)",
            transform: "scale(1.05)",
          },
        }}
      >
        Contact Me
      </Button>
    </motion.div>
  </motion.div>
</Box>



          </Box>

 {/* FOOTER */}
<Box
  component="footer"
  sx={{
    background: mode === "dark"
      ? "linear-gradient(135deg, #111318, #171a20)"
      : "linear-gradient(135deg, #f9f9f9, #e6e6e6)",
    color: mode === "dark" ? "#e0f7fa" : "#007aff",
    py: 5,
    textAlign: "center",
    borderTop: mode === "dark"
      ? "1px solid rgba(0,229,255,0.2)"
      : "1px solid rgba(0,122,255,0.2)",
    boxShadow: mode === "dark"
      ? "0 -2px 10px rgba(0,229,255,0.1) inset"
      : "0 -2px 10px rgba(0,122,255,0.1) inset",
    backdropFilter: "blur(8px)",
  }}
>
  <Typography
    variant="body2"
    sx={{
      fontWeight: 500,
      background: mode === "dark"
        ? "linear-gradient(90deg, #00e5ff, #00ffb0)"
        : "linear-gradient(90deg, #007aff, #00bcd4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: mode === "dark"
        ? "0 0 8px rgba(0,229,255,0.4)"
        : "0 0 6px rgba(0,123,255,0.3)",
    }}
  >
    © {new Date().getFullYear()} Nikko | All Rights Reserved
  </Typography>
</Box>



          {/* SCROLL TO TOP */}
          <IconButton
            onClick={scrollToTop}
            color="primary"
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              bgcolor: "primary.main",
              color: "#000",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Main;
