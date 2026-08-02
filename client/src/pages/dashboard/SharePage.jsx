import { useState } from 'react';
import { GlassPanel } from '../../components/GlassPanel';
import { NeonButton } from '../../components/NeonButton';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const UrlBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1.5px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 12px 16px;
  overflow-x: auto;
`;

const UrlText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.neonCyan};
  white-space: nowrap;
`;

export function SharePage() {
  const { user } = useAuth();
  const [copiedSlug, setCopiedSlug] = useState(null);

  // idealmente viria de eventTypeService.listMine(), mantendo simples aqui:
  const baseUrl = `${window.location.origin}/${user.username}`;

  async function handleCopy(url, key) {
    await navigator.clipboard.writeText(url);
    setCopiedSlug(key);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  return (
    <GlassPanel>
      <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
        Compartilhe sua página
      </h2>
      <p style={{ marginBottom: 16, color: '#9FC9B4' }}>
        Envie o link abaixo (seguido do slug do evento) para quem quiser agendar com você.
      </p>

      <UrlBox>
        <UrlText>{baseUrl}/[slug-do-evento]</UrlText>
        <NeonButton
          $variant={copiedSlug === 'base' ? 'green' : 'cyan'}
          onClick={() => handleCopy(`${baseUrl}/`, 'base')}
          style={{ flexShrink: 0 }}
        >
          {copiedSlug === 'base' ? 'Copiado!' : 'Copiar base'}
        </NeonButton>
      </UrlBox>

      <p style={{ marginTop: 20, fontSize: '0.85rem', color: '#6B8A7A' }}>
        Dica: veja o slug de cada evento em{' '}
        <strong>Meus eventos</strong> e complete o link acima antes de enviar.
      </p>
    </GlassPanel>
  );
}