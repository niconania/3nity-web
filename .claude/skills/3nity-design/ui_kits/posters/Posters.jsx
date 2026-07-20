/* global React, MetaTag, Isotype, Wordmark, CircleGlyph, RadialSun, TetrisField, PosterFrame */

// POSTER 1 — Energy: lime fond + black tetris invasion
window.PosterEnergy = function PosterEnergy({ width = 540, height = 720 }) {
  return (
    <PosterFrame surface="lime" width={width} height={height}>
      {/* Tetris invasion */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <TetrisField pattern="topright" fg="#1E1F1E" />
      </div>

      {/* Top meta */}
      <div style={{ position: 'absolute', top: 28, left: 32, color: '#1E1F1E' }}>
        <MetaTag>3 FRIENDS &amp; 1 MACHINE</MetaTag>
      </div>
      <div style={{ position: 'absolute', top: 28, right: 32, color: '#1E1F1E' }}>
        <MetaTag align="right">3NITY / 09°</MetaTag>
      </div>

      {/* Center isotype + headline */}
      <div style={{ position: 'absolute', left: 32, top: 220, color: '#1E1F1E' }}>
        <Isotype size={72} color="#1E1F1E"/>
      </div>

      <div style={{
        position: 'absolute', left: 32, bottom: 180,
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
        fontSize: 56, lineHeight: 0.92, letterSpacing: '-0.01em',
        textTransform: 'uppercase', color: '#1E1F1E', maxWidth: width - 220,
      }}>
        GOOD<br/>IDEAS<br/>START
      </div>

      {/* Wordmark + glyphs bottom */}
      <div style={{
        position: 'absolute', left: 32, bottom: 56,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Wordmark size={48} threeColor="#1E1F1E" restColor="#1E1F1E"/>
        <CircleGlyph kind="cross" size={26} fg="#1E1F1E" bg="#A7EA21"/>
        <CircleGlyph kind="stripe" size={26} fg="#1E1F1E" bg="#A7EA21"/>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 32, color: '#1E1F1E' }}>
        <MetaTag>PRINT LIKE US IN 3 STEPS</MetaTag>
      </div>
    </PosterFrame>
  );
};

// POSTER 2 — Editorial: cream + isotype + meta blocks
window.PosterEditorial = function PosterEditorial({ width = 540, height = 720 }) {
  return (
    <PosterFrame surface="cream" width={width} height={height}>
      {/* Hero photo placeholder — using brand reference */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(../../assets/poster-hero-shot-editorial.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.18,
      }}/>

      {/* Top corners */}
      <div style={{ position: 'absolute', top: 32, left: 32 }}>
        <MetaTag>HERO SHOT<br/>EDITORIAL</MetaTag>
      </div>
      <div style={{ position: 'absolute', top: 32, right: 32 }}>
        <MetaTag align="right">3NITY / 09°<br/>YEAR · 2026</MetaTag>
      </div>

      {/* Centered isotype */}
      <div style={{
        position: 'absolute', left: '50%', top: '54%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
      }}>
        <Isotype size={120} color="#1E1F1E"/>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, letterSpacing: '0.22em',
          textTransform: 'uppercase', textAlign: 'center',
        }}>
          HIGH-END LUXURY<br/>VISUAL EXPERIMENT
        </div>
      </div>

      {/* Bottom: wordmark + glyphs */}
      <div style={{
        position: 'absolute', left: 32, bottom: 32,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        width: width - 64,
      }}>
        <Wordmark size={48} threeColor="#1E1F1E" restColor="#1E1F1E"/>
        <div style={{ display: 'flex', gap: 10 }}>
          <CircleGlyph kind="solid" size={20} bg="#1E1F1E"/>
          <CircleGlyph kind="stripe" size={20} fg="#FFF8F0" bg="#1E1F1E"/>
          <CircleGlyph kind="cross" size={20} fg="#1E1F1E" bg="#FFF8F0"/>
        </div>
      </div>
    </PosterFrame>
  );
};

// POSTER 3 — Lab: black fond + radial sun + meta annotation
window.PosterLab = function PosterLab({ width = 540, height = 720 }) {
  return (
    <PosterFrame surface="black" width={width} height={height}>
      {/* Sun */}
      <div style={{
        position: 'absolute', left: '50%', top: '46%',
        transform: 'translate(-50%, -50%)',
      }}>
        <RadialSun size={Math.min(width, height) * 0.85}/>
      </div>

      {/* Top metadata */}
      <div style={{ position: 'absolute', top: 28, left: 32, color: '#FFF8F0' }}>
        <MetaTag>3NITY NACE DE UN IMPULSO,<br/>DE SOLUCIONAR SIN TENER<br/>QUE PEDIRLO.</MetaTag>
      </div>
      <div style={{ position: 'absolute', top: 28, right: 32, color: '#FFF8F0' }}>
        <MetaTag align="right">BUSCAMOS CREAR COSAS QUE<br/>LAS PERSONAS NO QUIEREN,<br/>SINO QUE LAS NECESITAN.</MetaTag>
      </div>

      {/* Wordmark over sun */}
      <div style={{
        position: 'absolute', left: 32, bottom: 240,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <Wordmark size={64} threeColor="#44FF02" restColor="#1E1F1E"/>
        <CircleGlyph kind="cross" size={24} fg="#44FF02" bg="#1E1F1E"/>
        <CircleGlyph kind="stripe" size={24} fg="#1E1F1E" bg="#44FF02"/>
      </div>

      {/* Bottom names + isotype */}
      <div style={{ position: 'absolute', left: 32, bottom: 28 }}>
        <Isotype size={36} color="#FFF8F0"/>
      </div>
      <div style={{
        position: 'absolute', right: 32, bottom: 36,
        display: 'flex', gap: 28, color: '#FFF8F0',
      }}>
        <MetaTag>SARA</MetaTag>
        <MetaTag>JOSÉ</MetaTag>
        <MetaTag>NICOLA</MetaTag>
      </div>
    </PosterFrame>
  );
};

// POSTER 4 — Disrupt: magenta + tetris
window.PosterDisrupt = function PosterDisrupt({ width = 540, height = 720 }) {
  return (
    <PosterFrame surface="black" width={width} height={height}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <TetrisField pattern="bigblob" fg="#DC0073" />
      </div>
      <div style={{ position: 'absolute', top: 28, right: 32, color: '#DC0073' }}>
        <MetaTag align="right">DON'T BE A SILLY<br/>SWIM REELS</MetaTag>
      </div>
      <div style={{ position: 'absolute', top: 200, left: 32, transform: 'rotate(-90deg)', transformOrigin: 'top left', color: '#DC0073' }}>
        <MetaTag>MARKETING</MetaTag>
      </div>
      <div style={{ position: 'absolute', bottom: 36, right: 32, color: '#FFF8F0', textAlign: 'right' }}>
        <MetaTag align="right" style={{ color: '#DC0073' }}>PRINT WITH 3NITY</MetaTag>
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: 32 }}>
        <Isotype size={36} color="#FFF8F0"/>
      </div>
    </PosterFrame>
  );
};
