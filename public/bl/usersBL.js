module.exports = {
    getUserByID: function (users, id) {
            return users.filter(function (user) {
                return user._id === id;
            })[0];
        }
};