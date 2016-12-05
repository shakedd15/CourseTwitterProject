let ul, isSeccess;

function assert(value, name) {
    isSeccess = value;
    ul = document.createElement("ul");
    let placeHolder = document.getElementById("testPlace");
    let li = document.createElement("testIfAllSuccess");
    li.style.border = "1px";
    li.style.borderColor = "black";
    li.style.borderStyle = "groove";
    li.innerHTML = name;

    if(value == true){
        li.style.backgroundColor = "#8bd497";
    }
    else {
        li.style.backgroundColor = "#d4100c";
    }

    ul.appendChild(li);
    placeHolder.appendChild(ul);
}

function test_group(name, test_group_function){
    let placeHolder = document.getElementById("testPlace");
    let divTestGroup = document.createElement("div");
    let h = document.createElement("h4");
    h.innerHTML = name;
    placeHolder.appendChild(divTestGroup);
    divTestGroup.appendChild(h);
    test_group_function();
    if(isSeccess){
        divTestGroup.style.backgroundColor = "#8bd497";
    }else {
        divTestGroup.style.backgroundColor = "#d4100c";
    }
    divTestGroup.appendChild(ul);
}

function countingLogoImage() {
    return document.querySelectorAll("#logo").length == 1;
}

function countingFiveTweet() {
    return document.querySelectorAll(".row").length >= 5;
}

function findNonId() {
    let s = $('#shaked');
    return s.elements.length == 0;
}

function addsPapaClass() {
    let firstCountOfShakedClass = document.querySelectorAll(".shaked").length;
    let s = $('div');
    s.addClass("shaked");
    let secondCountOfShakedClass = document.querySelectorAll(".shaked").length;
    return secondCountOfShakedClass > firstCountOfShakedClass;
}

function removeClass() {
    let s = $('div');
    s.addClass("shaked");
    let firstCountOfShakedClass = document.querySelectorAll(".shaked").length;
    s.removeClass("shaked");
    let secondCountOfShakedClass = document.querySelectorAll(".shaked").length;
    return firstCountOfShakedClass > secondCountOfShakedClass;
}

function changeColorWord() {
    let s = $('a');
    s.css("color", "green");
    let arry = s.getAttribute("style");
    return arry[0]["style"].color == "green";
}

function allFunctionWork(){
    return $("b").all(function(element) {return element.innerHTML.length > 1});
}

function testIfAllSuccess() {
    let btn = $("testIfAllSuccess").all(function (element) {
        return element.children.length = 1;
    });
    return btn;
}

function testIfOneFeild() {
    let btn = $("testIfAllSuccess").any(function (element) {
        return element.children.length = 0;
    });
    return !btn;
}