type DataLayerValue = string | number | boolean | undefined;
type DataLayerPayload = Record<string, DataLayerValue>;

declare global {
  interface Window {
    dataLayer?: DataLayerPayload[];
  }
}

export type CtaSource = {
  button_text: string;
  button_location: string;
};

const DEFAULT_CTA_SOURCE: CtaSource = {
  button_text: 'unknown',
  button_location: 'unknown',
};

let latestCtaSource = DEFAULT_CTA_SOURCE;
const qrModalEngagedSentPaths = new Set<string>();

export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function getLanguageFromPath(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  return pathname.startsWith('/en') ? 'en' : 'zh';
}

export function getPageType(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const normalized = pathname.replace(/^\/en(?=\/|$)/, '') || '/';

  if (normalized === '/' || normalized === '/general') return 'general';
  if (normalized === '/opt') return 'opt';
  if (normalized === '/internship') return 'internship';
  if (normalized === '/occupation') return 'occupation';
  if (normalized === '/general-job-coaching' || normalized === '/short-version') return 'general_job_coaching';
  if (normalized === '/opt-support' || normalized === '/opt-short-version') return 'opt_support';
  if (normalized === '/internship-support' || normalized === '/internship-short-version') return 'internship_support';
  if (
    normalized === '/occupation-support' ||
    normalized === '/occupation-Support' ||
    normalized === '/occupation-short-version'
  ) return 'occupation_support';
  if (normalized === '/general-2pageposter') return 'general_2pageposter';

  return normalized.replace(/^\//, '').replaceAll('-', '_') || 'unknown';
}

function getPagePath() {
  if (typeof window === 'undefined') return '';
  return `${window.location.pathname}${window.location.search}`;
}

function getPageContext(includeTitle = false): DataLayerPayload {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const context: DataLayerPayload = {
    page_path: getPagePath(),
    page_type: getPageType(pathname),
    language: getLanguageFromPath(pathname),
    device_type: getDeviceType(),
  };

  if (includeTitle && typeof document !== 'undefined') {
    context.page_title = document.title;
  }

  return context;
}

export function pushGtmEvent(event: string, payload: DataLayerPayload = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

function normalizeText(value?: string | null) {
  return value?.replace(/\s+/g, ' ').trim() || 'unknown';
}

function getEventElement(event?: unknown) {
  if (!event || typeof event !== 'object') return null;
  const currentTarget = (event as { currentTarget?: unknown }).currentTarget;
  return currentTarget instanceof HTMLElement ? currentTarget : null;
}

function resolveButtonLocation(element: HTMLElement | null) {
  if (!element) return 'unknown';

  const explicit = element.getAttribute('data-cta-location');
  if (explicit) return explicit;

  const container = element.closest('[data-section], section[id], header[id], footer, nav');
  if (!container) return 'unknown';

  if (container instanceof HTMLElement && container.dataset.section) return container.dataset.section;
  if (container.id) return container.id;

  const tagName = container.tagName.toLowerCase();
  if (tagName === 'nav') return 'navigation';
  if (tagName === 'footer') return 'footer';
  if (tagName === 'header') return 'hero';

  return tagName;
}

function getCtaSourceFromEvent(event?: unknown): CtaSource {
  const element = getEventElement(event);

  return {
    button_text: normalizeText(element?.textContent),
    button_location: resolveButtonLocation(element),
  };
}

export function getLatestCtaSource() {
  return latestCtaSource;
}

export function trackCTAIntent(event: unknown, targetUrl: string) {
  const source = getCtaSourceFromEvent(event);
  const deviceType = getDeviceType();
  const isMobile = deviceType === 'mobile';

  latestCtaSource = source;

  pushGtmEvent('Button_Clicks', {
    ...getPageContext(),
    ...source,
    lead_method: isMobile ? 'wechat_direct' : 'qr_modal',
  });

  if (isMobile) {
    pushGtmEvent('wechat_direct_click', {
      ...getPageContext(),
      ...source,
      target_url: targetUrl,
    });
  }

  return { isMobile, source };
}

export function trackQrModalOpen(source: CtaSource = latestCtaSource) {
  pushGtmEvent('qr_modal_open', {
    ...getPageContext(),
    ...source,
  });
}

export function trackQrModalEngaged(source: CtaSource = latestCtaSource, stayDurationSec = 10) {
  const pagePath = getPagePath();
  if (qrModalEngagedSentPaths.has(pagePath)) return;
  qrModalEngagedSentPaths.add(pagePath);

  pushGtmEvent('qr_modal_engaged', {
    ...getPageContext(),
    ...source,
    stay_duration_sec: stayDurationSec,
    stay_duration_ms: stayDurationSec * 1000,
  });
}

export function trackPageView() {
  pushGtmEvent('page_view', getPageContext(true));
}

export function trackTimeOnPage(durationSec: 10 | 30 | 60) {
  pushGtmEvent(`time_on_page_${durationSec}s`, {
    ...getPageContext(),
    duration_sec: durationSec,
  });
}

export function trackScrollDepth(percent: 25 | 50 | 75 | 90) {
  pushGtmEvent('scroll_depth', {
    ...getPageContext(),
    percent,
  });
}

export function trackLanguageSwitch(
  fromLanguage: string,
  toLanguage: string,
  fromPath: string,
  toPath: string,
) {
  pushGtmEvent('language_switch', {
    from_language: fromLanguage,
    to_language: toLanguage,
    from_path: fromPath,
    to_path: toPath,
    device_type: getDeviceType(),
  });
}
