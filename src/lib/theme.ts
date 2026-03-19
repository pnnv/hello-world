"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7C8CF5",
      light: "#A5B0F9",
      dark: "#5A6AD4",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F5A8C8",
      light: "#F9C8DC",
      dark: "#D48AAE",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFBFE",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2D3142",
      secondary: "#6B7194",
    },
    success: {
      main: "#7DD3A8",
      light: "#A5E4C5",
      dark: "#5BB98A",
    },
    warning: {
      main: "#F5D98C",
      light: "#F9E7B0",
      dark: "#D4BA6E",
    },
    error: {
      main: "#F5918C",
      light: "#F9B3AF",
      dark: "#D4756E",
    },
    info: {
      main: "#8CB5F5",
      light: "#B0CDF9",
      dark: "#6E99D4",
    },
    divider: "#E8EAF0",
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(45,49,66,0.06)",
    "0 2px 6px rgba(45,49,66,0.08)",
    "0 4px 12px rgba(45,49,66,0.08)",
    "0 6px 16px rgba(45,49,66,0.10)",
    "0 8px 24px rgba(45,49,66,0.10)",
    "0 12px 32px rgba(45,49,66,0.12)",
    "0 16px 40px rgba(45,49,66,0.12)",
    "0 20px 48px rgba(45,49,66,0.14)",
    ...Array(16).fill("none"),
  ] as unknown as typeof createTheme extends (o: infer T) => unknown ? T extends { shadows: infer S } ? S : never : never,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FAFBFE",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 24px",
          fontSize: "0.875rem",
        },
        containedPrimary: {
          backgroundColor: "#7C8CF5",
          "&:hover": {
            backgroundColor: "#6A7AE8",
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E8EAF0",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E8EAF0",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#F5F6FA",
            "& fieldset": {
              borderColor: "#E8EAF0",
            },
            "&:hover fieldset": {
              borderColor: "#7C8CF5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7C8CF5",
              borderWidth: 1.5,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
          backgroundColor: "#F0F1F5",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 2,
          "&.Mui-selected": {
            backgroundColor: "rgba(124, 140, 245, 0.08)",
            color: "#7C8CF5",
            "&:hover": {
              backgroundColor: "rgba(124, 140, 245, 0.12)",
            },
          },
        },
      },
    },
  },
});

export default theme;
