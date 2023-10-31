import {renderToString, renderToStringAsync} from 'solid-js/web';
import {Router} from '@solidjs/router';
import App from './App';

export function render() {
    return renderToString(() => <Router><App/></Router>);
}
