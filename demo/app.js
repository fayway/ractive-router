import Ractive from 'ractive';
import Menu from './components/menu';
import Footer from './components/footer.js';
import routesConfig from './routes';
import Router from '../src/ractive-router';

new Ractive({
    el: '#root',
    data: {
        routesConfig
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
                <Router config={{routesConfig}} />
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