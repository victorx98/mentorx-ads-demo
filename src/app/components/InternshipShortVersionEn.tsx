import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { X, MessageCircle, Check, Clock, Users, TrendingUp, Building2 } from 'lucide-react';
import logoImg from '../../imports/mentorx-logo.svg';
import { ShortVersionNav } from './ShortVersionNav';
import wechatQrImg from '../../imports/wechat-qr.svg';
import studentImg from '../../imports/shutterstock_2553528401.webp';
import heroBannerImg from '../../imports/banner1.webp';

const WEIXIN_URL = 'https://work.weixin.qq.com/ca/cawcde13ce4f06e70b';
const WEIXIN_ID = 'Mentorx01';
const HERO_IMG = heroBannerImg;
const CANVAS = '#F6FAF8';
const MINT_BAND = '#EEF8F4';
const SURFACE = '#FFFFFF';
const HAIRLINE = '#DDD6CC';
const INK = '#111827';
const INK_MUTED = '#626260';
const GREEN = '#00A870';
const GREEN_DARK = '#0D2E1E';

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPANY_LOGOS = [
  { name: 'Google', src: new URL('../../assets/company-logos-green/Google_2015_logo.svg', import.meta.url).href },
  { name: 'Meta', src: new URL('../../assets/company-logos-green/Meta_Platforms-Logo.wine.svg', import.meta.url).href },
  { name: 'Amazon', src: new URL('../../assets/company-logos-green/Amazon_(company)-Logo.wine.svg', import.meta.url).href },
  //{ name: 'Apple', src: new URL('../../assets/company-logos-green/Apple_logo_green.png', import.meta.url).href },
  //{ name: 'JPMorgan Chase', src: new URL('../../assets/company-logos-green/JPMorgan_Chase-Logo.wine.svg', import.meta.url).href },
  { name: 'Goldman Sachs', src: new URL('../../assets/company-logos-green/Goldman_Sachs_logo.svg', import.meta.url).href },
  //{ name: 'McKinsey', src: new URL('../../assets/company-logos-green/McKinsey_and_Company_Logo_1.svg', import.meta.url).href },
  { name: 'BCG', src: new URL('../../assets/company-logos-green/Boston_Consulting_Group_2020_logo.svg', import.meta.url).href },
  { name: 'NVIDIA', src: new URL('../../assets/company-logos-green/NVIDIA_logo.svg', import.meta.url).href },
  { name: 'IBM', src: new URL('../../assets/company-logos-green/IBM_logo.svg', import.meta.url).href },
  { name: 'Intel', src: new URL('../../assets/company-logos-green/Intel_logo_2023.svg', import.meta.url).href },
  { name: 'TikTok', src: new URL('../../assets/company-logos-green/TikTok-Logomark&Wordmark-Logo.wine.svg', import.meta.url).href },
  //{ name: 'Tesla', src: new URL('../../assets/company-logos-green/Tesla_Motors_green.png', import.meta.url).href },
  //{ name: 'Uber', src: new URL('../../assets/company-logos-green/Uber_logo_2018.svg', import.meta.url).href },
  { name: 'Walmart', src: new URL('../../assets/company-logos-green/Walmart_logo_(2025;_Alt).svg', import.meta.url).href },
  //{ name: 'Bank of America', src: new URL('../../assets/company-logos-green/Bank_of_America-Logo.wine.svg', import.meta.url).href },
  { name: 'KPMG', src: new URL('../../assets/company-logos-green/KPMG_blue_logo.svg', import.meta.url).href },
  { name: 'EY', src: new URL('../../assets/company-logos-green/EY_logo_2019.svg', import.meta.url).href },
  //{ name: 'Discover', src: new URL('../../assets/company-logos-green/Discover_Card_logo.svg', import.meta.url).href },
  { name: 'Intuit', src: new URL('../../assets/company-logos-green/Intuit_Logo.svg', import.meta.url).href },
];


const STATS = [
  { id: 'years',     target: 11,    suffix: '+ yrs',  label: 'Overseas Career Service Experience' },
  { id: 'students',  target: 33000, suffix: '+',    label: 'Students Served',     thousands: true },
  { id: 'rate',      target: 95,    suffix: '%',    label: 'Approx. Student Success Rate' },
  { id: 'resources', target: 2800,  suffix: '+',    label: 'Employer & Mentor Resources', thousands: true },
];

const PAIN_POINTS = [
  {
    n: '01', title: 'Can’t Find the Right Opportunities?',
    desc: 'You are not sure which roles fit, where to apply, or what the real competition looks like.',
    solution: 'Identify stronger-fit internship targets based on your major, stage, industry, and career goals.',
  },
  {
    n: '02', title: 'Resume Looking Too Empty?',
    desc: 'You want stronger internships, but your resume does not yet show enough relevant proof.',
    solution: 'Build role-aligned projects, skills, and experience that make your profile more competitive.',
  },
  {
    n: '03', title: 'Applying With No Response?',
    desc: 'Your applications go out, but responses do not come back, and it is hard to know why..',
    solution: 'Improve your target list, resume positioning, and application strategy to raise conversion.',
  },
  {
    n: '04', title: 'Messy Summer Internship Timeline',
    desc: 'You are unsure when to prepare, apply, and follow up, which makes it easy to miss key windows.',
    solution: 'We build a clear internship application timeline around your target region, industry, and academic stage.',
  },
  {
    n: '05', title: 'Not Enough Real Interview Practice',
    desc: 'You are unsure how to present projects, experience, behavioral answers, and role-specific questions.',
    solution: 'Mock interviews and mentor feedback help train your communication logic, experience highlights, and role fit.',
  },
  {
    n: '06', title: 'Internship Experience Is Not Turning Into an Advantage',
    desc: 'You have projects or internships, but do not know how to turn outcomes into proof for future applications.',
    solution: 'We help students review experience, extract results, and turn them into resume and interview strengths.',
  },
];



