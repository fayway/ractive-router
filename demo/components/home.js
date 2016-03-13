import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1 class="home">Home</h1>
        <div class="home">
            <div>App: {{parentGlobals.app}}</div>
        </div>
    `,
    oninit() {
        console.log('Home init');
    },
    onteardown() {
        console.log('Home teardown');
    }
});