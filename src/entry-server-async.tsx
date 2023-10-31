import {renderToString, renderToStringAsync} from 'solid-js/web';
import {Router} from '@solidjs/router';
import App from './App';

export async function render() {
    return await renderToStringAsync(() => <Router><App/></Router>);
}

