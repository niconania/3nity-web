/* global React */
const { useState, useEffect } = React;

window.MetaTag = function MetaTag({ children, align = 'left', accent = false, style = {} }) {
  return (
    <div style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
      textAlign: align,
      color: accent ? '#44FF02' : 'currentColor',
      ...style,
    }}>{children}</div>
  );
};

window.Isotype = function Isotype({ size = 64, color = '#1E1F1E', src }) {
  // Pixel cruciform - rendered from PNG so it stays canonical
  const fileMap = {
    '#1E1F1E': '../../assets/isotype-on-cream.png',
    '#FFF8F0': '../../assets/isotype-on-black.png',
    '#44FF02': '../../assets/logo-isotype-green.png',
  };
  const file = src || fileMap[color] || '../../assets/logo-isotype-green.png';
  return (
    <img src={file} width={size} height={size}
      style={{ imageRendering: 'pixelated', objectFit: 'contain', display: 'block' }} alt="3nity"/>
  );
};

window.Wordmark = function Wordmark({ size = 64, threeColor = '#44FF02', restColor = '#1E1F1E' }) {
  return (
    <div style={{
      fontFamily: 'VT323, monospace',
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ color: threeColor }}>3</span>
      <span style={{ color: restColor }}>nity</span>
    </div>
  );
};

window.CircleGlyph = function CircleGlyph({ kind = 'solid', size = 28, fg = '#1E1F1E', bg = '#44FF02' }) {
  const base = { width: size, height: size, borderRadius: 999, display: 'inline-block', flex: '0 0 auto' };
  if (kind === 'solid') return <div style={{ ...base, background: bg }}/>;
  if (kind === 'stripe') return (
    <div style={{ ...base, background: `repeating-linear-gradient(45deg, ${bg} 0, ${bg} 4px, ${fg} 4px, ${fg} 8px)` }}/>
  );
  if (kind === 'cross') return (
    <div style={{ ...base, background: fg, position: 'relative', boxShadow: `inset 0 0 0 2px ${bg}` }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: size * 0.55, height: 2, background: bg, transform: 'translate(-50%,-50%)' }}/>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: size * 0.55, background: bg, transform: 'translate(-50%,-50%)' }}/>
    </div>
  );
  return null;
};

window.RadialSun = function RadialSun({ size = 480, color = '#44FF02', mid = '#A7EA21' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: `radial-gradient(circle at 50% 50%, ${color} 0%, ${mid} 55%, ${color} 80%, rgba(68,255,2,0.0) 100%)`,
      filter: 'blur(0.5px)',
    }}/>
  );
};

// 8×6 grid of black blocks invading from a chosen corner
window.TetrisField = function TetrisField({ pattern = 'topright', cols = 8, rows = 6, fg = '#1E1F1E', bg = 'transparent', accent = null }) {
  // patterns: arrays of [colStart, rowStart, colSpan, rowSpan, color?]
  const patterns = {
    topright: [
      [5, 1, 3, 2], [7, 3, 2, 2], [5, 4, 1, 2], [1, 5, 2, 2], [3, 6, 1, 1],
    ],
    bottomleft: [
      [1, 1, 2, 2], [3, 3, 2, 2], [1, 4, 1, 3], [4, 5, 3, 2], [7, 6, 2, 1],
    ],
    spread: [
      [1, 1, 2, 2], [4, 2, 3, 1], [6, 4, 3, 3], [2, 5, 2, 2], [5, 1, 1, 1],
    ],
    bigblob: [
      [4, 1, 4, 3], [6, 4, 3, 2], [3, 4, 3, 3], [1, 2, 2, 2], [1, 6, 2, 1],
    ],
  };
  const blocks = patterns[pattern] || patterns.topright;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      width: '100%', height: '100%', background: bg,
    }}>
      {blocks.map((b, i) => (
        <div key={i} style={{
          gridColumn: `${b[0]} / span ${b[2]}`,
          gridRow: `${b[1]} / span ${b[3]}`,
          background: b[4] || fg,
        }}/>
      ))}
      {accent && (
        <div style={{
          gridColumn: `${accent[0]} / span ${accent[2]}`,
          gridRow: `${accent[1]} / span ${accent[3]}`,
          background: accent[4],
        }}/>
      )}
    </div>
  );
};

window.PosterFrame = function PosterFrame({ children, surface = 'black', width = 540, height = 720, style = {} }) {
  const surfaces = {
    black: { background: '#1E1F1E', color: '#FFF8F0' },
    cream: { background: '#FFF8F0', color: '#1E1F1E' },
    lime:  { background: '#A7EA21', color: '#1E1F1E' },
    cobalt:{ background: '#1B2CC1', color: '#FFF8F0' },
    magenta:{ background: '#DC0073', color: '#FFF8F0' },
  };
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      ...surfaces[surface],
      ...style,
    }}>{children}</div>
  );
};
