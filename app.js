var express = require('express');
var path = require('path');
var config = require('./config');

// Application setup.
var app = express();

app.use(express.static(path.join(__dirname+'/app')));

app.get('/app', function() {
    res.render('index');
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

module.exports = app;

if (!module.parent) {
	console.log(__dirname);
    app.listen(config.PORT);
    console.log('Server started. Listening on port ' + config.PORT);
}
