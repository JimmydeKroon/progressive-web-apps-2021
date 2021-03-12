// Require third-party modules
const express = require('express');
const fetch = require('node-fetch');

// Create new express app in 'app'
const app = express();

app.use(express.static('public'));
// Link the templating engine to the express app
app.set('view engine', 'ejs');
// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set('views', 'views');

// Create a home route
app.get('/', async function(req, res) {
	const response = await fetch('https://api.spacexdata.com/v4/launches/next');
	const data = await response.json();

	// console.log(data);

	res.render('index', {
		launchData: data
	});
});

// Actually set up the server
app.listen(3000, function() {
	console.log(`Application started on port: 3000`);
});