const TESTIMONIALS = [
  {
    quote: 'My mentor helped me reorganize my experience and review interviews in detail. I thought my preparation was fine, but after talking with the mentor I realized many answers did not show my real value.',
    name: 'Jess W.',
    tag: 'CMU Computer Science -> Google SWE',
    accent: false,
  },
  {
    quote: 'When my OPT timeline was tight, I did not need generic advice. MentorX helped me quickly identify high-fit role directions so I could focus on the most realistic path.',
    name: 'Michael L.',
    tag: 'Columbia Finance -> JPMorgan',
    accent: true,
  },
  {
    quote: 'I used to think my experience was too ordinary. Through project and resume refinement, I finally learned how to communicate my strengths. Getting the offer made the whole process feel worth it.',
    name: 'Yiwei Z.',
    tag: 'UCLA Business -> Deloitte',
    accent: false,
  },
  {
    quote: 'From having no direction to receiving a consulting offer, MentorX turned vague uncertainty into concrete steps. The whole process was much more structured than I expected.',
    name: 'Linda C.',
    tag: 'NYU Finance -> McKinsey',
    accent: false,
  },
  {
    quote: 'We did multiple mock interviews, and my mentor gave detailed feedback after each round. By the final interview, I felt much more stable and genuinely prepared.',
    name: 'Kevin H.',
    tag: 'UT Austin Computer Science -> Amazon SDE',
    accent: true,
  },
  {
    quote: 'At first I had no clarity on data roles. My mentor explained the difference between DA and DS and helped me train specifically for SQL and case studies. The preparation felt very structured.',
    name: 'Tina X.',
    tag: 'UIUC Statistics -> Meta Data Analyst',
    accent: false,
  },
  {
    quote: 'The mentor had real campus recruiting experience, so the advice was practical. From target lists to networking to offer negotiation, every step was concrete.',
    name: 'Brian W.',
    tag: 'USC Business -> BCG Associate',
    accent: false,
  },
  {
    quote: 'I was changing directions, and my mentor helped me reposition my past experience and uncover strengths I had not noticed. Even I was surprised when I got the offer.',
    name: 'Chloe M.',
    tag: 'Duke Public Policy -> Microsoft PM',
    accent: false,
  },
];




// ── QR Code ───────────────────────────────────────────────────────────────────

function QRCodeSVG({ size = 200 }: { size?: number; color?: string }) {
  return (
    <img
      src={wechatQrImg}
      alt="Scan to add a MentorX advisor and get a career plan"
      width={size}
      height={size}
      className="block rounded-[3px]"
      style={{ width: size, height: size }}
    />
  );
}

// ── WeChat Modal ──────────────────────────────────────────────────────────────

function WeChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[340px] overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.2s ease' }}
      >
        <div
          className="px-7 pt-7 pb-5 text-white text-center"
          style={{ background: 'linear-gradient(150deg, #0D2E1E 0%, #1b4d32 100%)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <X size={14} />
          </button>
          <div className="text-[10px] font-medium tracking-[0.14em] opacity-50 mb-2.5 uppercase">蔓藤教育 MentorX</div>
          <h3 className="text-[20px] font-semibold mb-1.5">Scan to Get a Personalized Career Plan</h3>
          <p className="text-[13px] opacity-70 leading-relaxed">Get role resources, resume advice, and a job-search timeline</p>
        </div>

        <div className="px-7 py-6 text-center">
          <div className="inline-flex items-center justify-center mb-5">
            <QRCodeSVG size={190} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-gray-400 text-[12px]">WeChat</span>
            <span className="font-semibold text-gray-900 text-[13px] bg-gray-100 px-3 py-1 rounded-full tracking-wide">
              {WEIXIN_ID}
            </span>
          </div>
          <a
            href={WEIXIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-white text-[14px] font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: '#07C160' }}
          >
            Open WeChat and Add a Consultant
          </a>
        </div>

        <div className="pb-5 text-center text-[11px] text-gray-400">
          MentorX advisors help guide your career journey
        </div>
      </div>
    </div>
  );
}

// ── Shared: Section wrapper ───────────────────────────────────────────────────

