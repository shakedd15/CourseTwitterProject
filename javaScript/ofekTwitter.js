window.onload = function () {
    for (i=0; i<tweets.length; i++){
        createSingleTwitt(tweets[i].username, tweets[i].text, false);
    }

    test_group('first test group', function() {
        assert(countingLogoImage(), "simple successful test");
        assert(countingFiveTweet(), "counting 5 tweet-username classes under ot-body class");
    });
};

var tweets = [
    {username: 'James Bond', text: 'Blablabla...'},
    {username: 'James Bond', text: 'im hungry'},
    {username: 'Albert Einstein', text: 'E = mc^2!'},
    {username: 'Bill Gates', text: 'I think 64 bytes should be enough for everyone'},
    {username: 'Frodo', text: 'My precious'}
];

function addCommant() {

    var content = document.createTextNode(document.getElementById("tweetContent").value);
    var newUser = {username: 'Evgeny Nemzer', text: content};
    tweets.push(newUser);
    createSingleTwitt(newUser.username, newUser.text, true)
}

//TODO: להפריד לפונקציות
function createSingleTwitt(username, text, isThisUser){
    var div = document.createElement("div");
    div.className = "row";

    var firstSpan = document.createElement("span");
    firstSpan.className = "avatar";

    var secondSpan = document.createElement("span");
    secondSpan.className = "text";

    var img = document.createElement("img");
    img.src = "../images/useravatar.png";

    var b = document.createElement("b");
    b.innerHTML = username;

    if(!isThisUser){
        b.style.color = '#008000';
    }

    var spanForText = document.createElement("span");
    spanForText.append(text);

    var br = document.createElement("br");

    firstSpan.appendChild(img);
    secondSpan.appendChild(b);
    secondSpan.appendChild(br);
    secondSpan.appendChild(spanForText);
    div.appendChild(firstSpan);
    div.appendChild(secondSpan);

    document.getElementById("allTweets").appendChild(div);
}