let userId;
let usersDetails = [];
let allUsers = [];

window.onload = function () {
    getUser('10c06b27-d8ee-4435-9cee-0a2a838ca14a')
    .then(addTheUserMoreData)
    .then(function () {
        getAllUsers()
            .then(addAllUserToArray)
            .then(addUsersToList)
            .then(pasteSingleUser);
        addFollowing()
    });
};

function addTheUserMoreData(response) {
    userId = response.data;
}

function addUsersToList() {
    usersDetails.forEach(function (user) {
        if(user._id !== userId._id){
            allUsers.push({username:user.username, button:'', user: user, follow:(userId.following.indexOf(user._id)!= -1)});
        }
    });
}

function addAllUserToArray(response) {
    usersDetails = response.data;
}
function pasteSingleUser() {
    allUsers.forEach(function (user) {
        createSingleUser(user.follow, user, "allUsers");
    });
}
function addFollowing() {
    userId.following.forEach(function (currentUser) {
        getUser('currentUser')
            .then(function (response) {
                createSingleUser(true, response.data, "myFollowers");
                changeFollowStateOfUser(response.data.username)
            });
    });
}

function changeFollowStateOfUser(username) {
    let filterUser = allUsers.filter(function(user) {
        return user.username === username;
    });
    filterUser.follow = true;
}

function followingButtonAction(user){
    let filterUser = allUsers.filter(function(e) {
        return e.username === user.username;
    });
    if(filterUser[0].button.innerHTML === "unfollow"){
        unfollowUser(filterUser[0], user);
    }else {
        followUser(filterUser[0], user);
    }
}

function unfollowUser(filterUser, user) {
    filterUser.button.innerHTML = "follow";
    let list = document.getElementById("myFollowers");
    let listOfDivs = list.querySelectorAll(".user");
    axios.put('http://localhost:8000/removeUser', {id:user._id});
    listOfDivs.forEach(function (userDiv) {
        if(userDiv.querySelectorAll("span")[0].innerHTML === user.username){
            userDiv.style.display = "none";
        }
    });
}

function followUser(filterUser, user) {
    filterUser.button.innerHTML = "unfollow";
    axios.put('http://localhost:8000/newUser', {id:user.user._id});
    createSingleUser(true, user, "myFollowers");
}

function createSingleUser(follow, user, List){
    let div = document.createElement("div");
    if(List === "allUsers"){
        div.className = "col-md-2 ";
    }else {
        div.className = "user";
    }

    let innerDiv = document.createElement("div");
    innerDiv.className = "thumbnail";

    let divForImg = document.createElement("div");

    let img = document.createElement("img");
    img.src = "../images/useravatar.png";

    let divForContent = document.createElement("div");

    let button = document.createElement("button");
    button.className = "btn btn-primary";
    button.type = "button";

    if(!follow){
        button.innerHTML = "follow";
    }
    else {
        button.innerHTML = "unfollow";
    }

    button.onclick = function(){followingButtonAction(user)};


    let span = document.createElement("span");
    span.innerHTML = user.username;

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    divForImg.appendChild(img);
    divForContent.appendChild(button);
    divForContent.appendChild(br1);
    divForContent.appendChild(span);
    innerDiv.appendChild(divForImg);
    innerDiv.appendChild(br2);
    innerDiv.appendChild(divForContent);
    div.appendChild(innerDiv);


    if(List === "allUsers"){
        addButtonToUserList(button, user);
    }

    document.getElementById(List).appendChild(div);
}

function addButtonToUserList(button, user) {
    let filterObj = allUsers.filter(function(e) {
        return e.username == user.username;
    });
    filterObj[0].button = button;
}

function filterFunction() {
    let input, filter, allUsers, usersList, currentUser, i;
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