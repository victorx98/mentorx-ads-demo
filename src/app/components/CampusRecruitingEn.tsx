import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  X, MessageCircle, Check, Clock, Users, TrendingUp, Building2,
  Users2, Sparkles, Route, Database, ArrowLeftRight,
} from 'lucide-react';
import logoImg from '../../imports/mentorx-logo.svg';
import wechatQrImg from '../../imports/wechat-qr.svg';
import heroBannerImg from '../../imports/mentorx-hero-male.webp';
import { getLatestCtaSource, trackCTAIntent, trackQrModalEngaged, trackQrModalOpen } from '../analytics';

const WEIXIN_URL = 'https://work.weixin.qq.com/ca/cawcdefad5934f25ca';
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
  { name: 'Goldman Sachs', src: new URL('../../assets/company-logos-green/Goldman_Sachs_logo.svg', import.meta.url).href },
  { name: 'BCG', src: new URL('../../assets/company-logos-green/Boston_Consulting_Group_2020_logo.svg', import.meta.url).href },
  { name: 'NVIDIA', src: new URL('../../assets/company-logos-green/NVIDIA_logo.svg', import.meta.url).href },
  { name: 'IBM', src: new URL('../../assets/company-logos-green/IBM_logo.svg', import.meta.url).href },
  { name: 'Intel', src: new URL('../../assets/company-logos-green/Intel_logo_2023.svg', import.meta.url).href },
  { name: 'TikTok', src: new URL('../../assets/company-logos-green/TikTok-Logomark&Wordmark-Logo.wine.svg', import.meta.url).href },
  { name: 'Walmart', src: new URL('../../assets/company-logos-green/Walmart_logo_(2025;_Alt).svg', import.meta.url).href },
  { name: 'KPMG', src: new URL('../../assets/company-logos-green/KPMG_blue_logo.svg', import.meta.url).href },
  { name: 'EY', src: new URL('../../assets/company-logos-green/EY_logo_2019.svg', import.meta.url).href },
  { name: 'Intuit', src: new URL('../../assets/company-logos-green/Intuit_Logo.svg', import.meta.url).href },
];

const PILLARS = [
  {
    icon: Users2,
    title: 'Mentors from top employers',
    desc: '1:1 with practitioners across tech, finance, consulting, and leading China-based firms.',
  },
  {
    icon: Sparkles,
    title: 'AI-powered curriculum',
    desc: '25 live hours plus 150+ recorded hours, kept current with real tools and interview formats.',
  },
  {
    icon: Route,
    title: 'End-to-end job support',
    desc: 'Résumé, interviews, referrals, applications — every stage has an owner.',
  },
  {
    icon: Database,
    title: 'Resources at scale',
    desc: 'Role database, prep library, and referral network on both sides of the Pacific.',
  },
];

const STATS = [
  { id: 'years',     target: 11,    suffix: '+ yrs', label: 'of overseas career support' },
  { id: 'students',  target: 33000, suffix: '+',     label: 'students served',            thousands: true },
  { id: 'rate',      target: 95,    suffix: '%',     label: 'approximate placement rate' },
  { id: 'resources', target: 4200,  suffix: '+',     label: 'partner roles across the US and China', thousands: true },
];

const CHALLENGES = [
  {
    n: '01', title: 'Two calendars, one you',
    desc: 'US recruiting opens August to October; China’s fall season starts in September and spring in March. Miss one and you have halved your options.',
    solution: 'One calendar built backward from your graduation date, with both markets on it and a clear focus each month.',
  },
  {
    n: '02', title: 'Undecided on the market',
    desc: 'Students postpone the stay-or-return decision until senior year, then arrive underprepared for both.',
    solution: 'A dual-market assessment across major, visa status, family, and hiring conditions — pick a primary, keep the backup real.',
  },
  {
    n: '03', title: 'Thin internship record',
    desc: 'Campus recruiting rewards relevant internships, and there is no project worth leading with.',
    solution: 'One-month remote internships on each side, filling the single most important line on your résumé.',
  },
  {
    n: '04', title: 'One résumé, two markets',
    desc: 'US résumés and Chinese CVs differ in format, length, and the systems that read them.',
    solution: 'Two résumé versions plus separate LinkedIn and China-platform optimization — the right format for each market.',
  },
  {
    n: '05', title: 'Different interview formats',
    desc: 'OAs, behavioral, and case on one side; group and structured interviews on the other.',
    solution: 'Market-specific drilling plus two targeted mock interviews with round-by-round feedback.',
  },
  {
    n: '06', title: 'Low application yield',
    desc: 'Hundreds of solo applications, no replies, and no read on where it is breaking down.',
    solution: 'Smart role filtering plus up to 500 managed submissions, backed by referrals and periodic reviews.',
  },
];

const US_TRACK = {
  flag: '🇺🇸',
  name: 'US Track',
  tagline: 'Build a globally competitive profile',
  items: [
    { title: 'US remote internship (1 month)', desc: 'Real project work in a US setting.' },
    { title: 'Remote internship at a US brand-name employer (1 month)', desc: 'An overseas project line your résumé can lead with.' },
    { title: 'US job track', desc: 'Targeted role recommendations｜1:1 mentoring｜LinkedIn optimization｜US-style interview training.' },
  ],
};

