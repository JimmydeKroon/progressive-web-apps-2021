// Require third-party modules
const { response } = require('express');
const express = require('express');
const fetch = require('node-fetch');

// Create new express app in 'app'
const app = express();

app.use(express.static('public'));
// Link the templating engine to the express app
app.set('view engine', 'ejs');
// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set('views', 'views');

let launchpadid
let payloadid

app.get('/', async function(req, res) {
	const response = await fetch('https://api.spacexdata.com/v4/launches/next');
	const data = await response.json();

	// console.log(data);

	res.render('index', {
		launchDataNext: data
	});

	launchpadid = data.launchpad
	payloadid = data.payloads[0]
});

app.get('/details/:id', async function(req, res) {
	
	function fetchJSON(url) {
		return fetch(url).then(response => response.json());
	}

	let urls = [
		'https://api.spacexdata.com/v4/launches/' + req.params.id,
		'https://api.spacexdata.com/v4/launchpads/' + launchpadid,
		'https://api.spacexdata.com/v4/payloads/' + payloadid,
		'https://api.spacexdata.com/v4/launches/next'
	  ];
	
	let promises = urls.map(url => fetchJSON(url));
	
	Promise.all(promises).then(responses => {
		var launchDataId = responses[0];
    	var launchpadData = responses[1];
    	var payloadData = responses[2];
    	var launchDataNext = responses[3];

		res.render('details', {
			launchDataId: launchDataId,
			launchpadData: launchpadData,
			payloadData: payloadData,
			launchDataNext: launchDataNext
		})
	});
});

// Actually set up the server
app.listen(3000, function() {
	console.log(`Application started on port: 3000`);
});