# Spacex next launch app
![home](docs/img/home.gif "Home countdown")

This app shows a countdown to the upcoming spacex apps and details about this launch. You can find links to the livestream (if there is one) or information about the campaign through reddit or wikipedia aswell as information about the launchsite and the payload.

see the client version live demo [here!](https://jimmydekroon.github.io/web-app-from-scratch-2021/src/index.html)

## Instructions (How to use)
- Download or clone the repository
- Navigate to the /src folder in the terminal
- Install using: npm install
- Start a server with npm start

</br>
</br>

## The Spacex API

- Visit the API github repository here [Spacex API](https://github.com/r-spacex/SpaceX-API).
- Information about the endpoints and how to get there [Spacex docs](https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/README.md)
- Request limit: 50 requests per second.

The main endpoint to be used is /next (https://api.spacexdata.com/v4/next). This is where the information about the upcoming launch is stored. Values like the next launch date and links to livestreams etc. are taken from here. Detailed information is taken from their endpoints attached with an id. For example: the launchpad to be used can be found in (https://api.spacexdata.com/v4/next) as an id. This id can then be used to look for information about the specific launchpad (https://api.spacexdata.com/v4/launchpad/:id).

This fetch will give you data about the upcoming launch
```JS
fetch('https://api.spacexdata.com/v4/launches/next')
```

this fetch will give you data about a specific payload
```JS
fetch('https://api.spacexdata.com/v4/payloads/:id')
```

Request limit information: 50 requests per second.

