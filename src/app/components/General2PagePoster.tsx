import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, FileText, Gift, LineChart, Target, TrendingUp, X } from 'lucide-react';
import logoImg from '../../imports/mentorx-logo.svg';
import wechatQrImg from '../../imports/wechat-qr.svg';
import heroVisualImg from '../../imports/general-2pageposter-hero.webp';
import { getLatestCtaSource, trackCTAIntent, trackQrModalEngaged, trackQrModalOpen } from '../analytics';

const WEIXIN_URL = 'https://work.weixin.qq.com/ca/cawcdefad5934f25ca';
const WEIXIN_ID = 'Mentorx01';
const GREEN = '#00A870';
const GREEN_DARK = '#0D2E1E';
const CANVAS = '#F6FAF8';
const MINT_BAND = '#EEF8F4';
const SURFACE = '#FFFFFF';
const INK = '#111827';
const MUTED = '#626260';
const HAIRLINE = '#DDD6CC';

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

const stats = [
  { value: '4200+', label: '合作岗位资源' },
  { value: '95%', label: '上岸成功率' },
  { value: '11年+', label: '求职辅导行业经验' },
];

const services = [
  {
    n: '01',
    title: '明确方向',
    icon: Target,
    desc: '结合专业背景、目标行业、签证情况和求职阶段，制定更现实的求职路径。',
  },
  {
    n: '02',
    title: '打磨材料',
    icon: FileText,
    desc: '优化简历、LinkedIn 和求职话术，让你的经历更符合企业想看的候选人标准。',
  },
  {
    n: '03',
    title: '提升转化',
    icon: TrendingUp,
    desc: '通过面试辅导、岗位策略和持续跟进，减少无效海投，提高申请成功率。',
  },
];

const fitTags = ['不知道投什么岗位', '简历投了没回复', '面试总是卡住', '想提前规划实习 / 全职'];

function Button({ children, variant = 'primary', onClick }: { children: string; variant?: 'primary' | 'outline'; onClick?: () => void }) {
  const primary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center rounded-[10px] px-6 text-[14px] font-semibold transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A870]"
      style={{
        color: primary ? '#fff' : GREEN_DARK,
        background: primary ? GREEN : 'rgba(255,255,255,0.72)',
        border: primary ? '1px solid transparent' : `1px solid ${HAIRLINE}`,
        boxShadow: primary ? '0 4px 20px rgba(0,168,112,0.28)' : '0 12px 30px rgba(16,35,29,0.06)',
      }}
    >
      {children}
    </button>
  );
}

