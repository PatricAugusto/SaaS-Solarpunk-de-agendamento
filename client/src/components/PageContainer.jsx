import styled from 'styled-components';
import { media } from '../styles/media';

export const PageContainer = styled.div`
  max-width: ${({ $narrow }) => ($narrow ? '480px' : '960px')};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  position: relative;
  z-index: 1;

  ${media.tablet`
    padding: ${({ theme }) => theme.spacing(2.5)};
  `}

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing(2)};
    gap: ${({ theme }) => theme.spacing(2)};
  `}
`;