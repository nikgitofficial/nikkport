import React from "react";
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
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#61dafb" },
    background: { default: "#0f1115", paper: "#1b1e24" },
    text: { primary: "#fff" },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h2: { fontWeight: 700 },
    body1: { lineHeight: 1.8 },
  },
});

const sections = [
  { id: "contact1", title: "Contact Section 1" },
  { id: "contact2", title: "Contact Section 2" },
  { id: "contact3", title: "Contact Section 3" },
  { id: "contact4", title: "Contact Section 4" },
];

const Main = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={4}>
        <Toolbar sx={{ justifyContent: "center", gap: 3 }}>
          {sections.map((s) => (
            <Button key={s.id} href={`#${s.id}`} sx={{ color: "#fff" }}>
              {s.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      {/* Sections */}
      <Box sx={{ pt: 10 }}>
        {sections.map((s, i) => (
          <Box
            key={s.id}
            id={s.id}
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: `linear-gradient(135deg, ${
                ["#2d2f36", "#1e3c72", "#42275a", "#16222A"][i % 4]
              }, ${
                ["#24252a", "#2a5298", "#734b6d", "#3A6073"][i % 4]
              })`,
              color: "#fff",
              textAlign: "center",
              p: 5,
            }}
          >
            <Typography variant="h2" gutterBottom>
              {s.title}
            </Typography>
            <Typography variant="body1" maxWidth="md">
              This is {s.title}. Beautiful gradients, smooth scrolling, and fully
              responsive layout powered by MUI.
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          background: "#111",
          color: "#fff",
          py: 5,
          mt: 5,
        }}
      >
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {[1, 2, 3, 4, 5].map((col) => (
              <Grid item xs={6} sm={4} md={2} key={col}>
                <Typography variant="h6" gutterBottom>
                  Column {col}
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <Button sx={{ color: "#aaa", textTransform: "none" }}>
                        Link {i + 1}
                      </Button>
                    </li>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 5, color: "#888" }}
          >
            © {new Date().getFullYear()} Nikko | All Rights Reserved
          </Typography>
        </Container>
      </Box>

      {/* Scroll to Top */}
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
    </ThemeProvider>
  );
};

export default Main;
