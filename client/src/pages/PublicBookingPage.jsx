import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, addDays, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GlassPanel } from '../components/GlassPanel';
import { NeonButton } from '../components/NeonButton';
import { FormGroup, Label, Input } from '../components/FormField';
import { eventTypeService } from '../services/eventTypeService';

const DAYS_TO_SHOW = 5;

export function PublicBookingPage() {
  const { username, slug } = useParams();
  const [eventType, setEventType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guest, setGuest] = useState({ guestName: '', guestEmail: '' });
  const [status, setStatus] = useState('idle'); // idle | booking | done | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    eventTypeService.getPublic(username, slug).then(setEventType);
  }, [username, slug]);

  useEffect(() => {
    if (!eventType) return;
    setSelectedSlot(null);
    eventTypeService
      .getAvailability(username, slug, format(selectedDate, 'yyyy-MM-dd'))
      .then(setSlots);
  }, [eventType, selectedDate]);

  const dayOptions = Array.from({ length: DAYS_TO_SHOW }, (_, i) => addDays(startOfToday(), i));

  async function handleConfirm(e) {
    e.preventDefault();
    setStatus('booking');
    setErrorMsg('');
    try {
      await eventTypeService.createBooking(username, slug, {
        ...guest,
        startTime: selectedSlot.start,
      });
      setStatus('done');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Erro ao confirmar agendamento');
      setStatus('error');
      // horário pode ter sido ocupado nesse meio tempo — recarrega os slots
      eventTypeService
        .getAvailability(username, slug, format(selectedDate, 'yyyy-MM-dd'))
        .then(setSlots);
      setSelectedSlot(null);
    }
  }

  if (!eventType) return null;

  if (status === 'done') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
        <GlassPanel style={{ maxWidth: 420, textAlign: 'center' }}>
          <h1 className="font-display" style={{ fontSize: '1rem', color: '#39FF88', marginBottom: 16 }}>
            Confirmado! ✨
          </h1>
          <p>
            {eventType.title} com {eventType.host_name} em{' '}
            <span className="font-mono" style={{ color: '#3DFDFF' }}>
              {format(new Date(selectedSlot.start), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </span>
          </p>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24, display: 'grid', gap: 20 }}>
      <GlassPanel>
        <h1 className="font-display" style={{ fontSize: '1rem' }}>{eventType.title}</h1>
        <p style={{ marginTop: 10, color: '#9FC9B4' }}>
          com {eventType.host_name} · {eventType.duration_minutes} min
        </p>
        {eventType.description && <p style={{ marginTop: 10 }}>{eventType.description}</p>}
      </GlassPanel>

      {/* Seletor de dia */}
      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Escolha o dia</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {dayOptions.map((day) => {
            const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            return (
              <NeonButton
                key={day.toISOString()}
                $variant={isSelected ? 'green' : 'cyan'}
                onClick={() => setSelectedDate(day)}
                style={{ opacity: isSelected ? 1 : 0.6 }}
              >
                {format(day, "EEE dd/MM", { locale: ptBR })}
              </NeonButton>
            );
          })}
        </div>
      </GlassPanel>

      {/* Slots disponíveis */}
      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Horários disponíveis</h2>
        {slots.length === 0 && <p>Nenhum horário livre nesse dia.</p>}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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
        </div>
      </GlassPanel>

      {/* Formulário de confirmação */}
      {selectedSlot && (
        <GlassPanel>
          <h2 className="font-display" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Seus dados</h2>
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
    </div>
  );
}