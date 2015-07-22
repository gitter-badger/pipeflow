
module.exports = function (app) {

  app.spy = function (stream, callback, timeout) {
    var streams = [];

    function spy(stream) {
      streams.push(stream);
    }

    this
      .pipe(spy)
      .start(stream);
    
    setTimeout(function() {
      callback(streams);
    }, timeout || 1);
  };

};
