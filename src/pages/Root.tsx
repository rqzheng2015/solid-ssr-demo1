import {NavLink, Outlet} from '@solidjs/router';
import {createEffect, createResource, createSignal, onMount, Suspense} from 'solid-js';
import Fetch from "cross-fetch";
import {isServer} from "solid-js/web";

const JOKE_API_URL = `https://v2.jokeapi.dev/joke/Any?type=single`;

// onMount(async () => {
//     const result = await (await Fetch(JOKE_API_URL)).json();
//     console.log('joke delivery', result.joke);
//     console.log("on mount starts now");
// });

const getRandomJoke = async () => {
    console.log('get random joke now!!!');
    console.log('is Server?', isServer)
    let result = ""
    try {
        result = (await (await Fetch(JOKE_API_URL)).json()).joke;
    } catch (error) {
        console.error(error);
        result = ""
    }
    return result;
}

// const [joke, setJoke] = createSignal(0);

export default () => {
    // // const [joke] = createResource(getRandomJoke)
    // const [joke, setJoke] = createSignal("");
    // // 在组件渲染之前，调用数据获取函数
    // createEffect(async () => {
    //     const jokeResult = await getRandomJoke();
    //     setJoke(jokeResult);
    // });

    const [data] = createResource(getAsyncData)
    const [joke] = createResource(getRandomJoke
        // {
        // initialValue: "hi?",
        // ssrLoadFrom: "initial",
        // // deferStream: false,
        // // onHydrated:()=>{
        // //     console.log('hydrated now!')
        // // }
    // }
    )

    async function getAsyncData() {
        console.log('get async data now!!!');
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json()
        return json.title;
    }


    return (
        <>
            <header>
                <h1>Solid JS</h1>
                <h3>with Routing and SSR using Stackblitz Web Containers</h3>
            </header>
            <p>joke:{joke() ?? ""}</p>
            <p>title:{data.latest?? ""}</p>
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
