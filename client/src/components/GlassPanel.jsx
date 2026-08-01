import styled from 'styled-components';
import { media } from '../styles/media';

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