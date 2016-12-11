let fs = require('fs');
var twitterBL = require("../bl/twittBl.js");

pagingRouting = function (app) {
    app.get('/Data/twitts', function (req, res) {
        res.sendfile('./public/data/twitts.json');
    });

    app.get('/Data/twitts/:userId', function (req, res) {
        fs.readFile('./public/data/twitts.json', function (err, content) {
            let twitts = JSON.parse(content.toString());
            let user = twitterBL.GetAllTweetsOfUserId(twitts, req.params.id);
            res.send(JSON.stringify(user));
        })
    });

    app.put('/AddComment',function(req,res){
        fs.readFile('./public/data/twitts.json',function (err, content) {
            let tweets = JSON.parse(content.toString());
            tweets.push({text: req.body.text, user: req.body.user});
            fs.writeFile('./public/data/twitts.json',JSON.stringify(tweets));
            res.sendfile('./public/data/twitts.json');
        });
    });
};

module.exports = pagingRouting;