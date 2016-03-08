import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1>Page 3</h1>
        <div>
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