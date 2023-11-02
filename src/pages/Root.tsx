import {NavLink, Outlet} from '@solidjs/router';
import {createEffect, createResource, createSignal, onMount, Suspense} from 'solid-js';
import Fetch from "cross-fetch";
import {isServer} from "solid-js/web";

const JOKE_API_URL = `https://v2.jokeapi.dev/joke/Any?type=single`;


const getRandomJoke = async () => {
    // console.log('get random joke now!!!');
    // console.log('is Server?', isServer)
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
    const [joke, setJoke] = createSignal("");
    // createEffect(async () => {
    //     const jokeResult = await getRandomJoke();
    //     setJoke(jokeResult);
    // });

    onMount(async () => {
        const jokeResult = await getRandomJoke();
        setJoke(jokeResult);
    });

    async function getAsyncData() {
        try {
            const response = await Fetch('https://jsonplaceholder.typicode.com/todos/1')
            const json = await response.json()
            // await new Promise(resolve => setTimeout(resolve, 2000));
            return json.title;
        } catch (error) {
            throw error;
        }
    }

    const [data] = createResource(getAsyncData)
    // const [joke] = createResource(getRandomJoke
    //     // {
    //     // initialValue: "hi?",
    //     // ssrLoadFrom: "initial",
    //     // // deferStream: false,
    //     // // onHydrated:()=>{
    //     // //     console.log('hydrated now!')
    //     // // }
    // // }
    // )


    return (
        <>
            {/*<header>*/}
            {/*    <h1>Solid JS</h1>*/}
            {/*    <h3>with Routing and SSR using Stackblitz Web Containers</h3>*/}
            {/*</header>*/}
            <p>joke:{joke() ?? ""}</p>
            <Suspense fallback={"loading"}>
                <p>title:{data() ?? ""}</p>
            </Suspense>
            {/*<nav>*/}
            {/*    <NavLink href="/" end>*/}
            {/*        Home*/}
            {/*    </NavLink>*/}
            {/*    {' | '}*/}
            {/*    <NavLink href="foo">Foo</NavLink>*/}
            {/*    {' | '}*/}
            {/*    <NavLink href="bar">Bar</NavLink>*/}
            {/*    {' | '}*/}
            {/*    <NavLink href="baz">Baz</NavLink>*/}
            {/*</nav>*/}
            {/*<Suspense fallback="loading...">*/}
            {/*    <Outlet/>*/}
            {/*</Suspense>*/}
            {/*<footer>Footer</footer>*/}
        </>
    );
};
