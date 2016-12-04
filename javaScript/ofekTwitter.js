window.onload = function () {
    for (i=0; i<tweets.length; i++){
        createSingleTwitt(tweets[i].username, tweets[i].text, false);
    }
};

var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
];

function addCommant() {

    var content = document.createTextNode(document.getElementById("tweetContent").value);
    var newUser = {username: 'Evgeny Nemzer', text: content};
    tweets.push(newUser);
    createSingleTwitt(newUser.username, newUser.text, true)
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