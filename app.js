var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get("/", function(req, res) {
    res.sendfile('./public/twitter/ofekTwitter.html');
});

app.get("/users", function(req, res) {
    res.sendfile('./public/twitter/users.html');
});

const PORT = 8000;

app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT);
});

app.get('/Data/users', function (req, res) {
    res.sendfile('./public/data/users.json');
});

app.get('/Data/users/:id', function (req, res) {
    fs.readFile('./public/data/users.json', function (err, content) {
        let users = JSON.parse(content.toString());
        let user = getUserByID(users, req.params.id);
        res.send(JSON.stringify(user));
    })
});

app.get('/Data/twitts', function (req, res) {
    res.sendfile('./public/data/twitts.json');
});

app.post('/AddComment',function(req,res){
    fs.readFile('./public/data/twitts.json',function (err, content) {
        let tweets = JSON.parse(content.toString());
        tweets.push({text: req.body.text, user: req.body.user});
        fs.writeFile('./public/json/tweets.json',JSON.stringify(tweets));
        res.send(JSON.stringify(tweets), 'utf-8');
    });
});

app.get('/Data/twitts/:userId', function (req, res) {
    fs.readFile('./public/data/twitts.json', function (err, content) {
        let twitts = JSON.parse(content.toString());
        let user = GetAllTweetsOfUserId(twitts, req.params.id);
        res.send(JSON.stringify(user), 'utf-8');
    })
});

function getUserByID(users, id) {
    return users.filter(function (user) {
        return user._id === id;
    })[0];
}

function GetAllTweetsOfUserId(twitts, id) {
    let userTweets = [];
    twitts.forEach(function (twitt) {
        if(twitt.user === id){
            userTweets.push(twitt);
        }
    });
    return userTweets;
}