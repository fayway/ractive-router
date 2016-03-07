import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1>404</h1>
    `,
    oninit() {
        console.log('404 init');
    },
    onteardown() {
        console.log('404 teardown');
    }
});