var express = require("express");
var route = require('./routes');

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.set('views',__dirname + '/public/views');
app.engine('.html', require('ejs').__express);

app.get('/',route.index);
app.get('/:name',route.parseJson);


app.listen('8001');
