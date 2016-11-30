window.onload = function () {
    for(user in allUsers){
        createSingleTwitt(false, allUsers[user].username, "allUsers");
    }
    for(user in following){
        createSingleTwitt(true, following[user].username, "myFollowers");
    }
}
var following = [];
var allUsers = [
    {username: 'Marty McFly'},
    {username: 'Janis Joplin'},
    {username: 'Albert Einstein'},
    {username: 'Dracula'},
    {username: 'Forest Gump'},
    {username: 'Caligula'},
    {username: 'Winnie the Pooh'},
    {username: 'Obama'},
    {username: 'Henry the 8th'},
    {username: 'Genghis Khan'}
];

function doFollowingAction(follow, username) {
    if(follow){

    }else {
        following.push({username: username});
        createSingleTwitt(!follow, username, "myFollowers");
    }

}

function createSingleTwitt(follow, username, List){
    var div = document.createElement("div");
    div.className = "col-md-2";

    var innerDiv = document.createElement("div");
    innerDiv.className = "thumbnail";

    var divForImg = document.createElement("div");

    var img = document.createElement("img");
    img.src = "../images/useravatar.png";

    var divForContent = document.createElement("div");

    var button = document.createElement("button");
    button.className = "btn btn-primary";
    button.type = "button";
    if(!follow){
        button.innerHTML = "follow";
    }
    else {
        button.innerHTML = "unfollow";
    }
    var data = {}

    button.onclick = function(){doFollowingAction(follow, username)};


    var span = document.createElement("span");
    span.innerHTML = username;

    var br = document.createElement("br");

    divForImg.appendChild(img);
    divForContent.appendChild(button);
    divForContent.appendChild(span);
    innerDiv.appendChild(divForImg);
    innerDiv.appendChild(br);
    innerDiv.appendChild(divForContent);
    div.appendChild(innerDiv);

    document.getElementById(List).appendChild(div);
}