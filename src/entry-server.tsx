import { renderToString,renderToStringAsync } from 'solid-js/web';
import { Router, RouterOutput } from '@solidjs/router';
import App from './App';

export function render() {
  const renderedHTML = renderToString(() => <Router><App /></Router>);
  return renderedHTML;
}
