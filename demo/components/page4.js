import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="page4">Page 4</h1>
        <div class="page4">
            <div>App: {{parentGlobals.app}}</div>
            <div>id: {{routeParams.id}}</div>
            <div>option: {{routeParams.option}}</div>
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
        console.log('Page4 init', this.get('pathParams'));
    },
    onteardown () {
        console.log('Page4 teardown');
    }
});