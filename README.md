### Introduction

A simple router for [Ractive.js](http://www.ractivejs.org/) applications built on top of [Crossroads.js](https://millermedeiros.github.io/crossroads.js/) and [Hasher](https://github.com/millermedeiros/Hasher)

### Installation with jspm

    $ npm i ractivejs-router --save

Installation with jspm

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
         callback(routeParams) {
             //Your own callback that render HTML or just make an async call
         }
     },
     'page3:?query:': {
         component: Page3,
         callback(routeParams) {
             //You can define a component and a callback for the same route, the callback will be executed in the oncomplete lifecycle event of the component
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

### Routes

#### Path Params

- **/{foo}/{bar}** will match **lorem/ipsum-dolor**
- **/foo/{id}/:slug:** will match **/foo/123/bar** and **/foo/45**, (slug is optional)

#### Query Strings

- **/foo{?query}** will match **/foo?lorem=ipsum&dolor=amet**

#### Using Routes Params inside Ractive Components

Both Path and Query params are available inside Router Ractive components via the data object **routeParams**:

Inside JS components:
```js
Ractive.extend({
    oninit()  {
        let routeParams = this.get('routeParams');
        //Do Something with routeParams
    }
});
```

Or directly inside templates:
```js
<div>A paramName: {{routeParams.paramName}}</div>
```

### Navigation

The Router provide two navigatoin methods:

```js
import Router from 'ractive-router'

//Programatically navigate to a new route
Router.go(hash);

//Similar to Router.go(hash), but doesn't create a new record in browser history.
Router.replace(hash);
```

### Demo

    $ git clone https://github.com/fayway/ractive-router.git
    $ cd ractive-router
    $ npm install
    $ npm run demo

Navigate to [http://localhost:8080/](http://localhost:8080/)

[Demo code source](https://github.com/fayway/ractive-router/tree/master/demo)

### Tests

    $ npm test

![](http://i.imgur.com/PqIOCFn.png)
