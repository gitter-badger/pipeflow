**Note** This project is under development and unsuitable for production.

# Pipe.js
Pipe.js is a lightweight and cross-platform pipeline library written in JavaScript.

### Setup
```
npm install
```

### Test
```
npm test
```

### Example
Since Pipe.js currently is not available on the npm repository, you have to clone Pipe.js and its server middleware manually from github to run following code snippet.
```javascript
var PipeJS = require('./pipe/src/pipe.js'),
    http = require('./pipe-server/src/pipe-server.js');

var app = PipeJS();
			
app
.pipe(http.server({port: 2020}))
.pipe(function (next, context) {
  // serve hello world!
  if (context.request.url == '/hello') {
    context.response.end('hello world!');
  }
  next(context);
})
.pipe(close);
			
app.start();
			
get('/hello', function recieved(content) {
  console.log(content);
});
```
