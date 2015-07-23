! function () {

  var streams = {};

  // Stream
  var Stream = {
    // creates a new instance of stream
    new: function (name) {
      return Object.create(streams[name]);
    },
    // defines a new stream
    define: function (name) {
      return streams[name] = Object.create(Stream);
    }
  };
  
  // String stream
  var StringStream = Stream.define('string');
  // initializes a new instance of StringStream
  StringStream.init = function (text) {
    this.text = text;
    return this;
  };
  // reads the text
  StringStream.read = function (cb) {
    cb(null, this.text);
  };

  // Scope
  var Scope = {
    // creates a new instance of scope
    new: function () {
      return Object.create(Scope);
    },
    // initializes a new instance of Scope
    init: function (middleware, stream) {
      this.middleware = middleware;
      this.stream = stream;
      return this;
    },
    // invokes the middleware
    invoke: function () {
      this.middleware.call(this, this.stream);
    },
    // pumps supplied stream to next middleware
    pump: function (stream) {
      // get the next middleware
      if (stream != this.stream) {
        stream.origin = this.stream; 
      }
      var next = this.middleware.next;
      if (next) {
        // create a new scope and invoke the next middleware
        Scope.new().init(next, stream).invoke();
      }
      return stream;
    }
  };

  // Pipeflow
  function Pipeflow() {

    var first, last;

    // pipes stream to supplied middleware
    function pipe(middleware) {
      if (typeof middleware !== 'function') {
        throw new Error('Supplied value is not a function.');
      }
      // store the first middleware
      if (!first) {
        first = middleware;
      }
      // chain the middlewares
      if (last) {
        last.next = middleware;
        middleware.previous = last;
      }
      // store the last middleware
      last = middleware;
      return this;
    }

    // starts the cycle
    function start(stream) {
      if (!first) {
        return;
      }
      // create a new scope and invoke the first middleware
      Scope.new().init(first, stream || Stream).invoke();
    }

    // uses a Pipeflow plugin
    function use(factory) {
      factory(this);
    }

    return {
      pipe: pipe,
      start: start,
      use: use
    };

  }

  // export module
  var root = this;

  if (typeof module != 'undefined' && module.exports) {
    Pipeflow.isNode = true;
    exports.Pipeflow = Pipeflow;
    exports.Stream = Stream;
  } else {
    root.Pipeflow = Pipeflow;
    root.Stream = Stream;
  }

} ();
