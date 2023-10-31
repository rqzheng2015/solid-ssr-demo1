import {renderToStream} from 'solid-js/web';
import {Router} from '@solidjs/router';
import App from './App';

export async function render() {
    return renderToStream(() => <Router><App/></Router>);
}

