let fs = require('fs');
var twitterBL = require("../bl/usersBL.js");

userRoutes = function (app) {
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

    app.put('/newUser',function(req,res){
        fs.readFile('./public/data/users.json',function (err, content) {
            let users = JSON.parse(content.toString());
            let user = twitterBL(users, '10c06b27-d8ee-4435-9cee-0a2a838ca14a');
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
};

function getUserByID(users, id) {
    return users.filter(function (user) {
        return user._id === id;
    })[0];
}

module.exports = userRoutes;