### Introduction

A simple router for Ractive.js applications implemented using Crossroads.js and Hasher

### Installation

    $ npm install --save ractive-router

Then with a module bundler like jspm or webpack that supports either CommonJS or ES2015 modules:

```js
import Router from 'ractive-router'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/home';
import Page1 from './components/page1';
import Page3 from './components/page3';

const routesConfig = {
     '': {
         component: Home,
         index: true
     },
     'page1/{id}/:option:': {
         component: Page1
     },
     /* Route handler as custom callback */
     'page2': {
         callback(pathParams){
             //your own callback
         }
     },
     'page3': {
         component: Page3,
         callback(pathParams){
             console.log('Page 3 callback', pathParams);
         }
     }
};

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
        <Router config={{routesConfig}} />
        <Footer />
    `
});
```