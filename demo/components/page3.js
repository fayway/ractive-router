import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="page3">Page 3</h1>
        <div class="page3">
            <div>App: {{parentGlobals.app}}</div>
            <div>page: {{routeParams.page}}</div>
            <div>limit: {{routeParams.limit}}</div>
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
    oninit()  {
        console.log('Page3 init', this.get('pathParams'));
    },
    onteardown () {
        console.log('Page3 teardown');
    }
});