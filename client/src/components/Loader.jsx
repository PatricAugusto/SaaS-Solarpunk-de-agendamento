import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(0.85); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 14px;
  padding: ${({ theme }) => theme.spacing(6)} 0;
  text-align: center;
`;

const Orb = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.glassBorder};
  border-top-color: ${({ theme }) => theme.colors.neonGreen};
  border-right-color: ${({ theme }) => theme.colors.neonCyan};
  animation: ${spin} 0.9s linear infinite;
  box-shadow: 0 0 16px rgba(57, 255, 136, 0.35);
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

const SubLabel = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 280px;
`;

export function Loader({ label = 'Carregando...' }) {
  const [showSlowNotice, setShowSlowNotice] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlowNotice(true), 6000); // 6s sem resposta
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <Orb />
      <Label className="font-mono">{label}</Label>
      {showSlowNotice && (
        <SubLabel>
          O servidor estava "dormindo" pra economizar recursos, já está acordando, deve levar só mais alguns segundos.
        </SubLabel>
      )}
    </Wrapper>
  );
}