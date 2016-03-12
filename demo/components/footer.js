import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <footer>
            <hr />
            <div>Footer</div>
        </footer>
    `,
    oninit() {
        console.log('Footer init');
    },
    onteardown() {
        console.log('Footer teardown');
    }
});