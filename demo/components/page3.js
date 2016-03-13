import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="page3">Page 3</h1>
        <div class="page3">
            <div>App: {{parentGlobals.app}}</div>
        </div>
    `,
    oninit()  {
        console.log('Page3 init', this.get('pathParams'));
    },
    onteardown () {
        console.log('Page3 teardown');
    }
});