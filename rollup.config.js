import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/ractive-router.js',
    plugins: [
        babel({
            presets: ['es2015-rollup'],
            babelrc: false
        })
    ],
    moduleName: 'RactiveRouter',
    sourceMap: true
};
