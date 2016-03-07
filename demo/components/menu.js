import Ractive from 'ractive';

export default Ractive.extend({
    template: `
        <header>
            <ul class="nav nav-pills">
                <li role="presentation"><a href="#">Home</a></li>
                <li role="presentation"><a href="#page1/1234/true">Page 1</a></li>
                <li role="presentation"><a href="#page2">Page 2</a></li>
                <li role="presentation"><a href="#page3">Page 3</a></li>
            </ul>
        </header>
    `
});