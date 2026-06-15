import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getLanguageFromPath,
  trackLanguageSwitch,
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from './analytics';

type PreviousRoute = {
  path: string;
  language: string;
};

const TIME_THRESHOLDS = [10, 30, 60] as const;
const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

export function AnalyticsTracker() {
  const location = useLocation();
  const previousRoute = useRef<PreviousRoute | null>(null);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    const language = getLanguageFromPath(location.pathname);

    if (previousRoute.current && previousRoute.current.language !== language) {
      trackLanguageSwitch(previousRoute.current.language, language, previousRoute.current.path, pagePath);
    }

    previousRoute.current = { path: pagePath, language };

    window.requestAnimationFrame(() => trackPageView());

    const timers = TIME_THRESHOLDS.map(durationSec =>
      window.setTimeout(() => trackTimeOnPage(durationSec), durationSec * 1000),
    );
    const pendingScrollDepths = new Set<number>(SCROLL_THRESHOLDS);

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollableDistance = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const currentPercent = Math.min(100, Math.round((window.scrollY / scrollableDistance) * 100));

      for (const threshold of SCROLL_THRESHOLDS) {
        if (pendingScrollDepths.has(threshold) && currentPercent >= threshold) {
          pendingScrollDepths.delete(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.setTimeout(handleScroll, 500);

    return () => {
      timers.forEach(timer => window.clearTimeout(timer));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.search]);

  return null;
}

