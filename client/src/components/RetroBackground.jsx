import styled, { keyframes, css } from 'styled-components';

const breathe = keyframes`
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.4; }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.75; transform: scale(1.12); }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

const TunnelSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const GridGroup = styled.g`
  animation: ${breathe} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AccentShape = styled.polyline`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${pulseGlow} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.02) 0px,
    rgba(255, 255, 255, 0.02) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: ${flicker} 5s ease-in-out infinite;
  mix-blend-mode: overlay;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.3;
  }
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 32%, rgba(11, 26, 20, 0.94) 100%);
`;

/* --- Geometria do túnel --- */

const W = 1000;
const H = 1000;
const CX = W / 2;
const CY = H / 2;

function buildPerimeterPoints(divisionsPerEdge) {
  const pts = [];
  const step = W / divisionsPerEdge;

  for (let x = 0; x < W; x += step) pts.push([x, 0]);
  for (let y = 0; y < H; y += step) pts.push([W, y]);
  for (let x = W; x > 0; x -= step) pts.push([x, H]);
  for (let y = H; y > 0; y -= step) pts.push([0, y]);

  return pts;
}

const RING_SCALES = [1, 0.8, 0.63, 0.49, 0.37, 0.28, 0.2, 0.14, 0.09, 0.05];

/* --- Presets de intensidade: mesmo layout, densidade/opacidade diferentes --- */
const INTENSITY_PRESETS = {
  full: {
    rayDivisions: 7,
    gridOpacity: 0.16,
    accentOpacity: 0.26,
    showScanlines: true,
    showAccents: true,
    vignetteInner: '32%',
  },
  subtle: {
    rayDivisions: 5,       // menos raios -> grid mais espaçado
    gridOpacity: 0.07,     // bem mais apagado, quase textura
    accentOpacity: 0.12,
    showScanlines: false,  // remove o ruído extra de scanline em telas de leitura
    showAccents: true,
    vignetteInner: '45%',  // foco central maior, cantos mais escuros
  },
};

export function RetroBackground({ intensity = 'full' }) {
  const preset = INTENSITY_PRESETS[intensity] || INTENSITY_PRESETS.full;
  const rayPoints = buildPerimeterPoints(preset.rayDivisions);
  const gridColor = `rgba(61, 253, 255, ${preset.gridOpacity})`;

  return (
    <Wrapper aria-hidden="true">
      <TunnelSvg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="vanishGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`rgba(61, 253, 255, ${preset.gridOpacity * 2.5})`} />
            <stop offset="100%" stopColor="rgba(61, 253, 255, 0)" />
          </radialGradient>
        </defs>

        <GridGroup>
          {rayPoints.map(([x, y], i) => (
            <line key={`ray-${i}`} x1={CX} y1={CY} x2={x} y2={y} stroke={gridColor} strokeWidth="1" />
          ))}

          {RING_SCALES.map((scale, i) => {
            const w = W * scale;
            const h = H * scale;
            return (
              <rect
                key={`ring-${i}`}
                x={CX - w / 2}
                y={CY - h / 2}
                width={w}
                height={h}
                fill="none"
                stroke={gridColor}
                strokeWidth="1"
              />
            );
          })}
        </GridGroup>

        <circle cx={CX} cy={CY} r="80" fill="url(#vanishGlow)" />

        {preset.showAccents && (
          <>
            <AccentShape
              points="70,150 70,200 115,200 115,235"
              fill="none" stroke="#39FF88" strokeWidth="9"
              strokeOpacity={preset.accentOpacity} strokeLinejoin="round"
              $duration={8} $delay={0}
            />
            <AccentShape
              points="930,170 930,215 885,215"
              fill="none" stroke="#FF6EC7" strokeWidth="9"
              strokeOpacity={preset.accentOpacity} strokeLinejoin="round"
              $duration={9} $delay={1.3}
            />
            <AccentShape
              points="140,860 140,810 180,810"
              fill="none" stroke="#3DFDFF" strokeWidth="9"
              strokeOpacity={preset.accentOpacity} strokeLinejoin="round"
              $duration={10} $delay={2.2}
            />
            <AccentShape
              points="860,840 860,800"
              fill="none" stroke="#FFD166" strokeWidth="9"
              strokeOpacity={preset.accentOpacity} strokeLinejoin="round"
              $duration={9.5} $delay={0.7}
            />
          </>
        )}
      </TunnelSvg>

      {preset.showScanlines && <Scanlines />}
      <Vignette style={{
        background: `radial-gradient(circle at center, transparent ${preset.vignetteInner}, rgba(11, 26, 20, 0.94) 100%)`,
      }} />
    </Wrapper>
  );
}