import { useEffect, useState } from 'react';
import { format, addDays, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GlassPanel } from '../../components/GlassPanel';
import { NeonButton } from '../../components/NeonButton';
import { FormGroup, Label, Input } from '../../components/FormField';
import { Loader } from '../../components/Loader';
import { EmptyState } from '../../components/EmptyState';
import { eventTypeService } from '../../services/eventTypeService';
import { bookingService } from '../../services/bookingService';
import styled from 'styled-components';
import { media } from '../../styles/media';

const DAYS_TO_SHOW = 5;

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  ${media.mobile`
    flex-direction: column;
  `}
`;

const SlotsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export function NewBookingPage() {
  const [eventTypes, setEventTypes] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [slots, setSlots] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guest, setGuest] = useState({ guestName: '', guestEmail: '' });
  const [status, setStatus] = useState('idle'); // idle | booking | done | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    eventTypeService.listMine().then(setEventTypes);
  }, []);

  useEffect(() => {
    if (!selectedEventType) return;
    setSelectedSlot(null);
    setSlots(null);
    bookingService
      .getAvailability(selectedEventType.id, format(selectedDate, 'yyyy-MM-dd'))
      .then(setSlots);
  }, [selectedEventType, selectedDate]);

  function handleSelectEventType(et) {
    setSelectedEventType(et);
    setSelectedDate(startOfToday());
    setSelectedSlot(null);
    setStatus('idle');
    setGuest({ guestName: '', guestEmail: '' });
  }

  async function handleConfirm(e) {
    e.preventDefault();
    setStatus('booking');
    setErrorMsg('');
    try {
      await bookingService.createManual({
        eventTypeId: selectedEventType.id,
        ...guest,
        startTime: selectedSlot.start,
      });
      setStatus('done');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Erro ao confirmar agendamento');
      setStatus('error');
      bookingService
        .getAvailability(selectedEventType.id, format(selectedDate, 'yyyy-MM-dd'))
        .then(setSlots);
      setSelectedSlot(null);
    }
  }

  if (eventTypes === null) return <Loader label="Carregando seus eventos..." />;

  if (eventTypes.length === 0) {
    return (
      <GlassPanel>
        <EmptyState
          icon="🗓️"
          title="Nenhum tipo de evento criado"
          subtitle="Crie um tipo de evento em 'Meus eventos' antes de agendar diretamente por aqui."
        />
      </GlassPanel>
    );
  }

  // Passo 1: escolher o tipo de evento
  if (!selectedEventType) {
    return (
      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
          Para qual evento você quer agendar?
        </h2>
        <Row>
          {eventTypes.map((et) => (
            <NeonButton key={et.id} $variant="cyan" onClick={() => handleSelectEventType(et)}>
              {et.title} · {et.duration_minutes}min
            </NeonButton>
          ))}
        </Row>
      </GlassPanel>
    );
  }

  // Confirmação final
  if (status === 'done') {
    return (
      <GlassPanel style={{ textAlign: 'center' }}>
        <h2 className="font-display" style={{ fontSize: '1rem', color: '#39FF88', marginBottom: 16 }}>
          Agendado! ✨
        </h2>
        <p>
          {selectedEventType.title} com {guest.guestName} em{' '}
          <span className="font-mono" style={{ color: '#3DFDFF' }}>
            {format(new Date(selectedSlot.start), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </span>
        </p>
        <NeonButton
          $variant="cyan"
          style={{ marginTop: 20 }}
          onClick={() => handleSelectEventType(null)}
        >
          Agendar outro
        </NeonButton>
      </GlassPanel>
    );
  }

  const dayOptions = Array.from({ length: DAYS_TO_SHOW }, (_, i) => addDays(startOfToday(), i));

  return (
    <>
      <GlassPanel style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <strong>{selectedEventType.title}</strong>
          <span style={{ marginLeft: 10, color: '#9FC9B4', fontSize: '0.85rem' }}>
            {selectedEventType.duration_minutes} min
          </span>
        </div>
        <NeonButton $variant="magenta" onClick={() => setSelectedEventType(null)}>
          Trocar evento
        </NeonButton>
      </GlassPanel>

      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Escolha o dia</h2>
        <Row>
          {dayOptions.map((day) => {
            const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            return (
              <NeonButton
                key={day.toISOString()}
                $variant={isSelected ? 'green' : 'cyan'}
                onClick={() => setSelectedDate(day)}
                style={{ opacity: isSelected ? 1 : 0.6 }}
              >
                {format(day, 'EEE dd/MM', { locale: ptBR })}
              </NeonButton>
            );
          })}
        </Row>
      </GlassPanel>

      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Horários disponíveis</h2>
        {slots === null ? (
          <Loader label="Buscando horários..." />
        ) : slots.length === 0 ? (
          <EmptyState icon="😴" title="Sem horários livres nesse dia" subtitle="Tente outro dia na lista acima." />
        ) : (
          <SlotsRow>
            {slots.map((slot) => (
              <NeonButton
                key={slot.start}
                $variant={selectedSlot?.start === slot.start ? 'green' : 'cyan'}
                onClick={() => setSelectedSlot(slot)}
                className="font-mono"
              >
                {slot.label}
              </NeonButton>
            ))}
          </SlotsRow>
        )}
      </GlassPanel>

      {selectedSlot && (
        <GlassPanel>
          <h2 className="font-display" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Dados do convidado</h2>
          <form onSubmit={handleConfirm} style={{ display: 'grid', gap: 14 }}>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                value={guest.guestName}
                onChange={(e) => setGuest({ ...guest, guestName: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>E-mail</Label>
              <Input
                type="email"
                value={guest.guestEmail}
                onChange={(e) => setGuest({ ...guest, guestEmail: e.target.value })}
                required
              />
            </FormGroup>
            {errorMsg && <p style={{ color: '#FF5C7A' }}>{errorMsg}</p>}
            <NeonButton type="submit" $variant="green" disabled={status === 'booking'}>
              {status === 'booking' ? 'Confirmando...' : 'Confirmar agendamento'}
            </NeonButton>
          </form>
        </GlassPanel>
      )}
    </>
  );
}