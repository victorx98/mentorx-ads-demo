import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { X, MessageCircle, Check, Clock, Users, TrendingUp, Building2 } from 'lucide-react';
import logoImg from '../../imports/mentorx-logo.svg';
import wechatQrImg from '../../imports/wechat-qr.svg';
import studentImg from '../../imports/shutterstock_2553528401.webp';
import heroMaleImg from '../../imports/mentorx-hero-male.webp';
import { getLatestCtaSource, trackCTAIntent, trackQrModalEngaged, trackQrModalOpen } from '../analytics';

const WEIXIN_URL = 'https://work.weixin.qq.com/ca/cawcdefad5934f25ca';
const WEIXIN_ID = 'Mentorx01';
const HERO_IMG = heroMaleImg;
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
  { id: 'years',     target: 11,    suffix: '年+',  label: '海外求职服务经验' },
  { id: 'students',  target: 33000, suffix: '+',    label: '累计服务学员',     thousands: true },
  { id: 'rate',      target: 95,    suffix: '%',    label: '学员上岸成功率约' },
  { id: 'resources', target: 2800,  suffix: '+',    label: '合作企业与导师资源', thousands: true },
];

const PAIN_POINTS = [
  {
    n: '01', title: '不知道该找什么实习',
    desc: '专业方向、兴趣选择和未来就业目标还不清晰，导致实习申请没有重点。',
    solution: '结合背景、专业和目标行业，明确适合申请的实习方向与优先级。',
  },
  {
    n: '02', title: '缺少相关经历',
    desc: '想申请名企实习，却发现简历里缺少和岗位相关的项目、技能和实践经历。',
    solution: '根据目标岗位要求，规划项目补强、技能提升和背景提升路径。',
  },
  {
    n: '03', title: '简历看起来不够专业',
    desc: '经历不少，但表达不聚焦，无法让招聘方快速看到你的岗位匹配度。',
    solution: '优化简历结构、关键词和成果表达，让经历更贴合实习岗位要求。',
  },
  {
    n: '04', title: '暑期实习时间线混乱',
    desc: '不清楚什么时候准备、什么时候投递、哪些机会不能错过，容易错过关键窗口。',
    solution: '根据目标地区、行业和年级阶段，制定清晰的实习申请时间线。',
  },
  {
    n: '05', title: '面试缺少真实训练',
    desc: '不知道如何讲项目、讲经历、回答行为面试和岗位相关问题。',
    solution: '安通过模拟面试和导师反馈，训练表达逻辑、经历亮点和岗位匹配度。',
  },
  {
    n: '06', title: '实习经历无法转化为优势',
    desc: '做过项目或实习，但不知道如何沉淀成果，为后续名企实习或全职申请加分。',
    solution: '帮助学生复盘经历、提炼成果，并转化为简历、面试和未来申请中的竞争力。',
  },
];



const TESTIMONIALS = [
  {
    quote: '导师帮我重新梳理经历，也针对面试做了很多复盘。之前自己准备觉得还好，但和导师聊完才发现很多表达其实没有体现出真正的价值点。',
    name: 'Jess W.',
    tag: 'CMU 计算机 → Google SWE',
    accent: false,
  },
  {
    quote: 'OPT 时间很紧时，我需要的不是泛泛建议，而是具体判断。蔓藤顾问帮我快速定位了高匹配度的岗位方向，让我集中精力在最有可能的路径上。',
    name: 'Michael L.',
    tag: 'Columbia 金融 → JPMorgan',
    accent: true,
  },
  {
    quote: '我原来觉得自己经历太普通，后来通过项目和简历调整，终于知道怎么把自己的优势讲出来。最后拿到 offer 的那一刻，感觉整个过程的努力都值了。',
    name: 'Yiwei Z.',
    tag: 'UCLA 商科 → Deloitte',
    accent: false,
  },
  {
    quote: '从找不到方向到最终拿到咨询 offer，蔓藤帮我把所有模糊的感觉变成了具体可操作的步骤。整个过程比我预想的有序得多。',
    name: 'Linda C.',
    tag: 'NYU 金融 → McKinsey',
    accent: false,
  },
  {
    quote: 'Mock interview 做了很多轮，导师对每一轮都有详细反馈。最后面试时状态比之前稳多了，自己也感觉得出来准备是真的到位了。',
    name: 'Kevin H.',
    tag: 'UT Austin 计算机 → Amazon SDE',
    accent: true,
  },
  {
    quote: '一开始对数据岗完全没有头绪，导师帮我厘清了 DA 和 DS 的区别，还针对 SQL 和 case study 做了专项训练。整个准备过程非常有节奏感。',
    name: 'Tina X.',
    tag: 'UIUC 统计 → Meta Data Analyst',
    accent: false,
  },
  {
    quote: '导师是真正做过校招的人，给的建议非常落地。从 target list 到 networking 再到 offer 谈判，每一步都有具体指导，不是泛泛而谈。',
    name: 'Brian W.',
    tag: 'USC 商科 → BCG Associate',
    accent: false,
  },
  {
    quote: '我的背景在转行，导师帮我把过去的经历重新包装，挖掘出了很多我自己没意识到的亮点。最终拿到 offer 时，连我自己都觉得意外。',
    name: 'Chloe M.',
    tag: 'Duke 公共政策 → Microsoft PM',
    accent: false,
  },
];




