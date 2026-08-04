const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const assetsDir = path.join(dist, 'assets');
const outDir = path.join(root, 'standalone-html');

const routes = [
  { route: '/', file: 'index.html' },
  { route: '/en', file: 'en.html' },
  { route: '/opt', file: 'opt.html' },
  { route: '/en/opt', file: 'en-opt.html' },
  { route: '/internship', file: 'internship.html' },
  { route: '/en/internship', file: 'en-internship.html' },
  { route: '/occupation', file: 'occupation.html' },
  { route: '/en/occupation', file: 'en-occupation.html' },
  { route: '/short-version', file: 'short-version.html' },
  { route: '/en/short-version', file: 'en-short-version.html' },
  { route: '/opt-short-version', file: 'opt-short-version.html' },
  { route: '/en/opt-short-version', file: 'en-opt-short-version.html' },
  { route: '/internship-short-version', file: 'internship-short-version.html' },
  { route: '/en/internship-short-version', file: 'en-internship-short-version.html' },
  { route: '/occupation-short-version', file: 'occupation-short-version.html' },
  { route: '/en/occupation-short-version', file: 'en-occupation-short-version.html' },
  { route: '/general-2pageposter', file: 'general-2pageposter.html' },
  { route: '/campus-recruiting', file: 'campus-recruiting.html' },
  { route: '/en/campus-recruiting', file: 'en-campus-recruiting.html' },
  { route: '/resume', file: 'resume.html' },
  { route: '/en/resume', file: 'en-resume.html' },
];

const routeFileMap = Object.fromEntries(routes.map(({ route, file }) => [route, file]));

function localFileHref(file) {
  return './' + file;
}

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.woff2') return 'font/woff2';
  if (ext === '.woff') return 'font/woff';
  return 'application/octet-stream';
}

function dataUriFor(file) {
  const full = path.join(assetsDir, file);
  const data = fs.readFileSync(full);
  return 'data:' + mimeFor(file) + ';base64,' + data.toString('base64');
}

function dataUriForPath(fullPath) {
  const data = fs.readFileSync(fullPath);
  return 'data:' + mimeFor(fullPath) + ';base64,' + data.toString('base64');
}

function escapeScriptClose(content) {
  return content.replace(/<\/script/gi, '<\\/script');
}

function escapeHtml(content) {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inlineAssetRefs(content, assetUris) {
  let next = content;
  for (const [file, uri] of assetUris) {
    const patterns = [
      '/assets/' + file,
      './assets/' + file,
      '../assets/' + file,
      '../../assets/' + file,
      'assets/' + file,
    ];
    for (const pattern of patterns) {
      next = next.split(pattern).join(uri);
    }
  }
  return next;
}

function inlineLocalSrcRefs(content) {
  return content.replace(/\b(src|href)="(file:\/\/\/[^"]+|\/src\/[^"]+)"/g, (match, attr, rawUrl) => {
    const normalizedUrl = rawUrl.replace(/&amp;/g, '&');
    let fullPath;

    try {
      if (normalizedUrl.startsWith('file:///')) {
        fullPath = fileURLToPath(normalizedUrl);
      } else if (normalizedUrl.startsWith('/src/')) {
        fullPath = path.join(root, normalizedUrl.slice(1));
      }
    } catch {
      return match;
    }

    if (!fullPath || !fs.existsSync(fullPath)) return match;
    return attr + '="' + dataUriForPath(fullPath) + '"';
  });
}

function rewriteStandaloneRouteLinks(content) {
  return content.replace(/\bhref="(\/[^"#?]*)([?#][^"]*)?"/g, (match, route, suffix = '') => {
    const file = routeFileMap[route];
    if (!file) return match;
    return 'href="' + localFileHref(file) + suffix + '"';
  });
}

function standaloneNavigationScript() {
  return [
    '<script>',
    'window.__MENTORX_STANDALONE_ROUTE_FILES__=' + JSON.stringify(routeFileMap) + ';',
    'document.addEventListener("click",function(event){',
    'var node=event.target;',
    'var anchor=node&&node.closest?node.closest("a[href]"):null;',
    'if(!anchor)return;',
    'var raw=anchor.getAttribute("href");',
    'if(!raw||raw.charAt(0)==="#"||/^(https?:|mailto:|tel:|data:|file:)/i.test(raw))return;',
    'var hashIndex=raw.indexOf("#");',
    'var hash=hashIndex>=0?raw.slice(hashIndex):"";',
    'var withoutHash=hashIndex>=0?raw.slice(0,hashIndex):raw;',
    'var queryIndex=withoutHash.indexOf("?");',
    'var query=queryIndex>=0?withoutHash.slice(queryIndex):"";',
    'var route=queryIndex>=0?withoutHash.slice(0,queryIndex):withoutHash;',
    'var file=window.__MENTORX_STANDALONE_ROUTE_FILES__[route];',
    'if(!file)return;',
    'event.preventDefault();',
    'window.location.href="./"+file+query+hash;',
    '},true);',
    '<\/script>',
  ].join('');
}

