import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Play, Download, ArrowRight, ExternalLink, Headphones, Zap } from 'lucide-react';
import MoltenMetal from './MoltenMetal';

// Built-in SVG Icons
const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 6 3.5 5 4.7 5h14.6c1.2 0 2.2 1 2.2 2.1v9.8c0 1.1-1 2.1-2.2 2.1H4.7c-1.2 0-2.2-1-2.2-2.1V7.1z"/><path d="M10 15l5-3-5-3v6z"/></svg>
);

// Hook for scroll reveal animations
const useScrollReveal = (threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isIntersecting] as const;
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

// Reusable animated wrapper component
const Reveal = ({ children, delay = 0, className = '', direction = 'up' }: RevealProps) => {
  const [ref, isVisible] = useScrollReveal();
  
  const baseClasses = `transition-all duration-1000 ease-out ${className}`;
  const hiddenClasses = direction === 'up' ? 'opacity-0 translate-y-12' : 
                        direction === 'left' ? 'opacity-0 translate-x-12' : 
                        direction === 'right' ? 'opacity-0 -translate-x-12' : 'opacity-0 scale-95';
  const visibleClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const LATEST_TRACKS = [
  { id: 1, title: 'WITH THE MOB', genre: 'Hard Bounce', plays: '1K', color: 'from-purple-500 to-indigo-600', image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02df51c39a5f5de084411d6a4a', link: 'https://open.spotify.com/track/6U117vgKG6ab7dWTRCahU6?si=2b3d9ba0c54444b8' },
  { id: 2, title: 'PONYKAI', genre: 'Hard Bounce', plays: '50K', color: 'from-pink-500 to-rose-600', image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e027d0659b47d4c8e29f94c5256', link: 'https://open.spotify.com/track/2aVH4erbbi2KQnfhZKh5q2?si=8b4bbb64ec1e436c' },
  { id: 3, title: 'I NEED THAT', genre: 'Techno', plays: '150K', color: 'from-blue-600 to-cyan-500', image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023cf179c4a5d64e517c61e026', link: 'https://open.spotify.com/track/4yMKx6UJWUsf7N02XT05wF?si=98bf5f271de5435b' },
];

const SAMPLE_PACKS = [
  {
    id: 1,
    title: 'BOUNCE TOOL KIT',
    description: 'Cod3break signature sound selection pack. It contains: 16 samples (5 synth loops, 4 percs, 4 bouncy kicks, 3 off beat basses) All samples are royalty-free.',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://payhip.com/b/YSeqO'
  }
];

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ backgroundColor: '#05010a' }}
    >
      <div className="absolute inset-0 z-0">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
        />
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto pointer-events-none">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-gray-300 mb-8 tracking-widest uppercase pointer-events-auto">
            <Zap size={16} className="text-[#f7e455]" />
            <span>Music Producer & Sound Designer</span>
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            COD3BREAK
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Sound Design for producers, by a producer. Mixing & Mastering services.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <a href="#music" className="w-full sm:w-auto px-8 py-4 bg-[#f7e455] text-black rounded-full font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 group">
              <Play size={20} className="fill-black group-hover:scale-110 transition-transform" />
              Listen Now
            </a>
            <a href="#packs" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10 flex items-center justify-center gap-2 group">
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              Sample Packs
            </a>
          </div>
        </Reveal>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 z-10">
        <ArrowRight className="rotate-90" />
      </div>
    </section>
  );
};

const MusicSection = () => {
  return (
    <section id="music" className="py-24 px-6 relative z-10 bg-black/50 backdrop-blur-lg border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight">LATEST RELEASES</h2>
            <div className="h-px bg-gradient-to-r from-purple-500 to-transparent flex-1"></div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          {LATEST_TRACKS.map((track, index) => (
            <Reveal key={track.id} delay={index * 150} direction="up">
              <a
                href={track.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Listen to ${track.title} on Spotify`}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 p-4 flex items-center gap-6 hover:bg-white/10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br ${track.color} flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow`}>
                  <img src={track.image} alt={`${track.title} cover`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <Play className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 relative z-10 fill-white" size={28} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold truncate group-hover:text-purple-400 transition-colors">{track.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs">{track.genre}</span>
                    <span className="text-gray-500">• {track.plays} Streams</span>
                  </p>
                </div>
                
                <div className="hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300 pr-4">
                  <span className="p-3 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black transition-colors">
                    <ExternalLink size={20} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SamplePacksSection = () => {
  return (
    <section id="packs" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-12 flex-row-reverse">
            <h2 className="text-4xl font-bold tracking-tight">SOUND DESIGN</h2>
            <div className="h-px bg-gradient-to-l from-indigo-500 to-transparent flex-1"></div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Reveal direction="right">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold">Elevate your productions.</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                I believe in making high-quality sounds accessible to everyone. That's why my sample packs are available on a 
                <span className="text-purple-400 font-medium"> Pay-What-You-Want</span> basis. Enter $0 to get it free, or drop a few bucks to support my work directly on Payhip.
              </p>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> High-quality .WAV format
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Royalty-free for commercial use
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal direction="left" delay={200}>
            {SAMPLE_PACKS.map(pack => (
              <div key={pack.id} className="relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                  <img src={pack.image} alt={pack.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs border border-white/20 text-white font-medium flex items-center gap-2">
                      <Headphones size={14} /> Pay What You Want
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h4 className="text-xl font-bold mb-2">{pack.title}</h4>
                  <p className="text-gray-400 text-sm mb-6">{pack.description}</p>
                  <a href={pack.link} target="_blank" rel="noreferrer" className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2">
                    <Download size={20} />
                    Get via Payhip
                  </a>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const socials = [
    { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/cod3break/' },
    { name: 'YouTube', icon: YoutubeIcon, url: 'https://www.youtube.com/@HardBounceProduction' },
  ];

  return (
    <footer className="py-12 px-6 border-t border-white/10 relative z-10 bg-black">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Reveal>
          <div className="text-2xl font-black tracking-tighter text-white/80" style={{ fontFamily: "'Orbitron', sans-serif" }}>COD3BREAK</div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-purple-600 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
      <div className="max-w-5xl mx-auto mt-8 text-center md:text-left text-xs text-gray-600">
        © {new Date().getFullYear()} Cod3break. All rights reserved.
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>C3B</span>
          <div className="flex gap-6 text-sm font-medium text-white/70">
            <a href="#music" className="hover:text-white transition-colors hidden sm:block">Music</a>
            <a href="#packs" className="hover:text-white transition-colors hidden sm:block">Packs</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <MusicSection />
        <SamplePacksSection />
      </main>

      <Footer />
    </div>
  );
}