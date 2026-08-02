import { useEffect, useState } from 'react';
import { GlassPanel } from '../../components/GlassPanel';
import { NeonButton } from '../../components/NeonButton';
import { Loader } from '../../components/Loader';
import { EmptyState } from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { eventTypeService } from '../../services/eventTypeService';
import styled from 'styled-components';
import { media } from '../../styles/media';

const UrlBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1.5px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 12px 16px;
  overflow-x: auto;

  ${media.mobile`
    flex-direction: column;
    align-items: stretch;
  `}
`;

const UrlText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neonCyan};
  white-space: nowrap;
  overflow-x: auto;
`;

const EventCard = styled.div`
  display: grid;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
`;

export function SharePage() {
  const { user } = useAuth();
  const [eventTypes, setEventTypes] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    eventTypeService.listMine().then(setEventTypes);
  }, []);

  async function handleCopy(url, id) {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (eventTypes === null) return <Loader label="Carregando seus links..." />;

  return (
    <GlassPanel>
      <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
        Compartilhe sua página
      </h2>

      {eventTypes.length === 0 ? (
        <EmptyState
          icon="🔗"
          title="Nenhum evento pra compartilhar ainda"
          subtitle="Crie um tipo de evento em 'Meus eventos' para gerar seu primeiro link."
        />
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {eventTypes.map((et) => {
            const fullUrl = `${window.location.origin}/${user.username}/${et.slug}`;
            return (
              <EventCard key={et.id}>
                <div>
                  <strong>{et.title}</strong>
                  <span style={{ marginLeft: 10, color: '#9FC9B4', fontSize: '0.85rem' }}>
                    {et.duration_minutes} min
                  </span>
                </div>
                <UrlBox>
                  <UrlText>{fullUrl}</UrlText>
                  <NeonButton
                    $variant={copiedId === et.id ? 'green' : 'cyan'}
                    onClick={() => handleCopy(fullUrl, et.id)}
                    style={{ flexShrink: 0 }}
                  >
                    {copiedId === et.id ? 'Copiado!' : 'Copiar link'}
                  </NeonButton>
                </UrlBox>
              </EventCard>
            );
          })}
        </div>
      )}
    </GlassPanel>
  );
}