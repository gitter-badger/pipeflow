
!function () {
	
	var emptyfn = function () { };
	
	function Indira() {

		var started = false,
			middlewares = [],
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

		function start(context, complete) {
			var _first = middlewares[0],
				_complete = complete || emptyfn;
			
			if (!started) {
				pipe(function (n, c) { _complete(c); });
			}
				
			if (_first) {
				return _first(context);
			}
			
			started = true;
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
		module.exports = Indira;
		Indira.isNode = true;
	} else {
		root.Indira = Indira;
		Indira.isNode = false;
	}

} ();
