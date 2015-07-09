! function() {

    function Pipeflow() {

        var middlewares = [],
            self = this;

        function pipe(middleware) {
            // is it a valid middleware
            if (typeof middleware !== 'function') {
                throw new Error('Supplied value is not a function.');
            }

            var len = middlewares.length;

            // invoke next middleware
            var next = function(state) {
                var fn = middlewares[len + 1];
                if (fn) {
                    fn(state);
                }
            };

            var wrapper = function(state) {
                return middleware.call(self, next, state);
            };

            middlewares.push(wrapper);

            return this;
        }

        function start(state) {
            var _first = middlewares[0];

            if (_first) {
                return _first(state);
            }
        }

        // expose main functionallity
        return {
            pipe: pipe,
            start: start
        };

    }

    // export module
    var root = this;

    if (typeof module != 'undefined' && module.exports) {
        module.exports = Pipeflow;
        Pipeflow.isNode = true;
    } else {
        root.Pipeflow = Pipeflow;
    }

}();