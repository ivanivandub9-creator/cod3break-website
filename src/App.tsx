import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Play, Download, ExternalLink, Headphones } from 'lucide-react';
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
  { id: 1, title: 'WITH THE MOB', genre: 'Hard Bounce', plays: '1K', color: 'from-[#30343A] to-[#AEB4BC]', image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02df51c39a5f5de084411d6a4a', link: 'https://open.spotify.com/track/6U117vgKG6ab7dWTRCahU6?si=2b3d9ba0c54444b8' },
  { id: 2, title: 'PONYKAI', genre: 'Hard Bounce', plays: '50K', color: 'from-[#444A52] to-[#D5D9DE]', image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e027d0659b47d4c8e29f94c5256', link: 'https://open.spotify.com/track/2aVH4erbbi2KQnfhZKh5q2?si=8b4bbb64ec1e436c' },
  { id: 3, title: 'I NEED THAT', genre: 'Techno', plays: '150K', color: 'from-[#202328] to-[#858D97]', image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023cf179c4a5d64e517c61e026', link: 'https://open.spotify.com/track/4yMKx6UJWUsf7N02XT05wF?si=98bf5f271de5435b' },
];

const SAMPLE_PACKS = [
  {
    id: 1,
    title: 'Bounce Tool Kit Demo',
    category: 'Sample Pack',
    price: 'Free',
    color: 'from-[#30343A] to-[#E5E8EC]',
    image: 'https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1jmvvpb1111sr1j6qe6216ei1ge91g.jpg',
    link: 'https://payhip.com/b/YSeqO',
  },
  {
    id: 2,
    title: '123',
    category: 'Sample Pack',
    price: '123',
    color: 'from-[#30343A] to-[#AEB4BC]',
  },
  {
    id: 3,
    title: '123',
    category: 'Sample Pack',
    price: '123',
    color: 'from-[#444A52] to-[#D5D9DE]',
  },
];

const Hero = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 overflow-hidden bg-black md:grid-cols-2">
      <div className="relative min-h-[42svh] overflow-hidden bg-zinc-950 md:min-h-screen">
        <img
          src="https://drive.google.com/thumbnail?id=1NKi9IMGaiWfKqnSBqKGYX36HAfyHANQl&sz=w1600"
          alt="Cod3break"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      </div>

      <div className="relative flex min-h-[58svh] items-center overflow-hidden bg-black px-8 py-16 sm:px-12 md:min-h-screen md:px-14 lg:px-20">
        <div aria-hidden="true" className="absolute inset-0">
          <MoltenMetal
            color1="#050608"
            color2="#737B84"
            color3="#E5E8EC"
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

        <div className="relative z-10 mx-auto w-full max-w-xl text-center">
          <Reveal delay={200}>
            <h1 className="mb-5 bg-gradient-to-b from-white via-[#E5E8EC] to-[#AEB4BC] bg-clip-text text-5xl font-bold tracking-tight text-transparent drop-shadow-2xl sm:text-6xl lg:text-7xl">
              Cod3break
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="mb-9 bg-gradient-to-r from-[#AEB4BC] via-white to-[#AEB4BC] bg-clip-text text-base font-medium leading-relaxed tracking-wide text-transparent sm:text-lg">
              Producer / DJ / Mixing &amp; Mastering Engineer
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="pointer-events-auto flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#music" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-[#C7CCD2] px-7 py-3.5 font-bold text-black transition-colors hover:from-[#E5E8EC] hover:to-[#AEB4BC]">
                <Play size={19} className="fill-black" />
                Listen Now
              </a>
              <a href="#packs" className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/25 px-7 py-3.5 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15">
                <Download size={19} />
                Sample Packs
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const MusicSection = () => {
  return (
    <section id="music" className="relative z-10 grid grid-cols-1 overflow-hidden border-t border-white/10 bg-black md:grid-cols-2">
      <div className="relative flex min-h-[55svh] items-center justify-center overflow-hidden bg-black px-8 py-16 sm:px-12 md:min-h-full md:px-14 lg:px-20">
        <div aria-hidden="true" className="absolute inset-0">
          <MoltenMetal
            color1="#050608"
            color2="#737B84"
            color3="#E5E8EC"
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
        <div className="relative z-10 w-full max-w-md text-center">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#AEB4BC]">Contact</h2>
                <a
                  href="mailto:ivanivandub9@gmail.com"
                  className="bg-gradient-to-r from-white to-[#AEB4BC] bg-clip-text text-lg font-medium text-transparent transition-colors hover:from-[#E5E8EC] hover:to-white sm:text-xl"
                >
                  ivanivandub9@gmail.com
                </a>
              </div>
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#AEB4BC]">Ableton Coaching</h2>
                <a
                  href="https://ig.me/m/cod3break"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-white to-[#AEB4BC] bg-clip-text text-lg font-medium text-transparent transition-colors hover:from-[#E5E8EC] hover:to-white sm:text-xl"
                >
                  Message me on Instagram
                </a>
              </div>
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#AEB4BC]">Sample Packs</h2>
                <a
                  href="https://payhip.com/HardBounceProduction"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-white to-[#AEB4BC] bg-clip-text text-lg font-medium text-transparent transition-colors hover:from-[#E5E8EC] hover:to-white sm:text-xl"
                >
                  Browse sample packs
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/70 px-6 py-16 backdrop-blur-lg sm:px-10 md:border-l md:border-t-0 md:px-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="mb-12 flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">LATEST RELEASES</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[#AEB4BC] to-transparent"></div>
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
                  className="group relative flex cursor-pointer items-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#AEB4BC]/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E5E8EC]"
                >
                  <div className={`relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br sm:h-24 sm:w-24 ${track.color} transition-shadow group-hover:shadow-[0_0_30px_rgba(174,180,188,0.3)]`}>
                    <img src={track.image} alt={`${track.title} cover`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent"></div>
                    <Play className="relative z-10 scale-50 fill-white text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" size={28} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-bold transition-all group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#AEB4BC] group-hover:bg-clip-text group-hover:text-transparent sm:text-2xl">{track.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs">{track.genre}</span>
                      <span className="text-slate-500">• {track.plays} Streams</span>
                    </p>
                  </div>

                  <div className="hidden translate-x-4 items-center gap-3 pr-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:flex">
                    <span className="rounded-full bg-white/10 p-3 text-white transition-colors group-hover:bg-white group-hover:text-black">
                      <ExternalLink size={20} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
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
            <div className="h-px bg-gradient-to-l from-[#AEB4BC] to-transparent flex-1"></div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          {SAMPLE_PACKS.map((pack, index) => {
            const card = (
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#AEB4BC]/60 transition-all duration-300 p-4 flex items-center gap-6 hover:bg-white/10">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br ${pack.color} flex-shrink-0 flex items-center justify-center relative overflow-hidden transition-shadow group-hover:shadow-[0_0_30px_rgba(174,180,188,0.3)]`}>
                  {pack.image ? (
                    <img src={pack.image} alt={`${pack.title} cover`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <Headphones className="text-white/60" size={32} aria-hidden="true" />
                  )}
                  {pack.link && <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold truncate group-hover:text-[#E5E8EC] transition-colors">{pack.title}</h3>
                  <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs">{pack.category}</span>
                    <span className="text-slate-500">• {pack.price}</span>
                  </p>
                </div>

                {pack.link && (
                  <div className="hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300 pr-4">
                    <span className="p-3 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black transition-colors">
                      <ExternalLink size={20} />
                    </span>
                  </div>
                )}
              </div>
            );

            return (
              <Reveal key={pack.id} delay={index * 150} direction="up">
                {pack.link ? (
                  <a
                    href={pack.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${pack.title} on Payhip`}
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E5E8EC]"
                  >
                    {card}
                  </a>
                ) : card}
              </Reveal>
            );
          })}
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
                  className="p-3 rounded-full bg-white/5 hover:bg-[#AEB4BC] text-slate-400 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
      <div className="max-w-5xl mx-auto mt-8 text-center md:text-left text-xs text-slate-500">
        © {new Date().getFullYear()} Cod3break. All rights reserved.
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-[#AEB4BC]/40 selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>C3B</span>
          <div className="flex gap-6 text-sm font-medium text-slate-300">
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