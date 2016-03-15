import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="page1">Page 1</h1>
        <div class="page1">
            <div>App: {{parentGlobals.app}}</div>
            <div>id: {{routeParams.id}}</div>
            <div>option: {{routeParams.option}}</div>
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
        console.log('Page1 init', this.get('routeParams'));
    },
    onteardown() {
        console.log('Page1 teardown');
    }
});