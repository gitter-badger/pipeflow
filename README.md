**Note** This is just a prototype and we're not ready for production yet.

# Pipe.js
Pipe.js is a lightweight and cross-platform pipeline library written in JavaScript. It allows you to write and run everything from building phase tasks to handling http request, implementing restful web APIs and Single-Page Application (SPA) on same pipeline and API.

### Setup
To clone and setup Pipe.js on your computer use following instruction.
```
$ mkdir pipejs
$ cd pipejs
$ git clone https://github.com/Pipe-js/Pipe.git
$ npm install
```
Or if you already cloned the repository just install required packages using node.js package manager.
```
$ npm install
```

### Test
To run Pipe.js unit tests run following command.
```
$ npm test
```

### Example
Since Pipe.js currently is not available on the npm repository, you have to clone Pipe.js and its [server middleware](https://github.com/Pipe-js/Pipe-server) manually from github to run following code snippet.

**api-route.js**
```javascript
module.exports = function api(routes) {

  routes.get('/hello', function (req, res) {
    res.end('hello world!');
  });
  
};
```
**app.js**
```javascript
var PipeJS = require('./pipe/src/pipe.js'),
    http = require('./pipe-server/src/pipe-server.js')
    api = require('./api-route');

var app = PipeJS();

app
.pipe(http.server({port: 2020}))
.pipe(http.router(api));
			
app.start();
```

Then open your favorite browser and type http://localhost:2020/hello