function Sec({
  id,
  bg = CANVAS,
  className = '',
  children,
}: {
  id?: string;
  bg?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} style={{ background: bg }} className={`py-14 sm:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">{children}</div>
    </section>
  );
}

// Section eyebrow + title + optional subtitle
function SecHead({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div
          className="inline-flex items-center gap-2 mb-3.5 text-[13px] font-medium tracking-[0.04em]"
          style={{ color: '#00A870' }}
        >
          <span>—</span>
          {eyebrow}
          <span>—</span>
        </div>
      )}
      <h2
        className={`text-[32px] sm:text-[42px] font-semibold leading-tight ${center ? 'mx-auto' : ''}`}
        style={{ maxWidth: center ? '720px' : '680px', color: INK, letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-[15px] leading-relaxed max-w-xl" style={{ color: INK_MUTED, marginLeft: center ? 'auto' : undefined, marginRight: center ? 'auto' : undefined }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Shared: Marquee ticker ────────────────────────────────────────────────────

function Ticker({
  items,
  reverse = false,
  speed = 28,
}: {
  items: Array<{ name: string; src: string }>;
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full select-none">
      <div
        className="flex w-max items-center gap-10"
        style={{
          animation: `${reverse ? 'tickerRight' : 'tickerLeft'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div key={`${item.name}-${i}`} className="flex h-10 w-[85px] items-center justify-center">
            <img
              src={item.src}
              alt={item.name}
              className="block max-h-7 w-auto max-w-[85px] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


// ── Shared: CTA button ────────────────────────────────────────────────────────

function Btn({
  label,
  onClick,
  variant = 'solid',
  size = 'md',
  className = '',
}: {
  label: string;
  onClick: () => void;
  variant?: 'solid' | 'outline' | 'ghost' | 'dark-outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'h-9 px-5 text-[13px]',
    md: 'h-11 px-6 text-[14px]',
    lg: 'h-12 px-8 text-[15px]',
  };
  const variants = {
    solid: 'text-white hover:opacity-90',
    outline: 'border border-[#00A870] text-[#00A870] hover:bg-[#00A870]/8',
    ghost: 'text-[#00A870] hover:bg-[#00A870]/8',
    'dark-outline': 'border border-white/30 text-white hover:bg-white/10',
  };
  const solidStyle = variant === 'solid' ? { background: '#00A870' } : {};

  return (
    <button
      onClick={onClick}
      className={`hidden md:inline-flex items-center justify-center rounded-[10px] font-semibold transition-all active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A870] ${sizes[size]} ${variants[variant]} ${className}`}
      style={solidStyle}
    >
      {label}
    </button>
  );
}

// ── Hero float badge ──────────────────────────────────────────────────────────

function Badge({
  text,
  sub,
  className = '',
  style,
}: {
  text: string;
  sub?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`hero-float-badge absolute bg-white/95 rounded-2xl shadow-md border border-white/80 px-3.5 py-2.5 flex items-start gap-2.5 z-10 max-w-[calc(100vw-2.5rem)] ${className}`}
      style={{ backdropFilter: 'blur(10px)', ...style }}
    >
      <div
        className="hero-badge-icon mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: '#E8F5F0' }}
      >
        <Check size={11} color="#00A870" strokeWidth={3} />
      </div>
      <div>
        <div className="text-[13px] font-medium text-gray-900 leading-tight">{text}</div>
        {sub && <div className="text-[12px] text-gray-400 mt-0.5 leading-tight">{sub}</div>}
      </div>
    </div>
  );
}

// ── 1 & 2. Hero + Ticker (same background) ────────────────────────────────────

function HeroSection({ onCTA }: { onCTA: () => void }) {
  const heroTargetRef = useRef(0);
  const heroCurrentRef = useRef(0);
  const heroVelocityRef = useRef(0);
  const [heroTagProgress, setHeroTagProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const viewport = window.innerHeight || 1;
      const travel = Math.min(560, viewport * 0.72);
      const raw = Math.max(0, Math.min(1, window.scrollY / travel));
      heroTargetRef.current = 1 - Math.pow(1 - raw, 1.8);

      if (reduceMotion) {
        heroCurrentRef.current = heroTargetRef.current;
      } else {
        const distance = heroTargetRef.current - heroCurrentRef.current;
        const spring = heroTargetRef.current > heroCurrentRef.current ? 0.13 : 0.09;
        heroVelocityRef.current = (heroVelocityRef.current + distance * spring) * 0.72;
        heroCurrentRef.current += heroVelocityRef.current;
        heroCurrentRef.current = Math.max(-0.025, Math.min(1.04, heroCurrentRef.current));
      }

      const next = heroCurrentRef.current;
      setHeroTagProgress(prev => (Math.abs(prev - next) > 0.001 ? next : prev));
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const heroTagStyle = (y: number, delay = 0): CSSProperties => ({
    '--hero-scroll-y': `${y * heroTagProgress}px`,
    animationDelay: `${delay}s`,
  } as CSSProperties);

  return (
    <section style={{ background: CANVAS }}>
      {/* Hero content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-5 lg:pt-8 lg:pb-6">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(250px,0.78fr)] md:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.78fr)] lg:gap-8 items-center min-w-0">
          {/* Left: copy */}
          <div className="order-1 min-w-0" style={{ maxWidth: 'clamp(0px, calc(100vw - 40px), 34rem)' }}>
            <div
              className="inline-flex items-center gap-2 mb-3 px-3.5 py-2 rounded-[10px] text-[13px] font-medium border"
              style={{
                borderColor: 'rgba(0,168,112,0.25)',
                color: GREEN_DARK,
                background: 'rgba(255,255,255,0.74)',
              }}
            >
              International Student Internship Launch Program
            </div>

            <h1
              className="font-semibold leading-[1.1] mb-4 text-[34px] md:text-[40px] lg:text-[54px]"
              style={{ color: INK, letterSpacing: '-0.04em', maxWidth: 'clamp(0px, calc(100vw - 40px), 34rem)', overflowWrap: 'anywhere' }}
            >
              <span className="block">No Internship Yet? </span>
              <span className="block whitespace-nowrap" style={{ color: GREEN }}>Let’s Fix That.</span>
            </h1>

            <p className="hidden text-[16px] leading-relaxed mb-4 max-w-[19rem] sm:max-w-md md:block" style={{ color: INK_MUTED, overflowWrap: 'anywhere' }}>
             A summer without direction can cost you momentum. MentorX helps international students target the right internships, build relevant experience, and turn open time into stronger career leverage.
            </p>

            <div className="mb-4 md:mb-5">
              <button
                onClick={onCTA}
                className="inline-flex h-12 items-center justify-center rounded-[10px] px-8 text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A870]"
                style={{
                  background: '#00A870',
                  boxShadow: '0 4px 20px rgba(0,168,112,0.3)',
                }}
              >
                Book a Free Consultation
              </button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-6 sm:text-[15px]">
              {['4200+ Resources', 'Covers Alls Industries', '1:1 Mentor Support'].map(t => (
                <div
                  key={t}
                  className="flex min-w-0 items-center justify-center gap-1 rounded-[10px] border bg-white/85 px-1.5 py-2 text-center shadow-[0_8px_20px_rgba(16,35,29,0.04)] whitespace-nowrap sm:justify-start sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:text-left sm:shadow-none"
                  style={{ borderColor: 'rgba(0,168,112,0.12)' }}
                >
                  <Check className="h-2.5 w-2.5 flex-shrink-0 sm:h-3.5 sm:w-3.5" color="#00A870" strokeWidth={2.5} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + badges */}
          <div className="order-2 hidden justify-center md:flex md:justify-end min-w-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] md:w-[clamp(260px,30vw,360px)] md:max-w-none rounded-[16px]" style={{ boxShadow: '0 16px 48px rgba(17,24,39,0.08)' }}>
              {/* Image */}
              <div
                className="relative aspect-square overflow-hidden rounded-[16px]"
              >
                <img
                  src={HERO_IMG}
                  alt="Confident international student"
                  width={1122}
                  height={1402}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/4"
                  style={{ background: 'linear-gradient(to top, rgba(13,46,30,0.35) 0%, transparent 100%)' }}
                />
              </div>

              {/* Floating badges */}
              <Badge text="4,200+ Role Resource Matching" className="-top-3 left-0 sm:-left-8" style={heroTagStyle(-28, -0.15)} />
              <Badge
                text="1:1 Mentor Coaching"
              
                className="hidden sm:flex sm:top-[28%] sm:-right-8"
                style={heroTagStyle(26, -1.15)}
              />
              <Badge text="Professional Resume and Materials Optimization" className="bottom-[18%] left-0 sm:-left-8" style={heroTagStyle(24, -2.05)} />

              {/* Offer pill hidden for short version */}
            </div>
          </div>
        </div>
      </div>

      {/* Ticker — seamless part of banner */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-4">
        <div className="flex items-center gap-2 text-[13px] font-medium mb-4" style={{ color: '#6b9e86' }}>
          Student internship and career outcomes cover diverse industries
        </div>
        <Ticker items={COMPANY_LOGOS} speed={95} />
      </div>
    </section>
  );
}

function LeadCaptureSection({ onCTA }: { onCTA: () => void }) {
  const items = [
    {
      title: 'Who It Is For',
      desc: 'International students facing unclear direction, limited experience, weak application feedback, or tight OPT/H-1B timelines.',
    },
    {
      title: 'What You Get',
      desc: 'A gap assessment based on your school, major, year, and target roles.',
    },
    {
      title: 'Next Step',
      desc: 'Add an advisor on WeChat and clarify whether you should improve your resume, projects, interviews, or role strategy first.',
    },
  ];

  return (
    <section style={{ background: CANVAS }} className="pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 rounded-[16px] border bg-white p-5 sm:p-6" style={{ borderColor: HAIRLINE, boxShadow: '0 14px 44px rgba(17,24,39,0.06)' }}>
          <div className="grid sm:grid-cols-3 gap-3">
            {items.map((item, index) => (
              <div key={item.title} className="rounded-[12px] border p-4" style={{ borderColor: '#ECE5DD', background: index === 1 ? '#F8FBF8' : '#FFFFFF' }}>
                <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-[8px] text-[12px] font-semibold text-white" style={{ background: GREEN }}>
                  {index + 1}
                </div>
                <h3 className="mb-1.5 text-[15px] font-semibold" style={{ color: INK }}>{item.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[12px] p-5 text-white" style={{ background: GREEN_DARK }}>
            <div className="mb-2 text-[13px] font-medium" style={{ color: '#9BE5C3' }}>Free Career Assessment</div>
            <h2 className="mb-3 text-[28px] font-semibold leading-tight" style={{ letterSpacing: '-0.02em' }}>Clarify the Bottleneck Before Deciding What to Fix.</h2>
            <p className="mb-5 text-[14px] leading-relaxed text-white/70">A simple entry point for consultation: users do not need to understand every service first. They share their intent, and the assessment guides the next step.</p>
            <button
              onClick={onCTA}
              className="h-11 w-full rounded-[10px] bg-white px-5 text-[14px] font-semibold transition-all active:scale-[0.98]"
              style={{ color: GREEN_DARK }}
            >
              Get a Free Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, triggered: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) {
      setValue(0);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const from = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);
  return value;
}

// ── 3. Stats ──────────────────────────────────────────────────────────────────

function StatCard({
  id, target, suffix, label, thousands, icon,
  triggered,
}: {
  id: string; target: number; suffix: string; label: string;
  thousands?: boolean; icon: ReactNode; triggered: boolean;
}) {
  const val = useCountUp(target, 1800, triggered);
  const display = thousands ? val.toLocaleString() : String(val);

  return (
    <div
      className="flex flex-col items-center text-center px-3 py-4 sm:px-5 sm:py-8 rounded-[14px]"
      style={{ background: 'rgba(255,255,255,0.78)' }}
    >
      <div
        className="hidden w-10 h-10 rounded-[10px] items-center justify-center mb-4 sm:flex"
        style={{ background: '#E8F5F0', color: GREEN }}
      >
        {icon}
      </div>
      <div
        className="text-[26px] sm:text-[34px] font-semibold leading-none mb-1 sm:mb-2 tabular-nums"
        style={{ color: GREEN_DARK, letterSpacing: '-0.03em' }}
      >
        {display}{suffix}
      </div>
      <div className="text-[11px] sm:text-[12px] leading-snug" style={{ color: INK_MUTED }}>
        {label}
      </div>
    </div>
  );
}

function StatsSection() {
  const ICONS: Record<string, ReactNode> = {
    years:     <Clock size={20} />,
    students:  <Users size={20} />,
    rate:      <TrendingUp size={20} />,
    resources: <Building2 size={20} />,
  };

  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setTriggered(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} style={{ background: CANVAS }} className="py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <SecHead
            eyebrow="Proven Strength"
            title="Make Every Experience Count Toward the Next Step"
            center
            />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(stat => (
            <StatCard
              key={stat.id}
              {...stat}
              icon={ICONS[stat.id]}
              triggered={triggered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. Pain Points ────────────────────────────────────────────────────────────

function PainPointsSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Sec id="solution" bg="white">
      <SecHead
        eyebrow="Where You Get Stuck"
        title="Want an Internship, but Not Sure Where to Start?"
        sub="The problem is rarely motivation. It is knowing where to find the right opportunities, how to prepare, and why your resume is not getting responses."
        center
      />
      <div className="grid auto-rows-fr gap-4 mb-4 md:mb-6 md:grid-cols-3">
        {PAIN_POINTS.slice(0, 3).map(({ n, title, desc, solution }) => (
          <div
            key={n}
            className="flex h-full flex-col rounded-[14px] border overflow-hidden transition-all hover:-translate-y-0.5"
            style={{ borderColor: HAIRLINE, background: SURFACE }}
          >
            {/* Top: pain point */}
            <div className="flex-1 px-6 pt-5 pb-3" style={{ background: SURFACE }}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-[15px] font-bold tracking-[0.08em]" style={{ color: '#00A870' }}>{n}</span>
                <h4 className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>{title}</h4>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>{desc}</p>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: '#ECE5DD' }} />

            {/* Bottom: solution */}
            <div className="h-[112px] shrink-0 px-6 pt-3.5 pb-4" style={{ background: '#F8FBF8' }}>
              <div
                className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold tracking-wide"
                style={{ color: '#00A870' }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#00A870' }}
                >
                  <Check size={9} color="white" strokeWidth={3} />
                </div>
                MentorX Plan
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#315C47' }}>{solution}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden text-center mt-4 md:block">
        <Btn label="Assess My Profile" onClick={onCTA} />
      </div>
    </Sec>
  );
}


const INTERNSHIP_ACTION_STEPS = [
  {
    n: '01',
    title: 'Internship Targeting',
    desc: ' Identify stronger-fit internship directions based on your major, goals, and current stage.',
  },
  {
    n: '02',
    title: '	Profile Building',
    desc: 'Strengthen your profile with projects, training, internships, and role-relevant proof.',
  },
  {
    n: '03',
    title: 'Resume Positioning',
    desc: 'Reframe your experience so recruiters can see your fit faster.',
  },
  {
    n: '04',
    title: 'Long-Term Career Path',
    desc: 'Align internships, CPT/OPT, and future full-time goals into one stronger career path.',
  },
];

function InternshipActionPathSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Sec bg={MINT_BAND}>
      <div className="grid items-stretch gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div
          className="flex min-h-[300px] flex-col justify-center rounded-[22px] border px-7 py-8 sm:px-9 sm:py-10"
          style={{
            background: '#F6FBF8',
            borderColor: 'rgba(0,168,112,0.18)',
            boxShadow: '0 18px 48px rgba(16,35,29,0.07)',
          }}
        >
          <div className="mb-4 inline-flex w-fit items-center gap-2 text-[13px] font-semibold" style={{ color: GREEN }}>
            <span className="h-px w-7 bg-[#00A870]" />
            Action Path
          </div>
          <h2 className="text-[36px] font-semibold leading-[1.12] tracking-[-0.045em] sm:text-[46px]" style={{ color: INK }}>
            Turn <span style={{ color: GREEN }}>Internship Stress </span> Into a Clear Action Plan
          </h2>
          <p className="mt-5 max-w-md text-[14px] font-medium leading-7 sm:text-[15px]" style={{ color: INK_MUTED }}>
            Better outcomes come from sharper priorities. MentorX helps you decide whether to clarify direction, build experience, target projects, or move directly into applications and interview prep.
          </p>
          <button
            type="button"
            onClick={onCTA}
            className="mt-7 hidden h-11 w-fit items-center justify-center rounded-[10px] px-6 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 md:inline-flex"
            style={{ background: GREEN, boxShadow: '0 12px 28px rgba(0,168,112,0.22)' }}
          >
            Get Career Direction
          </button>
        </div>

        <div className="grid gap-3">
          {INTERNSHIP_ACTION_STEPS.map(({ n, title, desc }) => (
            <article
              key={n}
              className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-[16px] border bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-[#00A870] hover:shadow-[0_18px_42px_rgba(16,35,29,0.08)]"
              style={{ borderColor: HAIRLINE }}
            >
              <div className="inline-flex h-8 w-fit min-w-0 items-center justify-center rounded-full bg-[#EAF8F1] px-3 text-[13px] font-bold tracking-[0.02em]" style={{ color: GREEN }}>
                {n}
              </div>
              <div>
                <h3 className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ── 5. Why MentorX + Flow (combined) ─────────────────────────────────────────


const FLOW_STEPS_NEW = [
  { n: '01', title: 'Set Goals', desc: 'Clarify target country, industry, roles, and timeline.' },
  { n: '02', title: 'Gap Analysis', desc: 'Identify gaps in resume, skills, projects, and interviews.' },
  { n: '03', title: 'Plan the Path', desc: 'Define stage-by-stage tasks, learning priorities, and application rhythm.' },
  { n: '04', title: 'Career Training', desc: 'Strengthen competitiveness through training, projects, and mentor guidance.' },
  { n: '05', title: 'Readiness Assessment', desc: 'Assess readiness and adjust the search strategy dynamically.' },
  { n: '06', title: 'Role Matching', desc: 'Match internships, full-time roles, and referral opportunities.' },
];

function WhyMentorXSection({ onCTA }: { onCTA: () => void }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const tagTargetRef = useRef(0);
  const tagCurrentRef = useRef(0);
  const tagVelocityRef = useRef(0);
  const [tagProgress, setTagProgress] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const el = imageRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const imageCenter = rect.top + rect.height / 2;
        const start = viewport * 0.95;
        const end = viewport * 0.5;
        const raw = (start - imageCenter) / (start - end);
        const clamped = Math.max(0, Math.min(1, raw));
        tagTargetRef.current = Math.pow(clamped, 2.2);
      }

      if (reduceMotion) {
        tagCurrentRef.current = tagTargetRef.current;
      } else {
        const distance = tagTargetRef.current - tagCurrentRef.current;
        const spring = tagTargetRef.current > 0.72 ? 0.16 : 0.095;
        tagVelocityRef.current = (tagVelocityRef.current + distance * spring) * 0.76;
        tagCurrentRef.current += tagVelocityRef.current;
        tagCurrentRef.current = Math.max(-0.04, Math.min(1.055, tagCurrentRef.current));
      }

      const nextProgress = tagCurrentRef.current;
      setTagProgress(prev => (Math.abs(prev - nextProgress) > 0.001 ? nextProgress : prev));
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  const revealFrom = (x: number, y: number): CSSProperties => {
    const motionProgress = Math.max(-0.04, Math.min(1.055, tagProgress));
    const visibleProgress = Math.max(0, Math.min(1, tagProgress));
    const distance = 1 - motionProgress;
    return {
      opacity: visibleProgress * 0.94,
      transform: `translate3d(${x * distance}px, ${y * distance}px, 0)`,
      willChange: "opacity, transform",
    };
  };

  return (
    <Sec id="flow" bg={MINT_BAND} className="scroll-mt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">

        {/* Left: image with floating badges */}
        <div className="relative order-2 flex justify-center lg:order-1 lg:justify-start lg:self-center">
          <div ref={imageRef} className="relative w-full max-w-[380px]">
            <div className="rounded-[16px] overflow-hidden" style={{ height: 500, background: SURFACE }}>
              <img src={studentImg} alt="International Student Career Search" className="w-full h-full object-cover" style={{ objectPosition: '80% center' }} />
            </div>

            {/* Floating stat badges */}
            <div className="absolute -top-3 -right-3 sm:-right-8 bg-white/95 rounded-[12px] border px-3.5 py-2.5 flex items-center gap-2.5"
              style={{ borderColor: HAIRLINE, backdropFilter: 'blur(10px)', ...revealFrom(260, -180) }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5F0' }}>
                <Check size={11} color="#00A870" strokeWidth={3} />
              </div>
              <div className="text-[13px] font-medium text-gray-900">Guided From Planning to Offer</div>
            </div>

            <div className="absolute bottom-[22%] -left-2 sm:-left-10 bg-white/95 rounded-[12px] border px-3.5 py-2.5"
              style={{ borderColor: HAIRLINE, backdropFilter: 'blur(10px)', ...revealFrom(-240, 72) }}>
              <div className="text-[11px] text-gray-400 mb-0.5">Students Served</div>
              <div className="text-[18px] font-bold" style={{ color: '#00A870' }}>33,000+</div>
            </div>

            <div className="absolute bottom-4 right-0 sm:-right-6 bg-white rounded-[12px] border px-3.5 py-2.5" style={{ borderColor: HAIRLINE, ...revealFrom(230, 150) }}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-medium text-gray-500">Success Rate</span>
              </div>
              <div className="text-[18px] font-bold" style={{ color: '#0D2E1E' }}>95%</div>
            </div>
          </div>
        </div>

        {/* Right: header + vertical timeline */}
        <div className="order-1 lg:order-2">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3 text-[13px] font-medium tracking-[0.04em]" style={{ color: GREEN }}>
              <span>—</span>
              Internship Growth Path
              <span>—</span>
            </div>
            <h2 className="text-[34px] sm:text-[40px] font-semibold mb-3 leading-tight" style={{ color: INK, letterSpacing: '-0.03em' }}>
              From Background Assessment to Internship Applications, Every Step Has a Purpose
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: INK_MUTED }}>
              MentorX does more than help you find an internship. We plan around future career goals, strengthen experience, optimize materials, and turn each experience into long-term competitiveness.
            </p>
          </div>

          {/* Timeline steps — wrapped in white card */}
          <div
            className="flex w-full max-w-[520px] rounded-[16px] border px-5 py-4"
            style={{ background: SURFACE, borderColor: HAIRLINE }}
          >
            <div className="relative my-auto w-full">
              <div
                className="absolute left-[18px] top-[18px] bottom-[18px] w-px"
                style={{ background: 'rgba(0,168,112,0.18)' }}
              />
            {FLOW_STEPS_NEW.map(({ n, title, desc }) => (
              <div
                key={n}
                className="group relative grid grid-cols-[36px_1fr] items-center gap-4 py-2.5"
                onMouseEnter={() => setHoveredStep(n)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className="z-10 flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold transition-colors duration-200"
                  style={{
                    background: hoveredStep === n ? '#0D2E1E' : 'white',
                    color: hoveredStep === n ? 'white' : '#00A870',
                    border: `2px solid ${hoveredStep === n ? '#0D2E1E' : '#00A870'}`,
                  }}
                >
                  {n}
                </div>
                <div>
                  <div className="text-[14px] font-semibold leading-snug" style={{ color: INK }}>{title}</div>
                  <div className="text-[12px] mt-0.5 leading-relaxed" style={{ color: INK_MUTED }}>{desc}</div>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="mt-6">
            <Btn label="Learn More" onClick={onCTA} />
          </div>
        </div>

      </div>
    </Sec>
  );
}

// ── 6. Mentor Section ─────────────────────────────────────────────────────────

const MENTORS = [
  {
    name: 'Dijkstra W.',
    title: 'Google Tech Lead',
    company: 'Google',
    years: '5+ yrs',
    strength: 'Senior SDE, OA and full interview process',
    coaching: 'SDE technical interviews and project review',
    initials: 'DW',
    color: '#4285F4',
  },
  {
    name: 'Crystal Z.',
    title: 'Morgan Stanley FICC VP',
    company: 'Morgan Stanley',
    years: '6+ yrs',
    strength: 'Quant strategy and investment decision-making',
    coaching: 'Case interviews and investment analysis',
    initials: 'CZ',
    color: '#0076CF',
  },
  {
    name: 'Pengfei X.',
    title: 'IBM Principal Consultant',
    company: 'IBM',
    years: '20+ yrs',
    strength: 'Large-scale systems and project management experience',
    coaching: 'Consulting interviews and business analysis',
    initials: 'PX',
    color: '#006699',
  },
  {
    name: 'Hang Y.',
    title: 'TikTok Software Engineer',
    company: 'TikTok',
    years: '7 yrs',
    strength: 'Former Google engineer with campus recruiting experience',
    coaching: 'Algorithms and system design',
    initials: 'HY',
    color: '#010101',
  },
  {
    name: 'George Z.',
    title: 'Amazon Data Scientist',
    company: 'Amazon',
    years: '4 yrs',
    strength: 'Data role interview preparation',
    coaching: 'SQL and logic interviews',
    initials: 'GZ',
    color: '#FF9900',
  },
  {
    name: 'Anna Z.',
    title: 'Apple SWE Program Manager',
    company: 'Apple',
    years: '5 yrs',
    strength: 'Former Tesla, cross-functional collaboration experience',
    coaching: 'Project management and project review',
    initials: 'AZ',
    color: '#1d1d1f',
  },
  {
    name: 'Kevin L.',
    title: 'McKinsey Senior Associate',
    company: 'McKinsey',
    years: '6+ yrs',
    strength: 'Strategy consulting and McKinsey recruiting experience',
    coaching: 'Case interviews and resume polishing',
    initials: 'KL',
    color: '#003B71',
  },
  {
    name: 'Sophia R.',
    title: 'Meta Product Manager',
    company: 'Meta',
    years: '4 yrs',
    strength: 'Cross-functional product leader, PM interview coaching',
    coaching: 'PM interviews and product design questions',
    initials: 'SR',
    color: '#0866FF',
  },
  {
    name: 'Michael T.',
    title: 'JPMorgan Quant Analyst',
    company: 'JPMorgan',
    years: '8+ yrs',
    strength: 'Quant finance and financial engineering interview coaching',
    coaching: 'Technical and behavioral interviews',
    initials: 'MT',
    color: '#003087',
  },
  {
    name: 'Linda C.',
    title: 'Deloitte Senior Consultant',
    company: 'Deloitte',
    years: '5 yrs',
    strength: 'Audit and management consulting, Big Four recruiting experience',
    coaching: 'Case interviews and resume optimization',
    initials: 'LC',
    color: '#86BC25',
  },
];

const MENTOR_COMPANY_LOGOS: Record<string, string> = {
  Google: new URL('../../assets/mentor-company-logos-svg/Google__G__logo.svg', import.meta.url).href,
  'Morgan Stanley': new URL('../../assets/mentor-company-logos-svg/Morgan_Stanley_Logo_1.svg', import.meta.url).href,
  IBM: new URL('../../assets/mentor-company-logos-svg/IBM_Logo_1967-1972.svg', import.meta.url).href,
  TikTok: new URL('../../assets/mentor-company-logos-svg/Tiktok_logo_text.svg', import.meta.url).href,
  Amazon: new URL('../../assets/mentor-company-logos-svg/Amazon_2024.svg.png', import.meta.url).href,
  Apple: new URL('../../assets/mentor-company-logos-svg/Apple_logo_black.svg', import.meta.url).href,
  McKinsey: new URL('../../assets/mentor-company-logos-svg/McKinsey_Script_Mark_2019.svg', import.meta.url).href,
  Meta: new URL('../../assets/mentor-company-logos-svg/Meta_Platforms_Inc._logo_(cropped).svg', import.meta.url).href,
  JPMorgan: new URL('../../assets/mentor-company-logos-svg/Chase_logo_2007.svg', import.meta.url).href,
  Deloitte: new URL('../../assets/mentor-company-logos-svg/Logo_of_Deloitte.svg', import.meta.url).href,
};

function MentorLogoAvatar({ mentor }: { mentor: typeof MENTORS[0] }) {
  const logo = MENTOR_COMPANY_LOGOS[mentor.company];

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border bg-white"
      style={{ borderColor: 'rgba(0, 168, 112, 0.16)', boxShadow: '0 6px 14px rgba(16,35,29,0.08)' }}
    >
      {logo ? (
        <img src={logo} alt={mentor.company + ' logo'} className="max-w-[38px] max-h-[24px] object-contain" />
      ) : (
        <span className="px-1 text-center text-[9px] font-semibold leading-none" style={{ color: mentor.color }}>
          {mentor.company}
        </span>
      )}
    </div>
  );
}
function MentorCard({ mentor }: { mentor: typeof MENTORS[0] }) {
  return (
    <div
      className="group relative rounded-[14px] p-5 border border-[#DDD6CC] bg-white transition-all hover:-translate-y-0.5 hover:z-10 hover:border-[#00A870] w-full"
    >
      {/* Top: company logo avatar + name */}
      <div className="flex items-start gap-3 mb-4">
        <MentorLogoAvatar mentor={mentor} />
        <div className="flex-1 min-w-0 pr-1">
          <div className="text-[14px] font-semibold text-gray-900 leading-snug">{mentor.name}</div>
          <div className="text-[12px] text-gray-500 leading-snug mt-0.5">{mentor.title}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mb-3.5 bg-black/5" />

      {/* Detail rows */}
      <div className="space-y-2">
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#00A870" strokeWidth="1.5"/>
              <path d="M6 3v3l2 1.5" stroke="#00A870" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">Experience:</span>{mentor.years}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1.24 3.8H11L8.38 6.8l.95 3.2L6 8.2 2.67 10l.95-3.2L1 4.8h3.76L6 1z" fill="#00A870"/>
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">Strength:</span>{mentor.strength}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="4" r="2.5" stroke="#00A870" strokeWidth="1.5"/>
              <path d="M1.5 10.5c0-2.21 2.01-4 4.5-4s4.5 1.79 4.5 4" stroke="#00A870" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">Coaching:</span>{mentor.coaching}
          </div>
        </div>
      </div>
    </div>
  );
}

function MentorSection({ onCTA }: { onCTA: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const speed = 0.6; // px per frame
    const half = el.scrollWidth / 2;

    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section id="mentors" className="py-20 overflow-hidden" style={{ background: 'white' }}>
      {/* Header — constrained */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-10">
        <SecHead
          eyebrow="Industry Mentor Support"
          title="Let Industry Mentors Help You Build More Valuable Internship Experience"
          sub="Mentors come from tech, finance, consulting, data, and other high-demand fields. They understand real internship expectations and help students learn industry standards earlier."
          center
        />
      </div>

      {/* Full-bleed auto-scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4"
        style={{
          overflowX: 'hidden',
          paddingTop: '8px',
          paddingBottom: '8px',
          marginTop: '-8px',
        }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {[...MENTORS, ...MENTORS].map((mentor, i) => (
          <div key={i} style={{ flexShrink: 0, width: '272px', alignSelf: 'stretch', display: 'flex' }}>
            <MentorCard mentor={mentor} />
          </div>
        ))}
      </div>

      <div className="hidden text-center mt-10 md:block">
        <Btn label="Match With a Mentor" onClick={onCTA} size="lg" />
      </div>
    </section>
  );
}

// ── 7. Testimonials proof grid ────────────────────────────────────────────────

function TestimonialsSection({ onCTA }: { onCTA: () => void }) {
  const cards = TESTIMONIALS.slice(0, 5);
  const [activeName, setActiveName] = useState(cards[0].name);
  const [activeColumn, setActiveColumn] = useState(0);
  const activeIndex = Math.max(0, cards.findIndex(card => card.name === activeName));
  const gridTemplateColumns = [
    'minmax(0,1.56fr) minmax(0,0.74fr) minmax(0,0.74fr)',
    'minmax(0,0.74fr) minmax(0,1.56fr) minmax(0,0.74fr)',
    'minmax(0,0.74fr) minmax(0,0.74fr) minmax(0,1.56fr)',
  ][activeColumn];

  const smallColumns = (() => {
    if (activeColumn === 0) {
      return [activeIndex === 0 ? [1, 3] : [0, 1], [2, 4]];
    }
    if (activeColumn === 1) {
      return [[0, activeIndex === 1 ? 3 : 1], [2, 4]];
    }
    return [[0, 1], [activeIndex === 2 ? 3 : 2, activeIndex === 2 ? 4 : 3]];
  })();

  const SmallCard = ({ index, column }: { index: number; column: number }) => {
    const card = cards[index];
    return (
      <div
        onMouseEnter={() => {
          setActiveName(card.name);
          setActiveColumn(column);
        }}
        className="relative flex h-full min-h-0 flex-col justify-between rounded-[14px] border p-5"
        style={{
          background: 'rgba(255,255,255,0.72)',
          borderColor: HAIRLINE,
          transition: 'border-color 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 420ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <p className="mb-4 text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>「{card.quote}」</p>
        <div className="border-t pt-3" style={{ borderColor: '#ECE5DD' }}>
          <div className="text-[13px] font-semibold" style={{ color: INK }}>{card.name}</div>
          <div className="mt-0.5 text-[11px]" style={{ color: GREEN }}>{card.tag}</div>
        </div>
      </div>
    );
  };

  const BigCard = () => {
    const card = cards[activeIndex];
    return (
      <div
        onMouseEnter={() => setActiveName(card.name)}
        className="relative flex min-h-[420px] flex-col rounded-[16px] border p-6 sm:p-8"
        style={{
          background: SURFACE,
          borderColor: GREEN,
          transition: 'border-color 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 420ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="mb-5 text-[64px] leading-none select-none" style={{ color: 'rgba(0,168,112,0.14)', fontFamily: 'Georgia, serif' }}>
          &ldquo;
        </div>
        <p className="mb-6 text-[18px] leading-relaxed" style={{ color: INK }}>
          「{card.quote}」
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t pt-4" style={{ borderColor: '#ECE5DD' }}>
          <div>
            <div className="text-[15px] font-semibold" style={{ color: INK }}>{card.name}</div>
            <div className="text-[13px] mt-1" style={{ color: GREEN }}>{card.tag}</div>
          </div>
          <div className="hidden rounded-[999px] px-3 py-1 text-[12px] font-medium sm:block" style={{ background: '#E8F5F0', color: GREEN_DARK }}>
            Representative Case
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: MINT_BAND }} className="py-16" id="success">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-8 [&>div]:mb-0">
          <SecHead
            eyebrow="Student Stories"
            title="Every Internship Has a Path Worth Learning From"
            sub="From no relevant experience to a first internship, and from a weaker background to stronger opportunities, direction, preparation, and feedback help students turn experience into competitiveness."
            center
          />
        </div>

        <div
          className="hidden gap-4 lg:grid"
          style={{
            gridTemplateColumns,
            transition: 'grid-template-columns 520ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {[0, 1, 2].map(column => (
            <div
              key={column}
              className={column === activeColumn ? 'grid min-h-[420px] gap-4' : 'grid min-h-[420px] grid-rows-2 gap-4'}
            >
              {column === activeColumn ? (
                <BigCard />
              ) : (
                smallColumns[column < activeColumn ? column : column - 1].map(index => (
                  <SmallCard key={cards[index].name} index={index} column={column} />
                ))
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:hidden">
          <BigCard />
          {cards.filter((_, index) => index !== activeIndex).map(card => (
            <SmallCard key={card.name} index={cards.findIndex(item => item.name === card.name)} column={0} />
          ))}
        </div>

        <div className="hidden text-center mt-8 md:block">
          <Btn label="View Cases" onClick={onCTA} />
        </div>
      </div>
    </section>
  );
}


// ── 9. Partners ───────────────────────────────────────────────────────────────

const BRAND_CARDS = [
  {
    number: '4200+',
    title: 'Company & Internship Resources',
    desc: 'Covers in-person overseas internships, remote internships, summer programs, and background-building opportunities.',
  },
  {
    number: '11+ yrs',
    title: 'International Student Service Experience',
    desc: 'Understands the unique challenges international students face around status, timing, and experience building.',
  },
  {
    number: '1V1',
    title: 'Top-Company Mentor Guidance',
    desc: 'Resume, project, and interview communication guidance around your target industry.',
  },
  {
    number: 'Offer',
    title: 'From Internship to Full-Time',
    desc: 'We consider not only the current internship, but also future full-time applications and OPT/H-1B timing.',
  },
];

function BrandSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Sec bg="white" id="aboutus">
      <div className="text-center mb-8">
        <SecHead
            eyebrow="Why MentorX"
            title={<>Better Targeting. Stronger Profiles. Higher Response. <span className="whitespace-nowrap"></span></>}
            sub="MentorX supports international students across internships, career pivots, and early career planning, combining mentor expertise and opportunity resources to help students move faster with a clearer strategy."
            center
          />
      </div>

      <div className="grid gap-4 mb-6 md:mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {BRAND_CARDS.map(({ number, title, desc }) => (
          <div
            key={title}
            className="rounded-[14px] p-5 sm:p-6 flex min-h-[160px] flex-col border border-[#DDD6CC] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00A870] hover:shadow-[0_18px_42px_rgba(16,35,29,0.08)]"
            style={{ background: SURFACE }}
          >
            <div className="mb-3 text-[26px] font-bold leading-none tracking-[-0.04em] sm:text-[30px]" style={{ color: GREEN }}>
              {number}
            </div>
            <div className="text-[15px] font-semibold text-gray-900 mb-2">{title}</div>
            <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Btn label="Book a Free Consultation" onClick={onCTA} size="lg" />
      </div>
    </Sec>
  );
}


// ── 11. Footer CTA ────────────────────────────────────────────────────────────

function FooterCTASection({ onCTA }: { onCTA: () => void }) {
  return (
    <section style={{ background: MINT_BAND }} className="py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[12px] font-medium tracking-[0.06em]" style={{ color: GREEN }}>
              Start Planning
            </div>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-tight mb-5" style={{ color: INK, letterSpacing: '-0.03em' }}>
              <span className="block">Don’t Let the Time Pass With </span>
              <span className="block"> <span className="whitespace-nowrap" style={{ color: GREEN }}>Only Good Intentions.</span></span>
            </h2>
            <p className="text-[15px] mb-0 max-w-xl leading-relaxed md:mb-9" style={{ color: INK_MUTED }}>
              Not sure which internships to target? Missing relevant experience? Worried about summer timelines? Start with a free profile review and identify the next move that matters most.
            </p>
            <button
              onClick={onCTA}
              className="hidden md:inline-flex h-12 items-center justify-center rounded-[10px] px-8 text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]"
              style={{
                background: GREEN,
                boxShadow: '0 8px 24px rgba(0,168,112,0.18)',
              }}
            >
              Book a Free Assessment
            </button>
          </div>

          {/* QR card */}
          <div className="hidden bg-white rounded-[14px] p-6 w-full max-w-[260px] flex-shrink-0 border justify-self-start lg:block lg:justify-self-end" style={{ borderColor: 'rgba(0,168,112,0.14)' }}>
            <div className="text-[13px] font-semibold text-gray-900 mb-1 leading-snug">Scan to Get a Personalized Career Plan</div>
            <div className="text-[11px] text-gray-400 mb-4 leading-relaxed">Get role resources, resume advice, and a job-search timeline</div>
            <div className="flex justify-center mb-3">
              <QRCodeSVG size={126} />
            </div>
            <div className="text-center text-[11px] text-gray-400 mb-0.5">
              WeChat：<span className="font-semibold text-gray-800">{WEIXIN_ID}</span>
            </div>
            <div className="text-center text-[10px] text-gray-400 leading-tight">
              MentorX advisors help guide your career journey
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer className="py-4" style={{ background: CANVAS }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <img
          src={logoImg}
          alt="蔓藤教育 MentorX"
          width={540}
          height={326}
          className="h-8 w-auto object-contain sm:h-9"
        />
        <div className="text-[12px]" style={{ color: INK_MUTED }}>
         ©2026, 蔓藤教育MentorX Corporation. All Rights Reserved · Focused on U.S. career coaching for international students
        </div>
      </div>
    </footer>
  );
}

// ── Floating CTA (desktop) ────────────────────────────────────────────────────

function FloatingCTA({ onCTA }: { onCTA: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <button
      onClick={onCTA}
      className="hidden md:flex fixed right-5 bottom-8 z-40 flex-col items-center gap-1.5 transition-all duration-300"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
        style={{ background: '#00A870' }}
      >
        <MessageCircle size={18} color="white" />
      </div>
      <div
        className="text-[10px] font-medium text-gray-600 bg-white px-2.5 py-1 rounded-full shadow-md border"
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
      >
        Contact MentorX
      </div>
    </button>
  );
}

// ── Mobile bottom bar ─────────────────────────────────────────────────────────

function MobileBar({ onCTA }: { onCTA: () => void }) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        borderTop: `1px solid ${HAIRLINE}`,
      }}
    >
      <button
        onClick={onCTA}
        className="w-full h-12 rounded-[10px] text-white text-[15px] font-semibold transition-all active:scale-[0.98]"
        style={{ background: '#00A870' }}
      >
        Book a Free Consultation
      </button>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const NavBar = ShortVersionNav;

// ── Root ──────────────────────────────────────────────────────────────────────

export function Internship() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.location.assign(WEIXIN_URL);
      return;
    }

    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  return (
    <div className="overflow-x-hidden" style={{ background: CANVAS, fontFamily: "'Plus Jakarta Sans', 'Noto Sans SC', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes tickerLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tickerRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes heroBadgeFloat {
          0%, 100% { transform: translate3d(0, var(--hero-scroll-y, 0px), 0); }
          50% { transform: translate3d(0, calc(var(--hero-scroll-y, 0px) - 9px), 0); }
        }
        @keyframes heroBadgeGlow {
          0%, 100% { filter: drop-shadow(0 6px 14px rgba(16,35,29,0.06)); }
          50% { filter: drop-shadow(0 12px 22px rgba(0,168,112,0.12)); }
        }
        @keyframes heroBadgeIconPulse {
          0%, 100% { transform: scale(1); background: #E8F5F0; }
          50% { transform: scale(1.08); background: #DDF8EC; }
        }
        .hero-float-badge {
          animation: heroBadgeFloat 5.2s ease-in-out infinite, heroBadgeGlow 5.4s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, filter;
        }
        .hero-badge-icon {
          animation: heroBadgeIconPulse 3.8s ease-in-out infinite;
          will-change: transform, background;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-float-badge,
          .hero-badge-icon {
            animation: none !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      <NavBar onCTA={open} langHref="/internship-short-version" langLabel="中文" ctaLabel="Book a Free Consultation" />
      <div className="h-16" aria-hidden="true" />
      <HeroSection onCTA={open} />
      {/* <StatsSection /> */}
      <PainPointsSection onCTA={open} />
      <InternshipActionPathSection onCTA={open} />
      {/* <WhyMentorXSection onCTA={open} /> */}
      {/* <MentorSection onCTA={open} /> */}
      {/* <TestimonialsSection onCTA={open} /> */}
      <BrandSection onCTA={open} />
      <FooterCTASection onCTA={open} />
      <SiteFooter />

      <FloatingCTA onCTA={open} />
      <MobileBar onCTA={open} />
      <div className="md:hidden h-[68px]" />

      <WeChatModal isOpen={modalOpen} onClose={close} />
    </div>
  );
}
