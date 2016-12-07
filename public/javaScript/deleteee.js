var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', function (req, res) {
    fs.readFile('./public/ofekTwitter/tweets.html', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    })
});

app.get('/usersPage', function (req, res) {
    fs.readFile('./public/ofekTwitter/users.html', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    })
});


app.get('/users', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    })
});

app.get('/tweets', function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    })
});

app.get('/users/:id', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        let user = getUserById(users, req.params.id)
        res.end(JSON.stringify(user), 'utf-8');
    })
});

app.get('/tweets/:id', function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let tweets = JSON.parse(content.toString());
        let userTweets = getAllUserTweets(tweets, req.params.id);
        res.end(JSON.stringify(userTweets), 'utf-8');
    })
});

app.get('/users/following/:id', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        let usersFollowing = getUsersFolowingId(users, req.params.id)
        res.end(JSON.stringify(usersFollowing), 'utf-8');
    })
});

app.put('/tweets', function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let tweets = JSON.parse(content.toString());
        tweets.push({text: req.body.text, user: req.body.user});
        fs.writeFile('./public/json/tweets.json',JSON.stringify(tweets));
        res.end(JSON.stringify(tweets), 'utf-8');
    })
});

function getUserById(users, id) {
    for (let user of users) {
        if (user._id === id) {
            return user;
        }
    }
}

function getUsersFolowingId(users, id) {
    let followings = [];

    for (let user of users) {
        for (let followingUserId of user.following) {
            if (followingUserId === id) {
                followings.push(user);
                break;
            }
        }
    }

    return followings;
}

function getAllUserTweets(tweets, id) {
    let userTweets = [];

    for (let tweet of tweets) {
        if (tweet.user === id) {
            userTweets.push(tweet);
        }
    }

    return userTweets;
}

app.listen(2020);
