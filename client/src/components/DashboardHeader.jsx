import styled from 'styled-components';
import { NeonButton } from './NeonButton';
import { media } from '../styles/media';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  ${media.mobile`
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  `}
`;

export function DashboardHeader({ userName, onLogout }) {
  return (
    <Header>
      <h1 className="font-display" style={{ fontSize: '1.1rem' }}>
        Olá, {userName.split(' ')[0]} 🌿
      </h1>
      <NeonButton $variant="magenta" onClick={onLogout}>Sair</NeonButton>
    </Header>
  );
}