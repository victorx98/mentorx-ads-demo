import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://lp.mentorx.net';
const SITE_NAME = 'MentorX 蔓藤教育';

type SeoEntry = {
  title: string;
  description: string;
  lang: 'zh-CN' | 'en';
  canonicalPath: string;
  alternatePath?: string;
};

export const seoEntries: Record<string, SeoEntry> = {
  '/': {
    title: 'MentorX 蔓藤教育｜留学生求职规划与职业发展支持',
    description: 'MentorX 为北美留学生提供求职规划、简历优化、名企导师辅导、面试准备与职业发展支持，帮助学生从校园走向理想职场。',
    lang: 'zh-CN',
    canonicalPath: '/',
    alternatePath: '/en',
  },
  '/en': {
    title: 'MentorX | Career Coaching for International Students',
    description: 'MentorX helps international students clarify career direction, strengthen applications, prepare for interviews, and move from campus to career with confidence.',
    lang: 'en',
    canonicalPath: '/en',
    alternatePath: '/',
  },
  '/opt': {
    title: 'OPT/CPT 求职规划｜留学生美国求职与上岸支持｜MentorX',
    description: '面向 OPT、CPT、H1B 时间线紧张的留学生，MentorX 提供岗位定位、简历优化、投递策略、面试准备与 Offer 推进支持。',
    lang: 'zh-CN',
    canonicalPath: '/opt',
    alternatePath: '/en/opt',
  },
  '/en/opt': {
    title: 'OPT/CPT Career Coaching for International Students | MentorX',
    description: 'MentorX supports international students with OPT/CPT timelines through role targeting, resume strategy, interview preparation, and offer conversion support.',
    lang: 'en',
    canonicalPath: '/en/opt',
    alternatePath: '/opt',
  },
  '/internship': {
    title: '留学生实习申请与暑期项目规划｜MentorX 蔓藤教育',
    description: 'MentorX 帮助留学生匹配海外实习、远程实习、暑期项目与背景提升路径，推进简历优化、岗位匹配、申请节奏和面试准备。',
    lang: 'zh-CN',
    canonicalPath: '/internship',
    alternatePath: '/en/internship',
  },
  '/en/internship': {
    title: 'Internship Coaching for International Students | MentorX',
    description: 'MentorX helps international students plan summer internships, remote internships, resume positioning, application strategy, and interview preparation.',
    lang: 'en',
    canonicalPath: '/en/internship',
    alternatePath: '/internship',
  },
  '/occupation': {
    title: '留学生职业方向规划｜专业转化与求职路径支持｜MentorX',
    description: 'MentorX 根据专业背景、岗位趋势、行业导师经验与真实案例，帮助留学生找到更适合的实习、全职和职业发展路径。',
    lang: 'zh-CN',
    canonicalPath: '/occupation',
    alternatePath: '/en/occupation',
  },
  '/en/occupation': {
    title: 'Career Direction Planning for International Students | MentorX',
    description: 'MentorX helps international students translate their academic background into stronger internship, full-time, and career pathways.',
    lang: 'en',
    canonicalPath: '/en/occupation',
    alternatePath: '/occupation',
  },
  '/short-version': {
    title: '留学生求职诊断｜快速判断求职卡点｜MentorX',
    description: '快速判断留学生求职中的方向、简历、投递和面试问题，获取 MentorX 个性化求职建议与下一步行动方案。',
    lang: 'zh-CN',
    canonicalPath: '/short-version',
    alternatePath: '/en/short-version',
  },
  '/en/short-version': {
    title: 'International Student Career Diagnosis | MentorX',
    description: 'Get a focused career diagnosis for role direction, resume gaps, application strategy, and next-step planning with MentorX.',
    lang: 'en',
    canonicalPath: '/en/short-version',
    alternatePath: '/short-version',
  },
  '/opt-short-version': {
    title: 'OPT/CPT 快速求职评估｜MentorX',
    description: '面向 OPT/CPT 时间紧张的留学生，快速评估当前求职方向、简历问题和投递优先级。',
    lang: 'zh-CN',
    canonicalPath: '/opt-short-version',
    alternatePath: '/en/opt-short-version',
  },
  '/en/opt-short-version': {
    title: 'OPT/CPT Career Assessment | MentorX',
    description: 'A focused OPT/CPT career assessment for international students who need clearer role priorities and application strategy.',
    lang: 'en',
    canonicalPath: '/en/opt-short-version',
    alternatePath: '/opt-short-version',
  },
  '/internship-short-version': {
    title: '留学生实习路径快速评估｜MentorX',
    description: '帮助留学生快速判断暑期实习、远程实习、项目经历、简历材料与申请节奏的下一步方案。',
    lang: 'zh-CN',
    canonicalPath: '/internship-short-version',
    alternatePath: '/en/internship-short-version',
  },
  '/en/internship-short-version': {
    title: 'Internship Path Assessment | MentorX',
    description: 'A focused internship path assessment for international students planning summer internships, remote roles, and resume-building projects.',
    lang: 'en',
    canonicalPath: '/en/internship-short-version',
    alternatePath: '/internship-short-version',
  },
  '/occupation-short-version': {
    title: '专业方向与职业路径快速评估｜MentorX',
    description: '根据专业背景与目标行业，快速判断留学生更适合的实习、全职和职业发展方向。',
    lang: 'zh-CN',
    canonicalPath: '/occupation-short-version',
    alternatePath: '/en/occupation-short-version',
  },
  '/en/occupation-short-version': {
    title: 'Major-to-Career Path Assessment | MentorX',
    description: 'A focused assessment that helps international students translate academic majors into stronger internship and full-time pathways.',
    lang: 'en',
    canonicalPath: '/en/occupation-short-version',
    alternatePath: '/occupation-short-version',
  },
  '/general-2pageposter': {
    title: '留学生海外求职诊断｜MentorX 广告落地页',
    description: '两屏式留学生海外求职诊断落地页，帮助学生判断求职方向、简历问题、投递策略和下一步行动。',
    lang: 'zh-CN',
    canonicalPath: '/general-2pageposter',
  },
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname || '/';
}

