import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from '../styles/media';

const TabsRow = styled.nav`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  ${media.mobile`
    justify-content: center;
  `}
`;

const Tab = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1.5px solid ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surfaceLight};
  transition: all 0.2s ease;
  min-height: 40px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.neonCyan};
    color: ${({ theme }) => theme.colors.neonCyan};
  }

  &.active {
    border-color: ${({ theme }) => theme.colors.neonGreen};
    color: ${({ theme }) => theme.colors.neonGreen};
    box-shadow: ${({ theme }) => theme.shadows.neonGreen};
  }
`;

export function NavTabs({ items }) {
  return (
    <TabsRow>
      {items.map((item) => (
        <Tab key={item.to} to={item.to} end={item.end}>
          {item.label}
        </Tab>
      ))}
    </TabsRow>
  );
}