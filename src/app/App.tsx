import { useEffect, useState } from 'react';

export default function App() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [uptime, setUptime] = useState(273600); // 3 days, 4 hours = 273600 seconds

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2
    }));
    setParticles(particleArray);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000);

    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}D ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="relative size-full min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* Animated Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/30 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
          }}
        />
      ))}

      {/* Radial Gradient Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 5, 0.3) 50%, #050505 100%)`
        }}
      />

      {/* CRT Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 4px
          )`,
          animation: 'scanline 8s linear infinite'
        }}
      />

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridPulse 4s ease-in-out infinite'
        }}
      />

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 text-cyan-400/40 font-mono text-4xl pointer-events-none">
        ┌
      </div>
      <div className="absolute top-8 right-8 text-cyan-400/40 font-mono text-4xl pointer-events-none">
        ┐
      </div>
      <div className="absolute bottom-8 left-8 text-cyan-400/40 font-mono text-4xl pointer-events-none">
        └
      </div>
      <div className="absolute bottom-8 right-8 text-cyan-400/40 font-mono text-4xl pointer-events-none">
        ┘
      </div>

      {/* Terminal-style Info Panel */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 border border-cyan-400/20 bg-black/40 backdrop-blur-sm">
        <div
          className="text-cyan-400/60 font-mono text-xs tracking-[0.3em] flex items-center gap-3"
          style={{ fontFamily: '"VT323", monospace', fontSize: '1rem' }}
        >
          <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>SYSTEM ONLINE</span>
          <span className="text-cyan-400/40">|</span>
          <span className="text-magenta-400/60">VERSION 2.0</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-16 px-8 max-w-5xl w-full">

        {/* Hero Text with Glitch Effect */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <h1
              className={`text-center tracking-wider ${glitchActive ? 'glitch' : ''}`}
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                color: '#ffffff',
                textShadow: `
                  0 0 10px rgba(0, 255, 255, 0.9),
                  0 0 20px rgba(0, 255, 255, 0.7),
                  0 0 30px rgba(0, 255, 255, 0.5),
                  0 0 40px rgba(0, 255, 255, 0.3),
                  0 0 60px rgba(255, 0, 255, 0.2)
                `,
                lineHeight: '1.6',
                letterSpacing: '0.1em'
              }}
            >
              SOMETHING IS COMING
            </h1>

            {/* Glitch Layers */}
            {glitchActive && (
              <>
                <h1
                  className="absolute inset-0 text-center tracking-wider opacity-70"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                    color: '#ff00ff',
                    lineHeight: '1.6',
                    letterSpacing: '0.1em',
                    transform: 'translate(-3px, 0)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                  }}
                >
                  SOMETHING IS COMING
                </h1>
                <h1
                  className="absolute inset-0 text-center tracking-wider opacity-70"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                    color: '#00ffff',
                    lineHeight: '1.6',
                    letterSpacing: '0.1em',
                    transform: 'translate(3px, 0)',
                    clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
                  }}
                >
                  SOMETHING IS COMING
                </h1>
              </>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <p
              className="text-cyan-400/60 uppercase tracking-[0.3em] text-sm font-mono flex items-center gap-2"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              INITIALIZING SEQUENCE...
            </p>

          </div>
        </div>

        {/* Progress Bar Section with Enhanced Design */}
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {/* System Status Grid */}
          <div className="grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="px-4 py-2 border border-cyan-400/20 bg-black/30 backdrop-blur-sm">
              <div className="text-cyan-400/40 text-[10px] tracking-widest mb-1">PROGRESS</div>
              <div className="text-cyan-400 tracking-wider" style={{ fontFamily: '"VT323", monospace', fontSize: '1.1rem' }}>30%</div>
            </div>
            <div className="px-4 py-2 border border-magenta-400/20 bg-black/30 backdrop-blur-sm">
              <div className="text-magenta-400/40 text-[10px] tracking-widest mb-1">MEMORY</div>
              <div className="text-magenta-400 tracking-wider" style={{ fontFamily: '"VT323", monospace', fontSize: '1.1rem' }}>1024 MB</div>
            </div>
            <div className="px-4 py-2 border border-green-400/20 bg-black/30 backdrop-blur-sm">
              <div className="text-green-400/40 text-[10px] tracking-widest mb-1">STATUS</div>
              <div className="text-green-400 tracking-wider" style={{ fontFamily: '"VT323", monospace', fontSize: '1.1rem' }}>ACTIVE</div>
            </div>
          </div>

          {/* System Boot Text */}
          <div
            className="text-[#00FF41] text-xs font-mono tracking-widest flex justify-between items-center px-1"
            style={{
              fontFamily: '"VT323", monospace',
              fontSize: '1.1rem',
              letterSpacing: '0.2em'
            }}
          >
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#00FF41] rounded-full animate-pulse" />
              [ 30% ]
            </span>
            <span className="text-[#00FF41]/60">- SYSTEM BOOT</span>
          </div>

          {/* Progress Bar Container */}
          <div
            className="relative w-full h-16 border-2 border-[#00FF41] bg-black/60 backdrop-blur-sm"
            style={{
              boxShadow: `
                0 0 20px rgba(0, 255, 65, 0.4),
                inset 0 0 20px rgba(0, 0, 0, 0.7)
              `
            }}
          >
            {/* Progress Fill - Chunky Segments */}
            <div className="absolute inset-0 flex h-full" style={{ width: '30%' }}>
              <div
                className="h-full relative overflow-hidden"
                style={{
                  width: '100%',
                  background: `linear-gradient(90deg, #00FF41 0%, #00DD35 50%, #00FF41 100%)`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s linear infinite, glow 2s ease-in-out infinite alternate',
                  boxShadow: `
                    0 0 30px rgba(0, 255, 65, 0.7),
                    0 0 60px rgba(0, 255, 65, 0.5),
                    inset 0 0 20px rgba(0, 255, 65, 0.3)
                  `
                }}
              >
                {/* Chunky Segments Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 8%,
                      rgba(0, 0, 0, 0.3) 8%,
                      rgba(0, 0, 0, 0.3) 10%
                    )`
                  }}
                />

                {/* Scanning Light Effect */}
                <div
                  className="absolute inset-0 w-1/3"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'scan 2s linear infinite'
                  }}
                />
              </div>
            </div>

            {/* Grid Overlay on Progress Bar */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '16px 16px'
              }}
            />
          </div>

          {/* Additional Status Info */}
          <div className="flex justify-between items-center text-[10px] font-mono text-white/30 tracking-widest px-1">
            <span>UPTIME: {formatUptime(uptime)}</span>
            <span>PROC_ID: 0xA7F2</span>
            <span>NODE: PRIMARY</span>
          </div>
        </div>

        {/* Deployment Metadata with Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
              <div className="w-4 h-4 bg-white" style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }} />
            </div>
            <div
              className="text-white/30 uppercase tracking-[0.4em] font-mono"
              style={{
                fontFamily: '"VT323", monospace',
                fontSize: '1rem'
              }}
            >
              DEPLOYING TO VERCEL...
            </div>
          </div>

          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 border border-white/20"
                style={{
                  animation: `blink 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes glow {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(1.3) saturate(1.4);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.08;
          }
          50% {
            opacity: 0.15;
          }
        }

        @keyframes blink {
          0%, 49% {
            background-color: transparent;
          }
          50%, 100% {
            background-color: rgba(255, 255, 255, 0.3);
          }
        }

        .glitch {
          animation: glitchAnim 0.3s ease-in-out;
        }

        @keyframes glitchAnim {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
}
