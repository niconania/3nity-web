/* global React, BO_StatusBar, BO_Header, BO_Stat, BO_WorkoutCard, BO_TabBar, BO_PixelDot, BO_Sparkline */

const PHONE_W = 360;
const PHONE_H = 760;

window.BO_PhoneFrame = function PhoneFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <div style={{
        width: PHONE_W + 16, height: PHONE_H + 16,
        background: '#0A0B0A', padding: 8,
        border: '1px solid #2A2B2A', position: 'relative',
      }}>
        <div style={{
          width: PHONE_W, height: PHONE_H,
          background: '#1E1F1E', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          color: '#FFF8F0',
        }}>{children}</div>
      </div>
      {label && <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7E7C76',
      }}>{label}</div>}
    </div>
  );
};

// Login / splash
window.BO_LoginScreen = function LoginScreen({ onLogin }) {
  return (
    <BO_PhoneFrame label="01 · LOGIN">
      <BO_StatusBar/>
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 24 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A7EA21',
        }}>BURNON / 09° / AI POWERED</div>

        <div style={{
          position: 'absolute', left: '50%', top: '38%',
          transform: 'translate(-50%, -50%)',
        }}>
          <div style={{
            width: 280, height: 280, borderRadius: 999,
            background: 'radial-gradient(circle, #44FF02 0%, #A7EA21 55%, rgba(68,255,2,0) 95%)',
            filter: 'blur(0.5px)',
          }}/>
          <img src="../../assets/isotype-on-black.png" width={64} height={64}
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', imageRendering: 'pixelated' }} alt=""/>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
            fontSize: 36, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.01em',
          }}>AI POWERED<br/>FITNESS GUIDE</div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#C9C3B9', marginTop: 12, lineHeight: 1.6,
          }}>
            BURN ON · TRAIN ON · 3NITY SYSTEMS<br/>
            VERSION 09° · 2026
          </div>
          <button onClick={onLogin} style={{
            all: 'unset', cursor: 'pointer',
            display: 'block', width: '100%', boxSizing: 'border-box',
            background: '#44FF02', color: '#1E1F1E',
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
            fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '16px 0', marginTop: 24, textAlign: 'center',
          }}>BEGIN SESSION →</button>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#7E7C76', marginTop: 12, textAlign: 'center',
          }}>USE EXISTING ACCOUNT</div>
        </div>
      </div>
    </BO_PhoneFrame>
  );
};

// Home / dashboard
window.BO_HomeScreen = function HomeScreen({ onWorkout }) {
  const [tab, setTab] = useState(0);
  return (
    <BO_PhoneFrame label="02 · HOME">
      <BO_StatusBar/>
      <BO_Header kicker="BURNON / 09°" title={<>HELLO,<br/>SARA.</>}/>
      <div style={{ flex: 1, overflow: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <BO_Stat label="STREAK" value="09" unit="DAYS" accent/>
          <BO_Stat label="KCAL TODAY" value="412"/>
          <BO_Stat label="HRV" value="68" unit="MS"/>
        </div>

        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#7E7C76', marginBottom: 8, display: 'flex', justifyContent: 'space-between',
          }}><span>WEEKLY OUTPUT</span><span style={{ color: '#44FF02' }}>+12% / 09°</span></div>
          <BO_Sparkline/>
        </div>

        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#7E7C76', marginBottom: 8,
          }}>TODAY · TAILORED BY AI</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <BO_WorkoutCard idx={1} title="ZONE 2 · ENDURANCE" kind="RUN" dur="45 MIN" onClick={onWorkout} active/>
            <BO_WorkoutCard idx={2} title="UPPER PUSH" kind="STRENGTH" dur="32 MIN"/>
            <BO_WorkoutCard idx={3} title="BREATH RESET" kind="MOBILITY" dur="08 MIN"/>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
          {Array.from({ length: 9 }).map((_, i) => <BO_PixelDot key={i} on={i < 6}/>)}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7E7C76', marginLeft: 8,
          }}>6/9 GOAL</span>
        </div>
      </div>
      <BO_TabBar active={tab} onChange={setTab}/>
    </BO_PhoneFrame>
  );
};

