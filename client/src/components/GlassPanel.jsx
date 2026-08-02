import styled from 'styled-components';
import { media } from '../styles/media';
import { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const GlassPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: ${({ theme }) => theme.blur.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.blur.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme, $radius }) => theme.radii[$radius || 'lg']};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  padding: ${({ theme, $padding }) => theme.spacing($padding || 4)};
  position: relative;
  overflow: hidden;

  animation: ${fadeInUp} 0.5s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.glassBorderHighlight},
      transparent
    );
  }

  ${media.mobile`
    padding: ${({ theme, $padding }) => theme.spacing($padding ? $padding - 1 : 2.5)};
    border-radius: ${({ theme }) => theme.radii.md};
  `}
`;