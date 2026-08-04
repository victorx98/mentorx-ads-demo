import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import heroImage from '../imports/banner1.webp';
import logoImage from '../imports/mentorx-logo.svg';

const SITE_URL = 'https://lp.mentorx.net';
const SITE_NAME = 'MentorX 蔓藤教育';
const JSON_LD_SCRIPT_ID = 'mentorx-json-ld';

type SeoEntry = {
  title: string;
  description: string;
  keywords: string;
  lang: 'zh-CN' | 'en';
  canonicalPath: string;
  alternatePath?: string;
  robots: 'index, follow' | 'noindex, follow';
};

export const seoEntries: Record<string, SeoEntry> = {
  '/': {
    title: 'MentorX 蔓藤教育｜留学生求职规划与职业发展支持',
    description: 'MentorX 为留学生提供求职辅导，全流程陪伴简历优化、面试准备、实习申请、全职求职和职业规划，帮助 F-1 学生拿下Dream Offer。',
    keywords: '留学生求职；美国找工作；美国求职辅导；简历修改；面试辅导；北美求职',
    lang: 'zh-CN',
    canonicalPath: '/general',
    alternatePath: '/en/general',
    robots: 'index, follow',
  },
  '/general': {
    title: 'MentorX 蔓藤教育｜留学生求职规划与职业发展支持',
    description: 'MentorX 为留学生提供求职辅导，全流程陪伴简历优化、面试准备、实习申请、全职求职和职业规划，帮助 F-1 学生拿下Dream Offer。',
    keywords: '留学生求职；美国找工作；美国求职辅导；简历修改；面试辅导；北美求职',
    lang: 'zh-CN',
    canonicalPath: '/general',
    alternatePath: '/en/general',
    robots: 'index, follow',
  },
  '/en': {
    title: 'Career Coaching for International Students in the U.S.｜MentorX',
    description: 'MentorX helps international students with U.S. job search coaching, resume optimization, interview preparation, internship applications, and full-time career planning.',
    keywords: 'career coaching; international student job search; resume help; interview coaching; U.S. job search',
    lang: 'en',
    canonicalPath: '/en/general',
    alternatePath: '/general',
    robots: 'index, follow',
  },
  '/en/general': {
    title: 'Career Coaching for International Students in the U.S.｜MentorX',
    description: 'MentorX helps international students with U.S. job search coaching, resume optimization, interview preparation, internship applications, and full-time career planning.',
    keywords: 'career coaching; international student job search; resume help; interview coaching; U.S. job search',
    lang: 'en',
    canonicalPath: '/en/general',
    alternatePath: '/general',
    robots: 'index, follow',
  },
  '/opt': {
    title: 'OPT/CPT 快速上岸｜留学生美国求职支持｜MentorX',
    description: 'MentorX 为 OPT、CPT、STEM OPT 和 F-1 留学生提供美国求职规划，帮助学生应对求职时间线、简历面试和身份相关挑战。',
    keywords: 'OPT 找工作；CPT 实习；F-1 留学生求职；STEM OPT；OPT 失业期；H1B sponsor',
    lang: 'zh-CN',
    canonicalPath: '/opt',
    alternatePath: '/en/opt',
    robots: 'index, follow',
  },
  '/en/opt': {
    title: 'OPT/CPT Career Coaching for F-1 Students | MentorX',
    description: 'MentorX provides OPT, CPT, STEM OPT, and F-1 student job search support, including resume coaching, interview preparation, and U.S. career planning.',
    keywords: 'OPT job search; CPT internship; F-1 student jobs; STEM OPT jobs; H1B sponsorship jobs; international student jobs',
    lang: 'en',
    canonicalPath: '/en/opt',
    alternatePath: '/opt',
    robots: 'index, follow',
  },
  '/internship': {
    title: '美国实习申请辅导｜留学生找实习、项目经历提升｜MentorX',
    description: 'MentorX 帮助留学生规划美国实习申请，提升简历、项目经历和面试能力，适合无经验、转专业或希望冲刺名企实习的学生。',
    keywords: '美国实习；留学生实习；找实习；实习申请；项目经历；无经验找实习',
    lang: 'zh-CN',
    canonicalPath: '/internship',
    alternatePath: '/en/internship',
    robots: 'index, follow',
  },
  '/en/internship': {
    title: 'Internship Coaching for International Students｜U.S. Internship Help｜MentorX',
    description: 'MentorX helps international students prepare for U.S. internships with resume support, project experience guidance, interview coaching, and career planning.',
    keywords: 'internship coaching; U.S. internship help; internship for international students; resume support; project experience',
    lang: 'en',
    canonicalPath: '/en/internship',
    alternatePath: '/internship',
    robots: 'index, follow',
  },
  '/occupation': {
    title: '留学生岗位定制求职辅导｜SDE、数据分析、BA、金融求职｜MentorX',
    description: 'MentorX 根据目标岗位提供定制化求职辅导，覆盖软件工程师、数据分析师、商业分析师、金融、会计、产品和 UIUX 等方向。',
    keywords: 'SDE 求职；数据分析求职；BA 求职；金融求职；会计求职；UIUX 求职；岗位规划',
    lang: 'zh-CN',
    canonicalPath: '/occupation',
    alternatePath: '/en/occupation',
    robots: 'index, follow',
  },
  '/en/occupation': {
    title: 'Role-Based Career Coaching｜Software, Data, Business, Finance｜MentorX',
    description: 'MentorX helps international students translate their academic background into stronger internship, full-time, and career pathways.',
    keywords: 'software engineer career coaching; data analyst job search; business analyst career; finance career coaching; role-based career coaching',
    lang: 'en',
    canonicalPath: '/en/occupation',
    alternatePath: '/occupation',
    robots: 'index, follow',
  },
  '/general-job-coaching': {
    title: '留学生求职辅导｜快速判断求职卡点｜MentorX',
    description: '想在美国找实习或全职？MentorX 提供免费求职评估，帮助留学生快速了解简历、面试和求职方向的提升空间。',
    keywords: '留学生求职评估；美国求职规划；找工作帮助；简历评估；面试准备',
    lang: 'zh-CN',
    canonicalPath: '/general-job-coaching',
    alternatePath: '/en/general-job-coaching',
    robots: 'index, follow',
  },
  '/en/general-job-coaching': {
    title: 'Free Career Assessment for International Students｜MentorX',
    description: 'Start your U.S. job search with a free career assessment. MentorX helps international students improve resumes, interviews, and job search strategies.',
    keywords: 'career assessment; international students; job search strategy; resume assessment; interview prep',
    lang: 'en',
    canonicalPath: '/en/general-job-coaching',
    alternatePath: '/general-job-coaching',
    robots: 'index, follow',
  },
  '/opt-support': {
    title: 'OPT 求职帮助｜避免 OPT 失业期风险｜MentorX',
    description: '毕业还没找到工作？MentorX 提供求职评估、简历优化和面试准备，帮助 F-1 留学生尽快推进美国求职。',
    keywords: 'OPT 求职帮助；OPT 失业期；F-1 求职；STEM OPT jobs；CPT 求职规划',
    lang: 'zh-CN',
    canonicalPath: '/opt-support',
    alternatePath: '/en/opt-support',
    robots: 'index, follow',
  },
  '/en/opt-support': {
    title: 'Get Hired During OPT｜Job Search Support for F-1 Students',
    description: 'Need help finding a job during OPT? MentorX supports F-1 students with career assessment, resume optimization, interview coaching, and job search strategy.',
    keywords: 'OPT job search help; OPT unemployment; F-1 job search; STEM OPT; CPT jobs; visa sponsorship jobs',
    lang: 'en',
    canonicalPath: '/en/opt-support',
    alternatePath: '/opt-support',
    robots: 'index, follow',
  },
  '/internship-support': {
    title: '留学生找实习辅导｜美国实习快速规划｜MentorX',
    description: '准备申请美国实习？MentorX 提供实习方向评估、简历优化和面试辅导，帮助留学生更快找到适合自己的实习路径。',
    keywords: '留学生找实习；美国实习辅导；实习方向评估；简历优化；面试辅导',
    lang: 'zh-CN',
    canonicalPath: '/internship-support',
    alternatePath: '/en/internship-support',
    robots: 'index, follow',
  },
  '/en/internship-support': {
    title: 'U.S. Internship Support for For F-1 Students｜MentorX',
    description: 'Looking for a U.S. internship? MentorX helps international students strengthen resumes, prepare interviews, and plan internship applications.',
    keywords: 'U.S. internship support; internship help; summer internship; paid internship; international student internship',
    lang: 'en',
    canonicalPath: '/en/internship-support',
    alternatePath: '/internship-support',
    robots: 'index, follow',
  },
  '/occupation-support': {
    title: '留学生岗位定制求职辅导｜SDE/DA/BA/金融岗位辅导｜MentorX',
    description: '不确定自己适合申请什么岗位？MentorX 帮你评估背景，匹配适合的求职方向，并制定简历、项目和面试提升方案。',
    keywords: '岗位求职评估；SDE 求职；Data Analyst 求职；Business Analyst 求职；金融岗位',
    lang: 'zh-CN',
    canonicalPath: '/occupation-support',
    alternatePath: '/en/occupation-support',
    robots: 'index, follow',
  },
  '/occupation-Support': {
    title: '留学生岗位定制求职辅导｜SDE/DA/BA/金融岗位辅导｜MentorX',
    description: '不确定自己适合申请什么岗位？MentorX 帮你评估背景，匹配适合的求职方向，并制定简历、项目和面试提升方案。',
    keywords: '岗位求职评估；SDE 求职；Data Analyst 求职；Business Analyst 求职；金融岗位',
    lang: 'zh-CN',
    canonicalPath: '/occupation-support',
    alternatePath: '/en/occupation-support',
    robots: 'index, follow',
  },
  '/en/occupation-support': {
    title: 'Role-Based Career Coaching｜SDE, Data, Business, Finance｜MentorX',
    description: 'Find the right career path based on your background. MentorX helps students assess target roles and build a practical U.S. job search plan.',
    keywords: 'job role assessment; software engineer job; data analyst job; business analyst job; finance jobs; career path planning',
    lang: 'en',
    canonicalPath: '/en/occupation-support',
    alternatePath: '/occupation-support',
    robots: 'index, follow',
  },
  '/short-version': {
    title: '留学生求职辅导｜快速判断求职卡点｜MentorX',
    description: '想在美国找实习或全职？MentorX 提供免费求职评估，帮助留学生快速了解简历、面试和求职方向的提升空间。',
    keywords: '留学生求职评估；美国求职规划；找工作帮助；简历评估；面试准备',
    lang: 'zh-CN',
    canonicalPath: '/general-job-coaching',
    alternatePath: '/en/general-job-coaching',
    robots: 'index, follow',
  },
  '/en/short-version': {
    title: 'Free Career Assessment for International Students｜MentorX',
    description: 'Start your U.S. job search with a free career assessment. MentorX helps international students improve resumes, interviews, and job search strategies.',
    keywords: 'career assessment; international students; job search strategy; resume assessment; interview prep',
    lang: 'en',
    canonicalPath: '/en/general-job-coaching',
    alternatePath: '/general-job-coaching',
    robots: 'index, follow',
  },
  '/opt-short-version': {
    title: 'OPT 求职帮助｜避免 OPT 失业期风险｜MentorX',
    description: '毕业还没找到工作？MentorX 提供求职评估、简历优化和面试准备，帮助 F-1 留学生尽快推进美国求职。',
    keywords: 'OPT 求职帮助；OPT 失业期；F-1 求职；STEM OPT jobs；CPT 求职规划',
    lang: 'zh-CN',
    canonicalPath: '/opt-support',
    alternatePath: '/en/opt-support',
    robots: 'index, follow',
  },
  '/en/opt-short-version': {
    title: 'Get Hired During OPT｜Job Search Support for F-1 Students',
    description: 'Need help finding a job during OPT? MentorX supports F-1 students with career assessment, resume optimization, interview coaching, and job search strategy.',
    keywords: 'OPT job search help; OPT unemployment; F-1 job search; STEM OPT; CPT jobs; visa sponsorship jobs',
    lang: 'en',
    canonicalPath: '/en/opt-support',
    alternatePath: '/opt-support',
    robots: 'index, follow',
  },
  '/internship-short-version': {
    title: '留学生找实习辅导｜美国实习快速规划｜MentorX',
    description: '准备申请美国实习？MentorX 提供实习方向评估、简历优化和面试辅导，帮助留学生更快找到适合自己的实习路径。',
    keywords: '留学生找实习；美国实习辅导；实习方向评估；简历优化；面试辅导',
    lang: 'zh-CN',
    canonicalPath: '/internship-support',
    alternatePath: '/en/internship-support',
    robots: 'index, follow',
  },
  '/en/internship-short-version': {
    title: 'U.S. Internship Support for For F-1 Students｜MentorX',
    description: 'Looking for a U.S. internship? MentorX helps international students strengthen resumes, prepare interviews, and plan internship applications.',
    keywords: 'U.S. internship support; internship help; summer internship; paid internship; international student internship',
    lang: 'en',
    canonicalPath: '/en/internship-support',
    alternatePath: '/internship-support',
    robots: 'index, follow',
  },
  '/occupation-short-version': {
    title: '留学生岗位定制求职辅导｜SDE/DA/BA/金融岗位辅导｜MentorX',
    description: '不确定自己适合申请什么岗位？MentorX 帮你评估背景，匹配适合的求职方向，并制定简历、项目和面试提升方案。',
    keywords: '岗位求职评估；SDE 求职；Data Analyst 求职；Business Analyst 求职；金融岗位',
    lang: 'zh-CN',
    canonicalPath: '/occupation-support',
    alternatePath: '/en/occupation-support',
    robots: 'index, follow',
  },
  '/en/occupation-short-version': {
    title: 'Role-Based Career Coaching｜SDE, Data, Business, Finance｜MentorX',
    description: 'Find the right career path based on your background. MentorX helps students assess target roles and build a practical U.S. job search plan.',
    keywords: 'job role assessment; software engineer job; data analyst job; business analyst job; finance jobs; career path planning',
    lang: 'en',
    canonicalPath: '/en/occupation-support',
    alternatePath: '/occupation-support',
    robots: 'index, follow',
  },
  '/campus-recruiting': {
    title: '中美校招双通道｜留学生校园招聘全流程支持｜MentorX 蔓藤教育',
    description: '面向本科与硕士在读留学生的校招赋能计划：美国 + 中国双通道岗位资源、名企导师 1v1、AI 课程体系与全流程投递支持，留美或回国都能走通。',
    keywords: '留学生校招；秋招；春招；校园招聘；回国求职；美国校招；实习内推；中美双通道',
    lang: 'zh-CN',
    canonicalPath: '/campus-recruiting',
    alternatePath: '/en/campus-recruiting',
    robots: 'index, follow',
  },
  '/en/campus-recruiting': {
    title: 'US–China Dual-Track Campus Recruiting for International Students｜MentorX',
    description: 'A campus-recruiting program for international students: 1:1 mentors from top employers, an AI-powered curriculum, and job pipelines in both the US and China — so staying or returning both stay open.',
    keywords: 'campus recruiting; new grad jobs; international student job search; China campus hiring; US campus hiring; referrals; internships',
    lang: 'en',
    canonicalPath: '/en/campus-recruiting',
    alternatePath: '/campus-recruiting',
    robots: 'index, follow',
  },
  '/resume': {
    title: '简历代投 + AI 改简历｜真人导师精修 + ATS 优化｜MentorX 蔓藤教育',
    description: '简历别再海投了。真人导师逐句精修，配合 EdAIX 的 ATS 评分与 JD 差距分析，精准筛岗、定制化代投、每日投递日报，把海投交给专业的人。',
    keywords: '简历代投；简历修改；AI 改简历；ATS 简历优化；美国找工作；岗位内推；投递日报',
    lang: 'zh-CN',
    canonicalPath: '/resume',
    alternatePath: '/en/resume',
    robots: 'index, follow',
  },
  '/en/resume': {
    title: 'Managed Applications + AI Résumé Editing｜Mentor-Led and ATS-Ready｜MentorX',
    description: 'Stop mass-applying. Mentor-led line-by-line rewrites plus EdAIX ATS scoring and JD gap analysis, with targeted role screening, tailored submissions, and daily reports.',
    keywords: 'resume writing service; AI resume; ATS resume optimization; managed job applications; job referrals; international student job search',
    lang: 'en',
    canonicalPath: '/en/resume',
    alternatePath: '/resume',
    robots: 'index, follow',
  },
  '/general-2pageposter': {
    title: '留学生美国求职辅导｜简历修改、面试辅导、实习全职规划｜MentorX ',
    description: '了解 MentorX 留学生求职辅导服务，覆盖美国实习、全职求职、OPT/CPT 求职规划、简历优化和面试准备。',
    keywords: '留学生求职；美国实习；OPT 求职；全职求职；简历优化；面试准备',
    lang: 'zh-CN',
    canonicalPath: '/general-2pageposter',
    robots: 'index, follow',
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

function getServiceName(path: string, entry: SeoEntry) {
  const isEnglish = entry.lang === 'en';

  if (path.includes('internship')) {
    return isEnglish
      ? 'U.S. Internship Coaching for International Students'
      : '留学生美国实习申请辅导';
  }

  if (path.includes('opt')) {
    return isEnglish
      ? 'OPT/CPT Job Search Support for F-1 Students'
      : 'OPT/CPT 留学生求职规划';
  }

  if (path.includes('occupation')) {
    return isEnglish
      ? 'Role-Based Career Coaching for International Students'
      : '留学生岗位定制求职辅导';
  }

  if (path.includes('campus-recruiting')) {
    return isEnglish
      ? 'US–China Dual-Track Campus Recruiting Program for International Students'
      : '留学生中美校招双通道求职赋能计划';
  }

  if (path.includes('resume')) {
    return isEnglish
      ? 'Résumé Editing and Managed Job Application Service for International Students'
      : '留学生简历精修与代投服务';
  }

  return isEnglish
    ? 'Career Coaching for International Students'
    : '留学生美国求职全流程辅导';
}

function setJsonLd(path: string, entry: SeoEntry, canonicalUrl: string) {
  let script = document.getElementById(JSON_LD_SCRIPT_ID) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = JSON_LD_SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const serviceId = `${canonicalUrl}#service`;
  const isEnglish = entry.lang === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_NAME,
        alternateName: ['MentorX', '蔓藤教育'],
        url: SITE_URL,
        logo: new URL(logoImage, window.location.origin).href,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: {
          '@id': organizationId,
        },
        inLanguage: ['zh-CN', 'en'],
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: entry.title,
        description: entry.description,
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': serviceId,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: new URL(heroImage, window.location.origin).href,
        },
        inLanguage: entry.lang,
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: getServiceName(path, entry),
        description: entry.description,
        provider: {
          '@id': organizationId,
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        audience: {
          '@type': 'Audience',
          audienceType: isEnglish ? 'International students' : '留学生',
        },
        serviceType: isEnglish
          ? 'Career coaching, resume coaching, interview preparation, internship and job search planning'
          : '求职规划、简历优化、面试辅导、实习申请与全职求职支持',
      },
    ],
  };

  script.textContent = JSON.stringify(jsonLd);
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
    setMeta('keywords', entry.keywords);
    setMeta('robots', entry.robots);
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
    setJsonLd(path, entry, canonicalUrl);
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
