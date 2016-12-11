function countingLogoImage() {
    return document.querySelectorAll("#logo").length === 1;
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

function allFunctionWork() {
    return $("b").all(function (element) {
        return element.innerHTML.length > 1
    });
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