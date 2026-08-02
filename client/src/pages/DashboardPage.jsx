import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GlassPanel } from "../components/GlassPanel";
import { NeonButton } from "../components/NeonButton";
import { FormGroup, Label, Input } from "../components/FormField";
import { PageContainer } from "../components/PageContainer";
import { DashboardHeader } from "../components/DashboardHeader";
import { Loader } from "../components/Loader";
import { EmptyState } from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { eventTypeService } from "../services/eventTypeService";
import { bookingService } from "../services/bookingService";
import { RetroBackground } from "../components/RetroBackground";
import styled from "styled-components";
import { media } from "../styles/media";

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

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [eventTypes, setEventTypes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    durationMinutes: 30,
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

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
    setCreating(true);
    try {
      await eventTypeService.create(newEvent);
      setNewEvent({ title: "", durationMinutes: 30, description: "" });
      await loadData();
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteEventType(id) {
    await eventTypeService.remove(id);
    loadData();
  }

  async function handleCancelBooking(id) {
    await bookingService.cancel(id);
    loadData();
  }

  if (loading) {
    return (
      <>
        <RetroBackground intensity="subtle" />
        <PageContainer>
          <Loader label="Carregando seu painel..." />
        </PageContainer>
      </>
    );
  }

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

  return (
    <>
      <RetroBackground intensity="subtle" />
      <PageContainer>
        <DashboardHeader userName={user.name} onLogout={logout} />

        <GlassPanel $padding={3}>
          <p
            className="font-mono"
            style={{
              fontSize: "1.05rem",
              color: "#3DFDFF",
              wordBreak: "break-all",
            }}
          >
            Sua página pública: {window.location.origin}/{user.username}
            /[slug-do-evento]
          </p>
        </GlassPanel>

        <GlassPanel>
          <h2
            className="font-display"
            style={{ fontSize: "0.9rem", marginBottom: 16 }}
          >
            Novo tipo de evento
          </h2>
          <form
            onSubmit={handleCreateEventType}
            style={{ display: "grid", gap: 14 }}
          >
            <FormGroup>
              <Label>Título</Label>
              <Input
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
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
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    durationMinutes: Number(e.target.value),
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Descrição (opcional)</Label>
              <Input
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </FormGroup>
            <NeonButton type="submit" $variant="green" disabled={creating}>
              {creating ? "Criando..." : "Criar"}
            </NeonButton>
          </form>
        </GlassPanel>

        <GlassPanel>
          <h2
            className="font-display"
            style={{ fontSize: "0.9rem", marginBottom: 16 }}
          >
            Meus tipos de evento
          </h2>
          {eventTypes.length === 0 ? (
            <EmptyState
              icon="🗓️"
              title="Nenhum evento ainda"
              subtitle="Crie seu primeiro tipo de evento acima para gerar sua página pública de agendamento."
            />
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {eventTypes.map((et) => (
                <ListRow key={et.id}>
                  <div>
                    <strong>{et.title}</strong>
                    <span
                      style={{
                        marginLeft: 10,
                        color: "#9FC9B4",
                        fontSize: "0.85rem",
                      }}
                    >
                      {et.duration_minutes} min · /{user.username}/{et.slug}
                    </span>
                  </div>
                  <NeonButton
                    $variant="magenta"
                    onClick={() => handleDeleteEventType(et.id)}
                  >
                    Excluir
                  </NeonButton>
                </ListRow>
              ))}
            </div>
          )}
        </GlassPanel>

        <GlassPanel>
          <h2
            className="font-display"
            style={{ fontSize: "0.9rem", marginBottom: 16 }}
          >
            Próximos agendamentos
          </h2>
          {confirmedBookings.length === 0 ? (
            <EmptyState
              icon="📭"
              title="Nenhum agendamento ainda"
              subtitle="Assim que alguém marcar um horário com você, ele aparece aqui."
            />
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {confirmedBookings.map((b) => (
                <ListRow key={b.id}>
                  <div>
                    <strong>{b.guest_name}</strong> — {b.event_title}
                    <div className="font-mono" style={{ color: "#3DFDFF" }}>
                      {format(new Date(b.start_time), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </div>
                  </div>
                  <NeonButton
                    $variant="magenta"
                    onClick={() => handleCancelBooking(b.id)}
                  >
                    Cancelar
                  </NeonButton>
                </ListRow>
              ))}
            </div>
          )}
        </GlassPanel>
      </PageContainer>
    </>
  );
}
