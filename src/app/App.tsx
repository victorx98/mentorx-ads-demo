import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes';

function RouteList() {
  return (
    <Routes>
      {appRoutes.flatMap(route => {
        const paths = route.path === '/' ? ['/'] : [route.path, route.path + '/'];

        return paths.map(path => (
          <Route key={path} path={path} element={route.element} />
        ));
      })}
    </Routes>
  );
}

export default function App() {
  const staticRoute = typeof window !== 'undefined'
    ? (window as typeof window & { __MENTORX_STATIC_ROUTE__?: string }).__MENTORX_STATIC_ROUTE__
    : undefined;

  if (staticRoute) {
    return (
      <MemoryRouter initialEntries={[staticRoute]}>
        <RouteList />
      </MemoryRouter>
    );
  }

  return (
    <BrowserRouter>
      <RouteList />
    </BrowserRouter>
  );
}
