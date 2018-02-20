let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser');
let axios = require('axios');

let familyData = {};
let url = 'http://ohjelmointitehtava.protacon.fi/family_tree.json';

let app = express();

//Enable CORS
app.use(cors());

//Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.use(bodyParser.json());

app.get('/families', (req, res) => {
    res.json(familyData);
});

axios.get(url)
    .then(function (response) {
        familyData = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });


let port = process.env.PORT ? process.env.PORT : 8081;
let server = app.listen(port, () => {
    console.log("Server online in port %s", port);
});