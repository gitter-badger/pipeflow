
var Pipeflow = require('../src/pipeflow').Pipeflow,
    Spy = require('../src/pipeflow-spy'),
    expect = require('chai').expect;

describe('Pipeflow test plugin', function () {

  describe('spy', function () {

    it('should catch a simple synchronous invocation', function (done) {
      // arrange
      var expected;
      
      var app = Pipeflow();
      app.use(Spy);

      app.pipe(function (stream) {
        expected = stream;
        this.pump(stream);
      });

      // act
      app.spy(null, cb);

      // assert
      function cb(streams) {
        expect(streams).to.have.length(1);
        expect(streams).to.include(expected);
        done(); 
      }
    });
    
    it('should catch a simple asynchronous invocation', function (done) {
      // arrange
      var expected;
      
      var app = Pipeflow();
      app.use(Spy);
      
      app.pipe(function (stream) {
        var self = this;
        setTimeout(function () {
          self.pump(stream);
        }, 0);
        expected = stream;
      });
      
      // act
      app.spy(null, cb);
      
      // assert
      function cb(streams) {
        expect(streams).to.have.length(1);
        expect(streams).to.include(expected);
        done();
      }
    });

  });

});