const CN_TRACK = {
  flag: '🇨🇳',
  name: 'China Track',
  tagline: 'Build a home-market advantage',
  items: [
    { title: 'Remote internship at a leading China-based employer (1 month)', desc: 'Get fluent in the domestic workplace and build sector experience.' },
    { title: 'China job track', desc: 'In-depth industry mentoring｜online-application optimization and referrals｜structured-interview training｜domestic calendar guidance.' },
  ],
};

const STEPS = [
  { n: '01', title: '1:1 mentoring (15 sessions)', points: ['10 sessions with industry mentors', '5 sessions on overall readiness'] },
  { n: '02', title: 'AI-powered live series (25 sessions)', points: ['Finance / CS / BA / business', 'Hands-on AI coursework'] },
  { n: '03', title: 'Application documents (2 reviews)', points: ['Résumé rewrite｜cover letter', 'LinkedIn optimization'] },
  { n: '04', title: 'Prep library', points: ['BQ bank with model answers', '150+ recorded hours by sector'] },
  { n: '05', title: 'Mock interviews and technique', points: ['2 targeted mock rounds', 'Past-question breakdowns'] },
  { n: '06', title: 'Proprietary mock-interview platform', points: ['Unlimited reps｜AI scoring', 'Mentor feedback on each pass'] },
  { n: '07', title: 'Unlimited advisor access', points: ['Application guidance｜tactics', 'Workplace-culture questions'] },
  { n: '08', title: 'Role-matching platform', points: ['Large role database｜smart matching', 'One-click apply'] },
  { n: '09', title: '20 mentor referrals', points: ['Matched to roles that fit', 'Minimum of 20 guaranteed'] },
  { n: '10', title: 'Up to 500 managed applications', points: ['AI-assisted submission', 'Ongoing résumé tuning'] },
];

const INCLUDED = [
  'A dedicated career advisor throughout',
  'Application guidance and managed submissions (unlimited, up to 25/week)',
  'Job-platform account setup',
  'Application-data consolidation',
  'Referrals (BD and corporate mentors)',
  'Interview practice (intro, behavioral, video)',
  'Emotional support through the search',
];

const TESTIMONIALS = [
  {
    quote: 'I was applying in the US and China at the same time. My mentor put both calendars on one sheet, and that’s when I saw those two weeks in September were the whole game.',
    name: 'Jess W.',
    tag: 'CMU CS → Google SWE',
  },
  {
    quote: 'Chinese online applications are written nothing like a US résumé. After the rewrite, the response rate was visibly different.',
    name: 'Ruoxi T.',
    tag: 'UIUC Business → ByteDance Data Analyst',
  },
  {
    quote: 'I had never done a group or structured interview. We drilled a few rounds, and I passed the first real one.',
    name: 'Kevin H.',
    tag: 'UT Austin CS → Tencent Backend Engineer',
  },
  {
    quote: 'Referrals actually work. Three months of applying on my own went nowhere; two weeks after a referral I was in process.',
    name: 'Michael L.',
    tag: 'Columbia Finance → JPMorgan',
  },
  {
    quote: 'That one month of internship gave me the strongest thing on my résumé. Half my interviews were spent on it.',
    name: 'Tina X.',
    tag: 'UCLA Statistics → Meta Data Analyst',
  },
  {
    quote: 'I ended up choosing between offers on both sides. That feels nothing like taking whatever comes.',
    name: 'Brian W.',
    tag: 'USC Business → BCG Associate',
  },
];

