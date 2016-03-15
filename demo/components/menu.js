import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <header>
            <ul class="nav nav-pills">
                <li role="presentation"><a href="#">Home</a></li>
                <li role="presentation"><a href="#page1/1234/true">Page 1</a></li>
                <li role="presentation"><a href="#page2">Page 2</a></li>
                <li role="presentation"><a href="#page3?page=1&limit=50">Page 3</a></li>
                <li role="presentation"><a href="#page4/I+1234/?page=1&limit=50">Page 4</a></li>
            </ul>
        </header>
    `,
    oninit() {
        console.log('Menu init');
    },
    onteardown() {
        console.log('Menu teardown');
    }
});