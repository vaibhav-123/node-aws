var https = require('https'),
 	pem = require('pem'),
 	express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var PORT = process.env.PORT || 3000;
var HOST = '192.168.1.46';
var environment = process.env.NODE_ENV || 'development';
var pkey = fs.readFileSync('key.pem');
var pcert = fs.readFileSync('cert.pem');

var todos = [];
var todoNextId = 1;

var options = {
    key: pkey,
    cert: pcert
};

if (environment === 'developemnt') {

	/*pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
		var options = {
				// host: "192.168.1.46",
				//hostname: 'www.todo-api.com',
				key: keys.serviceKey,
				cert: keys.certificate 
	    	};
		https.createServer(options, app).listen(PORT, HOST);
	});*/

	https.createServer(options, app).listen(PORT, HOST);

} else {

	/*pem.createCertificate({days:365, selfSigned:true}, function(err, keys){
		var options = {
				// host: "192.168.1.46",
				//hostname: 'www.todo-api.com',
				key: keys.serviceKey,
				cert: keys.certificate 
	    	};
		https.createServer(options, app).listen(PORT);
	});*/

	//https.createServer(options, app).listen(PORT);
	app.listen(PORT);	
}

// When json request comes in express parse it to json & we can access req.body
app.use(bodyParser.json())

app.get('/', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 }, function(req, res) {
	res.send('Todo api root');
});

// GET /todos (Get all todo items)
// Query parameters
app.get('/todos', function (req, res) {
	res.json(todos);
});

// GET /todos/:id (Get todo items of given id)
app.get('/todos/:id', function (req, res) {
	
	var todoId = parseInt(req.params.id, 10);
	
	todos.forEach(function(todo){
		if(todo.id == todoId) {
			return res.json(todo);
		}
	})

	res.status(404).send();			
});

// POST /todos (Add todo item using POST) 
app.post('/todos', function (req, res){
	
	var body = req.body;

 	if(body) {
 		body.id = todoNextId++;
 		todos.push(body);
 		res.json(body);
 	} else {
 		res.status(400).send();
 	}
});

// app.listen(PORT, function(){
// 	console.log('Express listening on port : ' + PORT + ' !');
// });	

