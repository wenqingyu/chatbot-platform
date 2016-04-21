var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var pyshell = new PythonShell('./python/msg.py');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // sends a message to the Python script via stdin
  pyshell.send('hello');

  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });

// end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished');
  });

  res.send('respond with a resource');
});

module.exports = router;
