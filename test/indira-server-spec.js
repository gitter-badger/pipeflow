
var indira = require('../src/indira'),
	server = require('../src/indira-server'),
	http = require('http'),
	expect = require('chai').expect;

describe('Indira server specs', function () {


	describe('server', function () {
		
		it('should listen on specific port', function (done) {
			// arrange
			var app = indira();
			
			app
			.pipe(server({port: 2020}))
			.pipe(function (next, context) {
				// serve hello world!
				if (context.request.url == '/hello') {
					context.response.end('hello world!');
				}
				next(context);
			})
			.pipe(function (next, context) {
				// stop http server
				context.server.close();
				next(context);
			});
			
			app.start();
			
			// act
			http.get('http://localhost:2020/hello', function (res) {
				res.setEncoding('utf8');
				res.on('data', recieved);
			});
			
			// assert
			function recieved(actual) {
				expect(actual).to.equal('hello world!');
				done();
			}
		});
		
	});
	

});
