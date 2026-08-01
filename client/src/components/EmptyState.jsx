import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  gap: 10px;
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(3)};
  border: 1.5px dashed ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const Icon = styled.span`
  font-size: 2rem;
  filter: drop-shadow(0 0 8px rgba(61, 253, 255, 0.4));
`;

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 320px;
`;

export function EmptyState({ icon = '🌱', title, subtitle }) {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Title className="font-mono">{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}