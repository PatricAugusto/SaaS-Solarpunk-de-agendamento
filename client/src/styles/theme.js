export const theme = {
  colors: {
    // Base solarpunk — verdes profundos e terra
    background: '#0B1A14',       // verde-noite, base de tudo
    backgroundAlt: '#0F241C',
    surface: 'rgba(20, 46, 36, 0.45)', // vidro verde translúcido
    surfaceLight: 'rgba(255, 255, 255, 0.06)',

    // Neons de destaque
    neonGreen: '#39FF88',
    neonCyan: '#3DFDFF',
    neonMagenta: '#FF6EC7',
    neonGold: '#FFD166',

    // Texto
    textPrimary: '#EAFBF1',
    textSecondary: '#9FC9B4',
    textMuted: '#6B8A7A',

    // Estados
    success: '#39FF88',
    danger: '#FF5C7A',
    warning: '#FFD166',

    // Bordas de vidro
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    glassBorderHighlight: 'rgba(61, 253, 255, 0.35)',
  },

  fonts: {
    display: "'Press Start 2P', cursive",
    mono: "'VT323', monospace",
    body: "'Space Grotesk', sans-serif",
  },

  radii: {
    sm: '10px',
    md: '18px',
    lg: '28px',
    pill: '999px',
  },

  blur: {
    glass: 'blur(18px)',
    glassStrong: 'blur(28px)',
  },

  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
    neonGreen: '0 0 20px rgba(57, 255, 136, 0.45)',
    neonCyan: '0 0 20px rgba(61, 253, 255, 0.45)',
    neonMagenta: '0 0 20px rgba(255, 110, 199, 0.45)',
  },

  spacing: (multiplier) => `${multiplier * 8}px`,

   breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};