window.onload = function () {
    for (i=0; i<tweets.length; i++){
        createSingleTwitt(tweets[i].username, tweets[i].text, false);
    }

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
};

let tweets = [
    {username: 'James Bond', text: 'Blablabla...'},
    {username: 'James Bond', text: 'im hungry'},
    {username: 'Albert Einstein', text: 'E = mc^2!'},
    {username: 'Bill Gates', text: 'I think 64 bytes should be enough for everyone'},
    {username: 'Frodo', text: 'My precious'}
];

function addCommant() {

    let content = document.createTextNode(document.getElementById("tweetContent").value);
    let newUser = {username: 'Evgeny Nemzer', text: content};
    tweets.push(newUser);
    createSingleTwitt(newUser.username, newUser.text, true)
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