// ── QR Code ───────────────────────────────────────────────────────────────────

function QRCodeSVG({ size = 200 }: { size?: number; color?: string }) {
  return (
    <img
      src={wechatQrImg}
      alt="扫码添加蔓藤教育顾问微信，获取求职方案"
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
          >
            <X size={14} />
          </button>
          <div className="text-[10px] font-medium tracking-[0.14em] opacity-50 mb-2.5 uppercase">蔓藤教育 MentorX</div>
          <h3 className="mb-2 text-[20px] font-semibold leading-snug">扫码<span className="mx-1 inline-flex -translate-y-px items-center rounded-full bg-[#DFF5EC] px-2.5 py-0.5 text-[#00A870] shadow-[inset_0_0_0_1px_rgba(0,168,112,0.12)]">免费领取</span>专属求职规划</h3>
          <p className="text-[13px] opacity-70 leading-relaxed">获取最新岗位资源、简历建议与求职时间线</p>
        </div>

        <div className="px-7 py-6 text-center">
          <div className="inline-flex items-center justify-center mb-5">
            <QRCodeSVG size={190} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-0">
            <span className="text-gray-400 text-[12px]">微信号</span>
            <span className="font-semibold text-gray-900 text-[13px] bg-gray-100 px-3 py-1 rounded-full tracking-wide">
              {WEIXIN_ID}
            </span>
          </div>
        </div>

        <div className="pb-5 text-center text-[11px] text-gray-400">
          蔓藤导师团队，为你的求职之路保驾护航
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
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
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
        className={`text-[28px] sm:text-[36px] font-semibold leading-tight ${center ? 'mx-auto' : ''}`}
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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-6 lg:pt-12 lg:pb-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-8 items-center min-w-0">
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
              留学生实习直通计划
            </div>

            <h1
              className="font-semibold leading-[1.1] mb-4 text-[34px] sm:text-[50px]"
              style={{ color: INK, letterSpacing: '-0.04em', maxWidth: 'clamp(0px, calc(100vw - 40px), 34rem)', overflowWrap: 'anywhere' }}
            >
              用一个假期，<br></br>锁定名企实战履历
            </h1>

            <p className="hidden text-[17px] leading-relaxed mb-5 max-w-[19rem] sm:max-w-md md:block" style={{ color: INK_MUTED, overflowWrap: 'anywhere' }}>
              为留学生匹配海外实习、暑期项目与背景提升路径，提前补齐简历经历，为未来全职申请积累更强竞争力。
            </p>

            <div className="mb-5 md:mb-7">
              <button
                onClick={onCTA}
                className="h-12 px-8 rounded-[10px] text-white text-[15px] font-semibold transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A870]"
                style={{
                  background: '#00A870',
                  boxShadow: '0 4px 20px rgba(0,168,112,0.3)',
                }}
              >
                免费咨询
              </button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-6 sm:text-[15px]">
              {['多阶段适配', '多行业方向', '背景提升路径'].map(t => (
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
          <div className="order-2 flex justify-center lg:justify-end min-w-0">
            <div className="relative w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[420px] rounded-[16px]" style={{ boxShadow: '0 16px 48px rgba(17,24,39,0.08)' }}>
              {/* Image */}
              <div
                className="relative rounded-[16px] overflow-hidden"
                style={{ aspectRatio: '3/4', maxHeight: '520px' }}
              >
                <img
                  src={HERO_IMG}
                  alt="自信的留学生"
                  width={900}
                  height={1125}
                  className="w-full h-full object-cover object-top"
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
              <Badge text="11年+ 服务经验" className="-top-3 left-0 sm:-left-8" style={heroTagStyle(-28, -0.15)} />
              <Badge
                text="名企导师 1v1 辅导"
                sub="科技 · 金融 · 咨询"
                className="hidden sm:flex top-[28%] sm:-right-8"
                style={heroTagStyle(26, -1.15)}
              />
              <Badge text="OPT/H1B 就业路径建议" className="bottom-[18%] left-0 sm:-left-8" style={heroTagStyle(24, -2.05)} />

              {/* Offer pill */}
              <div
                className="hero-float-badge hidden sm:block absolute bottom-7 right-3 sm:-right-1 bg-white rounded-[10px] border px-3.5 py-2.5"
                style={{ borderColor: HAIRLINE, boxShadow: '0 10px 28px rgba(17,24,39,0.08)', ...heroTagStyle(-22, -0.75) }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-gray-500">Offer 已到</span>
                </div>
                <div className="text-[13px] font-semibold text-gray-900">Google SWE</div>
                <div className="text-[11px] text-gray-400">New York, NY</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker — seamless part of banner */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-6">
        <div className="flex items-center gap-2 text-[13px] font-medium mb-4" style={{ color: '#6b9e86' }}>
          学员实习与就业去向覆盖多元行业
        </div>
        <Ticker items={COMPANY_LOGOS} speed={95} />
      </div>
    </section>
  );
}

function LeadCaptureSection({ onCTA }: { onCTA: () => void }) {
  const items = [
    {
      title: '适合谁',
      desc: '方向不清、缺少实习、投递没反馈、OPT/H1B 时间紧的留学生。',
    },
    {
      title: '你会得到',
      desc: '一份基于学校、专业、年级和目标岗位的求职差距诊断。',
    },
    {
      title: '下一步',
      desc: '加顾问微信，先判断当前最该补简历、项目、面试还是岗位策略。',
    },
  ];

  return (
    <section style={{ background: CANVAS }} className="pb-10 sm:pb-12">
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
            <div className="mb-2 text-[13px] font-medium" style={{ color: '#9BE5C3' }}>免费职业评估</div>
            <h2 className="mb-3 text-[24px] font-semibold leading-tight" style={{ letterSpacing: '-0.02em' }}>先把求职卡点说清楚，再决定怎么补。</h2>
            <p className="mb-5 text-[14px] leading-relaxed text-white/70">适合获客入口：用户不用先理解所有产品，只需要留下咨询意向，我们用评估承接转化。</p>
            <button
              onClick={onCTA}
              className="h-11 w-full rounded-[10px] bg-white px-5 text-[14px] font-semibold transition-all active:scale-[0.98]"
              style={{ color: GREEN_DARK }}
            >
              立即免费评估
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
    <section id="stats" ref={sectionRef} style={{ background: CANVAS }} className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-6">
          <SecHead
            eyebrow="实力沉淀"
            title="让每一段经历，都为下一步人生加分"
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
        eyebrow="求职挑战和方案"
        title="打破海外实习信息差，让申请更有方向"
        sub="MentorX 结合学生专业背景、目标行业和求职方向，帮助你明确适合申请什么、如何准备、怎样把经历转化为竞争力。"
        center
      />
      <div className="grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 md:mb-6">
        {PAIN_POINTS.map(({ n, title, desc, solution }) => (
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
                蔓藤方案
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#315C47' }}>{solution}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden text-center mt-2 md:block">
        <Btn label="评估我的情况" onClick={onCTA} />
      </div>
    </Sec>
  );
}

// ── 5. Why MentorX + Flow (combined) ─────────────────────────────────────────


const FLOW_STEPS_NEW = [
  { n: '01', title: '设定目标', desc: '明确国家、行业、岗位与求职时间线。' },
  { n: '02', title: '差距分析', desc: '识别简历、技能、项目与面试短板。' },
  { n: '03', title: '规划路径', desc: '定制阶段任务、学习重点与投递节奏。' },
  { n: '04', title: '职业培训', desc: '通过课程、项目和导师辅导提升竞争力。' },
  { n: '05', title: '能力测评', desc: '评估准备度，动态调整求职策略。' },
  { n: '06', title: '岗位匹配', desc: '匹配实习、全职与内推机会。' },
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
        <div className="relative order-2 hidden justify-center lg:order-1 lg:flex lg:justify-start lg:self-center">
          <div ref={imageRef} className="relative w-full max-w-[380px]">
            <div className="rounded-[16px] overflow-hidden" style={{ height: 500, background: SURFACE }}>
              <img src={studentImg} alt="留学生求职" className="w-full h-full object-cover" style={{ objectPosition: '80% center' }} />
            </div>

            {/* Floating stat badges */}
            <div className="absolute -top-3 -right-3 sm:-right-8 bg-white/95 rounded-[12px] border px-3.5 py-2.5 flex items-center gap-2.5"
              style={{ borderColor: HAIRLINE, backdropFilter: 'blur(10px)', ...revealFrom(260, -180) }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5F0' }}>
                <Check size={11} color="#00A870" strokeWidth={3} />
              </div>
              <div className="text-[13px] font-medium text-gray-900">从规划到 Offer，全程陪跑</div>
            </div>

            <div className="absolute bottom-[22%] -left-2 sm:-left-10 bg-white/95 rounded-[12px] border px-3.5 py-2.5"
              style={{ borderColor: HAIRLINE, backdropFilter: 'blur(10px)', ...revealFrom(-240, 72) }}>
              <div className="text-[11px] text-gray-400 mb-0.5">累计服务学员</div>
              <div className="text-[18px] font-bold" style={{ color: '#00A870' }}>33,000+</div>
            </div>

            <div className="absolute bottom-4 right-0 sm:-right-6 bg-white rounded-[12px] border px-3.5 py-2.5" style={{ borderColor: HAIRLINE, ...revealFrom(230, 150) }}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-medium text-gray-500">上岸成功率</span>
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
              实习提升路径
              <span>—</span>
            </div>
            <h2 className="text-[30px] sm:text-[34px] font-semibold mb-3 leading-tight" style={{ color: INK, letterSpacing: '-0.03em' }}>
              从背景评估到实习申请，每一步都更有目标
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: INK_MUTED }}>
              MentorX 不只是帮你“找一段实习”，而是围绕未来求职目标，帮助你规划方向、补强经历、优化材料，并把每一段经历转化为长期竞争力。
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
            <Btn label="了解方案" onClick={onCTA} />
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
    years: '5年+',
    strength: '首席SDE，OA / 面试全流程',
    coaching: 'SDE技术面试、项目复盘',
    initials: 'DW',
    color: '#4285F4',
  },
  {
    name: 'Crystal Z.',
    title: 'Morgan Stanley FICC VP',
    company: 'Morgan Stanley',
    years: '6年+',
    strength: '推动量化策略与投资决策',
    coaching: '案例面试、投资分析',
    initials: 'CZ',
    color: '#0076CF',
  },
  {
    name: 'Pengfei X.',
    title: 'IBM Principal Consultant',
    company: 'IBM',
    years: '20年+',
    strength: '大型系统与项目管理经验',
    coaching: '咨询面试、商业分析',
    initials: 'PX',
    color: '#006699',
  },
  {
    name: 'Hang Y.',
    title: 'TikTok Software Engineer',
    company: 'TikTok',
    years: '7年',
    strength: '前Google工程师，参与校园招聘',
    coaching: '算法、系统设计',
    initials: 'HY',
    color: '#010101',
  },
  {
    name: 'George Z.',
    title: 'Amazon Data Scientist',
    company: 'Amazon',
    years: '4年',
    strength: '数据岗目标岗位面试准备',
    coaching: 'SQL、逻辑面试',
    initials: 'GZ',
    color: '#FF9900',
  },
  {
    name: 'Anna Z.',
    title: 'Apple SWE Program Manager',
    company: 'Apple',
    years: '5年',
    strength: '前Tesla，跨团队协作经验',
    coaching: '项目管理、项目复盘',
    initials: 'AZ',
    color: '#1d1d1f',
  },
  {
    name: 'Kevin L.',
    title: 'McKinsey Senior Associate',
    company: 'McKinsey',
    years: '6年+',
    strength: '战略咨询，McKinsey招聘官经验',
    coaching: 'Case Interview、简历润色',
    initials: 'KL',
    color: '#003B71',
  },
  {
    name: 'Sophia R.',
    title: 'Meta Product Manager',
    company: 'Meta',
    years: '4年',
    strength: '跨职能产品负责人，擅长PM面试辅导',
    coaching: 'PM面试、产品设计题',
    initials: 'SR',
    color: '#0866FF',
  },
  {
    name: 'Michael T.',
    title: 'JPMorgan Quant Analyst',
    company: 'JPMorgan',
    years: '8年+',
    strength: '量化金融、金融工程面试辅导',
    coaching: '技术面试、行为面试',
    initials: 'MT',
    color: '#003087',
  },
  {
    name: 'Linda C.',
    title: 'Deloitte Senior Consultant',
    company: 'Deloitte',
    years: '5年',
    strength: '审计与管理咨询，Big4校招经验',
    coaching: '案例面试、简历优化',
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
            <span className="text-gray-400">经验：</span>{mentor.years}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E8F5F0' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1.24 3.8H11L8.38 6.8l.95 3.2L6 8.2 2.67 10l.95-3.2L1 4.8h3.76L6 1z" fill="#00A870"/>
            </svg>
          </div>
          <div className="text-[12px] text-gray-500 leading-snug">
            <span className="text-gray-400">擅长：</span>{mentor.strength}
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
            <span className="text-gray-400">可辅导：</span>{mentor.coaching}
          </div>
        </div>
      </div>
    </div>
  );
}

function MentorSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="mentors" className="py-10 md:py-14 overflow-hidden" style={{ background: 'white' }}>
      {/* Header — constrained */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <SecHead
          eyebrow="行业导师支持"
          title="让懂行业的人，帮你规划更有价值的实习经历"
          sub="导师来自科技、金融、咨询、数据等热门领域，熟悉不同岗位对实习生的真实要求，帮助学生更早理解行业标准。"
          center
        />
      </div>

      {/* Full-bleed auto-scroll track */}
      <div
        className="flex gap-4 overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory pb-2 [-webkit-overflow-scrolling:touch]"
        style={{
          paddingTop: '8px',
          paddingBottom: '8px',
          marginTop: '-8px',
        }}
      >
        <div className="flex gap-4 lg:[animation:tickerLeft_52s_linear_infinite] lg:hover:[animation-play-state:paused]">
          {[...MENTORS, ...MENTORS].map((mentor, i) => (
            <div key={i} style={{ flexShrink: 0, width: '272px', alignSelf: 'stretch', display: 'flex', scrollSnapAlign: 'start' }}>
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden text-center mt-10 md:block">
        <Btn label="匹配导师" onClick={onCTA} size="lg" />
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
            代表案例
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: MINT_BAND }} className="py-10 sm:py-12" id="success">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-8 [&>div]:mb-0">
          <SecHead
            eyebrow="学员故事"
            title="每一段实习背后，都有值得复刻的路径"
            sub="从没有相关经历，到拿到第一段实习；从背景薄弱，到冲刺更高质量机会。方向、准备和持续反馈，正在帮助更多学生把经历变成竞争力。"
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
          {cards.slice(0, 3).map(card => (
            <div
              key={card.name}
              className="relative flex flex-col rounded-[14px] border p-5"
              style={{
                background: 'rgba(255,255,255,0.76)',
                borderColor: HAIRLINE,
              }}
            >
              <p className="mb-5 text-[14px] leading-relaxed" style={{ color: INK }}>「{card.quote}」</p>
              <div className="mt-auto border-t pt-3" style={{ borderColor: '#ECE5DD' }}>
                <div className="text-[13px] font-semibold" style={{ color: INK }}>{card.name}</div>
                <div className="mt-0.5 text-[12px]" style={{ color: GREEN }}>{card.tag}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden text-center mt-8 md:block">
          <Btn label="查看案例" onClick={onCTA} />
        </div>
      </div>
    </section>
  );
}


// ── 9. Partners ───────────────────────────────────────────────────────────────

const BRAND_CARDS = [
  {
    number: '01',
    label: 'Data Insight',
    title: '数据洞察',
    desc: '结合专业背景、目标行业与岗位趋势，判断更适合你的实习方向和背景提升重点。',
  },
  {
    number: '02',
    label: 'AI Matching',
    title: 'AI 赋能',
    desc: '借助 AI 分析与导师经验，定位简历、项目和能力短板，让实习申请准备更聚焦。',
  },
  {
    number: '03',
    label: 'Expert Support',
    title: '专业支持',
    desc: '顾问与导师持续跟进关键节点，把规划转化为行动，帮助学生更接近理想实习机会。',
  },
];

function BrandSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Sec bg="white" id="aboutus" className="!py-14 sm:!py-16">
      <div className="text-center mb-8">
        <SecHead
            eyebrow="品牌实力"
            title="用数据看清方向，用专业走向结果"
            sub="MentorX 将多年学员案例、岗位数据、AI 分析与名企导师经验结合，形成更系统的留学生求职支持体系，帮助学生从看清问题，到制定路径，再到持续行动。"
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
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-2"
              style={{ background: '#EAF8F1' }}
            >
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

      <div className="text-center">
        <Btn label="免费咨询" onClick={onCTA} size="lg" />
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
              开始规划
            </div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-tight mb-5" style={{ color: INK, letterSpacing: '-0.03em' }}>
              想找实习，但不知道从哪里开始？
            </h2>
            <p className="text-[15px] mb-0 max-w-xl leading-relaxed md:mb-9" style={{ color: INK_MUTED }}>
              不确定该申请什么岗位？简历缺少相关经历？担心错过暑期实习时间线？先做一次免费背景评估，让顾问帮你看清当前最该提升的一步。
            </p>
            <button
              onClick={onCTA}
              className="hidden md:inline-flex h-12 items-center px-8 rounded-[10px] text-white text-[15px] font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{
                background: GREEN,
                boxShadow: '0 8px 24px rgba(0,168,112,0.18)',
              }}
            >
              预约免费诊断
            </button>
          </div>

          {/* QR card */}
          <div className="hidden bg-white rounded-[14px] p-6 w-full max-w-[260px] flex-shrink-0 border justify-self-start lg:block lg:justify-self-end" style={{ borderColor: 'rgba(0,168,112,0.14)' }}>
            <div className="text-[13px] font-semibold text-gray-900 mb-1 leading-snug">扫码领取专属求职规划</div>
            <div className="text-[11px] text-gray-400 mb-4 leading-relaxed">获取最新岗位资源、简历建议与求职时间线</div>
            <div className="flex justify-center mb-3">
              <QRCodeSVG size={126} />
            </div>
            <div className="text-center text-[11px] text-gray-400 mb-0.5">
              微信号：<span className="font-semibold text-gray-800">{WEIXIN_ID}</span>
            </div>
            <div className="text-center text-[10px] text-gray-400 leading-tight">
              蔓藤导师团队，为你的求职之路保驾护航
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
          © 2024 MentorX Education · 专注留学生美国求职辅导
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
        联系蔓藤
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
        打开微信，领取诊断
      </button>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'solution', label: '求职方案' },
  { id: 'flow', label: '服务流程' },
  { id: 'mentors', label: '导师资源' },
  { id: 'success', label: '成功案例' },
  { id: 'aboutus', label: '关于蔓藤' },
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
          <img src={logoImg} alt="蔓藤教育 MentorX" width={540} height={326} className="h-10 w-auto object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-8 text-[14px] text-gray-500 font-normal">
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
            href="/en/internship"
            className="inline-flex h-9 items-center justify-center rounded-full border px-3 text-[13px] font-semibold transition-all hover:border-[#00A870] hover:text-[#00A870] active:scale-[0.97]"
            style={{ borderColor: 'rgba(0,168,112,0.2)', color: GREEN_DARK, background: 'rgba(255,255,255,0.72)' }}
            aria-label="Switch language"
          >
            EN
          </a>
          <button
            onClick={onCTA}
            className="h-9 px-5 rounded-full text-white text-[14px] font-medium transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: '#00A870' }}
          >
            免费咨询
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export function Internship() {
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
      <StatsSection />
      <PainPointsSection onCTA={open} />
      <WhyMentorXSection onCTA={open} />
      <MentorSection onCTA={open} />
      <TestimonialsSection onCTA={open} />
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
