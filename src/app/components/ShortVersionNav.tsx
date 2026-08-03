import { useEffect, useState } from 'react';
import logoImg from '../../imports/mentorx-logo.svg';

type ShortVersionNavProps = {
  onCTA: () => void;
  langHref?: string;
  langLabel?: string;
  ctaLabel?: string;
};

export function ShortVersionNav({ onCTA, langHref, langLabel, ctaLabel = '免费咨询' }: ShortVersionNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => {
      const next = window.scrollY > 24;
      setScrolled(prev => (prev === next ? prev : next));
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(246,250,248,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.07)' : 'transparent'}`,
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="inline-flex items-center">
          <img src={logoImg} alt="蔓藤教育 MentorX" width={540} height={326} className="h-10 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-2">
          {langHref && langLabel ? (
            <a
              href={langHref}
              className="inline-flex h-9 items-center justify-center rounded-full border px-3 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
              style={{
                borderColor: 'rgba(0,168,112,0.22)',
                background: 'rgba(255,255,255,0.76)',
                color: '#0D2E1E',
              }}
            >
              {langLabel}
            </a>
          ) : null}
          <button
            onClick={onCTA}
            className="h-9 px-5 rounded-full text-white text-[14px] font-medium transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: '#00A870' }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </nav>
  );
}
