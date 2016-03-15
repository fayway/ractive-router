import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="home">Home</h1>
        <div class="home">
            <div>App: {{parentGlobals.app}}</div>
            <div>
                <h3>routeParams</h3>
                <ul>
                {{#each routeParams}}
                <li>{{.}}</li>
                {{/each}}
                </ul>
            </div>
        </div>
    `,
    oninit() {
        console.log('Home init');
    },
    onteardown() {
        console.log('Home teardown');
    }
});