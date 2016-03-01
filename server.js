var https = require('https'),
 	pem = require('pem'),
 	express = require('express');
var _ = require('underscore'); 	
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var PORT = process.env.PORT || 3000;
var HOST = '192.168.1.46';
var environment = process.env.NODE_ENV || 'development';
var pkey = fs.readFileSync('key.pem');
var pcert = fs.readFileSync('cert.pem');

var customers = [{
		id: 1,
		firstName: "a",
	    lastName: "b",
	    email: "a@gmail.com",
	    password: 'a',
	    address: "c",
	    orders: [{
	    	id: 1,
	    	name: "Clothes",
	    	prize: 20
	    },{
	    	id: 2,
	    	name: "Headphones",
	    	prize: 30
	    }]
	},
	{
		id: 2,
		firstName: "aa",
		lastName: "bb",
		email: "aa@gmail.com",
		password: 'aa',
		address: "cc",
		orders: []
	},
	{
		id: 3,
		firstName: "aaa",
		lastName: "bbb",
		email: "aaa@gmail.com",
		password: 'aaa',
		address: "ccc",
		orders: []
	}];

var customerNextId = 4;

var options = {
    key: pkey,
    cert: pcert
};

/*// middleware to redirect from http to https 
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
});*/

if (environment === 'development') {

	pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
		var options = {
				key: keys.serviceKey,
				cert: keys.certificate 
	    	};
		https.createServer(options, app).listen(PORT, HOST);
	});

	//https.createServer(options, app).listen(PORT, HOST);

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

app.use(express.static(__dirname + '/public'));

/*app.get('/', function(req, res) {
	res.send(/main.html);
});*/

// GET /customers (Get all customers)
app.get('/getCustomers', function (req, res) {
	res.json(customers);
});

// GET /customers (Get orders of customer)
app.get('/getCustomerOrders/:customerId', function (req, res) {

	var customerId = parseInt(req.params.customerId, 10);
	customers.forEach(function (customer){
		if(customer.id == customerId) {
			return res.json(customer);
		}
	});	

	res.status(404).send();
});

// POST /placeCustomerOrder (Place customer order) 
app.post('/placeCustomerOrder', function (req, res){
	
	var body = req.body;
	customers.forEach(function (customer){
		if(customer.id == body.customerId) {

			if (_.where(customer.orders, {'id': body.order.id}).length) {
				return res.status(400).send();
			}
			customer.orders.push(body.order);
			res.json(body);
		}
	});	
	res.status(404).send();
});	

// GET 
app.get('/buyItem/:customerId/:orderId', function(req, res){

	var customerId = parseInt(req.params.customerId, 10);
	var orderId = parseInt(req.params.orderId, 10);
	customers.forEach(function (customer){
		if(customer.id == customerId) {
			customer.orders = _.reject(customer.orders, function(order) { return order.id == orderId });
			return res.json(customer.orders);
		}
	});	
	res.status(404).send();
});

// POST /signUp (Add customer) 
app.post('/signUp', function (req, res){
	
	var body = req.body;

	if (_.where(customers, {'email': body.email}).length) {
		res.status(400).send();
	} else {
		body.id = customerNextId++;
		body.orders = [];
		customers.push(body);
		res.json(body.id);	
	}
});	

// POST /login (login customer)
app.post('/login', function(req, res){
	var body = req.body;

	customers.forEach(function (customer){
		if(customer.email == body.email && customer.password == body.password) {
			return res.json(customer.id);
		}
	});	
	res.status(401).send();
});

