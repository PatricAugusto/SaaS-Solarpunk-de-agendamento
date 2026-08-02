import styled, { keyframes } from 'styled-components';

const gridScroll = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 64px; }
`;

const floatOrb = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(20px, -30px, 0) scale(1.08); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.5; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: ${({ theme }) => theme.colors.background};
`;

/* Grid de perspectiva, tipo "chão synthwave" */
const Grid = styled.div`
  position: absolute;
  inset: -20% 0 0 0;
  height: 140%;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.glassBorderHighlight} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.glassBorderHighlight} 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.18;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
  animation: ${gridScroll} 6s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Orbs neon flutuantes, desfocados, dando profundidade */
const Orb = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(60px);
  opacity: 0.35;
  animation: ${floatOrb} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Scanline sutil de CRT por cima de tudo */
const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.025) 0px,
    rgba(255, 255, 255, 0.025) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: ${flicker} 4s ease-in-out infinite;
  mix-blend-mode: overlay;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.35;
  }
`;

/* Vinheta pra escurecer as bordas e focar o conteúdo central */
const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 40%, rgba(11, 26, 20, 0.9) 100%);
`;

export function RetroBackground() {
  return (
    <Wrapper aria-hidden="true">
      <Grid />
      <Orb $size={280} $x={10} $y={15} $color="#39FF88" $duration={9} $delay={0} />
      <Orb $size={220} $x={75} $y={10} $color="#3DFDFF" $duration={11} $delay={1.5} />
      <Orb $size={260} $x={65} $y={70} $color="#FF6EC7" $duration={10} $delay={3} />
      <Scanlines />
      <Vignette />
    </Wrapper>
  );
}