async function loadRenderedRoutes() {
  const React = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { createServer } = await import('vite');
  const vite = await createServer({
    root,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { appRoutes } = await vite.ssrLoadModule('/src/app/routes.tsx');
    const rendered = new Map();

    for (const { route } of routes) {
      const match = appRoutes.find(appRoute => appRoute.path === route);
      if (match) {
        rendered.set(route, renderToStaticMarkup(React.createElement(React.Fragment, null, match.element)));
      }
    }

    return rendered;
  } finally {
    await vite.close();
  }
}

async function main() {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('dist/index.html does not exist. Run npm run build first.');
    process.exit(1);
  }

  const assetFiles = fs.readdirSync(assetsDir);
  const cssFile = assetFiles.find(file => file.endsWith('.css'));
  const jsFile = assetFiles.find(file => file.endsWith('.js'));

  if (!cssFile || !jsFile) {
    console.error('Could not find built CSS/JS files in dist/assets.');
    process.exit(1);
  }

  const assetUris = new Map();
  for (const file of assetFiles) {
    if (file === cssFile || file === jsFile) continue;
    assetUris.set(file, dataUriFor(file));
  }

  let css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  let js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  css = inlineAssetRefs(css, assetUris);
  js = inlineAssetRefs(js, assetUris);

  // Vite emits asset references as new URL(..., import.meta.url).href.
  // file:// previews can fail when a huge inline script is kept as an ES module,
  // so flatten data URL asset constructors and emit a classic script.
  js = js.replace(/new URL\(("data:[^"]+"),import\.meta\.url\)\.href/g, '$1');
  js = js.replace(/new URL\(('data:[^']+'),import\.meta\.url\)\.href/g, '$1');

  if (js.includes('import.meta.url')) {
    console.warn('Warning: standalone bundle still contains import.meta.url references.');
  }

  const renderedRoutes = await loadRenderedRoutes();
  const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  const cleanHead = baseHtml
    .replace(/<script type="module" crossorigin src="[^"]+"><\/script>/g, '')
    .replace(/<link rel="stylesheet" crossorigin href="[^"]+">/g, '')
    .replace(/<script>window\.__MENTORX_STATIC_ROUTE__ = [\s\S]*?<\/script>/g, '')
    .replace(
      '<meta name="description" content="An AI-powered career platform designed for MentorX students, offering personalized job growth paths based on real data and expert guidance." />',
      '<meta name="description" content="' + escapeHtml('MentorX 蔓藤教育留学生求职规划与职业发展支持。') + '" />'
    );

  fs.mkdirSync(outDir, { recursive: true });

  const standaloneLinksScript = standaloneNavigationScript();

  for (const { route, file } of routes) {
    const routeScript = '<script>window.__MENTORX_STATIC_ROUTE__ = ' + JSON.stringify(route) + ';<\/script>';
    const noscript = '<noscript><style>#root:empty:before{content:"这个页面已导出为静态 HTML，但当前浏览器没有显示内容。请用 Chrome、Safari 或 Edge 打开。";display:block;padding:24px;font:16px/1.6 system-ui,-apple-system,sans-serif;color:#111}</style></noscript>';
    const headInjection = '      <style>\n' + css + '\n      </style>\n      ' + routeScript + '\n      ' + standaloneLinksScript + '\n      ' + noscript + '\n    </head>';
    const bodyInjection = '      <script>\n' + escapeScriptClose(js) + '\n      <\/script>\n    </body>';
    const preRendered = rewriteStandaloneRouteLinks(inlineLocalSrcRefs(inlineAssetRefs(renderedRoutes.get(route) || '', assetUris)));
    const html = rewriteStandaloneRouteLinks(cleanHead
      .replace('<div id="root"></div>', () => '<div id="root" data-prerendered="true">' + preRendered + '</div>')
      .replace('</head>', () => headInjection)
      .replace('</body>', () => bodyInjection));
    fs.writeFileSync(path.join(outDir, file), html);
  }

  fs.writeFileSync(
    path.join(outDir, 'README.txt'),
    [
      'MentorX standalone HTML export',
      '',
      'Each .html file includes pre-rendered page content and can be opened directly by double-clicking.',
      'No assets folder or server is required for preview.',
      '',
      ...routes.map(({ route, file }) => file + '  ->  ' + route),
      '',
    ].join('\n')
  );

  console.log('Generated pre-rendered standalone HTML files in: ' + outDir);
  console.log('Files:');
  for (const { file } of routes) console.log('- ' + file);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
