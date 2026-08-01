import styled, { css } from 'styled-components';
import { media } from '../styles/media';

const variants = {
  green: css`
    border-color: ${({ theme }) => theme.colors.neonGreen};
    color: ${({ theme }) => theme.colors.neonGreen};
    &:hover { box-shadow: ${({ theme }) => theme.shadows.neonGreen}; }
  `,
  cyan: css`
    border-color: ${({ theme }) => theme.colors.neonCyan};
    color: ${({ theme }) => theme.colors.neonCyan};
    &:hover { box-shadow: ${({ theme }) => theme.shadows.neonCyan}; }
  `,
  magenta: css`
    border-color: ${({ theme }) => theme.colors.neonMagenta};
    color: ${({ theme }) => theme.colors.neonMagenta};
    &:hover { box-shadow: ${({ theme }) => theme.shadows.neonMagenta}; }
  `,
};

export const NeonButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.15rem;
  letter-spacing: 1px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  backdrop-filter: ${({ theme }) => theme.blur.glass};
  border: 1.5px solid;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 12px 28px;
  transition: all 0.25s ease;
  min-height: 44px; /* área de toque confortável */

  ${({ $variant }) => variants[$variant || 'green']}

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  ${media.mobile`
    width: 100%;
    font-size: 1rem;
  `}
`;