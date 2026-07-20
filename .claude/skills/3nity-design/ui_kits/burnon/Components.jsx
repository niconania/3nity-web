/* global React */
const { useState } = React;

window.BO_StatusBar = function StatusBar({ time = '09:09' }) {
  return (
    <div style={{
      height: 44, padding: '0 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
      letterSpacing: '0.05em', color: '#FFF8F0', background: 'transparent',
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 10, letterSpacing: '0.18em' }}>5G</span>
        <div style={{ width: 22, height: 10, border: '1px solid #FFF8F0', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 1, width: '70%', background: '#44FF02' }}/>
        </div>
      </div>
    </div>
  );
};

window.BO_Header = function Header({ kicker = 'BURNON / 09°', title }) {
  return (
    <div style={{ padding: '8px 18px 16px', borderBottom: '1px solid #2A2B2A' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A7EA21',
        }}>{kicker}</div>
        <img src="../../assets/logo-isotype-green.png" width={22} height={22}
             style={{ imageRendering: 'pixelated' }} alt=""/>
      </div>
      {title && (
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: 32, lineHeight: 0.95, letterSpacing: '-0.01em',
          textTransform: 'uppercase', marginTop: 12, color: '#FFF8F0',
        }}>{title}</div>
      )}
    </div>
  );
};

window.BO_Stat = function Stat({ label, value, unit, accent = false }) {
  return (
    <div style={{
      flex: 1, padding: 14, border: '1px solid #2A2B2A',
      background: accent ? '#44FF02' : 'transparent',
      color: accent ? '#1E1F1E' : '#FFF8F0',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: accent ? '#1E1F1E' : '#7E7C76',
      }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 44, lineHeight: 1 }}>{value}</div>
        {unit && <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: accent ? '#1E1F1E' : '#7E7C76',
        }}>{unit}</div>}
      </div>
    </div>
  );
};

window.BO_WorkoutCard = function WorkoutCard({ idx, title, kind, dur, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      all: 'unset', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14, padding: 14,
      border: '1px solid #2A2B2A',
      background: active ? '#44FF02' : 'transparent',
      color: active ? '#1E1F1E' : '#FFF8F0',
      width: '100%', boxSizing: 'border-box',
    }}>
      <div style={{
        fontFamily: 'VT323, monospace', fontSize: 36, lineHeight: 1,
        color: active ? '#1E1F1E' : '#44FF02', minWidth: 36,
      }}>{String(idx).padStart(2, '0')}</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: 16, textTransform: 'uppercase', letterSpacing: '-0.005em',
        }}>{title}</div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: active ? '#1E1F1E' : '#7E7C76', marginTop: 2,
        }}>{kind} · {dur}</div>
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 18,
        color: active ? '#1E1F1E' : '#FFF8F0',
      }}>→</div>
    </button>
  );
};

window.BO_TabBar = function TabBar({ active, onChange }) {
  const tabs = ['HOME', 'TRAIN', 'AI', 'YOU'];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: '1px solid #2A2B2A', background: '#1E1F1E',
    }}>
      {tabs.map((t, i) => {
        const on = active === i;
        return (
          <button key={t} onClick={() => onChange(i)} style={{
            all: 'unset', cursor: 'pointer',
            padding: '14px 0 16px', textAlign: 'center',
            background: on ? '#44FF02' : 'transparent',
            color: on ? '#1E1F1E' : '#7E7C76',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, letterSpacing: '0.22em', fontWeight: 500,
            }}>{t}</div>
          </button>
        );
      })}
    </div>
  );
};

window.BO_PixelDot = function PixelDot({ on = true }) {
  return <span style={{
    display: 'inline-block', width: 6, height: 6,
    background: on ? '#44FF02' : '#2A2B2A',
  }}/>;
};

window.BO_Sparkline = function Sparkline({ values = [4,7,5,9,6,11,8,10,7,12,9,14], height = 60 }) {
  const max = Math.max(...values);
  const w = 100 / (values.length - 1);
  const pts = values.map((v, i) => `${i * w},${100 - (v / max) * 100}`).join(' ');
  return (
    <div style={{ position: 'relative', height, border: '1px solid #2A2B2A', padding: 8 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <polyline fill="none" stroke="#44FF02" strokeWidth="1.5" vectorEffect="non-scaling-stroke" points={pts}/>
        {values.map((v, i) => (
          <rect key={i} x={i * w - 1} y={100 - (v / max) * 100 - 1} width="2" height="2" fill="#44FF02"/>
        ))}
      </svg>
    </div>
  );
};
