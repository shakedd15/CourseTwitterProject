tweetsRoutes = function (app) {
    app.route('/')
        .get(function (req, res) {
            res.sendfile('./public/twitter/ofekTwitter.html');
        });

    app.route('/users')
        .get(function (req, res) {
            res.sendfile('./public/twitter/users.html');
        });
};

module.exports = tweetsRoutes;