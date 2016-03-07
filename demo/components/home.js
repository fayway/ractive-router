import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1>Home</h1>
    `,
    oninit() {
        console.log('Home init');
    },
    onteardown() {
        console.log('Home teardown');
    }
});