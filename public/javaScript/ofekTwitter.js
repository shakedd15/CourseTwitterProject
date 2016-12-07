var userId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
let tweets = [];
let users = [];

window.onload = function () {

    test_group('Selectors', function() {
        assert(countingLogoImage(), "simple successful test");
        assert(countingFiveTweet(), "counting 5 tweet-username classes under ot-body class");
        assert(findNonId(), "not finding any non-existant ids of elements");
    });

    test_group('CSS functions', function() {
        assert(removeClass(), "removeClass() remove papa class");
        assert(addsPapaClass(), "addClass() adds papa class");
        assert(changeColorWord(), "css() sets welcome-header to green");
    });

    test_group('Functional functions tests', function() {
        assert(allFunctionWork(), "all function works with multiple functions");
        assert(testIfAllSuccess(), "all function counts 1 child for all nav-btn class elements");
        assert(testIfOneFeild(), "any function doesn't find a nav-btn class element with no children");
    });

    axios.get('http://localhost:8000/Data/twitts')
        .then(function (response) {
            tweets = response.data;
        })
        .then(function () {
            var tweetsPromises = tweets.map(function tweetToPromise(tweet) {
                return axios.get('http://localhost:8000/Data/users/' + tweet.user)
                    .then(function (response) {
                        users.push(response.data);
                    })
            });
            let allPromise = axios.all(tweetsPromises);
            return allPromise;
        }).then(function(){
        tweets.forEach(function (tweet) {
            tweet.user = users.filter(function(currentUser) {
                return currentUser._id === tweet.user;
            });
            createSingleTwitt(tweet.user[0].username, tweet.text, false);
        });
    });
};

function addCommant() {

    let content = document.createTextNode(document.getElementById("tweetContent").value);
    let newUser = {user: userId, text: content};
    axios.post('http://localhost:8000/AddComment',newUser);
    // createSingleTwitt(newUser.user, newUser.text, true);
}

//TODO: להפריד לפונקציות
function createSingleTwitt(username, text, isThisUser){
    let div = document.createElement("div");
    div.className = "row";

    let firstSpan = document.createElement("span");
    firstSpan.className = "avatar";

    let secondSpan = document.createElement("span");
    secondSpan.className = "text";

    let img = document.createElement("img");
    img.src = "../images/useravatar.png";

    let b = document.createElement("b");
    b.innerHTML = username;

    if(!isThisUser){
        b.style.color = '#008000';
    }

    let spanForText = document.createElement("span");
    spanForText.append(text);

    let br = document.createElement("br");

    firstSpan.appendChild(img);
    secondSpan.appendChild(b);
    secondSpan.appendChild(br);
    secondSpan.appendChild(spanForText);
    div.appendChild(firstSpan);
    div.appendChild(secondSpan);

    document.getElementById("allTweets").appendChild(div);
}