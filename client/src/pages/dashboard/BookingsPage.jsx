import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GlassPanel } from '../../components/GlassPanel';
import { NeonButton } from '../../components/NeonButton';
import { Loader } from '../../components/Loader';
import { EmptyState } from '../../components/EmptyState';
import { bookingService } from '../../services/bookingService';
import styled from 'styled-components';
import { media } from '../../styles/media';

const ListRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  ${media.mobile`
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  `}
`;

export function BookingsPage() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    bookingService.listMine().then(setBookings);
  }

  async function handleCancelBooking(id) {
    await bookingService.cancel(id);
    loadData();
  }

  if (bookings === null) return <Loader label="Carregando agendamentos..." />;

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');

  return (
    <GlassPanel>
      <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
        Próximos agendamentos
      </h2>
      {confirmedBookings.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Nenhum agendamento ainda"
          subtitle="Assim que alguém marcar um horário com você, ele aparece aqui."
        />
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {confirmedBookings.map((b) => (
            <ListRow key={b.id}>
              <div>
                <strong>{b.guest_name}</strong> — {b.event_title}
                <div className="font-mono" style={{ color: '#3DFDFF' }}>
                  {format(new Date(b.start_time), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <NeonButton $variant="magenta" onClick={() => handleCancelBooking(b.id)}>
                Cancelar
              </NeonButton>
            </ListRow>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}