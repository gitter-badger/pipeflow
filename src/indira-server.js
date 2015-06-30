
var http = require('http');

module.exports = function (options) {
	
	var _options = options || {
		port: 2020	
	};
	
	return function (next, context) {
	
		// create an http server
		var srv = http.createServer(function (req, res) {
			next({ 
				server: srv, 
				request: req, 
				response: res,
				context: context
			});
		});
	
		// listen on specified port
		srv.listen(_options.port);
		
	};
	
};
