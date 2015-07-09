var Pipeflow = require('../src/pipeflow'),
  expect = require('chai').expect;

describe('Pipeflow test', function () {

  describe('pipe', function () {

    it('should throw error when supplied middleware is not a function', function () {
      // arrange
      var app = Pipeflow();

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
      var app = Pipeflow();

      app
        .pipe(function (next, name) {
          next('hello ' + name);
        })
        .pipe(assert);

      // act
      app.start('mehdi');

      // assert
      function assert(next, message) {
        expect(message).to.equal('hello mehdi');
        done();
      }
    });

    it('should invoke tree middlewares', function (done) {
      // arrange
      function message(msg) {
        return function (next, state) {
          next((state ? state + ' - ' : '') + msg);
        };
      }

      var app = Pipeflow();

      app
        .pipe(message('start'))
        .pipe(message('process'))
        .pipe(message('end'))
        .pipe(assert);

      // act
      app.start();

      // arrange
      function assert(next, message) {
        expect(message).to.equal('start - process - end');
        done();
      }
    });

  });

});