function setMeta(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function setPropertyMeta(property: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function setLink(rel: string, href: string, attrs?: Record<string, string>) {
  const selector = attrs?.hreflang
    ? `link[rel="${rel}"][hreflang="${attrs.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.querySelector<HTMLLinkElement>(selector);

  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = href;

  Object.entries(attrs ?? {}).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });
}

function clearAlternateLinks() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
}

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const path = normalizePath(location.pathname);
    const entry = seoEntries[path] ?? seoEntries['/'];
    const canonicalUrl = `${SITE_URL}${entry.canonicalPath === '/' ? '/' : entry.canonicalPath}`;

    document.documentElement.lang = entry.lang;
    document.title = entry.title;

    setMeta('description', entry.description);
    setMeta('robots', 'index, follow');
    setMeta('application-name', SITE_NAME);

    setPropertyMeta('og:site_name', SITE_NAME);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:title', entry.title);
    setPropertyMeta('og:description', entry.description);
    setPropertyMeta('og:url', canonicalUrl);
    setPropertyMeta('og:locale', entry.lang === 'en' ? 'en_US' : 'zh_CN');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', entry.title);
    setMeta('twitter:description', entry.description);

    setLink('canonical', canonicalUrl);
    clearAlternateLinks();

    if (entry.alternatePath) {
      const alternate = seoEntries[entry.alternatePath];
      const alternateUrl = `${SITE_URL}${alternate.canonicalPath === '/' ? '/' : alternate.canonicalPath}`;
      setLink('alternate', canonicalUrl, { hreflang: entry.lang === 'en' ? 'en' : 'zh-CN' });
      setLink('alternate', alternateUrl, { hreflang: alternate.lang === 'en' ? 'en' : 'zh-CN' });
      setLink('alternate', entry.lang === 'en' ? alternateUrl : canonicalUrl, { hreflang: 'x-default' });
    }
  }, [location.pathname]);

  return null;
}
