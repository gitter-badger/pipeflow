
!function () {
	
	function PipeJS() {

		var middlewares = [],
			self = this;

		function pipe(middleware) {
			// is it a valid middleware
			if (typeof middleware !== 'function') {
				throw new Error('Supplied value is not a function.');
			}

			var len = middlewares.length;
				
			// invoke next middleware
			var next = function (context) {
				var fn = middlewares[len + 1];
				if (fn) {
					fn(context);
				}
			};

			var wrapper = function (context) {
				return middleware.call(self, next, context);
			};

			middlewares.push(wrapper);

			return this;
		}

		function start(context) {
			var _first = middlewares[0];
			
			if (_first) {
				return _first(context);
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
		module.exports = PipeJS;
		PipeJS.isNode = true;
	} else {
		root.PipeJS = PipeJS;
		PipeJS.isNode = false;
	}

} ();