// Active workout
window.BO_WorkoutScreen = function WorkoutScreen({ onBack }) {
  return (
    <BO_PhoneFrame label="03 · WORKOUT">
      <BO_StatusBar/>
      <div style={{ padding: '8px 18px 16px', borderBottom: '1px solid #2A2B2A', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          all: 'unset', cursor: 'pointer',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFF8F0',
        }}>← EXIT</button>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A7EA21',
        }}>SESSION / 01°</div>
      </div>
      <div style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: 28, lineHeight: 0.95, textTransform: 'uppercase',
        }}>ZONE 2<br/>ENDURANCE</div>

        <div style={{
          background: '#0F100F', border: '1px solid #2A2B2A',
          padding: 18, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -40, top: -40,
            width: 160, height: 160, borderRadius: 999,
            background: 'radial-gradient(circle, #44FF02 0%, rgba(68,255,2,0) 70%)',
          }}/>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7E7C76',
          }}>ELAPSED</div>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: 90, lineHeight: 1, color: '#44FF02' }}>23:42</div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7E7C76', marginTop: 4,
          }}>OF 45:00 · 53%</div>
          <div style={{ marginTop: 10, height: 6, background: '#2A2B2A', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: '53%', background: '#44FF02' }}/>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <BO_Stat label="HEART" value="142" unit="BPM"/>
          <BO_Stat label="PACE" value="5:32" unit="/KM"/>
          <BO_Stat label="ZONE" value="2" accent/>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 'auto' }}>
          <button style={{
            all: 'unset', cursor: 'pointer', textAlign: 'center',
            padding: '16px 0', border: '1px solid #FFF8F0',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFF8F0',
          }}>PAUSE</button>
          <button style={{
            all: 'unset', cursor: 'pointer', textAlign: 'center',
            padding: '16px 0', background: '#DC0073', color: '#FFF8F0',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>END · LOG</button>
        </div>
      </div>
    </BO_PhoneFrame>
  );
};

// AI coach (chat)
window.BO_CoachScreen = function CoachScreen() {
  const [tab, setTab] = useState(2);
  return (
    <BO_PhoneFrame label="04 · AI COACH">
      <BO_StatusBar/>
      <BO_Header kicker="BURNON / AI / 09°" title="COACH"/>
      <div style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="../../assets/logo-isotype-green.png" width={20} height={20} style={{ imageRendering: 'pixelated' }}/>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A7EA21' }}>SYSTEM 09° · ONLINE</div>
        </div>

        <div style={{ background: '#0F100F', border: '1px solid #2A2B2A', padding: 14 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7E7C76', marginBottom: 6 }}>09:09 · COACH</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.5, color: '#FFF8F0' }}>
            HRV is +6% vs your 7-day median. Today is a green day. I've adjusted Zone-2 to 45 min and added a breath reset at the end.
          </div>
        </div>

        <div style={{ background: '#44FF02', color: '#1E1F1E', padding: 14, alignSelf: 'flex-end', maxWidth: '85%' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>09:10 · YOU</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.5 }}>
            Knee feels off. Swap to bike?
          </div>
        </div>

        <div style={{ background: '#0F100F', border: '1px solid #2A2B2A', padding: 14 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7E7C76', marginBottom: 6 }}>09:10 · COACH</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.5, color: '#FFF8F0' }}>
            Done. 50 min indoor bike, same target HR. Logged.
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '4px 8px', background: '#1E1F1E', color: '#A7EA21', border: '1px solid #2A2B2A' }}>BIKE · 50 MIN</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '4px 8px', background: '#1E1F1E', color: '#A7EA21', border: '1px solid #2A2B2A' }}>HR 132</span>
          </div>
        </div>

        <div style={{
          marginTop: 'auto', display: 'flex', gap: 8,
          border: '1px solid #2A2B2A', padding: 10,
        }}>
          <input placeholder="ASK COACH..." style={{
            all: 'unset', flex: 1, color: '#FFF8F0',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em',
          }}/>
          <button style={{
            all: 'unset', cursor: 'pointer', background: '#44FF02', color: '#1E1F1E',
            padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>SEND →</button>
        </div>
      </div>
      <BO_TabBar active={tab} onChange={()=>{}}/>
    </BO_PhoneFrame>
  );
};
