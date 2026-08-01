import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GlassPanel } from '../components/GlassPanel';
import { NeonButton } from '../components/NeonButton';
import { FormGroup, Label, Input } from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { eventTypeService } from '../services/eventTypeService';
import { bookingService } from '../services/bookingService';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [eventTypes, setEventTypes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', durationMinutes: 30, description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [types, myBookings] = await Promise.all([
      eventTypeService.listMine(),
      bookingService.listMine(),
    ]);
    setEventTypes(types);
    setBookings(myBookings);
    setLoading(false);
  }

  async function handleCreateEventType(e) {
    e.preventDefault();
    await eventTypeService.create(newEvent);
    setNewEvent({ title: '', durationMinutes: 30, description: '' });
    loadData();
  }

  async function handleDeleteEventType(id) {
    await eventTypeService.remove(id);
    loadData();
  }

  async function handleCancelBooking(id) {
    await bookingService.cancel(id);
    loadData();
  }

  if (loading) return null;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24, display: 'grid', gap: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="font-display" style={{ fontSize: '1.1rem' }}>
          Olá, {user.name.split(' ')[0]} 🌿
        </h1>
        <NeonButton $variant="magenta" onClick={logout}>Sair</NeonButton>
      </header>

      {/* Link público */}
      <GlassPanel $padding={3}>
        <p className="font-mono" style={{ fontSize: '1.1rem', color: '#3DFDFF' }}>
          Sua página pública: {window.location.origin}/{user.username}/[slug-do-evento]
        </p>
      </GlassPanel>

      {/* Criar novo tipo de evento */}
      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
          Novo tipo de evento
        </h2>
        <form onSubmit={handleCreateEventType} style={{ display: 'grid', gap: 14 }}>
          <FormGroup>
            <Label>Título</Label>
            <Input
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Ex: Call de 30min"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Duração (minutos)</Label>
            <Input
              type="number"
              min={5}
              max={480}
              value={newEvent.durationMinutes}
              onChange={(e) => setNewEvent({ ...newEvent, durationMinutes: Number(e.target.value) })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Descrição (opcional)</Label>
            <Input
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </FormGroup>
          <NeonButton type="submit" $variant="green">Criar</NeonButton>
        </form>
      </GlassPanel>

      {/* Lista de tipos de evento */}
      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
          Meus tipos de evento
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {eventTypes.length === 0 && <p>Nenhum tipo de evento criado ainda.</p>}
          {eventTypes.map((et) => (
            <div
              key={et.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
              }}
            >
              <div>
                <strong>{et.title}</strong>
                <span style={{ marginLeft: 10, color: '#9FC9B4', fontSize: '0.85rem' }}>
                  {et.duration_minutes} min · /{user.username}/{et.slug}
                </span>
              </div>
              <NeonButton $variant="magenta" onClick={() => handleDeleteEventType(et.id)}>
                Excluir
              </NeonButton>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Lista de agendamentos */}
      <GlassPanel>
        <h2 className="font-display" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
          Próximos agendamentos
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {bookings.length === 0 && <p>Nenhum agendamento ainda.</p>}
          {bookings
            .filter((b) => b.status === 'confirmed')
            .map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                }}
              >
                <div>
                  <strong>{b.guest_name}</strong> — {b.event_title}
                  <div className="font-mono" style={{ color: '#3DFDFF' }}>
                    {format(new Date(b.start_time), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </div>
                </div>
                <NeonButton $variant="magenta" onClick={() => handleCancelBooking(b.id)}>
                  Cancelar
                </NeonButton>
              </div>
            ))}
        </div>
      </GlassPanel>
    </div>
  );
}