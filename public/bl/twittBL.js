module.exports = {
    GetAllTweetsOfUserId: function(twitts, id) {
        let userTweets = [];
        twitts.forEach(function (twitt) {
            if (twitt.user === id) {
                userTweets.push(twitt);
            }
        });
        return userTweets;
    }
};