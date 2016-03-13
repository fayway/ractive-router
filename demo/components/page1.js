import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="page1">Page 1</h1>
        <div class="page1">
            <div>App: {{parentGlobals.app}}</div>
            <div>id: {{routeParams.id}}</div>
            <div>option: {{routeParams.option}}</div>
        </div>
    `,
    oninit()  {
        console.log('Page1 init', this.get('routeParams'));
    },
    onteardown() {
        console.log('Page1 teardown');
    }
});