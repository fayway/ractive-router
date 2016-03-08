import Ractive from 'ractive';
import Menu from './components/menu';
import Footer from './components/footer.js';
import routesConfig from './routes';
import Router from '../src/ractive-router';

//Root App
new Ractive({
    el: '#root',
    data: {
        routesConfig,
        globals: {
            app: 'Demo' //Routes components can access globals data via ractive.get('parentGlobals') or {{parentGlobals}}
        }
    },
    components: {
        Menu,
        Router,
        Footer
    },
    template: `
        <div>
            <Menu />
            <div class="container">
                <Router routesConfig={{routesConfig}} />
            </div>
            <Footer />
        </div>
    `,
    oninit(){
        console.log('App init');
    },
    onrender(){
        console.log('App Render');
    },
    oncomplete(){
        console.log('App Complete');
    }
});