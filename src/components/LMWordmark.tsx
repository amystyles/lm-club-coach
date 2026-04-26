interface Props {
  tagline?: string;
}

export default function LMWordmark({ tagline = 'Push the standard. Lead your squad.' }: Props) {
  return (
    <div className="lm-animate" style={{ animationDelay: '0ms', textAlign: 'center', marginBottom: '48px' }}>

      {/* LES MILLS eyebrow */}
      <p style={{
        color: 'rgba(255,255,255,0.55)',
        fontSize: '13px',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        letterSpacing: '0.55em',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        Les Mills
      </p>

      {/* LM | CLUB COACH lockup */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '13px',
        marginBottom: '18px',
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '68px',
          lineHeight: 0.9,
          color: '#fff',
          letterSpacing: '-0.02em',
        }}>
          LM
        </span>

        <div style={{
          width: '4px',
          height: '50px',
          background: 'linear-gradient(180deg, #00FF63 0%, rgba(0,255,99,0.5) 100%)',
          borderRadius: '2px',
          flexShrink: 0,
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2px',
        }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '26px',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.90)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}>
            Club
          </span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '26px',
            lineHeight: 1,
            color: '#00FF63',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}>
            Coach
          </span>
        </div>
      </div>

      {/* Tagline */}
      {tagline && (
        <p style={{
          color: 'rgba(255,255,255,0.32)',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.02em',
          lineHeight: 1.5,
        }}>
          {tagline}
        </p>
      )}
    </div>
  );
}
