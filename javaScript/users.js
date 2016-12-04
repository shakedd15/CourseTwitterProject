window.onload = function () {
    for (i=0; i<allUsers.length; i++){
        createSingleUser(false, allUsers[i].username, "allUsers");
    }
};

var allUsers = [
    {username: 'Marty McFly', button: ''},
    {username: 'Janis Joplin', button: ''},
    {username: 'Albert Einstein', button: ''},
    {username: 'Dracula', button: ''},
    {username: 'Forest Gump', button: ''},
    {username: 'Caligula', button: ''},
    {username: 'Winnie the Pooh', button: ''},
    {username: 'Obama', button: null},
    {username: 'Henry the 8th', button: ''},
    {username: 'Genghis Khan', button: ''}
];

//TODO: להפריד לפונקציות
function followingButtonAction(username) {

    var filterUser = allUsers.filter(function(e) {
        return e.username == username;
    });

    if(filterUser[0].button.innerHTML == "unfollow"){
        filterUser[0].button.innerHTML = "follow";
        var list = document.getElementById("myFollowers");
        var listOfDivs = list.querySelectorAll(".user");
        listOfDivs.forEach(function (userDiv) {
            if(userDiv.querySelectorAll("span")[0].innerHTML == username){
                userDiv.style.display = "none";
            }
        });
    }else {
        filterUser[0].button.innerHTML = "unfollow";
        createSingleUser(true, username, "myFollowers");
    }

}

//TODO: להפריד לפונקציות
function createSingleUser(follow, username, List){
    var div = document.createElement("div");

    if(!follow){
        div.className = "col-md-2 ";
    }else {
        div.className = "user";
    }

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

    button.onclick = function(){followingButtonAction(username)};


    var span = document.createElement("span");
    span.innerHTML = username;

    var br1 = document.createElement("br");
    var br2 = document.createElement("br");

    divForImg.appendChild(img);
    divForContent.appendChild(button);
    divForContent.appendChild(br1);
    divForContent.appendChild(span);
    innerDiv.appendChild(divForImg);
    innerDiv.appendChild(br2);
    innerDiv.appendChild(divForContent);
    div.appendChild(innerDiv);


    if(!follow){
        addButtonToUserList(button, username);
    }

    document.getElementById(List).appendChild(div);
}

function addButtonToUserList(button, username) {
    var filterObj = allUsers.filter(function(e) {
        return e.username == username;
    });
    filterObj[0].button = button;
}

function filterFunction() {
    var input, filter, allUsers, usersList, currentUser, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    allUsers = document.getElementById("allUsers");
    usersList = allUsers.getElementsByTagName("span");

    for (i = 0; i < usersList.length; i++) {
        currentUser = usersList[i].textContent;
        if (currentUser) {
            if (currentUser.toUpperCase().indexOf(filter) > -1) {
                allUsers.children[i].style.display = "";
            } else {
                allUsers.children[i].style.display = "none";
            }
        }
    }
}