const MENTORS = [
  {
    name: 'Dijkstra W.', title: 'Google Tech Lead', company: 'Google', years: '5+ yrs',
    strength: 'Principal SDE, full OA-to-onsite pipeline', coaching: 'SDE technical interviews, project reviews', color: '#4285F4',
  },
  {
    name: 'Yuxin L.', title: 'ByteDance Data Analytics Lead', company: 'ByteDance', years: '7+ yrs',
    strength: 'China campus interviewer, full fall-season cycles', coaching: 'China data roles, structured interviews', color: '#3C8CFF',
  },
  {
    name: 'Crystal Z.', title: 'Morgan Stanley FICC VP', company: 'Morgan Stanley', years: '6+ yrs',
    strength: 'Quant strategy and investment decisions', coaching: 'Case interviews, investment analysis', color: '#0076CF',
  },
  {
    name: 'Haoran S.', title: 'CICC Investment Banking VP', company: 'CICC', years: '9+ yrs',
    strength: 'China finance campus and summer-analyst selection', coaching: 'Sector research, group and structured interviews', color: '#B01F24',
  },
  {
    name: 'Hang Y.', title: 'TikTok Software Engineer', company: 'TikTok', years: '7 yrs',
    strength: 'Ex-Google engineer, campus recruiting panels', coaching: 'Algorithms, system design', color: '#010101',
  },
  {
    name: 'Kevin L.', title: 'McKinsey Senior Associate', company: 'McKinsey', years: '6+ yrs',
    strength: 'Strategy consulting, McKinsey recruiter experience', coaching: 'Case interviews, résumé polish', color: '#003B71',
  },
  {
    name: 'George Z.', title: 'Amazon Data Scientist', company: 'Amazon', years: '4 yrs',
    strength: 'Target-role interview preparation for data', coaching: 'SQL, analytical interviews', color: '#FF9900',
  },
  {
    name: 'Sophia R.', title: 'Meta Product Manager', company: 'Meta', years: '4 yrs',
    strength: 'Cross-functional product lead', coaching: 'PM interviews, product design questions', color: '#0866FF',
  },
  {
    name: 'Michael T.', title: 'JPMorgan Quant Analyst', company: 'JPMorgan', years: '8+ yrs',
    strength: 'Quantitative finance and financial engineering', coaching: 'Technical and behavioral interviews', color: '#003087',
  },
  {
    name: 'Linda C.', title: 'Deloitte Senior Consultant', company: 'Deloitte', years: '5 yrs',
    strength: 'Audit and management consulting, Big 4 campus hiring', coaching: 'Case interviews, résumé optimization', color: '#86BC25',
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

const BRAND_CARDS = [
  {
    number: '01', label: 'Data Insight', title: 'Data insight',
    desc: 'Student outcomes and role trends from both markets, applied to choosing your primary track.',
  },
  {
    number: '02', label: 'AI Matching', title: 'AI matching',
    desc: 'Résumé, project, and role-fit analysis so preparation stays focused and efficient.',
  },
  {
    number: '03', label: 'Dual Network', title: 'Dual network',
    desc: 'US and China roles and mentors open at once, so you never have to trade one away early.',
  },
];

// ── QR Code ───────────────────────────────────────────────────────────────────

function QRCodeSVG({ size = 140 }: { size?: number }) {
  return (
    <img
      src={wechatQrImg}
      alt="Scan to reach a MentorX advisor on WeChat"
      width={size}
      height={size}
      className="block rounded-[3px] bg-white object-contain"
      style={{ width: size, height: size, aspectRatio: '1 / 1' }}
    />
  );
}

// ── WeChat Modal ──────────────────────────────────────────────────────────────

function WeChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const source = getLatestCtaSource();
    trackQrModalOpen(source);
    const engagedTimer = window.setTimeout(() => {
      trackQrModalEngaged(source, 10);
    }, 10000);

    return () => window.clearTimeout(engagedTimer);
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
          className="rounded-t-2xl px-7 pt-7 pb-5 text-[#10231D] text-center"
          style={{ background: 'linear-gradient(180deg, #EAF8F1 0%, #F5FCF8 100%)', borderBottom: '1px solid rgba(0, 168, 112, 0.10)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-full bg-[#10231D]/8 hover:bg-[#10231D]/12 text-[#10231D] transition-colors"
            aria-label="Close dialog"
          >
            <X size={14} />
          </button>
          <div className="text-[10px] font-medium tracking-[0.14em] opacity-50 mb-2.5 uppercase">MentorX</div>
          <h3 className="mb-2 text-[20px] font-semibold leading-snug">Scan for your<span className="mx-1 inline-flex -translate-y-px items-center rounded-full bg-[#DFF5EC] px-2.5 py-0.5 text-[#00A870] shadow-[inset_0_0_0_1px_rgba(0,168,112,0.12)]">free</span>recruiting timeline</h3>
          <p className="text-[13px] opacity-70 leading-relaxed">Roles on both sides, résumé notes, and a stage-by-stage task list</p>
        </div>

        <div className="px-7 py-6 text-center">
          <div className="inline-flex items-center justify-center mb-5">
            <QRCodeSVG size={190} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-0">
            <span className="text-gray-400 text-[12px]">WeChat ID</span>
            <span className="font-semibold text-gray-900 text-[13px] bg-gray-100 px-3 py-1 rounded-full tracking-wide">
              {WEIXIN_ID}
            </span>
          </div>
        </div>

        <div className="pb-5 text-center text-[11px] text-gray-400">
          MentorX mentors, with you through the whole search
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
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div
          className="inline-flex items-center gap-2 mb-3.5 text-[13px] font-medium tracking-[0.04em]"
          style={{ color: GREEN }}
        >
          <span>—</span>
          {eyebrow}
          <span>—</span>
        </div>
      )}
      <h2
        className={`text-[28px] sm:text-[36px] font-semibold leading-tight ${center ? 'mx-auto' : ''}`}
        style={{ maxWidth: center ? '760px' : '680px', color: INK, letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-[15px] leading-relaxed max-w-xl" style={{ color: INK_MUTED, marginLeft: center ? 'auto' : undefined, marginRight: center ? 'auto' : undefined }}>
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
        style={{ animation: `${reverse ? 'tickerRight' : 'tickerLeft'} ${speed}s linear infinite` }}
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
  size = 'md',
  className = '',
}: {
  label: string;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'h-9 px-5 text-[13px]',
    md: 'h-11 px-6 text-[14px]',
    lg: 'h-12 px-8 text-[15px]',
  };

  return (
    <button
      onClick={onClick}
      className={`hidden md:inline-flex items-center justify-center rounded-[10px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A870] ${sizes[size]} ${className}`}
      style={{ background: GREEN }}
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
        <Check size={11} color={GREEN} strokeWidth={3} />
      </div>
      <div>
        <div className="text-[13px] font-medium text-gray-900 leading-tight">{text}</div>
        {sub && <div className="text-[12px] text-gray-400 mt-0.5 leading-tight">{sub}</div>}
      </div>
    </div>
  );
}

// ── 1. Hero + Ticker ──────────────────────────────────────────────────────────

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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-6 lg:pt-12 lg:pb-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(250px,0.86fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] lg:gap-8 items-center min-w-0">
          {/* Left: copy */}
          <div className="order-1 min-w-0" style={{ maxWidth: 'clamp(0px, calc(100vw - 40px), 34rem)' }}>
            <div
              className="inline-flex items-center gap-2 mb-4 px-3.5 py-2 rounded-[10px] text-[13px] font-medium border"
              style={{
                borderColor: 'rgba(0,168,112,0.25)',
                color: GREEN_DARK,
                background: 'rgba(255,255,255,0.74)',
              }}
            >
              Dual-Track Campus Recruiting
            </div>

            <h1
              className="font-semibold leading-[1.1] mb-4 text-[30px] md:hidden"
              style={{ color: INK, letterSpacing: '-0.04em', maxWidth: 'clamp(0px, calc(100vw - 40px), 34rem)' }}
            >
              You get one campus season.<br />
              Don&rsquo;t bet it on <span style={{ color: GREEN }}>one market</span>.
            </h1>

            <h1
              className="hidden font-semibold leading-[1.1] mb-4 md:block md:text-[36px] lg:text-[48px]"
              style={{ color: INK, letterSpacing: '-0.04em', maxWidth: 'clamp(0px, calc(100vw - 40px), 34rem)' }}
            >
              You get one campus season.<br />
              Don&rsquo;t bet it on <span style={{ color: GREEN }}>one market</span>.
            </h1>

            <p className="hidden text-[17px] leading-relaxed mb-5 max-w-[19rem] sm:max-w-md md:block" style={{ color: INK_MUTED }}>
              From sophomore or first-year-master&rsquo;s onward, prepare for the US and China recruiting calendars in parallel — target roles, internships, résumé, interviews — in one guided system.
            </p>

            <div className="mb-3 md:mb-4">
              <button
                onClick={onCTA}
                className="inline-flex h-12 items-center justify-center rounded-[10px] px-8 text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A870]"
                style={{ background: GREEN, boxShadow: '0 4px 20px rgba(0,168,112,0.3)' }}
              >
                Get a free recruiting review
              </button>
            </div>

            <p className="hidden text-[13px] font-semibold mb-6 md:block" style={{ color: INK_MUTED }}>
              30-minute 1:1 assessment｜your target market, your timeline, and the one thing to fix first
            </p>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-6 sm:text-[15px]">
              {['11+ years', '33,000+ students', 'US + China pipelines'].map(t => (
                <div
                  key={t}
                  className="flex min-w-0 items-center justify-center gap-1 rounded-[10px] border bg-white/85 px-1.5 py-2 text-center shadow-[0_8px_20px_rgba(16,35,29,0.04)] sm:justify-start sm:gap-2 sm:whitespace-nowrap sm:border-0 sm:bg-transparent sm:p-0 sm:text-left sm:shadow-none"
                  style={{ borderColor: 'rgba(0,168,112,0.12)' }}
                >
                  <Check className="h-2.5 w-2.5 flex-shrink-0 sm:h-3.5 sm:w-3.5" color={GREEN} strokeWidth={2.5} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + badges */}
          <div className="order-2 flex justify-center md:justify-end min-w-0">
            <div className="relative w-full max-w-[350px] sm:max-w-[380px] md:w-[clamp(280px,38vw,420px)] md:max-w-none rounded-[16px]" style={{ boxShadow: '0 16px 48px rgba(17,24,39,0.08)' }}>
              <div className="relative aspect-square overflow-hidden rounded-[16px] md:aspect-[3/4]" style={{ maxHeight: '520px' }}>
                <img
                  src={HERO_IMG}
                  alt="International student preparing for campus recruiting"
                  width={900}
                  height={1125}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/4"
                  style={{ background: 'linear-gradient(to top, rgba(13,46,30,0.35) 0%, transparent 100%)' }}
                />
              </div>

              <Badge text="US + China job pipelines" className="-top-3 left-0 sm:-left-8" style={heroTagStyle(-28, -0.15)} />
              <Badge
                text="1:1 mentors · 15 sessions"
                sub="Tech · Finance · Consulting"
                className="hidden sm:flex sm:top-[28%] sm:-right-8"
                style={heroTagStyle(26, -1.15)}
              />
              <Badge text="Timeline planned back from graduation" className="bottom-[18%] left-0 sm:-left-8" style={heroTagStyle(24, -2.05)} />

              <div
                className="hero-float-badge block absolute bottom-4 right-2 sm:bottom-7 sm:-right-1 bg-white rounded-[10px] border px-3 py-2 sm:px-3.5 sm:py-2.5"
                style={{ borderColor: HAIRLINE, boxShadow: '0 10px 28px rgba(17,24,39,0.08)', ...heroTagStyle(-22, -0.75) }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-gray-500">Offer received</span>
                </div>
                <div className="text-[13px] font-semibold text-gray-900">Google SWE</div>
                <div className="text-[11px] text-gray-400">New York, NY</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-6">
        <div className="flex items-center gap-2 text-[13px] font-medium mb-4" style={{ color: '#6b9e86' }}>
          Connecting universities, employers, and industry mentors across the US and China
        </div>
        <Ticker items={COMPANY_LOGOS} speed={95} />
      </div>
    </section>
  );
}

// ── 2. Four pillars ───────────────────────────────────────────────────────────

function PillarsSection() {
  return (
    <section style={{ background: CANVAS }} className="pb-10 sm:pb-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid gap-3 rounded-[16px] border bg-white p-5 sm:p-6 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: HAIRLINE, boxShadow: '0 14px 44px rgba(17,24,39,0.06)' }}>
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-[12px] border p-4" style={{ borderColor: '#ECE5DD' }}>
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-[10px]" style={{ background: '#EAF8F1' }}>
                <Icon size={20} color={GREEN} />
              </div>
              <h3 className="mb-1.5 text-[15px] font-semibold" style={{ color: INK }}>{title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>{desc}</p>
            </div>
          ))}
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
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);
  return value;
}

// ── 3. Stats ──────────────────────────────────────────────────────────────────

function StatCard({
  target, suffix, label, thousands, icon, triggered,
}: {
  target: number; suffix: string; label: string;
  thousands?: boolean; icon: ReactNode; triggered: boolean;
}) {
  const val = useCountUp(target, 1800, triggered);
  const display = thousands ? val.toLocaleString() : String(val);

  return (
    <div className="flex flex-col items-center text-center px-3 py-4 sm:px-5 sm:py-6 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.78)' }}>
      <div className="hidden w-10 h-10 rounded-[10px] items-center justify-center mb-3 sm:flex" style={{ background: '#E8F5F0', color: GREEN }}>
        {icon}
      </div>
      <div className="text-[26px] sm:text-[34px] font-semibold leading-none mb-1 sm:mb-2 tabular-nums" style={{ color: GREEN_DARK, letterSpacing: '-0.03em' }}>
        {display}{suffix}
      </div>
      <div className="text-[11px] sm:text-[12px] leading-snug" style={{ color: INK_MUTED }}>{label}</div>
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
    const obs = new IntersectionObserver(([entry]) => setTriggered(entry.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} style={{ background: CANVAS }} className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-6">
          <SecHead eyebrow="Track record" title="11 years helping international students take their first career step" center />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(stat => (
            <StatCard key={stat.id} {...stat} icon={ICONS[stat.id]} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. Challenges ─────────────────────────────────────────────────────────────

function ChallengesSection() {
  return (
    <Sec id="solution" bg="white">
      <SecHead
        eyebrow="Challenges and approach"
        title="Recruiting across two markets: six problems you can't avoid"
        sub="Each one shapes your pace and your outcome. MentorX starts with a diagnosis, then closes the gaps so both paths stay open."
        center
      />
      <div className="grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHALLENGES.map(({ n, title, desc, solution }) => (
          <div
            key={n}
            className="flex h-full flex-col rounded-[14px] border overflow-hidden transition-all hover:-translate-y-0.5"
            style={{ borderColor: HAIRLINE, background: SURFACE }}
          >
            <div className="flex-1 px-6 pt-5 pb-3" style={{ background: SURFACE }}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-[15px] font-bold tracking-[0.08em]" style={{ color: GREEN }}>{n}</span>
                <h4 className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>{title}</h4>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>{desc}</p>
            </div>

            <div className="h-px" style={{ background: '#ECE5DD' }} />

            <div className="min-h-[124px] shrink-0 px-6 pt-3.5 pb-4" style={{ background: '#F8FBF8' }}>
              <div className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold tracking-wide" style={{ color: GREEN }}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: GREEN }}>
                  <Check size={9} color="white" strokeWidth={3} />
                </div>
                The MentorX approach
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#315C47' }}>{solution}</p>
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── 5. Dual track ─────────────────────────────────────────────────────────────

function TrackCard({ track, accent }: { track: typeof US_TRACK; accent: string }) {
  return (
    <div
      className="flex h-full flex-col rounded-[16px] border bg-white p-6 sm:p-7"
      style={{ borderColor: HAIRLINE, boxShadow: '0 16px 40px rgba(17,24,39,0.06)' }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-[12px] text-[22px] leading-none" style={{ background: '#EAF8F1' }}>
          <span aria-hidden="true">{track.flag}</span>
        </div>
        <div>
          <div className="text-[19px] font-semibold leading-tight" style={{ color: GREEN_DARK }}>{track.name}</div>
          <div className="text-[13px] mt-0.5" style={{ color: accent }}>{track.tagline}</div>
        </div>
      </div>

      <div className="space-y-3">
        {track.items.map(item => (
          <div key={item.title} className="rounded-[12px] border px-4 py-3.5" style={{ borderColor: '#ECE5DD', background: '#F8FBF8' }}>
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: GREEN }}>
                <Check size={9} color="white" strokeWidth={3} />
              </div>
              <div>
                <div className="text-[14px] font-semibold leading-snug" style={{ color: INK }}>{item.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DualTrackSection() {
  return (
    <Sec id="dual-track" bg={MINT_BAND} className="scroll-mt-16">
      <SecHead
        eyebrow="Why it works"
        title="One preparation, two markets in motion"
        sub="You don't have to bet early on staying or returning. Both tracks move at once, and you choose once the offers are in hand."
        center
      />

      <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <TrackCard track={US_TRACK} accent="#3E7CB1" />

        <div className="flex items-center justify-center py-2 lg:py-0">
          <div
            className="grid h-[128px] w-[128px] place-items-center rounded-full border text-center"
            style={{ background: GREEN_DARK, borderColor: 'rgba(0,168,112,0.35)', boxShadow: '0 18px 46px rgba(13,46,30,0.18)' }}
          >
            <div>
              <ArrowLeftRight size={20} color="#7FF0BE" className="mx-auto mb-1.5" />
              <div className="text-[15px] font-semibold leading-tight text-white">Dual<br />Track</div>
              <div className="mt-1 text-[11px]" style={{ color: '#9BE5C3' }}>Two ways in</div>
            </div>
          </div>
        </div>

        <TrackCard track={CN_TRACK} accent="#B0564F" />
      </div>
    </Sec>
  );
}

// ── 6. Ten steps ──────────────────────────────────────────────────────────────

function StepsSection() {
  return (
    <Sec id="steps" bg="white" className="scroll-mt-16">
      <SecHead
        eyebrow="How it works"
        title="Ten steps, guided end to end"
        sub="From mentoring to the final submission, every step has a defined deliverable and someone accountable for it."
        center
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map(({ n, title, points }) => (
          <div
            key={n}
            className="flex h-full flex-col rounded-[14px] border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#00A870]"
            style={{ borderColor: HAIRLINE }}
          >
            <div className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-[13px] font-bold" style={{ background: '#EAF8F1', color: GREEN }}>
              {n}
            </div>
            <h3 className="mb-3 text-[14px] font-semibold leading-snug" style={{ color: INK }}>{title}</h3>
            <ul className="mt-auto space-y-1.5">
              {points.map(point => (
                <li key={point} className="flex items-start gap-2 text-[12px] leading-relaxed" style={{ color: INK_MUTED }}>
                  <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full" style={{ background: GREEN }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── 7. Included services ──────────────────────────────────────────────────────

function IncludedSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Sec id="included" bg={CANVAS} className="scroll-mt-16">
      <div className="rounded-[16px] border bg-white p-6 sm:p-8" style={{ borderColor: 'rgba(0,168,112,0.14)', boxShadow: '0 16px 40px rgba(17,24,39,0.06)' }}>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
          <div>
            <div className="inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold" style={{ background: GREEN_DARK, color: 'white' }}>
              What&rsquo;s included
            </div>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: INK_MUTED }}>
              Everything below is part of the program, at no additional charge.
            </p>
            <div className="mt-5">
              <Btn label="See the full list" onClick={onCTA} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {INCLUDED.map(item => (
              <div key={item} className="flex items-start gap-3 rounded-[12px] px-4 py-3.5 text-[14px] font-medium" style={{ background: '#F2FBF7', color: INK }}>
                <Check size={17} color={GREEN} strokeWidth={2.6} className="mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sec>
  );
}

// ── 8. Mentors ────────────────────────────────────────────────────────────────

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
    <div className="group relative rounded-[14px] p-5 border border-[#DDD6CC] bg-white transition-all hover:-translate-y-0.5 hover:z-10 hover:border-[#00A870] w-full">
      <div className="flex items-start gap-3 mb-4">
        <MentorLogoAvatar mentor={mentor} />
        <div className="flex-1 min-w-0 pr-1">
          <div className="text-[14px] font-semibold text-gray-900 leading-snug">{mentor.name}</div>
          <div className="text-[12px] text-gray-500 leading-snug mt-0.5">{mentor.title}</div>
        </div>
      </div>

      <div className="h-px mb-3.5 bg-black/5" />

      <div className="space-y-2">
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#00A870" strokeWidth="1.5" />
              <path d="M6 3v3l2 1.5" stroke="#00A870" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">Experience: </span>{mentor.years}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1.24 3.8H11L8.38 6.8l.95 3.2L6 8.2 2.67 10l.95-3.2L1 4.8h3.76L6 1z" fill="#00A870" />
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">Focus: </span>{mentor.strength}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="4" r="2.5" stroke="#00A870" strokeWidth="1.5" />
              <path d="M1.5 10.5c0-2.21 2.01-4 4.5-4s4.5 1.79 4.5 4" stroke="#00A870" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">Coaches: </span>{mentor.coaching}
          </div>
        </div>
      </div>
    </div>
  );
}

function MentorSection() {
  return (
    <section id="mentors" className="py-10 md:py-14 overflow-hidden" style={{ background: MINT_BAND }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-6">
        <SecHead
          eyebrow="Mentors"
          title="Coached by the people who sit on the other side of the table"
          sub="Practitioners from tech, finance, consulting, and leading China-based employers who have run full campus cycles and know what each round actually screens for."
          center
        />
      </div>

      <div
        className="flex gap-4 overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory pb-2 [-webkit-overflow-scrolling:touch]"
        style={{ paddingTop: '8px', paddingBottom: '8px', marginTop: '-8px' }}
      >
        <div className="flex gap-4 lg:[animation:tickerLeft_52s_linear_infinite] lg:hover:[animation-play-state:paused]">
          {[...MENTORS, ...MENTORS].map((mentor, i) => (
            <div key={i} style={{ flexShrink: 0, width: '272px', alignSelf: 'stretch', display: 'flex', scrollSnapAlign: 'start' }}>
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 9. Testimonials ───────────────────────────────────────────────────────────

function TestimonialsSection() {
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
        <p className="mb-4 text-[13px] leading-relaxed" style={{ color: INK_MUTED }}>&ldquo;{card.quote}&rdquo;</p>
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
        className="relative flex min-h-[360px] flex-col rounded-[16px] border p-6 sm:p-8"
        style={{
          background: SURFACE,
          borderColor: GREEN,
          transition: 'border-color 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 420ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="mb-5 text-[64px] leading-none select-none" style={{ color: 'rgba(0,168,112,0.14)', fontFamily: 'Georgia, serif' }}>
          &ldquo;
        </div>
        <p className="mb-6 text-[18px] leading-relaxed" style={{ color: INK }}>&ldquo;{card.quote}&rdquo;</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t pt-4" style={{ borderColor: '#ECE5DD' }}>
          <div>
            <div className="text-[15px] font-semibold" style={{ color: INK }}>{card.name}</div>
            <div className="text-[13px] mt-1" style={{ color: GREEN }}>{card.tag}</div>
          </div>
          <div className="hidden rounded-[999px] px-3 py-1 text-[12px] font-medium sm:block" style={{ background: '#E8F5F0', color: GREEN_DARK }}>
            Featured
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: CANVAS }} className="py-12 sm:py-14" id="success">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-6 [&>div]:mb-0">
          <SecHead
            eyebrow="Student stories"
            title="Some stayed in the US. Some landed back home."
            sub="What they share isn't luck — it's that both paths were ready before the season started."
            center
          />
        </div>

        <div
          className="hidden gap-4 lg:grid"
          style={{ gridTemplateColumns, transition: 'grid-template-columns 520ms cubic-bezier(0.22,1,0.36,1)' }}
        >
          {[0, 1, 2].map(column => (
            <div key={column} className={column === activeColumn ? 'grid min-h-[360px] gap-4' : 'grid min-h-[360px] grid-rows-2 gap-4'}>
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
          {cards.slice(0, 3).map(card => (
            <div
              key={card.name}
              className="relative flex flex-col rounded-[14px] border p-5"
              style={{ background: 'rgba(255,255,255,0.76)', borderColor: HAIRLINE }}
            >
              <p className="mb-5 text-[14px] leading-relaxed" style={{ color: INK }}>&ldquo;{card.quote}&rdquo;</p>
              <div className="mt-auto border-t pt-3" style={{ borderColor: '#ECE5DD' }}>
                <div className="text-[13px] font-semibold" style={{ color: INK }}>{card.name}</div>
                <div className="mt-0.5 text-[12px]" style={{ color: GREEN }}>{card.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 10. Brand ─────────────────────────────────────────────────────────────────

function BrandSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Sec bg="white" id="aboutus" className="!py-14 sm:!py-16 scroll-mt-16">
      <div className="text-center mb-8">
        <SecHead
          eyebrow="Why MentorX"
          title="Real experience behind every recruiting decision"
          sub="MentorX combines years of student outcomes, role data from both markets, AI analysis, and mentors from top employers — from seeing the problem, to setting the path, to sustained action."
          center
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6 md:mb-8">
        {BRAND_CARDS.map(({ number, label, title, desc }) => (
          <div
            key={title}
            className="rounded-[14px] p-5 sm:p-6 flex flex-col gap-4 border border-[#DDD6CC] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00A870] hover:shadow-[0_18px_42px_rgba(16,35,29,0.08)]"
            style={{ background: SURFACE }}
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-2" style={{ background: '#EAF8F1' }}>
              <span className="text-[16px] font-bold leading-none" style={{ color: GREEN }}>{number}</span>
              <span className="text-[13px] font-medium leading-none" style={{ color: '#5F8174' }}>/ {label}</span>
            </div>
            <div>
              <div className="text-[15px] font-semibold text-gray-900 mb-1.5">{title}</div>
              <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden text-center md:block">
        <Btn label="Book a free consultation" onClick={onCTA} size="lg" />
      </div>
    </Sec>
  );
}

// ── 11. Footer CTA ────────────────────────────────────────────────────────────

function FooterCTASection({ onCTA }: { onCTA: () => void }) {
  return (
    <section style={{ background: MINT_BAND }} className="py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[12px] font-medium tracking-[0.06em]" style={{ color: GREEN }}>
              Get started
            </div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-tight mb-4" style={{ color: INK, letterSpacing: '-0.03em' }}>
              The recruiting calendar won&rsquo;t wait.<br />
              <span style={{ color: GREEN_DARK }}>Spend 30 minutes finding your position.</span>
            </h2>
            <p className="text-[15px] mb-0 max-w-xl leading-relaxed md:mb-6" style={{ color: INK_MUTED }}>
              Still weighing staying versus returning? Not sure whether to chase an internship or drill interviews? Start with a free recruiting review and let an advisor lay out your timeline and priorities.
            </p>
            <button
              onClick={onCTA}
              className="hidden md:inline-flex h-12 items-center px-8 rounded-[10px] text-white text-[15px] font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: GREEN, boxShadow: '0 8px 24px rgba(0,168,112,0.18)' }}
            >
              Book a free review
            </button>
          </div>

          <div className="hidden bg-white rounded-[14px] p-6 w-full max-w-[260px] flex-shrink-0 border justify-self-start lg:block lg:justify-self-end" style={{ borderColor: 'rgba(0,168,112,0.14)' }}>
            <div className="text-[13px] font-semibold text-gray-900 mb-1 leading-snug">Scan for your recruiting timeline</div>
            <div className="text-[11px] text-gray-400 mb-4 leading-relaxed">Roles on both sides, résumé notes, and a stage-by-stage task list</div>
            <div className="flex justify-center mb-3">
              <QRCodeSVG size={126} />
            </div>
            <div className="text-center text-[11px] text-gray-400 mb-0.5">
              WeChat: <span className="font-semibold text-gray-800">{WEIXIN_ID}</span>
            </div>
            <div className="text-center text-[10px] text-gray-400 leading-tight">
              MentorX mentors, with you through the whole search
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
    <footer style={{ background: CANVAS }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8">
        <div className="rounded-[14px] px-6 py-5 text-center" style={{ background: GREEN_DARK }}>
          <div className="text-[15px] font-semibold text-white sm:text-[17px]">
            Guided end to end — toward the internship and the full-time offer you want
          </div>
          <div className="mt-1.5 text-[12px]" style={{ color: '#9BE5C3' }}>
            Career planning is where the future starts. Prepare now, and start a step ahead.
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <img src={logoImg} alt="MentorX Education" width={540} height={326} className="h-8 w-auto object-contain sm:h-9" />
        <div className="text-[12px]" style={{ color: INK_MUTED }}>
          ©2026, MentorX Corporation. All Rights Reserved · Campus recruiting support across the US and China
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
      <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform" style={{ background: GREEN }}>
        <MessageCircle size={18} color="white" />
      </div>
      <div className="text-[10px] font-medium text-gray-600 bg-white px-2.5 py-1 rounded-full shadow-md border" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        Contact us
      </div>
    </button>
  );
}

// ── Mobile bottom bar ─────────────────────────────────────────────────────────

function MobileBar({ onCTA }: { onCTA: () => void }) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
      style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${HAIRLINE}` }}
    >
      <button
        onClick={onCTA}
        className="w-full h-12 rounded-[10px] text-white text-[15px] font-semibold transition-all active:scale-[0.98]"
        style={{ background: GREEN }}
      >
        Get a free recruiting review
      </button>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'solution', label: 'Challenges' },
  { id: 'dual-track', label: 'Dual Track' },
  { id: 'steps', label: 'How It Works' },
  { id: 'included', label: "What's Included" },
  { id: 'mentors', label: 'Mentors' },
  { id: 'success', label: 'Stories' },
];

function NavBar({ onCTA }: { onCTA: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const fn = () => {
      const next = window.scrollY > 24;
      setScrolled(prev => (prev === next ? prev : next));
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const offset = 120;
      let current = '';

      for (const { id } of NAV_ITEMS) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          current = id;
          break;
        }
        if (rect.top <= offset) current = id;
      }

      setActiveId(prev => (prev === current ? prev : current));
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
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
          <img src={logoImg} alt="MentorX Education" width={540} height={326} className="h-10 w-auto object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-6 text-[14px] text-gray-500 font-normal">
          {NAV_ITEMS.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setActiveId(id)}
                className="transition-colors hover:text-gray-900"
                style={{ color: active ? GREEN : undefined }}
              >
                {label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/campus-recruiting"
            className="inline-flex h-9 items-center justify-center rounded-full border px-3 text-[13px] font-semibold transition-all hover:border-[#00A870] hover:text-[#00A870] active:scale-[0.97]"
            style={{ borderColor: 'rgba(0,168,112,0.2)', color: GREEN_DARK, background: 'rgba(255,255,255,0.72)' }}
            aria-label="Switch language"
          >
            中文
          </a>
          <button
            onClick={onCTA}
            className="h-9 px-5 rounded-full text-white text-[14px] font-medium transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: GREEN }}
          >
            Free Consultation
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export function CampusRecruitingEn() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = (event?: unknown) => {
    const { isMobile } = trackCTAIntent(event, WEIXIN_URL);
    if (isMobile) {
      window.setTimeout(() => window.location.assign(WEIXIN_URL), 120);
      return;
    }

    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  return (
    <div className="overflow-x-hidden" style={{ background: CANVAS, fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif" }}>
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

      <NavBar onCTA={open} />
      <div className="h-16" aria-hidden="true" />
      <HeroSection onCTA={open} />
      <PillarsSection />
      <StatsSection />
      <ChallengesSection />
      <DualTrackSection />
      <StepsSection />
      <IncludedSection onCTA={open} />
      <MentorSection />
      <TestimonialsSection />
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
