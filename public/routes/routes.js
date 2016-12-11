function route(app) {
    require('./pagingRoutes')(app);
    require('./twittsRoutes')(app);
    require('./usersRoutes')(app);
}

module.exports = route;