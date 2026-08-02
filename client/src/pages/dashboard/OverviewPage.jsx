import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GlassPanel } from '../../components/GlassPanel';
import { NeonButton } from '../../components/NeonButton';
import { Loader } from '../../components/Loader';
import { EmptyState } from '../../components/EmptyState';
import { eventTypeService } from '../../services/eventTypeService';
import { bookingService } from '../../services/bookingService';
import styled from 'styled-components';
import { media } from '../../styles/media';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${media.mobile`
    grid-template-columns: 1fr;
  `}
`;

const StatValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.neonGreen};
`;

const StatLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 8px;
`;

export function OverviewPage() {
  const [eventTypes, setEventTypes] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    eventTypeService.listMine().then(setEventTypes);
    bookingService.listMine().then(setBookings);
  }, []);

  if (eventTypes === null || bookings === null) {
    return <Loader label="Carregando seu painel..." />;
  }

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const nextBooking = confirmedBookings[0];

  return (
    <>
      <StatsGrid>
        <GlassPanel style={{ textAlign: 'center' }}>
          <StatValue>{eventTypes.length}</StatValue>
          <StatLabel>tipos de evento ativos</StatLabel>
        </GlassPanel>
        <GlassPanel style={{ textAlign: 'center' }}>
          <StatValue>{confirmedBookings.length}</StatValue>
          <StatLabel>agendamentos confirmados</StatLabel>
        </GlassPanel>
      </StatsGrid>

      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
          Próximo agendamento
        </h2>
        {nextBooking ? (
          <div>
            <strong>{nextBooking.guest_name}</strong> — {nextBooking.event_title}
            <div className="font-mono" style={{ color: '#3DFDFF', marginTop: 6 }}>
              {format(new Date(nextBooking.start_time), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </div>
          </div>
        ) : (
          <EmptyState
            icon="📭"
            title="Nada agendado ainda"
            subtitle="Compartilhe sua página pública para começar a receber agendamentos."
          />
        )}
      </GlassPanel>

      <GlassPanel style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/dashboard/eventos">
          <NeonButton $variant="green">Gerenciar eventos</NeonButton>
        </Link>
        <Link to="/dashboard/agendamentos">
          <NeonButton $variant="cyan">Ver agendamentos</NeonButton>
        </Link>
        <Link to="/dashboard/compartilhar">
          <NeonButton $variant="magenta">Compartilhar página</NeonButton>
        </Link>
      </GlassPanel>
    </>
  );
}