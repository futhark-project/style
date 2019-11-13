const { series, parallel, watch } = require('gulp');
const {
    clean,
    config,
    css,
    doc,
    mode,
    serve,
} = require('@futhark/straws');

/* configuration */
const {
    CSS,
    PATH,
} = config;
const production = mode;


/* Build */
const build = series(clean, parallel(css));

/* Doc */
const docTask = series(doc);

/* Watching */
const watcher = series(build, serve.init, () => {
    // css
    watch(PATH.src + CSS.src, series(css))
        .on('all', series(serve.reload));
});

module.exports = { build, doc: docTask };
module.exports.default =  production ? series(build) : series(watcher);
