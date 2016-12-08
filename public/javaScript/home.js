let userId;
let twitts = [];
let users = [];

window.onload = function () {
    testingFunctions();
    getUser("10c06b27-d8ee-4435-9cee-0a2a838ca14a")
      .then(addTheUserMoreData)
      .then(getAllTwitts)
      .then(addAllTwittsToArray)
      .then(addAllUsersToArray)
      .then(pasteTwittToHome);

};

function addTheUserMoreData(response) {
    userId = response.data;
}

function addAllTwittsToArray(response) {
    twitts = response.data;
}

function addAllUsersToArray() {
    let tweetsPromises = twitts.map(function tweetToPromise(tweet) {
        return getUser(tweet.user)
            .then(function (response) {
                users.push(response.data);
            })
    });
    return axios.all(tweetsPromises);
}

function pasteTwittToHome() {
    twitts.forEach(function (twitt) {
        changeTwittUserIdToUserObjectToGetUsername(twitt)
        createSingleTwitt(twitt.user[0], twitt.text);
    });
}

function changeTwittUserIdToUserObjectToGetUsername(tweet) {
    tweet.user = users.filter(function (currentUser) {
        return currentUser._id === tweet.user;
    });
}

function addCommant() {
    let content = document.getElementById("tweetContent").value;
    let newUser = {user: userId._id, text: content};
    putTwitt(newUser);
    location.reload();
}

function createSingleTwitt(user, text){
    let commentObject = createDiv();
    let avatarObeject = createAvatarObject();
    let textObject = createTextObject();
    let imgObject = createImgPlace();
    let textPlace = createHtmlPlace(user);

    if(user._id !== userId._id){
        textPlace.style.color = '#008000';
    }

    let spanForText = document.createElement("span");
    spanForText.append(text);

    let space = document.createElement("br");

    avatarObeject.appendChild(imgObject);
    textObject.appendChild(textPlace);
    textObject.appendChild(space);
    textObject.appendChild(spanForText);
    commentObject.appendChild(avatarObeject);
    commentObject.appendChild(textObject);

    document.getElementById("allTweets").appendChild(commentObject);
}

function createDiv() {
    let div = document.createElement("div");
    div.className = "row";
    return div;
}

function createAvatarObject() {
    let span = document.createElement("span");
    span.className = "avatar";
    return span;
}

function createTextObject() {
    let textObject = document.createElement("span");
    textObject.className = "text";
    return textObject;
}

function createImgPlace() {
    let img = document.createElement("img");
    img.src = "../images/useravatar.png";
    return img;
}

function createHtmlPlace(user) {
    let b = document.createElement("b");
    b.innerHTML = user.username;
    return b;
}