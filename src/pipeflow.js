! function() {
  
    function Stream(stream) {
      if (stream && typeof stream.type === 'string' && typeof stream.read === 'function') {
        return stream;
      }
      
      return {
        type: 'State',
        read: function() {
          return stream || null;  
        },
        isEmpty: !!!stream
      };
    }

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
            var next = function(stream) {
                var fn = middlewares[len + 1];
                if (fn) {
                    fn(Stream(stream));
                }
            };

            var wrapper = function(stream) {
                return middleware.call(self, next, stream);
            };

            middlewares.push(wrapper);

            return this;
        }

        function start(stream) {
            var _first = middlewares[0];

            if (_first) {
                return _first(Stream(stream));
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