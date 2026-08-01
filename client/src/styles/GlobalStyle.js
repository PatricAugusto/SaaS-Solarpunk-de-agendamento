import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    background-image:
      radial-gradient(circle at 15% 20%, rgba(57, 255, 136, 0.12), transparent 40%),
      radial-gradient(circle at 85% 10%, rgba(61, 253, 255, 0.10), transparent 35%),
      radial-gradient(circle at 50% 90%, rgba(255, 110, 199, 0.08), transparent 40%);
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.body};
    min-height: 100vh;
  }

  h1, h2, .font-display {
    font-family: ${({ theme }) => theme.fonts.display};
    letter-spacing: 0.5px;
    line-height: 1.6;
  }

  .font-mono {
    font-family: ${({ theme }) => theme.fonts.mono};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.neonGreen};
    color: ${({ theme }) => theme.colors.background};
  }

  /* Scrollbar temática */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neonGreen};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;