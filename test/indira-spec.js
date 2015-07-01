
var indira = require('./../src/indira'),
	expect = require('chai').expect;

describe('indira specs', function () {


	describe('pipe', function () {

		it('should throw error when supplied middleware is not a function', function () {
			// arrange
			var app = indira();
			
			// act
			var code = function () {
				app.pipe('');
			};
			
			//assert			
			expect(code).to.throw('Supplied value is not a function.');
		});

	});

	describe('start', function () {

		it('should invoke middleware', function (done) {
			// arrange			
			var app = indira();

			app.pipe(function (next, context) {
				context.message = 'hello ' + context.name;
				next(context);
			});
			
			// act
			app.start({ name: 'mehdi' }, complete);
			
			// assert
			function complete(context) {
				expect(context.message).to.equal('hello mehdi');
				done();
			}
		});

		it('should invoke tree middlewares', function (done) {
			// arrange
			function message(msg) {
				return function (next, context) {
					context.output += (msg + '\n');
					next(context);
				};
			}
						
			var app = indira();

			app
			.pipe(message('start'))
			.pipe(message('process'))
			.pipe(message('end'));
			
			// act
			app.start({ output: '' }, complete);	
			
			// arrange
			function complete(context) {
				expect(context.output).to.equal('start\nprocess\nend\n');
				done();
			}
		});
		
		it('should not throw error when callback parameter is nil', function () {
			// arrange
			var app = indira();
			app.pipe(function (next, context) {
				next(context);
			});
			
			// act
			function fn() { app.start(); }
			
			// assert
			expect(fn).to.not.throw(Error);
		});

	});
	

});
