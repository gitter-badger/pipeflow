var Pipeflow = require('../src/pipeflow').Pipeflow,
    Stream = require('../src/pipeflow').Stream,
    chai = require('chai'),
    expect = chai.expect,
    spies = require('chai-spies');

chai.use(spies);

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

    it('should invoke the first middleware', function () {
      // arrange
      var app = Pipeflow();
      var spy = chai.spy();

      app.pipe(spy);

      // act
      app.start();

      // assert
      expect(spy).to.have.been.called();
    });

    it('should pump the stream to next middleware', function () {
      // arrange
      var stream = Stream.define('hello');
      
      var app = Pipeflow();
      var spy = chai.spy();

      app
        .pipe(function (stream) { this.pump(stream); })
        .pipe(spy);

      // act
      app.start(stream);

      // assert
      expect(spy).to.have.been.called.with(stream);
    });
    
    it('should flush the stream at the end', function () {
      // arrange
      var stream1 = Stream.define('stream1');
      stream1.flush = chai.spy();
          
      var stream2 = Stream.define('stream2');
      stream2.flush = chai.spy();
          
      var app = Pipeflow();
      
      app
        .pipe(function (stream) { this.pump(stream1); })
        .pipe(function (stream) { this.pump(stream2); });
      
      // act
      app.start();
      
      // assert
      expect(stream1.flush).to.have.been.called();
      expect(stream2.flush).to.have.been.called();
    });

  });

  describe('stream', function () {

    it('should define a brand new stream and instantiate it', function () {
      // arrange
      var stream = Stream.define('hello');
      stream.read = function () {
        return 'hello world!';
      };
      
      // act
      var stream = Stream.new('hello');
      
      // assert
      expect(stream.read()).to.equal('hello world!');
    });

  });

});
