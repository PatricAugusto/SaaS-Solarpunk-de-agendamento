import { css } from 'styled-components';
import { theme } from './theme';

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${theme.breakpoints.mobile}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${theme.breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
};