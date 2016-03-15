import Home from './components/home';
import Page1 from './components/page1';
import Page3 from './components/page3';
import Page4 from './components/page4';
import NotFound from './components/404'

export default {
    /* Home route designed by the index: true attribute */
    '': {
        component: Home,
        index: true
    },
    /* Route with required and optional path params, the route handler is a Ractive Component */
    'page1/{id}/:option:': {
        component: Page1
    },
    /* Route handler as custom callback */
    'page2': {
        callback(pathParams){
            (document.getElementsByClassName('routeContainer')[0]).innerHTML = '<h1>Custom HTML renderer (not a component)</h1>';
            console.log('Page 2 callback', pathParams);
        }
    },
    /* You can define both a Ractive Component and a callback as a Route handlers, the callback will be executed during the Component oncomplete lifecycle event*/
    'page3:?query:': {
        component: Page3,
        callback(pathParams){
            console.log('Page 3 callback', pathParams);
        }
    },
    'page4/{id}/:option::?query:': {
        component: Page4,
            callback(pathParams){
            console.log('Page 4 callback', pathParams);
        }
    },
    /* Not found Route must be set as 404 */
    '404': {
        component: NotFound
    }
};