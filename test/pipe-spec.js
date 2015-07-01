
var PipeJS = require('./../src/pipe'),
	expect = require('chai').expect;

describe('PipeJS specs', function () {


	describe('pipe', function () {

		it('should throw error when supplied middleware is not a function', function () {
			// arrange
			var app = PipeJS();
			
			// act
			var code = function () {
				app.pipe('');
			};
			
			//assert			
			expect(code).to.throw('Supplied value is not a function.');
		});

	});

	describe('start', function () {

		it('should invoke middleware', function () {
			// arrange			
			var app = PipeJS(),
				context = { name: 'mehdi' };

			app.pipe(function (next, context) {
				context.message = 'hello ' + context.name;
				next(context);
			});
			
			// act
			app.start(context);
			
			// assert
			expect(context.message).to.equal('hello mehdi');
		});

		it('should invoke tree middlewares', function () {
			// arrange
			var context = { output: '' };
			
			function message(msg) {
				return function (next, context) {
					context.output += (msg + '\n');
					next(context);
				};
			}
						
			var app = PipeJS();

			app
			.pipe(message('start'))
			.pipe(message('process'))
			.pipe(message('end'));
			
			// act
			app.start(context);	
			
			// arrange
			expect(context.output).to.equal('start\nprocess\nend\n');
		});

	});
	

});
