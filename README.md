### Introduction

A simple router for Ractive.js applications built on top of [Crossroads.js](https://millermedeiros.github.io/crossroads.js/) and [Hasher](https://github.com/millermedeiros/Hasher)

### Installation with jspm

    $ jspm install ractive-router=github:fayway/ractive-router

### How to use

```js
import Router from 'ractive-router'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/home';
import Page1 from './components/page1';
import Page3 from './components/page3';

/*
 * Define your routes mapping
 */
const routesConfig = {
     '': {
         component: Home,
         index: true
     },
     'page1/{id}/:option:': {
         component: Page1
     },
     'page2': {
         callback(pathParams){
             //your own callback that render HTML or just make a call
         }
     },
     'page3': {
         component: Page3,
         callback(pathParams){
             //You can mix both a component and a callback, this one will be executed in oncomplete of the component
             console.log('Page 3 callback', pathParams);
         }
     }
};


/*
 * Root App
 */
let app = new Ractive({
    el: '#root',
    data: {
        routesConfig
    },
    components: {
        Navbar,
        Router,
        Footer
    },
    template: `
        <Menu />
        <Router routesConfig={{routesConfig}} />
        <Footer />
    `
});
```

### Demo

    $ git clone https://github.com/fayway/ractive-router.git
    $ cd ractive-router
    $ npm install
    $ npm run demo

Navigate to [http://localhost:8080/](http://localhost:8080/)

[Demo code source](https://github.com/fayway/ractive-router/tree/master/demo)
