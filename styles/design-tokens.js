const designTokens = {
  colors: {
    background: "hsl(var(--background) / <alpha-value>)",
    foreground: "hsl(var(--foreground) / <alpha-value>)",
    card: "hsl(var(--card) / <alpha-value>)",
    "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
    popover: "hsl(var(--popover) / <alpha-value>)",
    "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
    primary: "hsl(var(--primary) / <alpha-value>)",
    "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
    secondary: "hsl(var(--secondary) / <alpha-value>)",
    "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
    accent: "hsl(var(--accent) / <alpha-value>)",
    "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
    muted: "hsl(var(--muted) / <alpha-value>)",
    "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
    border: "hsl(var(--border) / <alpha-value>)",
    input: "hsl(var(--input) / <alpha-value>)",
    ring: "hsl(var(--ring) / <alpha-value>)",
    success: "hsl(var(--success) / <alpha-value>)",
    warning: "hsl(var(--warning) / <alpha-value>)",
    danger: "hsl(var(--danger) / <alpha-value>)",
  },
  fontFamily: {
    sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
    mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
  },
  fontSize: {
    eyebrow: ["var(--text-eyebrow)", { lineHeight: "1rem", letterSpacing: "0.12em" }],
    body: ["var(--text-body)", { lineHeight: "1.75" }],
    lead: ["var(--text-lead)", { lineHeight: "1.75" }],
    display: ["var(--text-display)", { lineHeight: "0.95", letterSpacing: "0" }],
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    full: "9999px",
  },
  boxShadow: {
    soft: "var(--shadow-soft)",
    lifted: "var(--shadow-lifted)",
  },
};

module.exports = { designTokens };