function Ticker({
  items,
  reverse = false,
  speed = 95,
}: {
  items: Array<{ name: string; src: string }>;
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden select-none">
      <div
        className="flex w-max items-center gap-10"
        style={{ animation: `${reverse ? 'tickerRight' : 'tickerLeft'} ${speed}s linear infinite` }}
      >
        {doubled.map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex h-10 w-[85px] items-center justify-center">
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

function QRCodeSVG({ size = 190 }: { size?: number }) {
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
        className="relative w-full max-w-[340px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.2s ease' }}
      >
        <div
          className="px-7 pb-5 pt-7 text-center text-[#10231D]"
          style={{ background: 'linear-gradient(180deg, #EAF8F1 0%, #F5FCF8 100%)', borderBottom: '1px solid rgba(0, 168, 112, 0.10)' }}
        >
          <button
            onClick={onClose}
            className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#10231D]/8 text-[#10231D] transition-colors hover:bg-[#10231D]/12"
            aria-label="关闭弹窗"
          >
            <X size={14} />
          </button>
          <div className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] opacity-50">蔓藤教育 MentorX</div>
          <h3 className="mb-2 text-[20px] font-semibold leading-snug">扫码<span className="mx-1 inline-flex -translate-y-px items-center rounded-full bg-[#DFF5EC] px-2.5 py-0.5 text-[#00A870] shadow-[inset_0_0_0_1px_rgba(0,168,112,0.12)]">免费领取</span>专属求职规划</h3>
          <p className="text-[13px] leading-relaxed opacity-70">获取岗位方向判断、简历建议与下一步策略</p>
        </div>

        <div className="px-7 py-6 text-center">
          <div className="mb-5 inline-flex items-center justify-center">
            <QRCodeSVG size={190} />
          </div>
          <div className="mb-0 flex items-center justify-center gap-2">
            <span className="text-[12px] text-gray-400">微信号</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-[13px] font-semibold tracking-wide text-gray-900">
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

function HeroScene() {
  return (
    <div className="relative min-h-[410px] overflow-hidden rounded-[18px] border bg-white shadow-[0_18px_56px_rgba(16,35,29,0.1)]" style={{ borderColor: 'rgba(0,168,112,0.12)' }}>
      <img
        src={heroVisualImg}
        alt="留学生在城市办公室窗边使用电脑进行求职规划"
        width={1254}
        height={1254}
        className="absolute inset-0 h-full w-full object-cover object-[58%_50%]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.08)_44%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute -right-14 -top-24 h-72 w-72 rounded-full border-[34px] border-[#BEEFD7]/55" />
      <div className="absolute -bottom-20 right-0 h-48 w-[118%] rounded-[50%] bg-white/16" />
      <div className="absolute bottom-8 left-8 h-32 w-[88%] rounded-[50%] border border-[#00A870]/35" />
      <div className="absolute bottom-[130px] left-[47%] h-5 w-5 rounded-full bg-[#38CE88] shadow-[0_0_0_10px_rgba(0,168,112,0.12)]" />

      <div className="absolute left-6 top-6 w-[205px] rounded-[14px] border bg-white/92 p-4 shadow-[0_16px_42px_rgba(17,24,39,0.12)] backdrop-blur" style={{ borderColor: 'rgba(0,168,112,0.14)' }}>
        <div className="mb-2 flex items-center justify-between text-[12px] font-semibold" style={{ color: GREEN }}>
          机会匹配结果
          <Check size={14} strokeWidth={2.7} />
        </div>
        <div className="text-[26px] font-semibold leading-none tracking-[-0.05em]" style={{ color: GREEN_DARK }}>91%</div>
        <div className="mt-1 text-[13px] text-gray-500">岗位方向匹配度提升</div>
        <div className="mt-3 border-t pt-3" style={{ borderColor: HAIRLINE }}>
          <div className="h-2 overflow-hidden rounded-full bg-[#EAF8F1]">
            <div className="h-full w-[91%] rounded-full" style={{ background: GREEN }} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-6 w-[250px] rounded-[14px] border border-white/22 bg-[#10231D]/58 p-4 text-white shadow-[0_18px_46px_rgba(13,46,30,0.16)] backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-semibold">专属求职路径</span>
          <LineChart size={17} color="#7FF0BE" />
        </div>
        <svg viewBox="0 0 210 74" className="h-[74px] w-full">
          <path d="M8 55 C 40 51, 48 32, 78 38 S 128 43, 148 22 S 184 16, 202 8" fill="none" stroke="#7FF0BE" strokeWidth="4" strokeLinecap="round" />
          <path d="M8 55 C 40 51, 48 32, 78 38 S 128 43, 148 22 S 184 16, 202 8" fill="none" stroke="rgba(127,240,190,0.16)" strokeWidth="14" strokeLinecap="round" />
          {[8, 78, 148, 202].map((x, index) => (
            <circle key={x} cx={x} cy={[55, 38, 22, 8][index]} r="5" fill="#FFFFFF" stroke="#7FF0BE" strokeWidth="3" />
          ))}
        </svg>
        <div className="grid grid-cols-4 text-center text-[11px] font-medium text-white/70">
          <span>定位</span><span>准备</span><span>面试</span><span>Offer</span>
        </div>
      </div>
    </div>
  );
}

export function General2PagePoster() {
  const [modalOpen, setModalOpen] = useState(false);
  const openCTA = (event?: unknown) => {
    const { isMobile } = trackCTAIntent(event, WEIXIN_URL);
    if (isMobile) {
      window.setTimeout(() => window.location.assign(WEIXIN_URL), 120);
      return;
    }

    setModalOpen(true);
  };
  const closeCTA = () => setModalOpen(false);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: CANVAS, color: INK }}>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes tickerLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes tickerRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <section className="relative overflow-hidden px-5 pb-6 sm:px-8" style={{ background: CANVAS }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,168,112,0.06),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(127,196,163,0.1),transparent_30%)]" />
        <div className="relative mx-auto flex h-24 max-w-6xl items-center justify-between">
          <div className="inline-flex items-center">
            <img src={logoImg} alt="蔓藤教育 MentorX" width={540} height={326} className="h-10 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={openCTA}>免费领取求职诊断</Button>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-8 pt-6 pb-5 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] lg:pt-8 lg:pb-6">
          <div>
            <div className="mb-4 inline-flex rounded-[10px] border bg-white/75 px-3.5 py-2 text-[13px] font-medium" style={{ color: GREEN_DARK, borderColor: 'rgba(0,168,112,0.25)' }}>
              留学生海外求职行业引领者
            </div>
            <h1 className="max-w-2xl text-[36px] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[44px] lg:text-[56px]">
              海外求职没进展？<br />
              别再<span style={{ color: GREEN }}>一个人海投了</span>。
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={openCTA}>免费领取求职诊断</Button>
            </div>
            <p className="mt-4 text-[13px] font-semibold text-gray-500">30 分钟 1V1 初步评估｜判断岗位方向、简历问题、下一步策略</p>

            <div className="mt-6 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map(stat => (
                <div key={stat.label} className="rounded-[10px] border bg-white/85 px-4 py-4 shadow-[0_8px_20px_rgba(16,35,29,0.04)]" style={{ borderColor: 'rgba(0,168,112,0.12)' }}>
                  <div className="mb-1 flex items-center gap-2">
                    <Check size={16} color={GREEN} />
                    <span className="text-[19px] font-semibold" style={{ color: GREEN_DARK }}>{stat.value}</span>
                  </div>
                  <div className="text-[12px] font-semibold text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <HeroScene />
        </div>

        <div className="relative mx-auto max-w-6xl px-0 pb-0 pt-2 sm:px-0">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-medium" style={{ color: '#6b9e86' }}>
            连接高校、企业岗位与行业导师资源
          </div>
          <Ticker items={COMPANY_LOGOS} />
        </div>
      </section>

      <section id="how-it-works" className="px-5 pt-10 pb-16 sm:px-8 lg:pt-14 lg:pb-24" style={{ background: MINT_BAND }}>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-3 text-[13px] font-semibold" style={{ color: GREEN }}>
              <span className="h-px w-8 bg-current" />我们如何帮你<span className="h-px w-8 bg-current" />
            </div>
            <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[46px]">
              从迷茫到拿 <span style={{ color: GREEN }}>Offer</span>，帮你走清楚每一步
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {services.map(service => {
              const Icon = service.icon;
              return (
                <article key={service.n} className="rounded-[14px] border bg-white p-6 shadow-[0_16px_40px_rgba(17,24,39,0.07)] transition-all hover:-translate-y-0.5 hover:border-[#00A870]" style={{ borderColor: HAIRLINE }}>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="inline-flex rounded-full bg-[#EAF8F1] px-3.5 py-1.5 text-[13px] font-semibold" style={{ color: GREEN }}>{service.n}</div>
                    <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#EAF8F1]">
                      <Icon size={24} color={GREEN} />
                    </div>
                  </div>
                  <h3 className="text-[20px] font-semibold tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTED }}>{service.desc}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="mr-1 text-[15px] font-semibold">适合你，如果你：</span>
            {fitTags.map(tag => (
              <span key={tag} className="rounded-full border bg-white px-4 py-2 text-[14px] font-medium text-gray-600 shadow-sm" style={{ borderColor: 'rgba(0,168,112,0.12)' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-8 rounded-[16px] border bg-white p-6 shadow-[0_16px_40px_rgba(17,24,39,0.07)] lg:grid-cols-[1.1fr_240px_1fr]" style={{ borderColor: 'rgba(0,168,112,0.12)' }}>
            <div>
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-[14px] bg-[#EAF8F1]">
                <Gift size={25} color={GREEN} />
              </div>
              <h3 className="text-[28px] font-semibold leading-tight tracking-[-0.04em]">扫码领取免费求职评估</h3>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed" style={{ color: MUTED }}>
                让导师帮你判断：你的背景适合什么岗位、简历问题在哪里、下一步应该怎么投。
              </p>
              <p className="mt-4 text-[15px] font-semibold" style={{ color: GREEN }}>现在开始，比毕业前临时抱佛脚更有效。</p>
            </div>

            <div className="mx-auto hidden w-full max-w-[220px] rounded-[16px] border bg-[#F8FCFA] p-5 text-center md:block" style={{ borderColor: HAIRLINE }}>
              <img src={wechatQrImg} alt="微信扫码领取免费求职评估" className="mx-auto h-40 w-40 rounded-[10px] bg-white object-contain" />
              <div className="mt-4 text-[13px] font-semibold" style={{ color: GREEN_DARK }}>微信扫码 · 立即领取</div>
            </div>

            <div className="space-y-4">
              {['免费 1V1 初步评估（30 分钟）', '个性化求职建议', '专属提升方案'].map(item => (
                <div key={item} className="flex items-center gap-3 rounded-[14px] bg-[#F2FBF7] px-5 py-4 text-[15px] font-semibold" style={{ color: INK }}>
                  <Check size={18} color={GREEN} />
                  {item}
                </div>
              ))}
              <button onClick={openCTA} className="mt-2 inline-flex h-11 items-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]" style={{ background: GREEN, boxShadow: '0 4px 20px rgba(0,168,112,0.28)' }}>
                免费领取求职诊断 <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <WeChatModal isOpen={modalOpen} onClose={closeCTA} />
    </main>
  );
}
