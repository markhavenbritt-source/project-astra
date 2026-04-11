import type { Config } from "tailwindcss";

/*
 * Project Astra — Tailwind Config
 * Design tokens extracted from Figma: TS_Design-System
 * Brand colors marked with ★
 */

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────
      colors: {
        // App-specific surface colors
        surface: {
          app: "#f5f0e8",
          card: "#ede8df",
          "card-hover": "#e5e0d7",
        },

        // Cool Gray
        gray: {
          50: "#f9fafb",
          100: "#f5f7f9",
          200: "#e8ecf0",
          300: "#d1d8e0",
          400: "#b4bec8",
          500: "#8b96a3",
          600: "#6b7684",
          700: "#4a5361",
          800: "#2d3642",
          900: "#1a202c",
        },

        // Red — ★ Brand: 500
        red: {
          50: "#fff1f4",
          100: "#ffe0e7",
          200: "#ffb3c9",
          300: "#ff80a3",
          400: "#ff547d",
          500: "#ff2a63",
          600: "#e00050",
          700: "#b8003f",
          800: "#8f0031",
          900: "#6b0024",
        },

        // Orange — ★ Brand: 400
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },

        // Yellow — ★ Brand: 500
        yellow: {
          50: "#fffbeb",
          100: "#fff4c7",
          200: "#ffe794",
          300: "#ffd962",
          400: "#ffcd31",
          500: "#ffc301",
          600: "#d9a500",
          700: "#b38600",
          800: "#8c6900",
          900: "#6b5000",
        },

        // Green — ★ Brand: 400 (bright), 800 (deep)
        green: {
          50: "#f4fef0",
          100: "#e5fcd8",
          200: "#cbf8b3",
          300: "#a8f06d",
          400: "#91ed2e",
          500: "#6bcd1a",
          600: "#4da515",
          700: "#2d8d2c",
          800: "#167b4a",
          900: "#0f5a36",
        },

        // Turquoise — ★ Brand: 400
        turquoise: {
          50: "#f0fdff",
          100: "#d4f7fb",
          200: "#a8eff7",
          300: "#6de3f0",
          400: "#33d7e8",
          500: "#00c8dd",
          600: "#00a5b8",
          700: "#008393",
          800: "#006470",
          900: "#004a52",
        },

        // Blue — ★ Brand: 600
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },

        // Purple — ★ Brand: 600
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },

        // Pink — ★ Brand: 500
        pink: {
          50: "#fef0fe",
          100: "#fdd9fd",
          200: "#fcb3fb",
          300: "#fa80f8",
          400: "#f954f5",
          500: "#ff22f9",
          600: "#d900d1",
          700: "#b000a8",
          800: "#880080",
          900: "#66005e",
        },
      },

      // ── TYPOGRAPHY ──────────────────────────
      fontFamily: {
        display: ["Roboto", "sans-serif"],
        sans: ["Roboto", "sans-serif"],
        condensed: ['"Roboto Condensed"', "sans-serif"],
        mono: ['"Roboto Mono"', "monospace"],
      },

      fontSize: {
        h1: ["40px", { lineHeight: "1.2", fontWeight: "900" }],
        h2: ["32px", { lineHeight: "32px", fontWeight: "900" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        h4: ["20px", { lineHeight: "1.4", fontWeight: "700" }],
        h5: ["18px", { lineHeight: "1.4", fontWeight: "400" }],
        "subtitle-1": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "subtitle-2": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-1": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-2": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        button: [
          "14px",
          { lineHeight: "1.4", fontWeight: "700", letterSpacing: "0.02em" },
        ],
        "caption-1": ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        "caption-1-bold": ["12px", { lineHeight: "1.4", fontWeight: "700" }],
        "caption-2": ["10px", { lineHeight: "1.32", fontWeight: "400" }],
      },

      // ── SPACING ─────────────────────────────
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },

      // ── BREAKPOINTS ─────────────────────────
      screens: {
        mobile: "400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
