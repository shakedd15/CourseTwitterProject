let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

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
    console.log('app listening on port: ' + PORT);
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

app.put('/AddComment',function(req,res){
    fs.readFile('./public/data/twitts.json',function (err, content) {
        let tweets = JSON.parse(content.toString());
        tweets.push({text: req.body.text, user: req.body.user});
        fs.writeFile('./public/data/twitts.json',JSON.stringify(tweets));
        res.sendfile('./public/data/twitts.json');
    });
});

app.put('/newUser',function(req,res){
    fs.readFile('./public/data/users.json',function (err, content) {
        let users = JSON.parse(content.toString());
        let user = getUserByID(users, '10c06b27-d8ee-4435-9cee-0a2a838ca14a');
        user.following.push(req.body.id);
        fs.writeFile('./public/data/users.json',JSON.stringify(users));
        res.sendfile('./public/data/users.json');
    });
});

app.put('/removeUser',function(req,res){
    fs.readFile('./public/data/users.json',function (err, content) {
        let users = JSON.parse(content.toString());
        let user = getUserByID(users, '10c06b27-d8ee-4435-9cee-0a2a838ca14a');
        let index = user.following.indexOf(req.body.id);
        user.following.splice(index, 1);
        fs.writeFile('./public/data/users.json',JSON.stringify(users));
        res.sendfile('./public/data/users.json');
    });
});

app.get('/Data/twitts/:userId', function (req, res) {
    fs.readFile('./public/data/twitts.json', function (err, content) {
        let twitts = JSON.parse(content.toString());
        let user = GetAllTweetsOfUserId(twitts, req.params.id);
        res.send(JSON.stringify(user));
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