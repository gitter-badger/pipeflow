
var Pipeflow = require('../').Pipeflow,
    Stream = require('../').Stream,
    chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect;

chai.use(require('sinon-chai'));

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
      var spy = sinon.spy();

      app.pipe(spy);

      // act
      app.start();

      // assert
      expect(spy).to.have.been.calledWithMatch(sinon.match.func, Stream);
    });

    it('should pump the stream to the next middleware', function () {
      // arrange
      var stream = Stream.define('hello');

      var app = Pipeflow();
      var spy = sinon.spy();

      app
        .pipe(function (next, stream) { next(stream); })
        .pipe(spy);

      // act
      app.start(stream);

      // assert
      expect(spy).to.have.been.calledWithMatch(sinon.match.func, stream);
    });

  });

  describe('use', function () {

    it('should call the factory method', function () {
      // arrange
      var plugin = sinon.spy();

      var app = Pipeflow();

      // act
      app.use(plugin);

      // assert
      expect(plugin).to.have.been.calledWith(app);
    });

  });

});

describe('Stream test', function () {

  describe('new', function () {

    it('should instantiate stream by its name', function () {
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

  })

});

describe('String stream test', function () {
  
  describe('read', function () {
    
    it('should return the text', function (done) {
      // arrange
      var stream = Stream.new('string').init('hello world!');
      
      // act
      stream.read(cb);
      
      // assert
      function cb(err, text) {
        expect(text).to.equal('hello world!');
        done();
      }
    });
    
  });
  
});
