alert("gsgs")

window.onload = function () {
    for(user in tweets){
        createSingleTwitt(tweets[user].username, tweets[user].text, false);
    }

}

var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
];

function addCommant() {
    var contamt = document.getElementById("tweetContent").value;
    var newUser = {username: 'Evgeny Nemzer', text: contamt};
    tweets.push(newUser)
    createSingleTwitt(newUser.username, newUser.text, true)
}

function publishAllTweets() {
    document.getElementById("avatar").innerHTML;
}

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

    var spanForText = document.createElement("span");
    spanForText.innerHTML = text;

    var br = document.createElement("br");

    firstSpan.appendChild(img);
    secondSpan.appendChild(b);
    secondSpan.appendChild(br);
    secondSpan.appendChild(spanForText);
    div.appendChild(firstSpan);
    div.appendChild(secondSpan)

    document.getElementById("allTweets").appendChild(div);
}