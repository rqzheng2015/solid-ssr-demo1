import {NavLink, Outlet} from '@solidjs/router';
import {createResource, createSignal, onMount, Suspense} from 'solid-js';
import Fetch from "cross-fetch";
import {isServer} from "solid-js/web";

const JOKE_API_URL = `https://v2.jokeapi.dev/joke/Any?type=single`;

// onMount(async () => {
//     const result = await (await Fetch(JOKE_API_URL)).json();
//     console.log('joke delivery', result.joke);
//     console.log("on mount starts now");
// });

const getRandomJoke = async () => {
    console.log('is Server?',isServer)
    let result = ""
    try {
        result = (await (await fetch(JOKE_API_URL)).json()).joke;
    } catch (error) {
        console.error(error);
        result = ""
    }
    return result;
}

// const [joke, setJoke] = createSignal(0);

export default () => {
    const [joke] = createResource(getRandomJoke)

    return (
        <>
            <header>
                <h1>Solid JS</h1>
                <h3>with Routing and SSR using Stackblitz Web Containers</h3>
            </header>
            <div>joke:{joke()}</div>
            <nav>
                <NavLink href="/" end>
                    Home
                </NavLink>
                {' | '}
                <NavLink href="foo">Foo</NavLink>
                {' | '}
                <NavLink href="bar">Bar</NavLink>
                {' | '}
                <NavLink href="baz">Baz</NavLink>
            </nav>
            <Suspense fallback="loading...">
                <Outlet/>
            </Suspense>
            <footer>Footer</footer>
        </>
    );
};
