import { GlassPanel } from './components/GlassPanel';
import { NeonButton } from './components/NeonButton';

function App() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
      <GlassPanel style={{ maxWidth: 420, textAlign: 'center', display: 'grid', gap: 24 }}>
        <h1 className="font-display" style={{ fontSize: '1.1rem' }}>AgendaGlass</h1>
        <p style={{ color: 'inherit' }}>
          Preview do design system: liquid glass + solarpunk neon + retro gaming.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <NeonButton $variant="green">Agendar</NeonButton>
          <NeonButton $variant="cyan">Entrar</NeonButton>
          <NeonButton $variant="magenta">Cancelar</NeonButton>
        </div>
      </GlassPanel>
    </div>
  );
}

export default App;