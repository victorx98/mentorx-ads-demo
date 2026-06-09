import { type ReactElement } from 'react';
import { LandingPage } from './components/LandingPage';
import { LandingPageEn } from './components/LandingPageEn';
import { OPT } from './components/OPT';
import { OPTEn } from './components/OPTEn';
import { Internship } from './components/Internship';
import { InternshipEn } from './components/InternshipEn';
import { Occupation } from './components/Occupation';
import { OccupationEn } from './components/OccupationEn';
import { LandingPage as ShortVersion } from './components/ShortVersion';
import { LandingPage as ShortVersionEn } from './components/ShortVersionEn';
import { OPT as OptShortVersion } from './components/OptShortVersion';
import { OPT as OptShortVersionEn } from './components/OptShortVersionEn';
import { Internship as InternshipShortVersion } from './components/InternshipShortVersion';
import { Internship as InternshipShortVersionEn } from './components/InternshipShortVersionEn';
import { Occupation as OccupationShortVersion } from './components/OccupationShortVersion';
import { Occupation as OccupationShortVersionEn } from './components/OccupationShortVersionEn';
import { General2PagePoster } from './components/General2PagePoster';

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
