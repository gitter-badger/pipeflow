var Pipeflow = require('../src/pipeflow'),
  expect = require('chai').expect;

describe('Pipeflow test', function () {

  describe('pipe', function () {

    it('should throw error when supplied middleware is not a function', function () {
      // arrange
      var app = Pipeflow();

      // act
      var code = function () {
        app.pipe(null);
      };

      //assert			
      expect(code).to.throw('Supplied value is not a function.');
    });

  });

  describe('start', function () {

    it('should pipe empty stream to first middleware', function () {
      // arrange
      var app = Pipeflow();
      var actual = null;

      app.pipe(function (next, stream) { actual = stream });
      
      // act
      app.start();
      
      // assert
      expect(actual.type).to.equal('State');
      expect(actual.read()).to.equal(null);
      expect(actual.isEmpty).to.be.true;
    });

    it('should pipe the stream to first middleware', function () {
      // arrange			
      var app = Pipeflow();
      var actual = null

      app.pipe(function (next, stream) { actual = stream; });

      // act
      app.start('hello!');

      // assert
      expect(actual.type).to.equal('State');
      expect(actual.read()).to.equal('hello!');
      expect(actual.isEmpty).to.be.false;
    });

    it('should pipe the result stream to next middleware', function (done) {
      // arrange
      var app = Pipeflow();

      app
        .pipe(function (next, stream) {
          next('hello world!');
        })
        .pipe(assert);
        
      // act
      app.start();
      
      // assert
      function assert(next, stream) {
        expect(stream.type).to.equal('State');
        expect(stream.read()).to.equal('hello world!');
        done();
      }
    });

    it('should not wrap the stream again', function () {
      // arrange
      var app = Pipeflow();
      var expected = { type: 'Fake', read: function () { } };
      var actual = null;

      app.pipe(function (next, stream) { actual = stream; });
      
      // act
      app.start(expected);
      
      // assert
      expect(actual).to.equal(expected);
    });

    it('should not wrap the result stream again', function (done) {
      // arrange
      var app = Pipeflow();
      var expected = { type: 'Fake', read: function () { } };

      app
        .pipe(function (next, stream) {
          next(expected);
        })
        .pipe(assert);
      
      // act
      app.start();
      
      // assert
      function assert(next, actual) {
        expect(actual).to.equal(expected);
        done();
      }
    });

  });

});