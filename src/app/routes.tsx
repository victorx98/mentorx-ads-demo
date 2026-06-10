import { lazy, type ReactElement } from 'react';

const LandingPage = lazy(() => import('./components/LandingPage').then(module => ({ default: module.LandingPage })));
const LandingPageEn = lazy(() => import('./components/LandingPageEn').then(module => ({ default: module.LandingPageEn })));
const OPT = lazy(() => import('./components/OPT').then(module => ({ default: module.OPT })));
const OPTEn = lazy(() => import('./components/OPTEn').then(module => ({ default: module.OPTEn })));
const Internship = lazy(() => import('./components/Internship').then(module => ({ default: module.Internship })));
const InternshipEn = lazy(() => import('./components/InternshipEn').then(module => ({ default: module.InternshipEn })));
const Occupation = lazy(() => import('./components/Occupation').then(module => ({ default: module.Occupation })));
const OccupationEn = lazy(() => import('./components/OccupationEn').then(module => ({ default: module.OccupationEn })));
const ShortVersion = lazy(() => import('./components/ShortVersion').then(module => ({ default: module.LandingPage })));
const ShortVersionEn = lazy(() => import('./components/ShortVersionEn').then(module => ({ default: module.LandingPage })));
const OptShortVersion = lazy(() => import('./components/OptShortVersion').then(module => ({ default: module.OPT })));
const OptShortVersionEn = lazy(() => import('./components/OptShortVersionEn').then(module => ({ default: module.OPT })));
const InternshipShortVersion = lazy(() => import('./components/InternshipShortVersion').then(module => ({ default: module.Internship })));
const InternshipShortVersionEn = lazy(() => import('./components/InternshipShortVersionEn').then(module => ({ default: module.Internship })));
const OccupationShortVersion = lazy(() => import('./components/OccupationShortVersion').then(module => ({ default: module.Occupation })));
const OccupationShortVersionEn = lazy(() => import('./components/OccupationShortVersionEn').then(module => ({ default: module.Occupation })));
const General2PagePoster = lazy(() => import('./components/General2PagePoster').then(module => ({ default: module.General2PagePoster })));

export type AppRoute = {
  path: string;
  label: string;
  element: ReactElement;
  showInNav?: boolean;
};

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    label: '首页',
    element: <LandingPage />,
    showInNav: true,
  },
  {
    path: '/en',
    label: 'Landing Page EN',
    element: <LandingPageEn />,
    showInNav: false,
  },
  {
    path: '/opt',
    label: 'OPT',
    element: <OPT />,
    showInNav: true,
  },
  {
    path: '/en/opt',
    label: 'OPT EN',
    element: <OPTEn />,
    showInNav: false,
  },
  {
    path: '/internship',
    label: '实习项目',
    element: <Internship />,
    showInNav: true,
  },
  {
    path: '/en/internship',
    label: 'Internship EN',
    element: <InternshipEn />,
    showInNav: false,
  },
  {
    path: '/occupation',
    label: '职业规划',
    element: <Occupation />,
    showInNav: true,
  },
  {
    path: '/en/occupation',
    label: 'Occupation EN',
    element: <OccupationEn />,
    showInNav: false,
  },
  {
    path: '/short-version',
    label: '首页短版',
    element: <ShortVersion />,
    showInNav: false,
  },
  {
    path: '/en/short-version',
    label: 'Short Version EN',
    element: <ShortVersionEn />,
    showInNav: false,
  },
  {
    path: '/opt-short-version',
    label: 'OPT短版',
    element: <OptShortVersion />,
    showInNav: false,
  },
  {
    path: '/en/opt-short-version',
    label: 'OPT Short Version EN',
    element: <OptShortVersionEn />,
    showInNav: false,
  },
  {
    path: '/internship-short-version',
    label: '实习项目短版',
    element: <InternshipShortVersion />,
    showInNav: false,
  },
  {
    path: '/en/internship-short-version',
    label: 'Internship Short Version EN',
    element: <InternshipShortVersionEn />,
    showInNav: false,
  },
  {
    path: '/occupation-short-version',
    label: '职业规划短版',
    element: <OccupationShortVersion />,
    showInNav: false,
  },
  {
    path: '/en/occupation-short-version',
    label: 'Occupation Short Version EN',
    element: <OccupationShortVersionEn />,
    showInNav: false,
  },
  {
    path: '/general-2pageposter',
    label: 'General 2 Page Poster',
    element: <General2PagePoster />,
    showInNav: false,
  },
];
