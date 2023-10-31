import { HydrationScript, isServer } from 'solid-js/web';
import { Suspense, lazy } from 'solid-js';
import { Routes, Route, Router } from '@solidjs/router';

import NotFound from './pages/NotFound';
import Root from './pages/Root';

const Home = lazy(() => import('./pages/Home'));
const Foo = lazy(() => import('./pages/Foo'));
const Bar = lazy(() => import('./pages/Bar'));

function dataFn(label: string) {
  return () => {
    if (isServer) {
      console.log(`Fetching data for ${label} on server`);
    } else {
      console.log(`Fetching data for ${label} on client`);
    }
  };
}

export default () => {
  return (
    <html lang="en" $ServerOnly>
      <head>
        <title>Solid SSR</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/src/entry-client.tsx" type="module" async />
        <HydrationScript />
      </head>
      <body>
        <div id="app" class="hello" className="world">
            <Routes>
              <Route path="/" component={Root} data={dataFn('Root')}>
                <Route path="/" component={Home} data={dataFn('Home')} />
                <Route path="foo" component={Foo} data={dataFn('Foo')} />
                <Route path="bar" component={Bar} data={dataFn('Bar')} />
                <Route path="*all" component={NotFound} />
              </Route>
            </Routes>
        </div>
      </body>
    </html>
  );
};
