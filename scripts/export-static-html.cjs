const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const indexPath = path.join(dist, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist. Run npm run build first.');
  process.exit(1);
}

const routes = [
  '/',
  '/en',
  '/opt',
  '/en/opt',
  '/internship',
  '/en/internship',
  '/occupation',
  '/en/occupation',
  '/short-version',
  '/en/short-version',
  '/opt-short-version',
  '/en/opt-short-version',
  '/internship-short-version',
  '/en/internship-short-version',
  '/occupation-short-version',
  '/en/occupation-short-version',
];

function relativeAssetPrefix(route) {
  const depth = route === '/' ? 0 : route.split('/').filter(Boolean).length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function htmlForRoute(indexHtml, route) {
  const prefix = relativeAssetPrefix(route);
  const staticRouteScript = '<script>window.__MENTORX_STATIC_ROUTE__ = ' + JSON.stringify(route) + ';<\/script>';

  return indexHtml
    .split('src="/assets/').join('src="' + prefix + 'assets/')
    .split('href="/assets/').join('href="' + prefix + 'assets/')
    .replace('</head>', '      ' + staticRouteScript + '\n    </head>');
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of routes) {
  const outputPath = route === '/'
    ? indexPath
    : path.join(dist, route.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, htmlForRoute(indexHtml, route));
}

const listPath = path.join(dist, 'STATIC_HTML_ROUTES.txt');
fs.writeFileSync(
  listPath,
  routes.map(route => route === '/' ? '/index.html' : route + '/index.html').join('\n') + '\n'
);

console.log('Generated ' + routes.length + ' static HTML entry files in dist/.');
console.log('These files can be opened directly or deployed as a static site.');
console.log('Route list: dist/STATIC_HTML_ROUTES.txt');
