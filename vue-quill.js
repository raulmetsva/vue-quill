var Quill = require('./src/Quill.vue'),
    render = require('quill-render');

module.exports = {
    install: function (Vue, options) {
        Vue.component('quill', Quill);

        Vue.filter('quill', function(value) {
            return render(value.ops);
        });
    },
}
