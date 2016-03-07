import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <h1>Page 1</h1>
        <div>id: {{pathParams.id}}</div>
        <div>option: {{pathParams.option}}</div>
    `,
    oninit()  {
        console.log('Page1 init', this.get('pathParams'));
    },
    onteardown() {
        console.log('Page1 teardown');
    }
});